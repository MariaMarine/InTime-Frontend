import { Column, PrimaryGeneratedColumn, Entity, ManyToMany } from 'typeorm';
import { IsDate, IsNumber } from 'class-validator';
import { ChartReport } from './chart-report.entity';

@Entity({ name: 'start_dates' })
export class StartDate {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('bigint', {default: null})
    @IsNumber()
    dateInMilliseconds: number;

    @ManyToMany(type => ChartReport, chartReport => chartReport.startDates)
    chartReports: ChartReport[];
}
