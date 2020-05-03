import { Component, OnInit } from "@angular/core";
import { UserFacade } from "src/app/facades/user.facade";
import { Observable, combineLatest } from "rxjs";
import { User } from "src/app/models/user/user.model";
import { map } from "rxjs/operators";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"],
})
export class ProfilePageComponent {
  allData$: Observable<{
    profile: User;
  }>;

  constructor(private userFacade: UserFacade) {
    this.allData$ = combineLatest([this.userFacade.profile$]).pipe(
      map(([profile]) => ({ profile }))
    );
  }
}
