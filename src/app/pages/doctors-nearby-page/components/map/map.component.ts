import { Component, AfterViewInit } from "@angular/core";
import * as L from "leaflet";
import { MapService } from "src/app/services/map.service";
import { MarkerOptions } from "src/app/models/map/MarkerOptions.model";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements AfterViewInit {
  private map: L.Map;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.map = this.mapService.createMap([51.107883, 17.038538]);

    //TODO: just a temporary data
    this.mapService.createMarker(this.map, {
      coordinates: [51.107883, 17.038538],
      phone: "313 544 344",
      doctor: "dr John Doe",
      clinicks: "LoremMed Clinicks",
      address: "Wrocław, Medykow Street 12/3",
    } as MarkerOptions);

    this.mapService.createMarker(this.map, {
      coordinates: [51.10483, 17.048538],
      phone: "713 331 332",
      doctor: "dr Timothy Zahn",
      clinicks: "Yolo Clinicks",
      address: "Wrocław, Inna Street 12/3",
    } as MarkerOptions);
  }
}
