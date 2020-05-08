import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DoctorsNearbyComponent } from "./containers/doctors-nearby/doctors-nearby.component";
import { BarComponent } from "./components/bar/bar.component";
import { MapComponent } from "./components/map/map.component";
import { DetailsComponent } from "./components/details/details.component";
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
  declarations: [
    DoctorsNearbyComponent,
    BarComponent,
    MapComponent,
    DetailsComponent,
  ],
  imports: [CommonModule, ComponentsModule],
})
export class DoctorsNearbyPageModule {}
