import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

/**
 * WebSocket Gateway for handling real-time events.
 * @WebSocketGateway - Decorator to mark this class as a WebSocket gateway.
 * @cors - Configuration for Cross-Origin Resource Sharing (CORS).
 */
@WebSocketGateway({
  cors: { origin: '*' },
})
export class EventsGateway implements OnGatewayInit {
  /**
   * WebSocket server instance.
   * @WebSocketServer - Decorator to inject the server instance.
   */
  @WebSocketServer()
  server: Server;

  /**
   * Called after the WebSocket server is initialized.
   * @param server - The initialized WebSocket server instance.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server) {
    console.log('WebSocket Server Initialized');
  }

  /**
   * Called when the module is initialized.
   * Sets up the connection event listener for the WebSocket server.
   */
  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  }

  /**
   * Handles incoming messages from clients.
   * @param data - The message data received from the client.
   * @param client - The client socket instance.
   * @SubscribeMessage('message') - Decorator to subscribe to 'message' events.
   */
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('Client ID:', client.id);
    this.server.emit('message', { message: data, sender: client.id });
    // Broadcasting message to all clients except the sender
    // client.broadcast.emit('message', { message: data, sender: client.id });

    // Sending a response only to the sender
    // client.emit('message', { message: 'Message received successfully' });
  }
}
