import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { PublicRoutes } from 'src/decorator/auth.decorator';
import { Roles } from 'src/decorator/role.decorator';
import { PageOptionsDto } from 'src/dto/page-option.dto';
import { CreatePostDto } from 'src/dto/post.dto';
import { Role } from 'src/enum/role.enum';
import JwtAuthenticationGuard from 'src/guard/jwt-authentication/jwt-authentication.guard';
import { RoleGuard } from 'src/guard/role-guard/role-guard.guard';
import { PostService } from 'src/post/service/post/post.service';

@Controller('post')
export class PostController {
    constructor(
        private readonly postService: PostService,
    ) {

    }

    private _convertToSlug(text: string): string {
        if (!text) return ''
        return text.toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }

    @UseGuards(JwtAuthenticationGuard)
    @HttpCode(201)
    @PublicRoutes()
    @Post('create')
    async createNewPost(@Body() payload: CreatePostDto) {
        const slug = await this._convertToSlug(payload.title)
        await this.postService.createNewPost({ ...payload, slug })
        return {
            message: 'Tạo Mới Thành Công'
        }

    }

    @Roles(Role.User)
    @UseGuards(JwtAuthenticationGuard, RoleGuard)
    @HttpCode(200)
    @Get('all')
    async getPosts() {
        const posts = await this.postService.getPosts()
        return posts
    }

    @UseGuards(JwtAuthenticationGuard)
    @HttpCode(HttpStatus.OK)
    @Get('')
    async getAllPosts(@Query() payload: PageOptionsDto) {
        const posts = await this.postService.getAllPosts(payload)
        return posts
    }
}
