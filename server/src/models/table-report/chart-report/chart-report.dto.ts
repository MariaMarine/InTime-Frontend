import { IsString, IsNumber } from 'class-validator';
import { StartDateDTO } from './start-date.dto';

export class ChartReportDTO {
    @IsString()
    name: string;

    @IsNumber()
    periodInMilliseconds: number;

    startDates: number[];
}
