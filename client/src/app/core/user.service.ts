import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { RequesterService } from './reqester.service';
import { NotificatorService } from './notification.service';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable()
export class UserService extends BehaviorSubject<any[]> {
    constructor(private readonly http: RequesterService,
        private readonly notificator: NotificatorService,
        private readonly localstorage: StorageService,
        private readonly router: Router) {

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

    public save(data: any) {
            this.http.post('http://localhost:3000/users', JSON.stringify(data))
                    .subscribe(() => {
                        this.notificator.show('User added!', 'success');
                        this.read();
                        },
                        (err: HttpErrorResponse) => {
                            (err.status === 409) ? this.notificator.show('User already exists!', 'error')
                            : this.notificator.show('Users email is not valid', 'error');
                            this.read();
                        });
            this.reset();
            this.fetch(data)
                .subscribe(() => this.read(), () => this.read());
    }

    public remove(data: any) {
        console.log(data);
        this.http.delete(`http://localhost:3000/users/${data.id}`)
        .subscribe(() => {
            if (data.isAdmin) {
                this.notificator.show('Bye!', 'success');
                this.localstorage.clear();
                this.router.navigate(['/home']);
                }
            },
        );
        this.reset();
        this.fetch(data)
            .subscribe(() => {
                this.notificator.show('User deleted', 'success');
                this.read();
                },
                () => {
                    this.notificator.show('Could not delete user!', 'error');
                    this.read();
                });
    }

    private reset() {
        this.data = [];
    }

    private fetch(data?: any): Observable<any[]> {
        return this.http
            .get('http://localhost:3000/users')
            .pipe(map(res => <any[]>res));
    }

}
