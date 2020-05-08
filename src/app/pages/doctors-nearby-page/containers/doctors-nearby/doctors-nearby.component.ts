import { Component } from "@angular/core";

@Component({
  selector: "app-doctors-nearby",
  templateUrl: "./doctors-nearby.component.html",
  styleUrls: ["./doctors-nearby.component.scss"],
})
export class DoctorsNearbyComponent {
  city: string = "";
  address: string;

  searchByAddress(address: string) {
    this.address = address;
  }

  setCurrentCity(city: string) {
    this.city = city;
  }
}
