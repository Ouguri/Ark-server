import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import {
  Param,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/user/get-user.decorator';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { SearchArticleDto } from './dto/search-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @GetUser() user: User,
  ): Promise<Article> {
    return await this.articlesService.create(createArticleDto, user);
  }

  @Get('getone')
  getOneArticle(@Query('id') id: string): Promise<Article> {
    return this.articlesService.findOne(id);
  }

  @Get('search')
  getArticles(
    @Query() searchDto: SearchArticleDto,
  ): Promise<[Article[], number]> {
    return this.articlesService.findAllArticle(searchDto);
  }

  @Patch()
  @UseGuards(AuthGuard())
  update(
    @Query('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param() articleID: any, @GetUser() user: User): Promise<void> {
    return this.articlesService.remove(articleID.id, user);
  }

  @Get('personsearch')
  @UseGuards(AuthGuard())
  getArticlesTest(
    @Query() searchDto: SearchArticleDto,
    @GetUser() user: User,
  ): Promise<[Article[], number]> {
    return this.articlesService.getArticlesByPersonal(searchDto, user);
  }

  @Post('articleimgs')
  @UseInterceptors(FileInterceptor('file')) // 处理文件的中间件
  @UseGuards(AuthGuard())
  async uploadAvatar(@UploadedFile() file): Promise<string> {
    return file.filename;
  }
}
