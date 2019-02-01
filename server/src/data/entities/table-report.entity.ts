import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, OneToMany, ManyToOne } from 'typeorm';
import { IsDate, IsString, IsNumber, IsOptional } from 'class-validator';
import { Device } from './device.entity';
import { User } from './user.entity';
import { ChartReport } from './chart-report.entity';

@Entity({ name: 'table_reports' })
export class TableReport {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsString()
    name: string;

    @Column('bigint')
    @IsDate()
    startDateInMilliseconds: number;

    @Column('bigint')
    @IsDate()
    endDateInMilliseconds: number;

    @Column()
    @IsNumber()
    @IsOptional()
    period: number;

    @ManyToMany(type => Device, device => device.tableReports, {
        eager: true,
    })
    devices: Device[];

    @ManyToOne(type => User, user => user.tableReports)
    user: User;

    @Column('json', { default: null })
    @IsOptional()
    minMaxValues?: string;

}

