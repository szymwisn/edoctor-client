import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingPageComponent } from "./containers/landing-page/landing-page.component";
import { StatisticBoxComponent } from "./components/statistic-box/statistic-box.component";
import { SharedModule } from "src/app/_shared/shared.module";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [LandingPageComponent, StatisticBoxComponent],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class LandingPageModule {}
