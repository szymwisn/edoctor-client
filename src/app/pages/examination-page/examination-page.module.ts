import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExaminationPageComponent } from "./containers/examination-page/examination-page.component";
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
  declarations: [ExaminationPageComponent],
  imports: [CommonModule, ComponentsModule],
})
export class ExaminationPageModule {}
