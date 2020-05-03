import { Component, ElementRef } from "@angular/core";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent {
  message: string;

  constructor(private host: ElementRef<HTMLElement>) {}

  close() {
    this.host.nativeElement.remove();
  }
}
