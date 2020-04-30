import { Component } from "@angular/core";
import { UserFacade } from "../../security/user.facade";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
  constructor(private userFacade: UserFacade) {}

  logout() {
    this.userFacade.signout();
  }
}
