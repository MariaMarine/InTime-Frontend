import { Component, OnInit } from '@angular/core';
declare let L;
//import '../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js'

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
        const map = L.map('map').setView([42.698334, 23.319941], 17);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.control.scale({ imperial: false, position: "bottomleft" }).addTo(map);
    }

}

// public circle = L.circle([42.698334, 23.319941], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 50
// }).addTo(this.map);

//this.circle.bindPopup("I am a circle.");

// public function onMapClick(e) {
//     let marker = null
//     if (marker) {
//         marker = null;
//     }
//     let popup = L.popup();
//     popup.setContent("You clicked the map at " + e.latlng.toString());
//     marker = L.marker([e.latlng.lat, e.latlng.lng]).bindPopup(popup);
//     marker.addTo(map);
//     // popup
//     //     .setLatLng(e.latlng)
//     //     .setContent("You clicked the map at " + e.latlng.toString())
//     //     .openOn(map);
//     //     console.log(e.latlng);
// }
