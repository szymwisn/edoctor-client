import { Injectable } from "@angular/core";
import * as L from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import geolocation from "geolocation";
import { Subject, from } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GeolocationService {
  private provider = new OpenStreetMapProvider();
  userLocation$ = new Subject<L.LatLngExpression>();

  getUserLocation() {
    geolocation.getCurrentPosition((error, position) => {
      if (error) throw error;
      this.userLocation$.next(
        new L.LatLng(position.coords.latitude, position.coords.longitude)
      );
    });
  }

  decodeLatLng(coordinates: L.LatLngExpression) {
    //TODO
  }

  encodeToLatLng(query: string) {
    return from(this.provider.search({ query }));
  }
}
