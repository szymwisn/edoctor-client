import { Component, ElementRef } from "@angular/core";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
  constructor(private host: ElementRef<HTMLElement>) {}

  close() {
    this.host.nativeElement.remove();
  }
}
