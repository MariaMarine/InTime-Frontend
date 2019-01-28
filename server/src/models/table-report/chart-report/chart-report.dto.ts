import { IsString, IsNumber, IsOptional } from 'class-validator';
import { StartDateDTO } from './start-date.dto';
import { StartDate } from 'src/data/entities/start-date.entity';
import { Device } from 'src/data/entities/device.entity';

export class ChartReportDTO {

    @IsOptional()
    id: string;

    @IsString()
    name: string;

    origin: Device;
    destination: Device;

    @IsNumber()
    periodInMilliseconds: number;

    startDates: number[];
}
