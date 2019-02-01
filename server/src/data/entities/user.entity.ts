import { MailService } from './../../mailer/mailer';
import { ChartReport } from './chart-report.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable, ManyToOne, OneToMany, AfterInsert } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Device } from './device.entity';
import { TableReport } from './table-report.entity';

@Entity({ name: 'users' })
export class User {

    @AfterInsert()
    mail(){
        const mailer = new MailService();
        mailer.mail(this.email);
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    isAdmin: boolean;

    @JoinTable({ name: 'users_devices' })
    @ManyToMany(type => Device, device => device.users)
    devices: Device[];

    @OneToMany(type => TableReport, tableReport => tableReport.user)
    tableReports: TableReport[];

    @OneToMany(type => ChartReport, chartReport => chartReport.user)
    chartReports: ChartReport[];

    @ManyToOne(type => User, admin => admin.users)
    adminUser: User;

    @OneToMany(type => User, user => user.adminUser)
    users: User[];
}
