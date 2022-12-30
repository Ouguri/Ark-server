import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateArticleDto {
  title: string;

  content: string;

  topic: string;
}
