import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
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

  @Get(':id')
  findOne(@Param('id') user: User): Promise<User> {
    const { id } = user;

    return this.userService.findid(id);
  }

  @Delete(':username')
  remove(@Param('username') username: string) {
    // const { username } = user;

    return this.userService.delete(username);
  }
}
