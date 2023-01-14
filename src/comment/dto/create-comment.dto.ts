export class CreateCommentDto {
  content: string;

  to_uid?: string;

  topic_type: string;

  title: string;

  articleID: string;

  date: Date;
}
