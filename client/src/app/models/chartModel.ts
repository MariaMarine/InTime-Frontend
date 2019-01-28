import { Device } from './deviceModel';
import { StartDate } from './startDateModel';

export class Chart {
    id: string;
    name: string;
    periodInMilliseconds: number;
    origin: Device;
    destination: Device;

    startDates: StartDate [];
}
