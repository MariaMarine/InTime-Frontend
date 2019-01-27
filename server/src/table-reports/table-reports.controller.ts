import { ChartReportDTO } from './../models/table-report/chart-report/chart-report.dto';
import { ChartReportsService } from './chart-reports/chart-reports.service';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Post, Request, Body, Put, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TableReportsService } from './table-reports.service';
import { TableReport } from '../data/entities/table-report.entity';
import { CreateTableReportDTO } from '../models/table-report/create-table-report.dto';
import { UpdateTableReportDTO } from '../models/table-report/update-table-report.dto';
import { ApiService } from './api.service';
import { ChartReport } from 'src/data/entities/chart-report.entity';
import { UpdateChartReportDTO } from '../models/table-report/chart-report/update-chart-report.dto';

@Controller()
export class TableReportsController {
  constructor(
    private readonly tableReportsService: TableReportsService,
    private readonly chartReportsService: ChartReportsService,
    private readonly apiService: ApiService,
  ) { }

  @Get('table-reports')
  @UseGuards(AuthGuard())
  async allTableReports(@Request() req): Promise<TableReport[]> {
    return await this.tableReportsService.getTableReports(req);
  }

  @Post('table-reports')
  @UseGuards(AuthGuard())
  async create(@Request() req, @Body() tableReportDTO: CreateTableReportDTO) {
    const tableReport = await this.tableReportsService.createTableReport(tableReportDTO, req.user);
    return await this.apiService.tableReport(tableReport);
  }

  @Put('table-reports/:id')
  @UseGuards(AuthGuard())
  async updateTableById(@Request() req, @Param('id') tableReportId, @Body() updateTableReportDTO: UpdateTableReportDTO): Promise<string> {
    return await this.tableReportsService.updateTableById(req.user, tableReportId, updateTableReportDTO);
  }

  @Delete('table-reports/:id')
  @UseGuards(AuthGuard())
  async deleteTableById(@Request() req, @Param('id') tableReportId): Promise<string> {
    return await this.tableReportsService.deleteTableById(req.user, tableReportId);
  }

  @Get('chart-reports')
  @UseGuards(AuthGuard())
  async allChartReports(@Request() req): Promise<ChartReport[]> {
    return await this.chartReportsService.getChartReports(req);
  }

  @Post('chart-reports')
  @UseGuards(AuthGuard())
  async createChartReport(@Request() req, @Body() chartReportDTO: ChartReportDTO): Promise<string> {
    try {
      await this.chartReportsService.createChartReport (chartReportDTO, req.user);
      return JSON.stringify(`Chart created`);
  } catch (error){
    throw new HttpException(error.message, HttpStatus.CONFLICT);
  }
}

  @Put('chart-reports/:chartReportId')
  @UseGuards(AuthGuard())
  async updateChartReportById(
    @Request() req,
    @Param() params: any,
    @Body() updateChartReportDTO: UpdateChartReportDTO): Promise<string> {
    return await this.chartReportsService.updateChartReport(req.user, params.tableReportId, params.chartReportId, updateChartReportDTO);
  }

  @Delete('chart-reports/:chartReportId')
  @UseGuards(AuthGuard())
  async deleteChartReportById(
    @Request() req,
    @Param() params): Promise<string> {
    return await this.chartReportsService.deleteChartReportById(req.user, params.tableReportId, params.chartReportId);
  }
}