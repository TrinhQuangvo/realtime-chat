import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket } from "@nestjs/websockets"
import { Server, Socket } from "socket.io"
import { WebsocketsService } from "./websockets.service"



@WebSocketGateway()

export class ChatGateway {

    constructor(private readonly websocketService: WebsocketsService) {

    }

    @WebSocketServer()
    server: Server

    async handleConnection(socket: Socket) {
        await this.websocketService.getUserFromSocket(socket);
    }

    @SubscribeMessage('send_message')
    async listenForMessages(@MessageBody() message: string, @ConnectedSocket() socket: Socket) {
        const author = await this.websocketService.getUserFromSocket(socket);
        const data = await this.websocketService.saveMessage({ content: message, author });
 

        this.server.sockets.emit('receive_message', data);
    }

    @SubscribeMessage('request_all_messages')
    async requestAllMessages(
        @ConnectedSocket() socket: Socket,
    ) {
        await this.websocketService.getUserFromSocket(socket);
        const messages = await this.websocketService.getAllMessages();

        socket.emit('send_all_messages', messages);
    }
}