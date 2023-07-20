import { Module } from '@nestjs/common';
import { TagController } from './controller/tag/tag.controller';
import { TagService } from './service/tag/tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService,]
})
export class TagModule { }
