import { Component, OnInit } from "@angular/core";
import { Toolbox } from "./model/toolbox.model";

@Component({
  selector: "app-toolbox",
  templateUrl: "./toolbox.component.html",
  styleUrls: ["./toolbox.component.scss"],
})
export class ToolboxComponent {
  boxes: Toolbox[] = [
    {
      title: "Healthcheck",
      link: ["/examination"],
    },
    {
      title: "Change your data",
      link: ["/profile"],
    },
    {
      title: "Doctors nearby",
      link: ["/doctors"],
    },
    {
      title: "View history",
      link: ["/history"],
    },
  ];
}
