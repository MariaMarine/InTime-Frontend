import { StartDateDTO } from './../../models/table-report/chart-report/start-date.dto';
import { UpdateChartReportDTO } from './../../models/table-report/chart-report/update-chart-report.dto';
import { StartDate } from './../../data/entities/start-date.entity';
import { ChartReportDTO } from './../../models/table-report/chart-report/chart-report.dto';
import { TableReportsService } from './../table-reports.service';
import { ChartReport } from 'src/data/entities/chart-report.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { TableReport } from '../../data/entities/table-report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../data/entities/user.entity';

@Injectable()
export class ChartReportsService {
    constructor(
        @InjectRepository(ChartReport)
        private readonly chartRepository: Repository<ChartReport>,
        @InjectRepository(StartDate)
        private readonly startDateRepository: Repository<StartDate>,
        private readonly tableReportsService: TableReportsService,
    ) { }
    async createChartReport(tableReportId: string, chartReportDTO: ChartReportDTO): Promise<string> {
        const tableReport: TableReport = await this.tableReportsService.getTableReportById(tableReportId);

        if (!tableReport) {
            throw new Error(`No table report with id "${tableReportId}" found in database.`);
        }
        if (!tableReport.chartReports.length) {
            const startDates: StartDate[] = await Promise.all(chartReportDTO.startDates.map(async (startDate) => {
                const dateFound: StartDate = await this.startDateRepository.findOne({ where: { dateInMilliseconds: startDate } });
                if (!dateFound) {
                    const newStartDate: StartDate = new StartDate();
                    newStartDate.dateInMilliseconds = startDate;
                    await this.startDateRepository.create(newStartDate);
                    return await this.startDateRepository.save(newStartDate);
                }
                return dateFound;
            }));
            const chartReport: ChartReport = await this.chartRepository.create(chartReportDTO);
            chartReport.tableReport = tableReport;
            chartReport.startDates = startDates;
            tableReport.chartReports = [await this.chartRepository.save(chartReport)];
        } else {
            const chartReportNames: string[] = tableReport.chartReports.map(x => x.name);
            if (chartReportNames.includes(chartReportDTO.name)) {
                throw new BadRequestException(`Chart report with name "${chartReportDTO.name}" already exists for this table report.`);
            } else {
                const startDates: StartDate[] = await Promise.all(chartReportDTO.startDates.map(async (startDate) => {
                    const dateFound: StartDate = await this.startDateRepository.findOne({ where: { dateInMilliseconds: startDate } });
                    if (!dateFound) {
                        const newStartDate: StartDate = new StartDate();
                        newStartDate.dateInMilliseconds = startDate;
                        await this.startDateRepository.create(newStartDate);
                        return await this.startDateRepository.save(newStartDate);
                    }
                    return dateFound;
                }));
                const chartReport: ChartReport = await this.chartRepository.create(chartReportDTO);
                chartReport.tableReport = tableReport;
                chartReport.startDates = startDates;
                tableReport.chartReports = [...tableReport.chartReports, await this.chartRepository.save(chartReport)];
            }
        }
        return 'new chart created';
    }
    async updateChartReport(user: User, tableReportId: string, chartReportId: string, updateChartReportDTO: UpdateChartReportDTO): Promise<string> {
        const table: TableReport = await this.tableReportsService.getTableReportById(tableReportId);

        if (!table) {
            throw new Error(`No table report with id "${tableReportId}" found in database.`);
        }

        // this.tableReportsService.confirmCurrentUser(user, table.user);

        const chartToUpdate: ChartReport = await this.chartRepository.findOne({ where: { id: chartReportId } });

        if (!chartToUpdate) {
            throw new Error(`Action not permitted! You have no chart with id "${chartReportId}".`);
        }
        let dates: StartDate[];
        if (updateChartReportDTO.startDates.length) {
            dates = await Promise.all(updateChartReportDTO.startDates.map(async (number) => {
                const dateFound: StartDate = await this.startDateRepository.findOne({ where: { dateInMilliseconds: number } });

                if (!dateFound) {

                    const newStartDate: StartDate = new StartDate();
                    newStartDate.dateInMilliseconds = number;
                    await this.startDateRepository.create(newStartDate);
                    return await this.startDateRepository.save(newStartDate);
                }
                return dateFound;
            }));
        }

        chartToUpdate.name = updateChartReportDTO.name;
        chartToUpdate.periodInMilliseconds = updateChartReportDTO.periodInMilliseconds;
        chartToUpdate.startDates = dates;
        // console.log(chartToUpdate);

        await this.chartRepository.create(chartToUpdate);
        await this.chartRepository.save(chartToUpdate);

        return `Chart table report with id "${chartReportId}" was successfully updated.`;
    }

    async deleteChartReportById(user: User, tableReportId: string, chartReportId: string): Promise<string> {
        const table: TableReport = await this.tableReportsService.getTableReportById(tableReportId);

        this.tableReportsService.confirmCurrentUser(user, table.user);

        const chartToDelete: ChartReport = await this.chartRepository.findOne({ where: { id: chartReportId } });

        if (!chartToDelete) {
            throw new Error(`Action not permitted! You have no chart with id "${chartReportId}".`);
        }

        await this.chartRepository.delete(chartReportId);

        return `Chart report with id "${chartReportId}" was successfully deleted.`;
    }
}