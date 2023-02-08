export class CreateCommentDto {
  id?: string;

  goods?: number;

  reply?: number;

  content: string;

  to_uid?: string;

  to_username?: string;

  topic_type: string;

  articleID: string;

  date: Date;
}

export class DeleteDto {
  articleID: string;
  id: string & string[];
}
