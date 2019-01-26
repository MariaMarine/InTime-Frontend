import { Device } from './deviceModel';

export class Table {

    id: string;
    name: string;
    devices: Device[];
    endDateInMilliseconds: number;
    startDateInMilliseconds: number;
}
