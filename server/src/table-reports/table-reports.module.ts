import { User } from './../data/entities/user.entity';
import { StartDate } from './../data/entities/start-date.entity';
import { ChartReport } from 'src/data/entities/chart-report.entity';
import { TableReportsService } from './table-reports.service';
import { AuthModule } from '../auth/auth.module';
import { CoreModule } from '../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, HttpModule } from '@nestjs/common';
import { TableReportsController } from './table-reports.controller';
import { TableReport } from '../data/entities/table-report.entity';
import { Device } from '../data/entities/device.entity';
import { ApiService } from './api.service';
import { ChartReportsService } from './chart-reports/chart-reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([TableReport, Device, ChartReport, StartDate, User]), CoreModule, AuthModule, HttpModule],
  providers: [TableReportsService, ApiService, ChartReportsService],
  exports: [],
  controllers: [TableReportsController],
})
export class TableReportsModule { }
