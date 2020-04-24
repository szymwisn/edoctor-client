import { Component, Input, OnChanges } from "@angular/core";

@Component({
  selector: "app-icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.scss"],
})
export class IconComponent implements OnChanges {
  link: string;

  @Input() name: string = "";
  @Input() width: number = 12;
  @Input() height: number = 12;

  ngOnChanges() {
    this.link = `/assets/icons/${this.name}.svg`;
  }
}
