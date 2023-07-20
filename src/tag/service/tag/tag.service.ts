import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagService {

    constructor(@InjectRepository(Tag) private readonly _tagRepository: Repository<Tag>) {

    }

    private _slugConfig(text: string): string {
        if (!text) return ''
        return text.toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }

    async getTagByIds(ids: number[]) {
        return await this._tagRepository.find({ where: { id: In(ids) } })
    }

    async createNewTag(payload: { name: string }): Promise<Tag> {
        const slug = this._slugConfig(payload.name)
        return await this._tagRepository.save({
            name: payload.name,
            slug
        })
    }

    async getAllTag(): Promise<Tag[]> {
        return await this._tagRepository.find({ relations: { posts: true } })
    }
}
