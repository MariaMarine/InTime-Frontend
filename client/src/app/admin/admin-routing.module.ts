import { AuthRouteActivatorService } from './../core/guards-interceptors/auth-route-activator.service';
import { DevicesComponent } from './devices/devices.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    // change redirect to main page
  // { path: '', redirectTo: '/admin/register', pathMatch: 'full' },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [AnonymousRouteActivatorService]
  },
  {
    path: 'devices',
    component: DevicesComponent,
    canActivate: [AuthRouteActivatorService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
