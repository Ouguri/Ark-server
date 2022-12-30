import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private readonly article: Repository<Article>,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    user: User,
  ): Promise<Article> {
    const { title, content, topic } = createArticleDto;

    const newArticle = this.article.create({
      title,
      content,
      topic,
      goods: 0,
      watchData: 0,
      commentData: 0,
      user,
    });

    await this.article.save(newArticle);
    return newArticle;
  }

  async findOne(articleID: string): Promise<Article> {
    const found = await this.article.findOneBy({
      id: articleID,
    });

    if (found) return found;
    else {
      throw new NotFoundException(`找不到该文章`);
    }
  }

  async update(
    articleID: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const foundArticle = await this.findOne(articleID);

    if (foundArticle) {
      const { title, content, topic } = updateArticleDto;
      foundArticle.title = title;
      foundArticle.content = content;
      foundArticle.topic = topic;
      await this.article.save(foundArticle);
      return foundArticle;
    }
    return;
  }

  async remove(articleId: string): Promise<void> {
    await this.article.delete(articleId);
    return;
  }
}
