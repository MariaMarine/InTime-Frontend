import { JwtService } from './jwt.service';
import { NotificatorService } from './notification.service';
import { DeviceEditService } from './device-edit.service';
import { AuthService } from './auth.service';
import { RequesterService } from './reqester.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StorageService } from './storage.service';
import { NavbarService } from './navbar.service';
import { AuthRouteActivatorService } from './guards/auth-route-activator.service';
import { AdminRouteActivatorService } from './guards/admin-route-activator.service';
import { ReportsResolverService } from './reports-resolver.service';

@NgModule({
  providers: [
    RequesterService,
    AuthService,
    StorageService,
    DeviceEditService,
    NotificatorService,
    NavbarService,
    AuthRouteActivatorService,
    AdminRouteActivatorService,
    JwtService,
    ReportsResolverService,
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided!');
    }
  }
}
