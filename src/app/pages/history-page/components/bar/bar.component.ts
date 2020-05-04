import { Component, Output } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-bar",
  templateUrl: "./bar.component.html",
  styleUrls: ["./bar.component.scss"],
})
export class BarComponent {
  @Output() searchClick = new Subject<string>();
  @Output() filtersClick = new Subject();

  onFiltersClick() {
    this.filtersClick.next();
  }

  onSearchClick(phrase: string) {
    this.searchClick.next(phrase);
  }
}
