import { Component, Input, Output } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"],
})
export class ResultComponent {
  @Input() disease: string;
  @Input() probability: number;
  @Output() backClick = new Subject();

  onBackButtonClick() {
    this.backClick.next();
  }
}
