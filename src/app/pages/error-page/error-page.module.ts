import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [CommonModule, ComponentsModule],
})
export class ErrorPageModule {}
