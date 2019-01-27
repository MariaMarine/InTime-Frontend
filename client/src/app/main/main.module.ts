import { SentenceCasePipe } from './../pipes/sentence-case.pipe';
import { TableReportEditComponent } from './reports/table-reports/table-report-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main.component';
import { ReportsComponent } from './reports/table-reports/reports.component';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MapComponent } from './map/map.component';
import { SplitterModule } from '@progress/kendo-angular-layout';
import { TableReportComponent } from './reports/table-reports/table-report.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from '@progress/kendo-angular-dropdowns';
import { TabStripModule } from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [
    ReportsComponent,
    MapComponent,
    MainComponent,
    TableReportComponent,
    TableReportEditComponent,
    SentenceCasePipe,
  ],
  imports: [ MainRoutingModule, SplitterModule, CommonModule, FormsModule,
    ReactiveFormsModule, NgbModule, MultiSelectModule, TabStripModule],
  providers: [],
  exports: [MainComponent, MapComponent]
})
export class MainModule {}

