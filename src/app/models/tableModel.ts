import { Device } from './deviceModel';

export class Table {

    id: string;
    name: string;
    devices: Device[];
    period: number;
    endDateInMilliseconds: number;
    startDateInMilliseconds: number;
    minMaxValues?: string;
}
