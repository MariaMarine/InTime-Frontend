
import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateDeviceDTO {
    @IsString()
    @Length(3, 100)
    @IsOptional()
    readonly name: string;

    @IsString()
    @Length(3, 100)
    @IsOptional()
    readonly longitude: string;

    @IsString()
    @Length(3, 100)
    @IsOptional()
    readonly latitude: string;

}