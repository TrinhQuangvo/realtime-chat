import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io'; 
import { User } from 'src/entities/auth.entity';
import { Message } from 'src/entities/message.entity';
import { Repository } from 'typeorm';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { AuthService } from '../auth/services/auth/auth.service';

interface iMessage {
    content: string
    author: User
}

@Injectable()
export class WebsocketsService {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(Message) private messageRepository: Repository<Message>
    ) { }

    async saveMessage(payload: iMessage) {
        const newMessage = await this.messageRepository.create(payload)
        await this.messageRepository.save(newMessage)

        return newMessage
    }

    async getAllMessages() {
        return this.messageRepository.find({ relations: ['author'] })
    }

    async getUserFromSocket(socket: Socket) {
        const cookie = socket.handshake.headers.cookie
        if (!cookie) return
        const { Authentication: token } = parse(cookie)
        const user = await this.authService.getUserFromAuthenticationToken(token)

        if (!user) throw new WsException('Invalid credentials')

        return user
    }
}
