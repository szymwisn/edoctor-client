import { Component, ElementRef, OnDestroy } from "@angular/core";
import { NotificationService } from "src/app/services/utils/notification.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent implements OnDestroy {
  private subscription: Subscription;
  message: string;

  constructor(private notificationService: NotificationService) {
    this.subscription = this.notificationService
      .getNotification()
      .subscribe((message) => (this.message = message));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.notificationService.close();
  }
}
