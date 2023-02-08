import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Follows {
  @PrimaryGeneratedColumn()
  followIndex: number;

  @Column()
  username: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne((_type) => User, (user) => user.follows, { eager: false })
  user: User;
}
