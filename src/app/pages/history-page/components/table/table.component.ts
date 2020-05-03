import { Component, Input, OnInit } from "@angular/core";
import { Diagnosis } from "src/app/models/diagnosis/diagnosis.model";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent {
  @Input() diagnoses: Diagnosis[];
}
