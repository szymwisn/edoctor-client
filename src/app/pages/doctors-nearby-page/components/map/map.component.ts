import * as L from "leaflet";
import { Component, AfterViewInit, Input, Output } from "@angular/core";
import { take } from "rxjs/operators";
import { MapService } from "src/app/services/doctors-nearby/map.service";
import { DoctorsService } from "src/app/services/doctors-nearby/doctors.service";
import { GeolocationService } from "src/app/services/doctors-nearby/geolocation.service";
import { MarkerOptions } from "src/app/models/map/marker-options.model";
import { Doctor } from "src/app/models/map/doctor.model";
import { Subject } from "rxjs";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements AfterViewInit {
  private map: L.Map;
  private markers: L.Marker[] = [];

  @Output() cityChange = new Subject<string>();

  @Input()
  set address(address: string) {
    if (address) {
      this.geolocationService
        .convertQueryToLatLng(address)
        .pipe(take(1))
        .subscribe((decodedLocation: any[]) => {
          if (decodedLocation.length > 0) {
            const coordinates = this.getCoordinatesFromDecodedLocation(
              decodedLocation
            );
            this.mapService.changeLocation(this.map, coordinates);
            this.mapService.cleanMarkers(this.map, this.markers);

            this.geolocationService.getCityFromCoordinates(coordinates);
            this.geolocationService.city$.pipe(take(1)).subscribe((city) => {
              this.cityChange.next(city);
              this.setDoctorsMarkersOnMap(city);
            });
          }
        });
    }
  }

  constructor(
    private mapService: MapService,
    private geolocationService: GeolocationService,
    private doctorsService: DoctorsService
  ) {
    this.geolocationService.getUserLocation();
  }

  ngAfterViewInit(): void {
    this.geolocationService.userLocation$
      .pipe(take(1))
      .subscribe((coordinates) => {
        this.map = this.mapService.createMap(coordinates);

        this.geolocationService.getCityFromCoordinates(coordinates);
        this.geolocationService.city$.pipe(take(1)).subscribe((city) => {
          this.cityChange.next(city);
          this.setDoctorsMarkersOnMap(city);
        });
      });
  }

  addDoctorsMarkers(doctors: Doctor[]) {
    doctors.forEach((doctor) => {
      this.geolocationService
        .convertQueryToLatLng(doctor.address)
        .pipe(take(1))
        .subscribe((decodedLocation: any[]) => {
          const coordinates = this.getCoordinatesFromDecodedLocation(
            decodedLocation
          );

          const marker = this.mapService.createMarker(this.map, {
            coordinates: coordinates,
            phone: doctor.phone,
            doctor: doctor.name,
            clinic: doctor.clinic,
            address: doctor.address,
          } as MarkerOptions);

          this.markers.push(marker);
        });
    });
  }

  cleanMarkers() {
    this.mapService.cleanMarkers(this.map, this.markers);
    this.markers = [];
  }

  private getCoordinatesFromDecodedLocation(
    decodedLocation: any[]
  ): L.LatLngExpression {
    return new L.LatLng(decodedLocation[0].y, decodedLocation[0].x);
  }

  private setDoctorsMarkersOnMap(city: string) {
    this.doctorsService
      .fetchDoctors(city)
      .pipe(take(1))
      .subscribe((doctors) => {
        this.addDoctorsMarkers(doctors);
      });
  }
}
