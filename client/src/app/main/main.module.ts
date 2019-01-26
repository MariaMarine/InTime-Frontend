import { TableReportEditComponent } from './reports/table-report-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { ReportsComponent } from './reports/reports.component';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MapComponent } from './map/map.component';
import { SplitterModule } from '@progress/kendo-angular-layout';
import { TableReportComponent } from './reports/table-report.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ReportsComponent,
    MapComponent,
    MainComponent,
    TableReportComponent,
    TableReportEditComponent,
  ],
  imports: [ MainRoutingModule, SplitterModule, CommonModule, FormsModule,
    ReactiveFormsModule, NgbModule],
  providers: [],
  exports: [MainComponent, MapComponent]
})
export class MainModule {}

