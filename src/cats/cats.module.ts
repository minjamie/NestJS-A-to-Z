import { CatsService } from './services/cats.service';
import { AuthModule } from './../auth/auth.module';
import { CatsRepository } from './cats.repository';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsController } from './controllers/cats.controller';
import { Cat, CatSchema } from './cats.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),

    MulterModule.register({ dest: './upload' }),
    MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository],

  // 차라리 export하여 내보낸 뒤 사용하는 게 좋다
})
export class CatsModule {}
