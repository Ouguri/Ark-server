import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto, DeleteDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import * as moment from 'moment';
import { User } from 'src/user/entities/user.entity';
import { ArticlesService } from 'src/articles/articles.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly comment: Repository<Comment>,
    private ArticlesService: ArticlesService,
  ) {}
  async addComment(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const {
      content,
      topic_type,
      articleID,
      to_uid,
      to_username,
      date = moment().format('YYYY-MM-DD HH:mm:ss'),
    } = createCommentDto;

    const aComment = this.comment.create({
      content,
      topic_type,
      articleID,
      date,
      to_uid,
      to_username,
      user,
    });

    await this.comment.save(aComment);

    await this.ArticlesService.update(articleID, { commentData: 1 });

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

  async replyAndGood(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<any> {
    const found = await this.comment.findOneBy({ id: createCommentDto.id });
    if (createCommentDto.to_uid) {
      await this.addComment(createCommentDto, user);
      found.reply += 1;
      await this.comment.save(found);
    }
    if (createCommentDto.goods) {
      found.goods += 1;
      await this.comment.save(found);
    }
  }

  async deleteComment(deleteDto: DeleteDto): Promise<void> {
    const { id, articleID } = deleteDto;
    if (!Array.isArray(id)) {
      await this.comment.delete(id);
      await this.ArticlesService.update(articleID, { commentData: -1 });
    } else {
      id.forEach(async (el) => {
        await this.comment.delete(el);
      });
      await this.ArticlesService.update(articleID, {
        commentData: -id.length,
      });
    }
    return;
  }
}
