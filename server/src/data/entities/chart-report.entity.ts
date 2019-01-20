import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { IsDate } from 'class-validator';
import { StartDate } from './start-date.entity';
import { TableReport } from './table-report.entity';

@Entity({ name: 'chart_reports' })
export class ChartReport {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('bigint')
    periodInMilliseconds: number;

    @ManyToOne(type => TableReport, tableReport => tableReport.chartReports, {
        onDelete: 'CASCADE',
    })
    tableReport: TableReport;

    @JoinTable({ name: 'chart_reports_start_dates' })
    @ManyToMany(type => StartDate, startDate => startDate.chartReports, {eager: true})
    startDates: StartDate[];
}
