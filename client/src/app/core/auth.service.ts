import { RequesterService } from './reqester.service';
import { UserModel } from './../models/userModel';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';


@Injectable()
export class AuthService {
  // look up Persisting user authentication with BehaviorSubject in Angular
  // https://netbasal.com/angular-2-persist-your-login-status-with-behaviorsubject-45da9ec43243
  private readonly isLoggedInSubject$ = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  public constructor(
    private readonly storageService: StorageService,
    private readonly requester: RequesterService
  ) {}


  public get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject$.asObservable();
  }


  public registerUser(user: UserModel): Observable<any> {
    return this.requester.post(
      'http://localhost:3000/register',
      JSON.stringify(user)
    );
  }

  public loginUser(user: UserModel): Observable<any> {
    return this.requester
      .post('http://localhost:3000/login', JSON.stringify(user))
      .pipe(
        tap(response => {
          this.storageService.setItem('token', (<any>response));
          this.isLoggedInSubject$.next(true);
        })
      );
  }

  public logoutUser() {
    this.storageService.removeItem('token');
    return this.isLoggedInSubject$.next(false);
  }

  private hasToken(): boolean {
    return !!this.storageService.getItem('token');
  }
}
