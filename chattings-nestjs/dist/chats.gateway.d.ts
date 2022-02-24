import { Socket } from 'socket.io';
import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
export declare class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger;
    constructor();
    afterInit(): void;
    handleDisconnect(socket: Socket): void;
    handleConnection(socket: Socket): void;
    handleNewUser(username: string, socket: Socket): string;
    handleSubmitChat(chat: string, socket: Socket): void;
}
