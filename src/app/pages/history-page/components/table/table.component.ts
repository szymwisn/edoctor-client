import { Component, Input, OnInit, Output } from "@angular/core";
import { Diagnosis } from "src/app/models/diagnosis/diagnosis.model";
import { Subject } from "rxjs";
import { Sorting } from "src/app/models/diagnosis/sorting";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  _sorting: Sorting;
  dateSortingIcon: string = "";
  diseaseSortingIcon: string = "";
  probabilitySortingIcon: string = "";

  @Input() set sorting(sorting: Sorting) {
    this._sorting = sorting;
    this.defineSortingIcon();
  }
  @Input() diagnoses: Diagnosis[];
  @Output() diagnosisClick = new Subject<Diagnosis>();
  @Output() sortByDateClick = new Subject<Sorting>();
  @Output() sortByDiseaseClick = new Subject<Sorting>();
  @Output() sortByProbabilityClick = new Subject<Sorting>();

  ngOnInit() {
    this.defineSortingIcon();
  }

  onRowClick(diagnosis: Diagnosis) {
    this.diagnosisClick.next(diagnosis);
  }

  sortByDate() {
    this.sortByDateClick.next(this._sorting);
  }

  sortByDisease() {
    this.sortByDiseaseClick.next(this._sorting);
  }

  sortByProbability() {
    this.sortByProbabilityClick.next(this._sorting);
  }

  defineSortingIcon() {
    if (
      this._sorting === Sorting.DATE_ASC ||
      this._sorting === Sorting.DATE_DESC
    ) {
      this._sorting === Sorting.DATE_ASC
        ? (this.dateSortingIcon = "↑")
        : (this.dateSortingIcon = "↓");
      this.diseaseSortingIcon = "";
      this.probabilitySortingIcon = "";
    }

    if (
      this._sorting === Sorting.DISEASE_ASC ||
      this._sorting === Sorting.DISEASE_DESC
    ) {
      this._sorting === Sorting.DISEASE_ASC
        ? (this.diseaseSortingIcon = "↑")
        : (this.diseaseSortingIcon = "↓");
      this.dateSortingIcon = "";
      this.probabilitySortingIcon = "";
    }

    if (
      this._sorting === Sorting.PROBABILITY_ASC ||
      this._sorting === Sorting.PROBABILITY_DESC
    ) {
      this._sorting === Sorting.PROBABILITY_ASC
        ? (this.probabilitySortingIcon = "↑")
        : (this.probabilitySortingIcon = "↓");
      this.dateSortingIcon = "";
      this.diseaseSortingIcon = "";
    }
  }
}
