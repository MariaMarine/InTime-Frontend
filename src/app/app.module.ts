import { ProfileComponent } from './profile/profile.component';
import { ServerErrorInterceptor } from './interceptors/server-error-interceptor.service';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { CoreModule } from './core/core.module';
import { ServerErrorComponent } from './errors/server-error.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './errors/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { RegisterComponent } from './register/register.component';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { EditProfileComponent } from './profile/edit-profile.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerInterceptor } from './interceptors/spinner-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ServerErrorComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    ProfileComponent,
    EditProfileComponent
  ]
  ,
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NotificationModule,
    ChartsModule,
    NgxSpinnerModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ServerErrorInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SpinnerInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
