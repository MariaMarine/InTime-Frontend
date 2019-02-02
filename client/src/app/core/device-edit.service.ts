import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { RequesterService } from './reqester.service';
import { NotificatorService } from './notification.service';

@Injectable()
export class DeviceEditService extends BehaviorSubject<any[]> {
    constructor(private readonly http: RequesterService,
        private readonly notificator: NotificatorService) {

        super([]);
    }

    private data: any[] = [];

    public read() {
        if (this.data.length) {
            return super.next(this.data);
        }

        this.fetch()
            .pipe(
                tap(data => {
                    this.data = data;
                })
            )
            .subscribe(data => {
                super.next(data);
            });
    }

    // Add front end validation for lat/long?
    // Auth/403?
    public save(data: any, isNew?: boolean) {
        if (isNew) {
            this.http.post('http://localhost:3000/devices', JSON.stringify(data))
                    .subscribe(() => {
                        this.notificator.show('Device added!', 'success');
                        this.read();
                        },
                        (err: HttpErrorResponse) => {
                            (err.status === 409) ? this.notificator.show('Device already exists!', 'error')
                            : this.notificator.show('Invalid latitude or longitude', 'error');
                            this.read();
                        });
            this.reset();
            this.fetch(data)
                .subscribe(() => this.read(), () => this.read());
        } else {
            this.http.put(`http://localhost:3000/devices/${data.id}`, JSON.stringify(data))
                    .subscribe(() => {
                        this.notificator.show('Device updated!', 'success');
                        this.read();
                        },
                        (err: HttpErrorResponse) => {
                            (err.status === 409) ? this.notificator.show('Device already exists!', 'error')
                            : this.notificator.show('Invalid latitude or longitude', 'error');
                            this.read();
                        });
            this.reset();
            this.fetch(data)
            .subscribe(() => this.read(), () => this.read());
        }
    }

    public remove(data: any) {
        this.http.delete(`http://localhost:3000/devices/${data.id}`)
        .subscribe();
        this.reset();
        this.fetch(data)
            .subscribe(() => {
                this.notificator.show('Device deleted', 'success');
                this.read();
                },
                () => {
                    this.notificator.show('Could not delete device!', 'error');
                    this.read();
                });
    }

    private reset() {
        this.data = [];
    }

    private fetch(data?: any): Observable<any[]> {
        return this.http
            .get('http://localhost:3000/devices')
            .pipe(map(res => <any[]>res));
    }

}
