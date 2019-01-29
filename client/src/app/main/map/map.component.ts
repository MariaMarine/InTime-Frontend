
import { Component, OnInit } from '@angular/core';
import { TableMapService } from '../../core/tableToMap.service';
import { Device } from '../../models/deviceModel';


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    private lat = 42.698334;
    private lng = 23.319941;
    private markers: Device[] = [];
    constructor(
        private readonly tableToMap: TableMapService
    ) {}

    ngOnInit() {
        this.tableToMap.devices$
        .subscribe(data => {
            console.log('samo ceca' , data)
            this.markers = data;
            });
    }

}

// const map = L.map('map').setView([42.698334, 23.319941], 17);

        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(map);

        // L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
