import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8, { message: `长度不能小于8` })
  @MaxLength(32)
  @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}/, {
    message: '密码至少包含一个大写字母和一个特殊字符',
  })
  password: string;

  // 0 普通 1 超级管理员
  superAdmin?: number;

  avatar?: string;

  level: number;

  createDate: Date;

  exp: number;

  followers?: number;
}
