import { MapComponent } from './map/map.component';
import { Component, OnInit, OnDestroy, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { NavbarService } from '../core/navbar.service';
import { ReportsComponent } from './reports/table-reports/reports.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

  mapLoaded: boolean;
  @ViewChild(MapComponent) leaflet;
  reportsUpdate: boolean;
  chartsUpdate: boolean;

   constructor(private readonly nav: NavbarService) { }

  ngOnInit() {
    this.mapLoaded = false;
  }

  ngAfterViewInit(): void {
    this.mapLoaded = true;
  }
  receiveReportUpdate(event) {
    console.log(event);
    this.reportsUpdate = event;
  }
  receiveChartUpdate (event) {
    this.chartsUpdate = event;
  }
}
