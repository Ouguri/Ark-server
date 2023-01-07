import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

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

  @Get('/:username')
  findOne(@Param('username') username: string): Promise<User> {
    return this.userService.findid(username);
  }

  @Delete('/:username')
  remove(@Param('username') username: string) {
    return this.userService.delete(username);
  }
}
