import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DevicesComponent } from './devices/devices.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [AdminRoutingModule, FormsModule, ReactiveFormsModule, GridModule, CommonModule],
  declarations: [
    DevicesComponent
    ],
  providers: []
})
export class AdminModule { }
