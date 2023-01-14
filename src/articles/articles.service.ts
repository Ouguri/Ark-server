import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { SearchArticleDto } from './dto/search-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import * as moment from 'moment';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private readonly article: Repository<Article>,
  ) {}

  // 新建文章
  async create(
    createArticleDto: CreateArticleDto,
    user: User,
  ): Promise<Article> {
    const {
      title,
      content,
      topic,
      date = moment().format('YYYY-MM-DD HH:mm:ss'),
    } = createArticleDto;

    const newArticle = this.article.create({
      title,
      content,
      topic,
      goods: 0,
      watchData: 0,
      commentData: 0,
      date,
      user,
    });

    await this.article.save(newArticle);
    return newArticle;
  }

  // 找一篇文章
  async findOne(id: string): Promise<Article> {
    if (id) {
      const query = await this.article.createQueryBuilder('Article');
      const found = await query
        .leftJoinAndSelect('Article.user', 'user')
        .andWhere('Article.id = :id', { id })
        .getOne();

      if (found) return found;
      else throw new NotFoundException(`找不到该文章`);
    } else throw new NotFoundException(`404 NOT FOUND`);
  }

  // 搜索文章
  async findAllArticle(searchDto: SearchArticleDto): Promise<Article[]> {
    const { content, topic } = searchDto;

    const query = await this.article.createQueryBuilder('Article'); // 填入实体名字

    query.leftJoinAndSelect('Article.user', 'user');
    if (content) {
      query.andWhere(
        'Article.title LIKE :content OR Article.content LIKE :content',
        { content: `%${content}%` },
      );
    }

    if (topic) {
      query.andWhere('Article.topic = :topic', { topic });
    }
    const articles = await query.getMany();
    return articles;
  }

  // 更新文章
  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const foundArticle = await this.findOne(id);

    if (foundArticle) {
      const { title, content, topic, goods, watchData, commentData } =
        updateArticleDto;
      foundArticle.title = title;
      foundArticle.content = content;
      foundArticle.topic = topic;
      foundArticle.goods = goods;
      foundArticle.watchData = watchData;
      foundArticle.commentData = commentData;
      await this.article.save(foundArticle);
      return foundArticle;
    }
    return;
  }

  // 删除文章
  async remove(id: string, user: User): Promise<void> {
    await this.article.delete({ id, user });
    return;
  }
}
