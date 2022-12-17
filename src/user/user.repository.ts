import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

export class UserRepository extends Repository<User> {
  // 创建用户
  async createUser(CreateUserDto: CreateUserDto): Promise<void> {
    const { username, password } = CreateUserDto;

    const user = this.create({ username, password });

    await this.save(user);
  }
}
