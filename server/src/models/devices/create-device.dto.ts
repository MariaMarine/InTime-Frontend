
import { IsString, Length, IsOptional, IsNumberString } from 'class-validator';

export class CreateDeviceDTO {
    @IsString()
    @Length(1, 20)
    readonly name: string;
    @IsNumberString()
    @Length(1, 10)
    readonly longitude: string;
    @IsNumberString()
    @Length(1, 10)
    readonly latitude: string;

}
