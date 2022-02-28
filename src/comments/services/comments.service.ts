import { ObjectID } from 'bson';
import { CatsRepository } from 'src/cats/cats.repository';
import { Comments } from './../comments.schema';
import { CommentsCreateDto } from './../dto/comments.create.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name)
    private readonly commentsModel: Model<Comments>,
    private readonly catsRepository: CatsRepository,
  ) {}
  async getAllComments() {
    try {
      const comments = await this.commentsModel.find();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(_id: string, commentData: CommentsCreateDto) {
    try {
      const targetCat = await this.catsRepository.findCatByIdWithOutPsw(_id);

      const { contents, author } = commentData;
      const validatedAuthor = await this.catsRepository.findCatByIdWithOutPsw(
        author,
      );
      const newComment = new this.commentsModel({
        author: validatedAuthor._id,
        contents,
        info: targetCat._id,
      });
      return await newComment.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async plusLike(id: string) {
    try {
      const comment = await this.commentsModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {}
  }
}