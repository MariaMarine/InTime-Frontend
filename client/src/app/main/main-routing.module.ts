import { DeviceResolverService } from './../core/device-resolver.service';
// import { TableReportsResolverService } from './reports/table-reports-resolver.service';
import { ReportsResolverService } from '../core/reports-resolver.service';
import { MainComponent } from './main.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [

  {
    path: '',
    runGuardsAndResolvers: 'always',
    component: MainComponent,
    resolve: { reports: ReportsResolverService,
      devices: DeviceResolverService,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
