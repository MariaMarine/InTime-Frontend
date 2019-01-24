import { Injectable } from '@angular/core';
import { AuthService } from './../auth.service';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificatorService } from './../notification.service';

@Injectable()
export class AdminRouteActivatorService implements CanActivate {
  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificator: NotificatorService
  ) {}

  public canActivate(): boolean {
    const isAdmin = (this.authService.isAdmin());
        if (!isAdmin) {
            this.notificator.show('You must be an admin to see this page!',
            'error');
            this.router.navigate(['/home']);
        }
    return isAdmin;
  }
}
