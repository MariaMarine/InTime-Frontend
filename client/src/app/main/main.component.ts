import { MapComponent } from './map/map.component';
import { Component, OnInit, OnDestroy, OnChanges, ViewChild, AfterViewInit } from '@angular/core';
import { NavbarService } from '../core/navbar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {

  mapLoaded: boolean;
  @ViewChild(MapComponent) leaflet;
  constructor(private readonly nav: NavbarService) { }

  ngOnInit() {
    this.mapLoaded = false;
    this.nav.show();
  }

  ngOnDestroy(): void {
    this.nav.hide();
}
  ngAfterViewInit(): void {
    this.mapLoaded = true;
}
}
