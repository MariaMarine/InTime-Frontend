
import { Component, OnInit } from '@angular/core';
import { TableMapService } from '../../core/tableToMap.service';
import { Device } from '../../models/deviceModel';
import { NgxSpinnerService } from 'ngx-spinner';


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
    }

}
