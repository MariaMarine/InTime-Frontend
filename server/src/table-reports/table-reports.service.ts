import { UpdateTableReportDTO } from './../models/table-report/update-table-report.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { TableReport } from '../data/entities/table-report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Table } from 'typeorm';
import { CreateTableReportDTO } from '../models/table-report/create-table-report.dto';
import { User } from '../data/entities/user.entity';
import { Device } from '../data/entities/device.entity';
import { ChartReport } from 'src/data/entities/chart-report.entity';

@Injectable()
export class TableReportsService {
    constructor(
        @InjectRepository(TableReport)
        private readonly tableReportsRepository: Repository<TableReport>,
        @InjectRepository(Device)
        private readonly devicesRepository: Repository<Device>,
    ) { }

    async getTableReportById(tableId: string): Promise<TableReport> {

        return await this.tableReportsRepository.findOne({ where: { id: tableId } });
    }
    async getTableReports(): Promise<TableReport[]> {

        return await this.tableReportsRepository.find();
    }

    async confirmCurrentUser(userLogged, tableUser) {
        if (userLogged !== tableUser) {
            throw new Error('Action not permitted! This is not your table.');
        }
    }

    async createTableReport(tableReportDTO: CreateTableReportDTO, user: User): Promise<TableReport> {
        let endDate: number = Date.now();

        if (tableReportDTO.offset) {
            endDate -= ((tableReportDTO.offset.days * 24) + tableReportDTO.offset.hours) * 3600 * 1000;
        }

        const startDate: number = endDate - (tableReportDTO.period * 3600 * 1000);

        const devices: Device[] = await this.devicesRepository.find({ where: { name: In(tableReportDTO.deviceNames) } });

        const tableReport: TableReport = new TableReport();
        tableReport.name = tableReportDTO.name;
        tableReport.startDateInMilliseconds = startDate;
        tableReport.endDateInMilliseconds = endDate;
        tableReport.user = user;
        tableReport.devices = tableReport.devices ? [...tableReport.devices, ...devices] : [...devices];

        this.tableReportsRepository.create(tableReport);
        return await this.tableReportsRepository.save(tableReport);
    }

    async updateTableById(userLogged: User, tableId: string, updateTableReportDTO: UpdateTableReportDTO) {
        const tableToUpdate: TableReport = await this.getTableReportById(tableId);
        this.confirmCurrentUser(userLogged, tableToUpdate.user);

        if (!tableToUpdate) {
            throw new Error(`Action not permitted! You have no table with id "${tableId}".`);
        }
        let endDate: number = Date.now();

        if (updateTableReportDTO.name) {
            tableToUpdate.name = updateTableReportDTO.name;
        }
        if (updateTableReportDTO.period) {
            const startDate: number = endDate - (updateTableReportDTO.period * 3600 * 1000);
            tableToUpdate.startDateInMilliseconds = startDate;
        }
        if (updateTableReportDTO.offset) {
            endDate -= ((updateTableReportDTO.offset.days * 24) + updateTableReportDTO.offset.hours) * 3600 * 1000;
            tableToUpdate.endDateInMilliseconds = endDate;
        }
        if (updateTableReportDTO.deviceNames) {
            const devices: string[] = updateTableReportDTO.deviceNames;
            const devicesToPush: Device[] = [];
            await Promise.all(devices.map(async (deviceName) => {
                const deviceFound: Device = await this.devicesRepository.findOne({ where: { name: deviceName } });
                if (!deviceFound) {
                    throw new BadRequestException(`No device with name "${deviceName}" found in database.`);
                }
                devicesToPush.push(deviceFound);
            }));

            tableToUpdate.devices = devicesToPush;
        }
        await this.tableReportsRepository.update(tableId, tableToUpdate);
        await this.tableReportsRepository.save(tableToUpdate);

        return `Table report with id "${tableId}" was successfully updated.`;
    }

    async deleteTableById(userLogged, tableId) {
        const tableToDelete: TableReport = await this.tableReportsRepository.findOne({ where: { id: tableId, user: userLogged } });

        if (!tableToDelete) {
            throw new BadRequestException('Action not permitted! This user has no such table.');
        }
        await this.tableReportsRepository.delete(tableId);

        return `Table report with id "${tableId}" was successfully deleted.`;
    }
}