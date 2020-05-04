import { Component, Input, OnInit, Output } from "@angular/core";
import { Diagnosis } from "src/app/models/diagnosis/diagnosis.model";
import { Subject } from "rxjs";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent {
  @Input() diagnoses: Diagnosis[];
  @Output() diagnosisClick = new Subject<Diagnosis>();

  onRowClick(diagnosis: Diagnosis) {
    this.diagnosisClick.next(diagnosis);
  }
}
