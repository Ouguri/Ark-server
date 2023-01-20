import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SearchArticleDto {
  content?: string;

  topic?: string;

  take: number;

  skip: number;
}
