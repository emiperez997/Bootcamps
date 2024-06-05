import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  onModuleInit() {
    // Escuchamos el evento de conexión
    this.server.on('connection', (socket) => {
      const { token, name } = socket.handshake.auth;

      if (!token || !name) {
        socket.disconnect();
        return;
      }

      // console.log('Token', token);
      // console.log('Name', name);

      console.log('Client connected', socket.id);
      socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
      });

      socket.emit('welcome', { message: 'Hola!' });
    });
  }
}
