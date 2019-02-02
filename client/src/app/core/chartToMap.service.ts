import { Chart } from 'src/app/models/chartModel';
import { Subject, Observable } from 'rxjs';

export class ChartMapService {
    private readonly char$: Subject<Chart> = new Subject<Chart>();

    public get chart$(): Observable<Chart> {
        return this.char$.asObservable();
    }
    public emitChart(originDestination: Chart): void {
        this.char$.next(originDestination);
    }

}
