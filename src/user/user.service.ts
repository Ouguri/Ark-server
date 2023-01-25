import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { JwtPayload } from './dto/jwt-payload.interface';
// const moment = require('moment');
import * as moment from 'moment';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>, // @InjectRepository(UserRepository) // private UserRespository: UserRepository,
    private jwtService: JwtService, // 注入 jwt 服务
  ) {}
  async signUp(createUserDto: CreateUserDto): Promise<void> {
    const {
      username,
      password,
      level = 1,
      superAdmin,
      avatar = 'empty',
      createDate = moment().format('YYYY-MM-DD HH:mm:ss'),
    } = createUserDto;

    // hash
    const salt = await bcrypt.genSalt(); // 生成哈希？
    const hashedPassword = await bcrypt.hash(password, salt); // 生成加入哈希的密码

    const user = this.user.create({
      username,
      password: hashedPassword,
      level,
      superAdmin,
      avatar,
      createDate,
    });
    try {
      await this.user.save(user);
    } catch (error) {
      if (error.sqlState === '23000') {
        throw new ConflictException(`重复的用户名`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string; user: User }> {
    const { username, password } = createUserDto;
    const user = await this.user.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username }; // 制成有效载荷，需要用作签署 token
      const accessToken: string = await this.jwtService.sign(payload); // 签署一个 token
      return {
        user,
        accessToken,
      };
    } else {
      throw new UnauthorizedException('用户名或密码错误！');
    }
  }

  async findByUsername(username: string): Promise<User> {
    const found = await this.user.findOneBy({ username });

    if (found) return found;
    else {
      throw new NotFoundException(`找不到该用户`);
    }
  }

  async update() {
    return;
  }

  async saveAvatar(avatar: string, username: string): Promise<string> {
    const found = await this.findByUsername(username);

    if (found) {
      found.avatar = avatar;
      await this.user.save(found);
      return found.avatar;
    } else {
      return `上传失败`;
    }
  }

  async delete(username: string): Promise<void> {
    try {
      await this.user.delete(username);
    } catch (error) {
      console.log(error);
    }
  }
}
