import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.scss"],
})
export class IconComponent implements OnInit {
  link = "/assets/icons/";
  @Input() name = "";
  @Input() width = 12;
  @Input() height = 12;

  ngOnInit() {
    this.link += `${this.name}.svg`;
  }
}
