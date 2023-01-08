import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { REJISTEROPTION } from '../.config/secret.config';
import { JwtStrategy } from './dto/jwt.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

// extname 可以截取文件原始名称（.jpg，.png）

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 目录存放位置
        destination: join(__dirname, '../images'),
        filename: (_, file, callback) => {
          const fileName = `${
            new Date().getTime() + extname(file.originalname)
          }`;
          return callback(null, fileName);
        },
      }),
    }),
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
