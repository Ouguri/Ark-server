import { Article } from 'src/articles/entities/article.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  level: number;

  @OneToMany((_type) => Article, (article) => article.user, { eager: true })
  articles: Article[];
}
