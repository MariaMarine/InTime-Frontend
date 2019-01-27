import { AuthRouteActivatorService } from './../core/guards/auth-route-activator.service';
import { DevicesComponent } from './devices/devices.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminRouteActivatorService } from '../core/guards/admin-route-activator.service';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },

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
