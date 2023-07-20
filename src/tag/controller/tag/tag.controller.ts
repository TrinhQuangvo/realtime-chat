import { Controller, Post, Get, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { TagService } from 'src/tag/service/tag/tag.service';

@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {

    }

    @HttpCode(HttpStatus.OK)
    @Post('create')
    async createTag(@Body() payload: { name: string }) {
        const tag = await this.tagService.createNewTag(payload)
        return tag
    } 

    @HttpCode(HttpStatus.OK)
    @Get('')
    async getAllTag() {
        const tags = await this.tagService.getAllTag()
        return tags
    }
}
