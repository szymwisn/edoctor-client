import { Component, HostListener } from "@angular/core";
import { UserFacade } from "../../security/user.facade";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
  mobileOpened: boolean = false;

  constructor(private userFacade: UserFacade) {}

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    if (event.target.innerWidth > 767) {
      this.mobileOpened = false;
    }
  }

  close() {
    this.mobileOpened = false;
  }

  open() {
    this.mobileOpened = true;
  }

  logout() {
    this.userFacade.signout();
  }
}
