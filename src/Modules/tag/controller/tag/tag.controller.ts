import { Controller, Post, Get, HttpCode, HttpStatus, Body } from '@nestjs/common';
import { TagService } from '../../service/tag/tag.service';
 

@Controller('tag')
export class TagController {
    constructor(private readonly _tagService: TagService) {

    }

    @HttpCode(HttpStatus.OK)
    @Post('create')
    async createTag(@Body() payload: { name: string }) {
        const tag = await this._tagService.createNewTag(payload)
        return tag
    } 

    @HttpCode(HttpStatus.OK)
    @Get('')
    async getAllTag() {
        const tags = await this._tagService.getAllTag()
        return tags
    }
}
