import { Component, Output } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-bar",
  templateUrl: "./bar.component.html",
  styleUrls: ["./bar.component.scss"],
})
export class BarComponent {
  @Output() filtersClick = new Subject();

  onFiltersClick() {
    this.filtersClick.next();
  }
}
