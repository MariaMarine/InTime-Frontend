import { AuthService } from './../auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificatorService } from './../notification.service';

@Injectable()
export class AuthRouteActivatorService implements CanActivate {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificator: NotificatorService
  ) {}

  public canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      tap((isLogged: boolean) => {
        if (!isLogged) {
          this.router.navigate(['/home']);
          this.notificator.show('You must be logged-in in order to see this page!',
            'error');
        }
      })
    );
  }
}
