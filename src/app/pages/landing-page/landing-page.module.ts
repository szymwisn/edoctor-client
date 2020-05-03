import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LandingPageComponent } from "./containers/landing-page/landing-page.component";
import { StatisticBoxComponent } from "./components/statistic-box/statistic-box.component";
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
  declarations: [LandingPageComponent, StatisticBoxComponent],
  imports: [CommonModule, ComponentsModule],
})
export class LandingPageModule {}
