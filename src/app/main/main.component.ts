import { MapComponent } from './map/map.component';
import { Component, OnInit, OnDestroy, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { NavbarService } from '../core/navbar.service';
import { ReportsComponent } from './reports/table-reports/reports.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  reportsUpdate: boolean;
  chartsUpdate: boolean;

   constructor() { }

  ngOnInit() {
  }

  receiveReportUpdate(event) {
    this.reportsUpdate = event;
  }
  receiveChartUpdate (event) {
    this.chartsUpdate = event;
  }
}
