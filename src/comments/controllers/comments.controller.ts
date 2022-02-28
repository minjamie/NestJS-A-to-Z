import { JwtAuthGuard } from './../../auth/jwt/jwt.guard';
import { CommentsCreateDto } from './../dto/comments.create.dto';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsService } from './../services/comments.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  UseGuards,
} from '@nestjs/common';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: '모든 고양이 프로필에 적힌 댓글 가져오기' })
  @Get('all')
  async getAllComments() {
    return this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: '댓글쓰기' })
  @Post(':id')
  async cerateComments(
    @Param('id') _id: string,
    @Body() body: CommentsCreateDto,
  ) {
    return this.commentsService.createComment(_id, body);
  }

  @ApiOperation({ summary: '좋아요수 올리기' })
  @Patch(':id')
  async plusLike(@Param('id') id: string) {
    return this.commentsService.plusLike(id);
  }
}
