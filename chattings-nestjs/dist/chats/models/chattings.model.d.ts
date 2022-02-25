import { Document } from 'mongoose';
import { Socket as SocketModel } from './socket.model';
export declare class Chatting extends Document {
    user: SocketModel;
    chat: string;
}
export declare const ChattingSchema: import("mongoose").Schema<Chatting, import("mongoose").Model<Chatting, any, any>, undefined, {}>;
