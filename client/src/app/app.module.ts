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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ServerErrorComponent,
    LoginComponent,
    NavbarComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NotificationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
