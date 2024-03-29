import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ArticlesModule } from 'src/articles/articles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule, ArticlesModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
