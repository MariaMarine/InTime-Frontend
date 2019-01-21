import { NotificatorService } from './notification.service';
import { DeviceEditService } from './device-edit.service';
import { AuthInterceptor } from './guards-interceptors/auth-interceptor.service';
import { AuthService } from './auth.service';
import { RequesterService } from './reqester.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageService } from './storage.service';
import { NavbarService } from './navbar.service';
import { AuthRouteActivatorService } from './guards-interceptors/auth-route-activator.service';

@NgModule({
  providers: [
    RequesterService,
    AuthService,
    StorageService,
    DeviceEditService,
    NotificatorService,
    NavbarService,
    AuthRouteActivatorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided!');
    }
  }
}
