import { Device } from '../models/deviceModel';
import { Subject, Observable } from 'rxjs';

export class TableMapService {
    private readonly dev$: Subject<Device[]> = new Subject<Device[]>();

    public get devices$(): Observable<Device[]> {
        return this.dev$.asObservable();
    }
    public emitDevices(devices: Device[]): void {
        this.dev$.next(devices);
    }

}
