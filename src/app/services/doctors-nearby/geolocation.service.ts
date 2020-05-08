import { Injectable } from "@angular/core";
import { Subject, from } from "rxjs";
import * as L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import * as esriGeo from "esri-leaflet-geocoder";
import geolocation from "geolocation";

@Injectable({
  providedIn: "root",
})
export class GeolocationService {
  private provider = new OpenStreetMapProvider();
  userLocation$ = new Subject<L.LatLngExpression>();
  city$ = new Subject<string>();

  getUserLocation() {
    geolocation.getCurrentPosition((error, position) => {
      if (error) throw error;
      this.userLocation$.next(
        new L.LatLng(position.coords.latitude, position.coords.longitude)
      );
    });
  }

  convertQueryToLatLng(query: string) {
    return from(this.provider.search({ query }));
  }

  getCityFromCoordinates(coordinates: L.LatLngExpression) {
    esriGeo
      .reverseGeocode()
      .latlng(coordinates)
      .run((error, result, response) => {
        if (error) throw error;
        this.city$.next(result.address.City);
      });
  }
}
