import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
// FileInterceptor：上传单个文件；FilesInterceptor：上传多个文件
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.signUp(createUserDto);
  }

  @Post('signin')
  signIn(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    return this.userService.signIn(createUserDto);
  }

  @Post('avatar/:username')
  @UseInterceptors(FileInterceptor('file')) // 处理文件的中间件
  async uploadAvatar(
    @UploadedFile() file,
    @Param() username: string,
  ): Promise<string> {
    const res = await this.userService.saveAvatar(file.filename, username);

    if (res == '保存成功') return file.filename;
    return '保存失败，请稍后重试！';
  }

  @Get('/:username')
  findOne(@Param('username') username: string): Promise<User> {
    return this.userService.findid(username);
  }

  @Delete('/:username')
  remove(@Param('username') username: string) {
    return this.userService.delete(username);
  }
}
