import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private readonly article: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<string> {
    const { title, content, topic } = createArticleDto;
    const article = this.article.create({
      title,
      content,
      topic: topic.join(','),
    });

    await this.article.save(article);
    return '成功创建';
  }

  async findOne(articleID): Promise<Article> {
    const found = await this.article.findOne(articleID);
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
      // this.article.update(
      //   {
      //     title,
      //     content,
      //     topic: topic.join(),
      //   },
      //   updateArticleDto,
      // );
      foundArticle.title = title;
      foundArticle.content = content;
      foundArticle.topic = topic.join(',');
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
