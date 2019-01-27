import { ChartReport } from './chart-report.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { TableReport } from './table-report.entity';
import { User } from './user.entity';

@Entity({ name: 'devices' })
export class Device {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    longitude: string;

    @Column()
    latitude: string;

    @JoinTable({ name: 'devices_table_reports' })
    @ManyToMany(type => TableReport, tableReport => tableReport.devices)
    tableReports: TableReport[];

    @ManyToMany(type => User, user => user.devices)
    users: User[];

    @OneToMany(type => ChartReport, chartreport => chartreport.origin)
    origins: ChartReport[];

    @OneToMany(type => ChartReport, chartreport => chartreport.destination)
    destinations: ChartReport[];
}
