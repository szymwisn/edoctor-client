import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SignInPageComponent } from "./containers/sign-in-page/sign-in-page.component";
import { SharedModule } from "src/app/_shared/shared.module";

@NgModule({
  declarations: [SignInPageComponent],
  imports: [CommonModule, SharedModule],
})
export class SignInPageModule {}
