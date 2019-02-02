import { Component, OnInit } from '@angular/core';
import { TableMapService } from '../../core/tableToMap.service';
import { Device } from '../../models/deviceModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChartMapService } from '../../core/chartToMap.service';


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    private lat = 42.698334;
    private lng = 23.319941;
    private markers: Device[] = [];

    private destinations: {}[] = [];
    private waypoints: {}[] = [];

    public display = true;

    public markerOptions = {
        origin: {
            visible: false,
        },
        destination: {
            visible: false,
        },
    };

    public renderOptions = {
        suppressMarkers: true,
    };

    constructor(
        private readonly tableToMap: TableMapService,
        private readonly chartToMap: ChartMapService,
        private spinner: NgxSpinnerService
    ) {}


    ngOnInit() {
        this.tableToMap.devices$
        .subscribe(data => {
            this.markers = data;
            this.spinner.show();
            this.display = false;
            this.waypoints = data.map((coordinates) => {
                return { lat: +coordinates.latitude, lng: +coordinates.longitude }; } );
            this.destinations = [];
            for (let k = 0; k < this.waypoints.length - 1; k++) {
                this.destinations.push({ org: this.waypoints[k], des: this.waypoints[ k + 1]});
            }
            setTimeout(() => {
                this.display = true;
                this.spinner.hide();
            }, 500 );

            });
        this.chartToMap.chart$
        .subscribe(data => {
            this.markers = [data.origin, data.destination];
            this.display = false;
            this.destinations = [{ org: { lat: +data.origin.latitude, lng: +data.origin.longitude },
                des: { lat: +data.destination.latitude, lng: +data.destination.longitude }}];
            setTimeout(() => {
                    this.display = true;
                    this.spinner.hide();
                }, 500 );
        });
    }

}
