import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { IsDate, IsNumber } from 'class-validator';
import { ChartReport } from './chart-report.entity';

@Entity({ name: 'start_dates' })
export class StartDate {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('bigint')
    @IsNumber()
    dateInMilliseconds: number;

    @ManyToOne(type => ChartReport, chartReport => chartReport.startDates)
    chartReport: ChartReport;
}
