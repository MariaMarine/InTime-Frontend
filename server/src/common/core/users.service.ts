import { UserPasswordDTO } from './../../models/user/user-password.dto';
import { GetUserDTO } from '../../models/user/get-user.dto';
import { UserLoginDTO } from '../../models/user/user-login.dto';
import { UserRegisterDTO } from '../../models/user/user-register.dto';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './../../data/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './../../interfaces/jwt-payload';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    ) { }

  async registerUser(user: UserRegisterDTO) {
    const userFound = await this.usersRepository.findOne({ where: { email: user.email } });
    if (userFound) {
      throw new Error('User already exists');
    }
    const newuser = new User();
    newuser.email = user.email;
    newuser.password = await bcrypt.hash(user.password, 10);
    newuser.isAdmin = true;
    await this.usersRepository.create(newuser);
    await this.usersRepository.save([newuser]);
    const userSaved = await this.usersRepository.findOne({ where: { email: newuser.email } });
    newuser.adminUser = userSaved;
    const result = await this.usersRepository.save([newuser]);

    return result;
  }

  async validateUser(payload: JwtPayload): Promise<GetUserDTO> {
    const userFound: any = await this.usersRepository.findOne({ where: { email: payload.email } });
    return userFound;
  }

  async signIn(user: UserLoginDTO): Promise<GetUserDTO> {
    const userFound: GetUserDTO = await this.usersRepository.findOne({ select: ['email', 'isAdmin', 'password'], where: { email: user.email } });

    if (userFound) {
      const result = await bcrypt.compare(user.password, userFound.password);
      if (result) {
        return userFound;
      }
    }

    return null;
  }

  async getAll(admin: User) {
    return await this.usersRepository.find({ where: { adminUser: admin, isAdmin: 0 } });
  }

  async addUser(user: UserRegisterDTO, admin: User) {
    const userFound = await this.usersRepository.findOne({ where: { email: user.email } });
    if (userFound) {
      throw new Error('User already exists');
    }
    const newuser = new User();
    newuser.email = user.email;
    newuser.password = await bcrypt.hash(user.password, 10);
    newuser.adminUser = admin;
    await this.usersRepository.create(newuser);
    const result = await this.usersRepository.save([newuser]);
    return result;
  }

  async deleteUser(id, user): Promise<any> {
    const userFound = await this.usersRepository
            .findOne({ where: { id, adminUser: user } });
    if (!userFound) {
      throw new Error('User doesnt exists');
    }
    if (userFound.isAdmin) {
      userFound.adminUser = null;
      await this.usersRepository.save(userFound);
    }
    await this.usersRepository.delete(userFound);

  }

  async changePassword(user: UserPasswordDTO, req): Promise<any> {
    const loggedUserId = req.user.id;

    const userFound = await this.usersRepository
    .findOne({ where: { id: loggedUserId } });

    const result = await bcrypt.compare(user.oldPassword, userFound.password);

    if (result) {
      userFound.password = await bcrypt.hash(user.newPassword, 10);
    }
    else {
      throw new Error('password doesnt match');
    }

    await this.usersRepository.update(loggedUserId, userFound);

  }
}
