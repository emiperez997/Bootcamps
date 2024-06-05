# Módulo 11 - Sockets y Comunicación en tiempo real

## WebSockets

Es un protocolo de comunicación bidireccional y en tiempo real

- Bidireccional
- Baja latencia
- Conexión persistente
- Menos carga de red
- Amplia compatibilidad

### Ejemplos

- Juego de Rol
- Chat
- Real-time
- Videoconferencia

## Creación del proyecto

- Creamos un proyecto con `nest new ws-chat`

```bash
nest new ws-chat
```

- Eliminamos los archivos `app.controller.ts`, `app.service.ts` y `app.controller.spec.ts`

- Luego generamos un nuevo recurso

```bash
nest g resource chat
? What transport layer do you use? WebSocket
? Would you like to generate CRUD entry points? No
```

- Esto nos gneera un archivo `chat.gateway.ts` que sirve como punto de entrada para la comunicación

- [Información de los Getaways](https://docs.nestjs.com/websockets/gateways)

## Paquetes para utilizar WebSockets

- ws: https://www.npmjs.com/package/ws
- socket.io: https://www.npmjs.com/package/socket.io

`Diferencias`:

| ws                                 | socket.io                            |
| ---------------------------------- | ------------------------------------ |
| Implementación mínima              | Tiene infraestructura más elaborada  |
| No tiene nada del lado del cliente | Tiene un cliente y un servidor       |
| Es ligero                          | Es robusto                           |
| Soporta más conexiones simultáneas | Soporta menos conexiones simultáneas |

- `@WebSocketServer()`: Es el decorador que nos permite crear un servidor WebSocket

## Creación del servidor de WebSockets

```typescript
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ChatService } from "./chat.service";
import { Server } from "socket.io";
import { OnModuleInit } from "@nestjs/common";

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  onModuleInit() {
    // Escuchamos el evento de conexión
    this.server.on("connection", (socket) => {
      console.log("Client connected", socket.id);
      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
      });
    });
  }
}
```

> [!NOTE]
> Se puede probar el servidor de WebSockets con Postman creando una nueva request y cambiando el protocolo a `WebSocket`

## Autenticación con WebSockets

- Dentro de nuestro JavaScript del cliente podemos agregar datos de autenticación a la hora de instanciar el socket

```javascript
const socket = io({
  auth: {
    token: "ABC-123",
    name: "John Doe",
  },
});
```

- En nuestro servidor de WebSockets podemos acceder a estos datos

```typescript
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ChatService } from "./chat.service";
import { Server } from "socket.io";
import { OnModuleInit } from "@nestjs/common";

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  onModuleInit() {
    // Escuchamos el evento de conexión
    this.server.on("connection", (socket) => {
      const { token, name } = socket.handshake.auth;

      // console.log('Token', token);
      // console.log('Name', name);

      console.log("Client connected", socket.id);
      socket.on("disconnect", () => {
        console.log("Client disconnected", socket.id);
      });
    });
  }
}
```

> [!NOTE]
> El token y el nombre de usuario son solo ejemplos, en realidad podríamos usar un token de autenticación más complejo que incluya información adicional como el nombre del usuario, la fecha de creación, etc.

- `@SubscribeMessage()`: Es un decorador que nos permite crear un mensaje de evento que se envía a todos los clientes conectados

```typescript
@SubscribeMessage('message')
onMessage(
  @MessageBody() message: string,
  @ConnectedSocket() client: Client,
) {
  this.chatService.onClientConnected(client);
}
```
