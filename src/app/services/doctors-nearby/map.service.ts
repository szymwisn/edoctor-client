import { Injectable } from "@angular/core";
import * as L from "leaflet";
import { MarkerOptions } from "src/app/models/map/marker-options.model";

export enum MAP_OPTIONS {
  ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  URL_TEMPLATE = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
}

@Injectable({
  providedIn: "root",
})
export class MapService {
  createMap(coordinates: L.LatLngExpression): L.Map {
    const map: L.Map = L.map("map").setView(coordinates, 12);
    const mapLayer: L.TileLayer = L.tileLayer(MAP_OPTIONS.URL_TEMPLATE, {
      attribution: MAP_OPTIONS.ATTRIBUTION,
    });

    mapLayer.addTo(map);
    return map;
  }

  changeLocation(map: L.Map, coordinates: L.LatLngExpression) {
    map.flyTo(coordinates, 12);
  }

  createMarker(map: L.Map, options: MarkerOptions): L.Marker {
    const marker: L.Marker = L.marker(options.coordinates, {
      icon: L.divIcon({
        className: "map-marker",
        iconSize: [24, 24],
      }),
    });

    marker.bindPopup(this.getPopupHTML(options)).openPopup();

    marker.on("mouseover", (e) => {
      marker.openPopup();
    });

    marker.on("mouseout", (e) => {
      marker.closePopup();
    });

    marker.addTo(map);
    return marker;
  }

  cleanMarkers(map: L.Map, markers: L.Marker[]) {
    markers.forEach((marker) => map.removeLayer(marker));
  }

  private getPopupHTML(options: MarkerOptions) {
    return `
    <div class="map-popup">
      <div class="map-popup-phone">
        ${options.phone}
      </div>
      <div class="map-popup-doctor">
        ${options.doctor}
      </div>
      <div class="map-popup-clinicks">
        ${options.clinic}
      </div>
      <div class="map-popup-address">
        ${options.address}
      </div>
    </div>
  `;
  }
}
