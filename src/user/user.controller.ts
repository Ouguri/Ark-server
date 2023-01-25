import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import {
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
// FileInterceptor：上传单个文件；FilesInterceptor：上传多个文件
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { AuthGuard } from '@nestjs/passport';

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
  ): Promise<{ accessToken: string; user: User }> {
    return this.userService.signIn(createUserDto);
  }

  @Post('avatar/:username')
  @UseInterceptors(FileInterceptor('file')) // 处理文件的中间件
  // @UseGuards(AuthGuard())
  async uploadAvatar(
    @UploadedFile() file,
    @Param('username') username: string,
  ): Promise<string> {
    return this.userService.saveAvatar(file.filename, username);
  }

  @Get('/:username')
  // @UseGuards(AuthGuard())
  findOne(@Param('username') username: string): Promise<User> {
    return this.userService.findByUsername(username);
  }

  @Delete('/:username')
  @UseGuards(AuthGuard())
  remove(@Param('username') username: string) {
    return this.userService.delete(username);
  }
}
