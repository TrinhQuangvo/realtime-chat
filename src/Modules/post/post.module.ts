import { Module } from '@nestjs/common';
import { PostController } from './controller/post/post.controller';
import { PostService } from './service/post/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { User } from 'src/entities/auth.entity';
import { Tag } from 'src/entities/tag.entity';
import { TagService } from '../tag/service/tag/tag.service';
import { UserService } from '../user/service/user/user.service'; 

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Tag])],
  controllers: [PostController],
  providers: [PostService, UserService, TagService,  ]
})
export class PostModule { }
