import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// import { AuthRouteActivatorService } from '../core/route-guards/auth-route-activator.service';
// import { AnonymousRouteActivatorService } from '../core/route-guards/anonymous-route-activator.service';

const routes: Routes = [
    // change redirect to main page
  // { path: '', redirectTo: '/admin/register', pathMatch: 'full' },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [AnonymousRouteActivatorService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
