export class CreateCommentDto {
  content: string;

  to_uid?: string;

  topic_type: string;

  articleID: string;

  date: Date;
}
