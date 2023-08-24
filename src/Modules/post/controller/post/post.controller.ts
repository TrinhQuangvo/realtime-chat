import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseFilePipeBuilder, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Roles } from 'src/decorator/role.decorator';
import { PageOptionsDto } from 'src/dto/page-option.dto';
import { CreatePostDto } from 'src/dto/post.dto';
import { Role } from 'src/enum/role.enum';
import JwtAuthenticationGuard from 'src/guard/jwt-authentication/jwt-authentication.guard';
import { RoleGuard } from 'src/guard/role-guard/role-guard.guard';
import { PostService } from '../../service/post/post.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
    constructor(
        private readonly _postService: PostService,
    ) { }

    private _convertToSlug(text: string): string {
        if (!text) return ''
        return text.toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }

    @UseInterceptors(FileInterceptor('thumbnail', {
        storage: diskStorage({
            destination: 'src/uploads/thumbnails',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    @Roles(Role.User)
    @UseGuards(JwtAuthenticationGuard, RoleGuard)
    @HttpCode(201)
    @Post('create')
    async createNewPost(@Body() payload: CreatePostDto, @UploadedFile(
        new ParseFilePipeBuilder()
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
            }),
    ) thumbnail: Express.Multer.File) {
        const slug = await this._convertToSlug(payload.title)
        const newPost = this._postService.createNewPost({ ...payload, slug, thumbnail: `post/thumbnails/${thumbnail.filename}` })
        return newPost
    }

    @Roles(Role.User)
    @UseGuards(JwtAuthenticationGuard, RoleGuard)
    @HttpCode(200)
    @Get('')
    async getAllPost(@Param() payload: PageOptionsDto) {
        const posts = await this._postService.getAllPosts(payload)
        return posts
    }

    @HttpCode(200)
    @Get('thumbnails/:id')
    async serveAvatar(@Param('id') id: string, @Res() res): Promise<any> {
        return await res.sendFile(id, { root: 'src/uploads/thumbnails' });
    }

}
