import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entities/message.entity'; 
import { WebsocketsService } from './websockets.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Message]), AuthModule],
    providers: [ChatGateway, WebsocketsService]
})
export class WebsocketsModule { }
