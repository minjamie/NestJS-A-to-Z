import { CatsService } from './cats/services/cats.service';
import { Body, Controller, Get, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 컨트롤러 - 소비자 , 서비스 - 제품이므로 소비자는 프로바이더로부터 공급받은 서비스를 사용하는 형태
  constructor(
    private readonly appService: AppService,
    private readonly CatsService: CatsService,
  ) {}

  @Get()
  getHello(): string {
    return 'hello word';
  }
}
