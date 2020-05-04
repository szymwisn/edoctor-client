import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HistoryPageComponent } from "./containers/history-page/history-page.component";
import { TableComponent } from "./components/table/table.component";
import { BarComponent } from "./components/bar/bar.component";
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
  declarations: [HistoryPageComponent, TableComponent, BarComponent],
  imports: [CommonModule, ComponentsModule],
})
export class HistoryPageModule {}
