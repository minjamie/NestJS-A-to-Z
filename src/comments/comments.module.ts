import { CatsRepository } from 'src/cats/cats.repository';
import { CatsModule } from './../cats/cats.module';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { Comments, CommentsSchema } from './comments.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
    ]),
    CatsModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
