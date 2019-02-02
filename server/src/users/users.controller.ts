import { UserPasswordDTO } from './../models/user/user-password.dto';
import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Request, Post, Body, ValidationPipe, HttpException, HttpStatus, Delete, Put, Param } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { UserRegisterDTO } from 'src/models/user/user-register.dto';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @UseGuards(AuthGuard(), AdminGuard)
  all(@Request() req) {
    return this.usersService.getAll(req.user);
  }

  @Post()
  @UseGuards(AuthGuard(), AdminGuard)
  async addUser(@Request() req,
                @Body(new ValidationPipe({

      transform: true,
      whitelist: true,
    }))
    user: UserRegisterDTO,
  ): Promise<string> {
    try {
      await this.usersService.addUser(user, req.user);
      return JSON.stringify('User added!');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), AdminGuard)
  async delete(@Request() req, @Param('id') id: string): Promise<string> {

    try {
      await this.usersService.deleteUser(id, req.user);
      return JSON.stringify('User deleted!');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Put()
  @UseGuards(AuthGuard())
  async changePassword(@Request() req,
                       @Body(new ValidationPipe({
      transform: true,
      whitelist: true,
    }))
    user: UserPasswordDTO): Promise<string> {
      console.log(user);
    try {
      await this.usersService.changePassword(user, req);
      return JSON.stringify('Password successfully changed');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
}
