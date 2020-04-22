import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignInPageComponent } from "./pages/sign-in-page/containers/sign-in-page/sign-in-page.component";
import { RegisterPageComponent } from "./pages/register-page/containers/register-page/register-page.component";
import { ProfilePageComponent } from "./pages/profile-page/containers/profile-page/profile-page.component";
import { DiagnosisPageComponent } from "./pages/diagnosis-page/containers/diagnosis-page/diagnosis-page.component";
import { DoctorsNearbyComponent } from "./pages/diagnosis-page/components/doctors-nearby/doctors-nearby.component";
import { HistoryPageComponent } from "./pages/history-page/containers/history-page/history-page.component";
import { ExaminationPageComponent } from "./pages/examination-page/containers/examination-page/examination-page.component";
import { ErrorPageComponent } from "./pages/error-page/containers/error-page/error-page.component";
import { LandingPageComponent } from "./pages/landing-page/containers/landing-page/landing-page.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "welcome",
  },
  {
    path: "welcome",
    component: LandingPageComponent,
  },
  {
    path: "signin",
    component: SignInPageComponent,
  },
  {
    path: "register",
    component: RegisterPageComponent,
  },
  {
    path: "profile",
    component: ProfilePageComponent,
  },
  {
    path: "diagnosis",
    component: DiagnosisPageComponent,
  },
  {
    path: "doctors",
    component: DoctorsNearbyComponent,
  },
  {
    path: "history",
    component: HistoryPageComponent,
  },
  {
    path: "examination",
    component: ExaminationPageComponent,
  },
  {
    path: "404",
    component: ErrorPageComponent,
  },
  {
    path: "**",
    redirectTo: "/404",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
