import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProfilePageComponent } from "./containers/profile-page/profile-page.component";
import { PersonalInfoComponent } from "./components/personal-info/personal-info.component";
import { RecentHealthcheckComponent } from "./components/recent-healthcheck/recent-healthcheck.component";
import { SharedModule } from "src/app/_shared/shared.module";

@NgModule({
  declarations: [
    ProfilePageComponent,
    PersonalInfoComponent,
    RecentHealthcheckComponent,
  ],
  imports: [CommonModule, SharedModule],
})
export class ProfilePageModule {}
