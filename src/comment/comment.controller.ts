import { Controller, Post, Body, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  addComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.addComment(createCommentDto);
  }

  @Delete(':id')
  deleteComment(): Promise<void> {
    return this.commentService.deleteComment(1);
  }
}
