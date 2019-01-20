import { AuthModule } from './../auth/auth.module';
import { CoreModule } from './../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DevicesController } from './devices.controller';
import { Device } from 'src/data/entities/device.entity';
import { DevicesService } from './devices.service';
import { User } from 'src/data/entities/user.entity';
import { TableReport } from 'src/data/entities/table-report.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Device]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([TableReport])],
    providers: [DevicesService],
    exports: [],
    controllers: [DevicesController],
})
export class DevicesModule { }
