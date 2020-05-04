import { Component, Input } from "@angular/core";
import { Diagnosis } from "src/app/models/diagnosis/diagnosis.model";

@Component({
  selector: "app-recent-healthcheck",
  templateUrl: "./recent-healthcheck.component.html",
  styleUrls: ["./recent-healthcheck.component.scss"],
})
export class RecentHealthcheckComponent {
  @Input() diagnosis: Diagnosis;
}
