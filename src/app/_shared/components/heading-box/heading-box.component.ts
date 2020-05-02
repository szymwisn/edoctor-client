import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-heading-box",
  templateUrl: "./heading-box.component.html",
  styleUrls: ["./heading-box.component.scss"],
})
export class HeadingBoxComponent {
  @Input() text: string;
}
