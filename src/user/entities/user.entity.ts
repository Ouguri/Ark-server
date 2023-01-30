import { Article } from 'src/articles/entities/article.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { Follows } from './follows.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  avatar: string;

  @Column()
  createDate: Date;

  @Column({ default: '0' })
  followers: number;

  @Column({ default: 'normal' })
  vip: string;

  @Column({ default: '1000-01-01 00:00:00' })
  VipEndDate: Date;

  @Column()
  level: number;

  @Column()
  superAdmin: number;

  @Column({ default: 0 })
  exp: number;

  @OneToMany((_type) => Article, (article) => article.user, { eager: true })
  articles: Article[];

  @OneToMany((_type) => Comment, (comments) => comments.user, { eager: true })
  comments: Comment[];

  @OneToMany((_type) => Follows, (follows) => follows.user, { eager: true })
  follows: Follows[];
}
