import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-menu-icon",
  templateUrl: "./menu-icon.component.html",
  styleUrls: ["./menu-icon.component.scss"],
})
export class MenuIconComponent {
  @Input() icon: string;
  @Input() link: string;
  @Input() tip: string;
}
