import { UpdateDeviceDTO } from './../models/devices/update-device.dto';
import { CreateDeviceDTO } from '../models/devices/create-device.dto';
import { Injectable, BadRequestException, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'src/data/entities/device.entity';
import { User } from 'src/data/entities/user.entity';
import { TableReport } from 'src/data/entities/table-report.entity';

@Injectable()
export class DevicesService {
    constructor(
        @InjectRepository(Device)
        private readonly devicesRepository: Repository<Device>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(TableReport)
        private readonly tableReportsRepository: Repository<TableReport>) { }

    async create(user: User, device: CreateDeviceDTO): Promise<Device> {
        if (!user.isAdmin) {
            throw new BadRequestException('UnAuthorized!');
        }
        const devicesFoundByName = await this.devicesRepository.find(
            { relations: ['users'],
            where: { name: device.name },
        });
        const deviceUserIds = devicesFoundByName.map(x => x.users[0].id);
        if (deviceUserIds.indexOf(user.id) > -1) {
            throw new BadRequestException('You have already created a device with this name!');
        }

        const createdDevice = new Device();
        createdDevice.name = device.name;
        createdDevice.longitude = device.longitude;
        createdDevice.latitude = device.latitude;
        createdDevice.users = [user];
        await this.devicesRepository.create(createdDevice);
        await this.devicesRepository.save([createdDevice]);

        return createdDevice;
    }

    async findAll(req): Promise<Device[]> {
        const user = await this.usersRepository.findOne(
        { relations: [ 'adminUser'],
            where: { id: req.user.id },
    });

        const admin = await this.usersRepository.findOne(
            { relations: ['devices'],
            where: { id: user.adminUser.id },
    });
        const devices = admin.devices;
        return devices;
    }

    async findOne(idDevice): Promise<Device> {
        const foundDevice = await this.foundDevice({ where: { id: idDevice } });

        if (!foundDevice) {
            throw new BadRequestException('This device does not exist!');
        }

        return foundDevice;
    }

    async update(user: User, idDevice: string, updateDeviceDTO: UpdateDeviceDTO): Promise<Device> {

        const deviceFoundById = await this.foundDevice({ where: { id: idDevice } });

        if (!deviceFoundById) {
            throw new BadRequestException('This device does not exist!');
        }

        const devicesFoundByName = await this.devicesRepository.find(
            { relations: ['users'],
            where: { name: updateDeviceDTO.name },
        });
        const deviceUserIds = devicesFoundByName.map(x => x.users[0].id);
        const deviceIds = devicesFoundByName.map(x => x.id);
        if (deviceUserIds.indexOf(user.id) > -1 && deviceIds.indexOf(idDevice) < 0) {
            throw new BadRequestException('You have already created a device with this name!');
        }
        if (updateDeviceDTO.name) {
            deviceFoundById.name = updateDeviceDTO.name;
        }

        if (updateDeviceDTO.longitude) {
            deviceFoundById.longitude = updateDeviceDTO.longitude;
        }

        if (updateDeviceDTO.latitude) {
            deviceFoundById.latitude = updateDeviceDTO.latitude;
        }

        await this.devicesRepository.update(idDevice, deviceFoundById);
        await this.devicesRepository.save(deviceFoundById);

        return deviceFoundById;
    }
    async remove(idDevice): Promise<Device> {

        const deviceFoundById = await this.foundDevice({ where: { id: idDevice } });

        if (!deviceFoundById) {
            throw new BadRequestException('Such device does not exist!');
        }

        await this.devicesRepository.delete(idDevice);

        return deviceFoundById;
    }
    // Helper Method
    private async foundDevice(query: object) {

        return await this.devicesRepository.findOne(query);
    }
}