import { Socket as SocketModel } from './chats/models/socket.model';
import { Chatting } from './chats/models/chattings.model';
import { Socket } from 'socket.io';
import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Model } from 'mongoose';
export declare class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly chattingModel;
    private readonly socketModel;
    private logger;
    constructor(chattingModel: Model<Chatting>, socketModel: Model<SocketModel>);
    afterInit(): void;
    handleDisconnect(socket: Socket): Promise<void>;
    handleConnection(socket: Socket): void;
    handleNewUser(username: string, socket: Socket): Promise<string>;
    handleSubmitChat(chat: string, socket: Socket): Promise<void>;
}
