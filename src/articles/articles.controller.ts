import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { Param, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/user/get-user.decorator';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Controller('articles')
@UseGuards(AuthGuard())
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @GetUser() user: User,
  ): Promise<Article> {
    return await this.articlesService.create(createArticleDto, user);
  }

  @Get(':id')
  getArticle(@Param('id') articleId: string): Promise<Article> {
    return this.articlesService.findOne(articleId);
  }

  @Patch('/:id/title')
  update(
    @Param('id') articleId: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articlesService.update(articleId, updateArticleDto);
  }

  @Delete(':id')
  remove(@Body() articleId: string): Promise<void> {
    return this.articlesService.remove(articleId);
  }
}
