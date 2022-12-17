import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { REJISTEROPTION } from '../.config/secret.config';
import { JwtStrategy } from './dto/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(REJISTEROPTION),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  // 暴露 jwt 策略和 令牌模块，让别的模块可以使用
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
