
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
import { start } from 'repl';

@Injectable()
export class ChartReportsService {
    constructor(
        @InjectRepository(ChartReport)
        private readonly chartRepository: Repository<ChartReport>,
        @InjectRepository(StartDate)
        private readonly startDateRepository: Repository<StartDate>,
        private readonly tableReportsService: TableReportsService,
    ) { }

    async getChartReports(req): Promise<ChartReport[]> {
        return await this.chartRepository.find({ where: { user: req.user }});
    }
    async createChartReport(chartReportDTO: ChartReportDTO, user: User): Promise<string> {
        const chart = new ChartReport();
        const reports = await this.chartRepository.find({where: { user }});
        const reportNames = reports.map (x => x.name);
        if (reportNames.indexOf(chartReportDTO.name) > -1) {
            throw new Error(`Report name already exists!`);
        } else {
            chart.name = chartReportDTO.name;
            chart.origin = chartReportDTO.origin;
            chart.destination = chartReportDTO.destination;
            chart.periodInMilliseconds = chartReportDTO.periodInMilliseconds;

            chart.user = user;
            const startDates = [];
            chartReportDTO.startDates.forEach(date => {
            const startDate = new StartDate();
            startDate.dateInMilliseconds = date;
            startDates.push(startDate);
            });
            await this.startDateRepository.create([...startDates]);
            const result = await this.startDateRepository.save([...startDates]);
            chart.startDates = result;
            await this.chartRepository.create(chart);
            const result2 = await this.chartRepository.save(chart);
        }
        return 'new chart created';
    }

    async updateChartReport(user: User, updateChartReportDTO: ChartReportDTO): Promise<string> {

        const chartToUpdate: ChartReport = await this.chartRepository.findOne({ where: { updateChartReportDTO } });
        console.log(chartToUpdate);
        if (!chartToUpdate) {
            throw new Error(`Chart not found!`);
        }
        /*
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
        */
        chartToUpdate.origin = updateChartReportDTO.origin;
        chartToUpdate.destination = updateChartReportDTO.destination;
        chartToUpdate.name = updateChartReportDTO.name;
        chartToUpdate.periodInMilliseconds = updateChartReportDTO.periodInMilliseconds;
        // chartToUpdate.startDates = updateChartReportDTO.startDates;
        // console.log(chartToUpdate);

        await this.chartRepository.create(chartToUpdate);
        await this.chartRepository.save(chartToUpdate);

        return JSON.stringify(`Chart table report successfully updated.`);
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