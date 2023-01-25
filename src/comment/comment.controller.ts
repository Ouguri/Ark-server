import {
  Controller,
  Post,
  Body,
  Delete,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, DeleteDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { GetUser } from 'src/user/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard())
  addComment(
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentService.addComment(createCommentDto, user);
  }

  @Get()
  getCommentList(@Query('articleID') articleID: string) {
    return this.commentService.getCommentList(articleID);
  }

  @Delete()
  @UseGuards(AuthGuard())
  deleteComment(@Body() deleteDto: DeleteDto): Promise<void> {
    return this.commentService.deleteComment(deleteDto);
  }
}
