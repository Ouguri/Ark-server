import { Exclude } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  @JoinColumn({ name: 'user_id' })
  user: User;
}
