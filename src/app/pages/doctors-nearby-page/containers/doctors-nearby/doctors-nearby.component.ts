import { Component } from "@angular/core";

@Component({
  selector: "app-doctors-nearby",
  templateUrl: "./doctors-nearby.component.html",
  styleUrls: ["./doctors-nearby.component.scss"],
})
export class DoctorsNearbyComponent {
  searchByAddress(address: string) {
    console.log(address);
  }
}
