import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import * as moment from 'moment';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly comment: Repository<Comment>,
  ) {}
  async addComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const {
      content,
      topic_type,
      title,
      articleID,
      date = moment().format('YYYY-MM-DD HH:mm:ss'),
    } = createCommentDto;

    const aComment = this.comment.create({
      content,
      topic_type,
      title,
      articleID,
      date,
    });

    await this.comment.save(aComment);

    return aComment;
  }

  async deleteComment(id: number): Promise<void> {
    await this.comment.delete(id);
    return;
  }
}
