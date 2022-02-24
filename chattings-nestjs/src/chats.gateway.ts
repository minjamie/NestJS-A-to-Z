import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
// 네임스페이스란
@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('Chat');
  constructor() {
    this.logger.log('constructor');
  }
  // 라이프사이클
  // 게이트 웨이 실행 시 가장 먼저 실행 - OnGatewayInit, 컨스트럭터 다음으로 실행
  afterInit() {
    this.logger.log('init');
  }

  // 커넥션 후 이벤트 발생 한 뒤 클라와 서버가 연결이 끊기면 그 때 발생하는 함수
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected: ${socket.id} ${socket.nsp.name}`);
  }

  // OnGatewayConnection 커넥션되자마자 실행되는 함수
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected: ${socket.id} ${socket.nsp.name}`);
  }

  //SubscribeMessage(이벤트) 해당하는  함수 실행
  @SubscribeMessage('new_user')
  // 컨트롤러 역할
  handleNewUser(
    // 메세지 바디 데코레이터 , ConnectedSocket 소켓(이걸로 emit on 가능)을 받는다
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.broadcast.emit('user_connected', username);
    return username;
  }

  @SubscribeMessage('submit_chat')   
  // 컨트롤러 역할
  handleSubmitChat(
    // 메세지 바디 데코레이터 , ConnectedSocket 소켓(이걸로 emit on 가능)을 받는다
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.broadcast.emit('new_chat', { chat, username: socket.id });
  }
}
  