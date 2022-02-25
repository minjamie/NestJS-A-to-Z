import { Document } from 'mongoose';
export declare class Socket extends Document {
    id: string;
    username: string;
}
export declare const SocketSchema: import("mongoose").Schema<Socket, import("mongoose").Model<Socket, any, any>, undefined, {}>;
