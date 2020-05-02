import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorPageComponent } from "./containers/error-page/error-page.component";
import { SharedModule } from "src/app/_shared/shared.module";

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [CommonModule, SharedModule],
})
export class ErrorPageModule {}
