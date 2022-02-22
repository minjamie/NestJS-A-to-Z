import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
/* 캡슐화 (encapsulation)
객체(object)의 속성과 행위(method)를 하나로 묶고, 구현된 일부를 감추어 은닉한다.(은닉 hiding)
exports 하지않은 공급자는 사용하지 못한다.*/

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    CatsModule,
    AuthModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  // 프로바이더에 여러 서비스를 공급해주면 단일 책임 원칙에 어긋난다. 자체적으로 만든 공급자만 제공해주는 게 원칙 - 다른 모듈에서 만든 건 퍼블릭으로 공급
  // 모듈에서 서비스의 공급자를 등록해줘야 컨트롤러에서 사용할 수 있다.
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    mongoose.set('debug', this.isDev);
  }
}
