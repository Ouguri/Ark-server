import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Like, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { SearchArticleDto } from './dto/search-article.dto';
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

  async findOne(id: string, user: User): Promise<Article> {
    if (id) {
      const found = await this.article.findOneBy({ user, id });

      if (found) return found;
      else throw new NotFoundException(`找不到该文章`);
    } else throw new NotFoundException(`404 NOT FOUND`);
  }

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

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
    user: User,
  ): Promise<Article> {
    const foundArticle = await this.findOne(id, user);

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

  async remove(id: string, user: User): Promise<void> {
    await this.article.delete({ id, user });
    return;
  }
}
