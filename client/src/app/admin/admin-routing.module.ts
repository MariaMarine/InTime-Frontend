import { AuthRouteActivatorService } from './../core/guards-interceptors/auth-route-activator.service';
import { DevicesComponent } from './devices/devices.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminRouteActivatorService } from '../core/guards-interceptors/admin-route-activator.service';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'devices',
    component: DevicesComponent,
    canActivate: [AuthRouteActivatorService, AdminRouteActivatorService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
