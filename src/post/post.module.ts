import { Module } from '@nestjs/common';
import { PostController } from './controller/post/post.controller';
import { PostService } from './service/post/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { UserService } from 'src/user/service/user/user.service';
import { User } from 'src/entities/auth.entity';
import { Tag } from 'src/entities/tag.entity';
import { TagService } from 'src/tag/service/tag/tag.service'; 

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Tag])],
  controllers: [PostController],
  providers: [PostService, UserService, TagService,]
})
export class PostModule { }
