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

  @Column({ type: 'text' })
  content: string;

  @Column()
  goods: number;

  @Column()
  date: Date;

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
