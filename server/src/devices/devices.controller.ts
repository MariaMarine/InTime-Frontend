import { UpdateDeviceDTO } from './../models/devices/update-device.dto';

import { DevicesService } from './devices.service';
import { Controller, Body, UseGuards, Post, ValidationPipe, HttpException, HttpStatus, Get, Param, Delete, Put, Request } from '@nestjs/common';
import { CreateDeviceDTO } from 'src/models/devices/create-device.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { AdminGuard } from 'src/common/guards/roles/admin.guard';
import { Device } from 'src/data/entities/device.entity';
@Controller('devices')
export class DevicesController {

    constructor(
        private readonly devicesService: DevicesService,
    ) { }

    @Post()
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    async create(@Request() req, @Body(new ValidationPipe({
        whitelist: true,
        transform: true,
    })) createDeviceDTO: CreateDeviceDTO): Promise<Device> {

        if (Object.keys(createDeviceDTO).length === 0) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Device is not valid',
            }, 403);
        }

        try {
            return await this.devicesService.create(req.user, createDeviceDTO);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async  getAll(@Request() req): Promise<Device[]> {
        try {
            return await this.devicesService.findAll(req);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    async findOne(@Param('id') id: string): Promise<Device> {
        try {
            return await this.devicesService.findOne(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    async update(
        @Body(new ValidationPipe({
            whitelist: true,
            transform: true,
        })) updateDeviceDTO: UpdateDeviceDTO,
        @Param('id') id: string,
        @Request() req) {

        try {
            return await this.devicesService.update(req.user, id, updateDeviceDTO);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.CONFLICT);
        }

    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    async remove(@Param('id') id: string): Promise<Device> {

        try {
            return await this.devicesService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }

    }
}
