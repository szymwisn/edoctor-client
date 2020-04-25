import { Component, OnInit, Input, Output } from "@angular/core";
import { Subject } from "rxjs";
import { CheckboxItem } from "./checkbox-item.model";

@Component({
  selector: "app-checkbox-item",
  templateUrl: "./checkbox-item.component.html",
  styleUrls: ["./checkbox-item.component.scss"],
})
export class CheckboxItemComponent implements OnInit {
  icon: string = "checkbox-unchecked";

  @Input() item: CheckboxItem;
  @Output() boxClick = new Subject();

  ngOnInit() {
    this.defineIcon();
  }

  onClick() {
    this.item.checked = !this.item.checked;

    this.defineIcon();

    this.boxClick.next();
  }

  defineIcon() {
    if (this.item.checked) {
      this.icon = "checkbox-checked";
    } else {
      this.icon = "checkbox-unchecked";
    }
  }
}
