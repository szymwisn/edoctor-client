import { Component, Input, Output } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.scss"],
})
export class LogoComponent {
  @Input() iconOnly: boolean = false;
  @Output() logoClick = new Subject();

  onClick() {
    this.logoClick.next();
  }
}
