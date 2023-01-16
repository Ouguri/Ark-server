import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import * as moment from 'moment';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly comment: Repository<Comment>,
  ) {}
  async addComment(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const {
      content,
      topic_type,
      articleID,
      date = moment().format('YYYY-MM-DD HH:mm:ss'),
      to_uid = 'empty',
    } = createCommentDto;

    const aComment = this.comment.create({
      content,
      topic_type,
      articleID,
      date,
      to_uid,
      user,
    });

    await this.comment.save(aComment);

    return aComment;
  }

  async getCommentList(articleID: string): Promise<Comment[]> {
    const query = await this.comment.createQueryBuilder('Comment');

    query.leftJoinAndSelect('Comment.user', 'user');

    if (articleID) {
      query.andWhere('Comment.articleID = :articleID', { articleID });
    }

    const commentList = await query.getMany();
    return commentList;
  }

  async deleteComment(id: number): Promise<void> {
    await this.comment.delete(id);
    return;
  }
}
