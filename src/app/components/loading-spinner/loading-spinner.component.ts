import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { LoadingService } from "src/app/services/utils/loading.service";

@Component({
  selector: "app-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrls: ["./loading-spinner.component.scss"],
})
export class LoadingSpinnerComponent implements OnDestroy {
  private subscription: Subscription;
  spinning: boolean = false;

  constructor(private loadingService: LoadingService) {
    this.subscription = this.loadingService
      .getSpinning()
      .subscribe((spinning) => {
        this.spinning = spinning;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
