import { IsString } from 'class-validator';

export class UserPasswordDTO {

    @IsString()
    oldPassword: string;

    @IsString()
    newPassword: string;
}