import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterPageComponent } from "./containers/register-page/register-page.component";
import { SharedModule } from "src/app/_shared/shared.module";

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [CommonModule, SharedModule],
})
export class RegisterPageModule {}
