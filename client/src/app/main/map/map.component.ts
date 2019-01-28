import { Component } from '@angular/core';


@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent {

    private lat = 42.698334;
    private lng = 23.319941;

}

// const map = L.map('map').setView([42.698334, 23.319941], 17);

        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(map);

        // L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
