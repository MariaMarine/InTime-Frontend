
import { IsString, Length, IsOptional } from 'class-validator';

export class CreateDeviceDTO {
    @IsString()
    @Length(3, 100)
    readonly name: string;
    @IsString()
    @Length(3, 100)
    readonly longitude: string;
    @IsString()
    @Length(3, 100)
    readonly latitude: string;

}
