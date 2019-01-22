import { CoreModule } from './../core/core.module';
import { ReportsResolverService } from './reports/reports-resolver.service';
import { MainComponent } from './main.component';
import { ReportsComponent } from './reports/reports.component';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { SplitterModule } from '@progress/kendo-angular-layout';

@NgModule({
  declarations: [
    ReportsComponent,
    MainComponent,
  ],
  imports: [ MainRoutingModule, SplitterModule],
  providers: [ReportsResolverService],
  exports: [MainComponent]
})
export class MainModule {}

