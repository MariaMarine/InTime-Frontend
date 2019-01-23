import { Device } from './deviceModel';

export class Table {
    name: string;
    devices: Device[];
    endDateInMilliseconds: string;
    startDateInMilliseconds: string;
}
