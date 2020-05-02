import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-heading-box",
  templateUrl: "./heading-box.component.html",
  styleUrls: ["./heading-box.component.scss"],
})
export class HeadingBoxComponent implements OnInit {
  imgSrc: string = "";

  @Input() text: string;
  @Input() placement: string;

  ngOnInit() {
    switch (this.placement) {
      case "profile":
        this.imgSrc = "/assets/images/kitten.svg";
        break;
      default:
        this.imgSrc = "/assets/images/error.svg";
    }
  }
}
