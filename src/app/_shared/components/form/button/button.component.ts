import { Component, Input, Output } from "@angular/core";
import { Subject } from "rxjs";

export enum ButtonTypes {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary",
}

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  @Input() type: string = "button";
  @Input() text: string = "Button";
  @Input() class: ButtonTypes = ButtonTypes.Secondary;
  @Input() icon: string;
  @Input() disabled: boolean = false;

  @Output() btnClick = new Subject();

  onClick() {
    this.btnClick.next();
  }
}
