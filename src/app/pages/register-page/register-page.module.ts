import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [CommonModule, ComponentsModule],
})
export class RegisterPageModule {}
