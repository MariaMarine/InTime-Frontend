import { StartDate } from './../../../data/entities/start-date.entity';
import { IsString, IsNumber } from 'class-validator';
import { StartDateDTO } from './start-date.dto';

export class UpdateChartReportDTO {
    @IsString()
    name: string;

    @IsNumber()
    periodInMilliseconds: number;

    startDates: number[];
}
