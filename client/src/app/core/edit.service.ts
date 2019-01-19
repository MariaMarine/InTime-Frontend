import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { RequesterService } from './reqester.service';

@Injectable()
export class EditService extends BehaviorSubject<any[]> {
    constructor(private readonly http: RequesterService) {
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

    // Add error handling in all methods!!
    // Change backend update from put to patch?
    public save(data: any, isNew?: boolean) {
        if (isNew) {
            this.http.post('http://localhost:3000/devices', JSON.stringify(data))
                    .subscribe();
            this.reset();
            this.fetch(data)
                .subscribe(() => this.read(), () => this.read());
        } else {
            this.http.put(`http://localhost:3000/devices/${data.id}`, JSON.stringify(data))
                    .subscribe();
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
            .subscribe(() => this.read(), () => this.read());
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
