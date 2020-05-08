import { Component, Input, Output, HostListener } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  value: string = "";

  @Input() placeholder: string = "Search...";
  @Output() searchClick = new Subject();

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.onSearch();
    }
  }

  changeValue(event: any) {
    this.value = event.target.value;
  }

  onSearch() {
    this.searchClick.next(this.value);
  }
}
