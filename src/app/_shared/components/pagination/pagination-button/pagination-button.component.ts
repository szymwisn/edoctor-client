import { Component, Input, Output } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-pagination-button",
  templateUrl: "./pagination-button.component.html",
  styleUrls: ["./pagination-button.component.scss"],
})
export class PaginationButtonComponent {
  @Input() value: string;
  @Input() active: boolean = false;
  @Input() disabled: boolean = false;

  @Output() buttonClick = new Subject();

  onClick() {
    if (!this.disabled && !this.active) {
      this.buttonClick.next();
    }
  }
}
