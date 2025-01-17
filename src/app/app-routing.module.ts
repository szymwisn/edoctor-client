import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignInPageComponent } from "./pages/sign-in-page/sign-in-page/sign-in-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page/register-page.component";
import { ProfilePageComponent } from "./pages/profile-page/containers/profile-page/profile-page.component";
import { DiagnosisPageComponent } from "./pages/diagnosis-page/containers/diagnosis-page/diagnosis-page.component";
import { HistoryPageComponent } from "./pages/history-page/containers/history-page/history-page.component";
import { ExaminationPageComponent } from "./pages/examination-page/containers/examination-page/examination-page.component";
import { ErrorPageComponent } from "./pages/error-page/error-page/error-page.component";
import { LandingPageComponent } from "./pages/landing-page/containers/landing-page/landing-page.component";
import { AuthGuard } from "./services/guards/auth-guard.service";
import { DoctorsNearbyComponent } from "./pages/doctors-nearby-page/containers/doctors-nearby/doctors-nearby.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "welcome",
  },
  {
    path: "welcome",
    component: LandingPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "signin",
    component: SignInPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "register",
    component: RegisterPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "profile",
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "diagnosis",
    component: DiagnosisPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "diagnosis/:id",
    component: DiagnosisPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "doctors",
    component: DoctorsNearbyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "history",
    component: HistoryPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "examination",
    component: ExaminationPageComponent,
    canActivate: [AuthGuard],
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
