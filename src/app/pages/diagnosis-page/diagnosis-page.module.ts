import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DiagnosisPageComponent } from "./containers/diagnosis-page/diagnosis-page.component";
import { ResultComponent } from "./components/result/result.component";
import { DescriptionComponent } from "./components/description/description.component";
import { TipsComponent } from "./components/tips/tips.component";
import { DoctorsNearbyComponent } from "./components/doctors-nearby/doctors-nearby.component";

@NgModule({
  declarations: [
    DiagnosisPageComponent,
    ResultComponent,
    DescriptionComponent,
    TipsComponent,
    DoctorsNearbyComponent,
  ],
  imports: [CommonModule],
})
export class DiagnosisPageModule {}
