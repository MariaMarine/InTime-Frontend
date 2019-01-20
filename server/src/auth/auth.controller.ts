import { UserLoginDTO } from '../models/user/user-login.dto';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { UsersService } from '../common/core/users.service';
import {
  Controller, Post, Body, ValidationPipe, BadRequestException, HttpException, HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post('login')
  async sign(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) user: UserLoginDTO): Promise<string> {
    const token = await this.authService.signIn(user);
    if (!token) {
      throw new HttpException('Wrong credentials!', HttpStatus.NOT_FOUND);
    }

    return JSON.stringify(token);
  }

  @Post('register')
  async register(
    @Body(new ValidationPipe({
      transform: true,
      whitelist: true,
    }))
    user: UserRegisterDTO,
  ): Promise<string> {
    try {
      await this.usersService.registerUser(user);
      return JSON.stringify('Successful registration!');
  } catch (error) {
    throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
}