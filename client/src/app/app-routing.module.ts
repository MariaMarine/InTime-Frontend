import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './errors/not-found.component';
import { AuthRouteActivatorService } from './core/guards/auth-route-activator.service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServerErrorComponent } from './errors/server-error.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', loadChildren: './main/main.module#MainModule', canActivate: [AuthRouteActivatorService] },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthRouteActivatorService] },

  { path: 'not-found', component: NotFoundComponent },
  { path: 'error', component: ServerErrorComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
