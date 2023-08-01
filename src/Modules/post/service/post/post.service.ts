import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/dto/page-meta.dto';
import { PageOptionsDto } from 'src/dto/page-option.dto';
import { PageDto } from 'src/dto/page.dto';
import { CreatePostDto, UpdatePostDto } from 'src/dto/post.dto';
import { User } from 'src/entities/auth.entity';
import { Post } from 'src/entities/post.entity';
import { Tag } from 'src/entities/tag.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post) private readonly _postRepository: Repository<Post>,
        @InjectRepository(User) private readonly _userRepository: Repository<User>,
        @InjectRepository(Tag) private readonly _tagRepository: Repository<Tag>
    ) {

    }

    async createNewPost(payload: CreatePostDto) {
        const user = await this._userRepository.findOneBy({ id: payload.authorId })
        if (!user) throw new HttpException(
            'User  found. Cannot create Profile',
            HttpStatus.BAD_REQUEST,
        );
        const postUser = {
            id: user.id,
            firstName: user.lastName,
            lastName: user.lastName,
            emai: user.email
        }

        const tags = await this._tagRepository.find({ where: { id: In(payload.tagId) } })
        if (!tags) throw new NotFoundException()
        const newTags = tags && tags.map(tag => {
            return {
                id: tag.id,
                name: tag.name,
                slug: tag.slug
            }
        })

        const post = await this._postRepository.create({ ...payload, author: postUser, tags: newTags })

        return await this._postRepository.save(post)
    }

    async getAllPosts(pageOptionsDto: PageOptionsDto): Promise<PageDto<Post>> {
        const { skip, take, order, } = pageOptionsDto
        const posts = await this._postRepository.find({
            relations: {
                author: true,
                tags: true
            },
            skip,
            take,
            order: {
                id: {
                    direction: order
                }
            },
        })
        const itemCount = await posts.length
        const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
        if (!posts) return new PageDto([], pageMetaDto)

        return new PageDto(posts, pageMetaDto)


    }

    async getPostById(id: string): Promise<Post> {
        if (!id) throw new HttpException('Something went wrong, please try again', HttpStatus.NOT_FOUND)
        const post = await this._postRepository.findOneBy({ id })
        return post
    }

    async updatePost(id: number, payload: UpdatePostDto) {
        if (!id) throw new HttpException('Something went wrong, please try again', HttpStatus.NOT_FOUND)

        return await this._postRepository.update(id, payload)
    }
}
