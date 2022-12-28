import { User } from 'src/user/entities/user.entity';
import { Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Article {
  @PrimaryGeneratedColumn('uuid')
  articleID: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  goods: number;

  @Column()
  watchData: number;

  @Column()
  topic: string;

  @Column()
  commentData: number;

  @ManyToOne((_type) => User, (user) => user.articles, { eager: false })
  user: User;
}
