import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorator/role.decorator';
import { PageOptionsDto } from 'src/dto/page-option.dto';
import { CreatePostDto } from 'src/dto/post.dto';
import { Role } from 'src/enum/role.enum';
import JwtAuthenticationGuard from 'src/guard/jwt-authentication/jwt-authentication.guard';
import { RoleGuard } from 'src/guard/role-guard/role-guard.guard';
import { PostService } from '../../service/post/post.service';

@Controller('post')
export class PostController {
    constructor(
        private readonly _postService: PostService,
    ) {

    }

    private _convertToSlug(text: string): string {
        if (!text) return ''
        return text.toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }

    @Roles(Role.User, Role.Admin)
    @UseGuards(JwtAuthenticationGuard, RoleGuard)
    @HttpCode(201)
    @Post('create')
    async createNewPost(@Body() payload: CreatePostDto) {
        const slug = await this._convertToSlug(payload.title)
        const newPost = this._postService.createNewPost({ ...payload, slug })
        return newPost

    }

    @Roles(Role.User, Role.Admin)
    @UseGuards(JwtAuthenticationGuard, RoleGuard)
    @HttpCode(200)
    @Get('')
    async getAllPost(payload: PageOptionsDto) {
        const posts = await this._postService.getAllPosts(payload)
        return posts
    }

}
