"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsModule = void 0;
const socket_model_1 = require("./models/socket.model");
const chattings_model_1 = require("./models/chattings.model");
const mongoose_1 = require("@nestjs/mongoose");
const chats_gateway_1 = require("./../chats.gateway");
const common_1 = require("@nestjs/common");
let ChatsModule = class ChatsModule {
};
ChatsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: chattings_model_1.Chatting.name, schema: chattings_model_1.ChattingSchema },
                { name: socket_model_1.Socket.name, schema: socket_model_1.SocketSchema },
            ]),
        ],
        providers: [chats_gateway_1.ChatsGateway],
    })
], ChatsModule);
exports.ChatsModule = ChatsModule;
//# sourceMappingURL=chats.module.js.map