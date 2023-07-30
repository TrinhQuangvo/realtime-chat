import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from 'src/Modules/auth/auth.module';
import { PostModule } from 'src/Modules/post/post.module';
import { TagModule } from 'src/Modules/tag/tag.module';
import { UserModule } from 'src/Modules/user/user.module';
import { WebsocketsModule } from 'src/Modules/websockets/websockets.module';
import { User } from 'src/entities/auth.entity';
import { Message } from 'src/entities/message.entity';
import { Post } from 'src/entities/post.entity';
import { Tag } from 'src/entities/tag.entity';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  username: 'root',
  password: '',
  port: 3306,
  database: 'nestjs_tutorial',
  entities: [User, Post, Tag, Message],
  synchronize: true
}

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule, AuthModule, PostModule, TagModule, WebsocketsModule],
})
export class AppModule { }
