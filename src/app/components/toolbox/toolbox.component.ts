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
      title: "Latest diagnosis",
      link: ["/diagnosis"],
    },
    {
      title: "Diagnosis history",
      link: ["/history"],
    },
    {
      title: "Doctors nearby",
      link: ["/doctors"],
    },
  ];
}
