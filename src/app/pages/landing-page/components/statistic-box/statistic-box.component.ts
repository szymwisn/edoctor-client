import { Component, Input } from "@angular/core";

@Component({
  selector: "app-statistic-box",
  templateUrl: "./statistic-box.component.html",
  styleUrls: ["./statistic-box.component.scss"],
})
export class StatisticBoxComponent {
  @Input() value: string;
  @Input() description: string;
}
