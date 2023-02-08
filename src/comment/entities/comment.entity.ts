import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// 评论表
@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  topic_type: string;

  @Column()
  content: string;

  @Column()
  articleID: string;

  @Column()
  date: Date;

  @Column({ default: 0 })
  goods: number;

  @Column({ default: 0 })
  reply: number;

  @Column({ nullable: true })
  to_uid: string;

  @Column({ nullable: true })
  to_username: string;

  @ManyToOne((_type) => User, (user) => user.comments, { eager: false })
  user: User;
}
