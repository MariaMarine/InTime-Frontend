import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { IsDate } from 'class-validator';
import { StartDate } from './start-date.entity';
import { TableReport } from './table-report.entity';
import { User } from './user.entity';

@Entity({ name: 'chart_reports' })
export class ChartReport {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    @Column()
    origin: string;
    @Column()
    destination: string;

    @Column('bigint')
    periodInMilliseconds: number;

    @ManyToOne(type => User, user => user.chartReports)
    user: User;

    @OneToMany(type => StartDate, startDate => startDate.chartReport, {eager: true})
    startDates: StartDate[];
}
