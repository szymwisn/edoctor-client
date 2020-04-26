import { NgModule } from "@angular/core";
import { DiagnosisPageModule } from "./diagnosis-page/diagnosis-page.module";
import { DoctorsNearbyPageModule } from "./doctors-nearby-page/doctors-nearby-page.module";
import { ErrorPageModule } from "./error-page/error-page.module";
import { ExaminationPageModule } from "./examination-page/examination-page.module";
import { HistoryPageModule } from "./history-page/history-page.module";
import { LandingPageModule } from "./landing-page/landing-page.module";
import { ProfilePageModule } from "./profile-page/profile-page.module";
import { RegisterPageModule } from "./register-page/register-page.module";
import { SignInPageModule } from "./sign-in-page/sign-in-page.module";

const pages = [
  DiagnosisPageModule,
  DoctorsNearbyPageModule,
  ErrorPageModule,
  ExaminationPageModule,
  HistoryPageModule,
  LandingPageModule,
  ProfilePageModule,
  RegisterPageModule,
  SignInPageModule,
];

@NgModule({
  declarations: [],
  imports: [...pages],
  exports: [...pages],
})
export class PagesModule {}
