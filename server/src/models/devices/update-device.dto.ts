
import { IsString, Length, IsOptional, IsNumberString } from 'class-validator';

export class UpdateDeviceDTO {
    @IsString()
    @Length(1, 20)
    @IsOptional()
    readonly name: string;

    @IsNumberString()
    @Length(1, 10)
    @IsOptional()
    readonly longitude: string;

    @IsNumberString()
    @Length(1, 10)
    @IsOptional()
    readonly latitude: string;

}