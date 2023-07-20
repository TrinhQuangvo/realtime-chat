import { Module } from '@nestjs/common'; 
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/entities/auth.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { Post } from 'src/entities/post.entity';
import { PostModule } from 'src/post/post.module';
import { Tag } from 'src/entities/tag.entity';
import { TagModule } from 'src/tag/tag.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  username: 'root',
  password: '',
  port: 3306,
  database: 'nestjs_tutorial',
  entities: [User, Post, Tag],
  synchronize: true
}

@Module({
  imports: [TypeOrmModule.forRoot(config), UserModule, AuthModule, PostModule, TagModule],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule { }
