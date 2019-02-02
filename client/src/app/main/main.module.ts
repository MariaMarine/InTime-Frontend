import { ChartReportEditComponent } from './reports/chart-reports/chart-report-edit.component';
import { ChartsComponent } from './reports/chart-reports/charts.component';
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
import { MultiSelectModule, DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { TabStripModule } from '@progress/kendo-angular-layout';
import { ChartReportComponent } from './reports/chart-reports/chart-report.component';
import { ChartModule } from '@progress/kendo-angular-charts';
import { AgmCoreModule } from '@agm/core';
import { Daterangepicker } from 'ng2-daterangepicker';
import 'hammerjs';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  declarations: [
    ReportsComponent,
    MapComponent,
    MainComponent,
    TableReportComponent,
    TableReportEditComponent,
    SentenceCasePipe,
    ChartsComponent,
    ChartReportComponent,
    ChartReportEditComponent,
  ],
  imports: [ MainRoutingModule, SplitterModule, CommonModule, FormsModule, DropDownsModule,
    ReactiveFormsModule, NgbModule, MultiSelectModule, TabStripModule, ChartModule,
    Daterangepicker, AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC6K_3lElV3AD48s-1ZyQM74GsFw7qC9S8'
    }), AgmDirectionModule],
  providers: [],
  exports: [MainComponent, MapComponent]
})
export class MainModule {}

