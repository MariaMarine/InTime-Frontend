import { IsString, IsOptional, IsNumber } from 'class-validator';
import { OffsetDTO } from './offset.dto';

export class UpdateTableReportDTO {
    @IsString()
    @IsOptional()
    name: string;

    @IsNumber()
    @IsOptional()
    period: number;

    @IsOptional()
    offset?: OffsetDTO;

    @IsOptional()
    deviceNames: string[];

    @IsString()
    @IsOptional()
    minMaxValues: string;
}
