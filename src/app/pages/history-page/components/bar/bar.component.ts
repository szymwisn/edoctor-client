import { Component, Output, Input } from "@angular/core";
import { Subject } from "rxjs";
import { DiagnosisFilters } from "src/app/models/diagnosis/diagnosis-filters.model";

@Component({
  selector: "app-bar",
  templateUrl: "./bar.component.html",
  styleUrls: ["./bar.component.scss"],
})
export class BarComponent {
  @Input() filters: DiagnosisFilters;
  @Output() filtersClick = new Subject();

  onFiltersClick() {
    this.filtersClick.next();
  }
}
