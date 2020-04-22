import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DoctorsNearbyComponent } from "./containers/doctors-nearby/doctors-nearby.component";
import { BarComponent } from "./components/bar/bar.component";
import { MapComponent } from "./components/map/map.component";
import { DetailsComponent } from "./components/details/details.component";
import { MarkerComponent } from "./components/marker/marker.component";

@NgModule({
  declarations: [
    DoctorsNearbyComponent,
    BarComponent,
    MapComponent,
    DetailsComponent,
    MarkerComponent,
  ],
  imports: [CommonModule],
})
export class DoctorsNearbyPageModule {}
