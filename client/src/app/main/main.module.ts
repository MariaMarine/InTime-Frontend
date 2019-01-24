// import { ReportsResolverService } from '../core/reports-resolver.service';
import { MainComponent } from './main.component';
import { ReportsComponent } from './reports/reports.component';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { SplitterModule } from '@progress/kendo-angular-layout';
import { TableReportComponent } from './reports/table-report.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ReportsComponent,
    MainComponent,
    TableReportComponent,
  ],
  imports: [ MainRoutingModule, SplitterModule, CommonModule, FormsModule ],
  providers: [],
  exports: [MainComponent]
})
export class MainModule {}

