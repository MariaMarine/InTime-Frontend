import { IsString, IsNumber } from 'class-validator';
import { StartDateDTO } from './start-date.dto';
import { StartDate } from 'src/data/entities/start-date.entity';

export class ChartReportDTO {
    @IsString()
    name: string;

    origin: string;
    destination: string;

    @IsNumber()
    periodInMilliseconds: number;

    startDates: number[];
}
