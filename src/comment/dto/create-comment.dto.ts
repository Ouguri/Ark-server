export class CreateCommentDto {
  content: string;

  to_uid?: string;

  topic_type: string;

  articleID: string;

  date: Date;
}

export class DeleteDto {
  articleID: string;
  id: string & string[];
}
