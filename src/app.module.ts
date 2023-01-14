import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './common/database/database.module';
import { ArticlesModule } from './articles/articles.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [UserModule, DatabaseModule, ArticlesModule, CommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
