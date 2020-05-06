import { Injectable } from "@angular/core";
import * as L from "leaflet";
import { MarkerOptions } from "../models/map/MarkerOptions.model";

@Injectable({
  providedIn: "root",
})
export class MapService {
  createMap(coordinates: L.LatLngExpression): L.Map {
    const map: L.Map = L.map("map", {
      center: coordinates,
      zoom: 13,
    });

    const mapLayer: L.TileLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }
    );

    mapLayer.addTo(map);

    return map;
  }

  createMarker(map: L.Map, options: MarkerOptions): L.Marker {
    const marker: L.Marker = L.marker(options.coordinates, {
      icon: L.divIcon({
        className: "map-marker",
        iconSize: [24, 24],
      }),
    });

    marker
      .bindPopup(
        `
    <div class="map-popup">
      <div class="map-popup-phone">
        ${options.phone}
      </div>
      <div class="map-popup-doctor">
        ${options.doctor}
      </div>
      <div class="map-popup-clinicks">
        ${options.clinicks}
      </div>
      <div class="map-popup-address">
        ${options.address}
      </div>
    </div>
  `
      )
      .openPopup();

    marker.on("mouseover", function (e) {
      marker.openPopup();
    });

    marker.on("mouseout", function (e) {
      marker.closePopup();
    });

    marker.addTo(map);

    return marker;
  }
}
