import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-box",
  templateUrl: "./box.component.html",
  styleUrls: ["./box.component.scss"],
})
export class BoxComponent {
  @Input() title: string;
  @Input() link: string;
}
