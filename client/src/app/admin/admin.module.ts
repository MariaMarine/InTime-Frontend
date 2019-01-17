import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [AdminRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [
    RegisterComponent,
    ],
  providers: []
})
export class AdminModule { }
