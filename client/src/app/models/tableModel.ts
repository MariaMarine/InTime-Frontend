import { Device } from './deviceModel';

export class Table {

    id: string;
    name: string;
    devices: Device[];
    endDateInMilliseconds: string;
    startDateInMilliseconds: string;
}
