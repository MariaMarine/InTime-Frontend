import { AuthInterceptor } from './auth-interceptor.service';
import { AuthService } from './auth.service';
import { RequesterService } from './reqester.service';
// import { AnonymousRouteActivatorService } from './route-guards/anonymous-route-activator.service';
// import { AuthRouteActivatorService } from './route-guards/auth-route-activator.service';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageService } from './storage.service';
// import { StorageService } from './storage.service';
// import { NotificatorService } from './notificator.service';

@NgModule({
  providers: [
    RequesterService,
    AuthService,
    StorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
/*
    AuthRouteActivatorService,
    AnonymousRouteActivatorService
    */
  ]
})
export class CoreModule {
  public constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module is already provided!');
    }
  }
}
