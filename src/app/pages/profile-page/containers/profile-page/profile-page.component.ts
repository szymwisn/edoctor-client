import { Component, OnInit } from "@angular/core";
import { UserFacade } from "src/app/facades/user.facade";
import { Observable, combineLatest } from "rxjs";
import { User } from "src/app/models/user/user.model";
import { map, take } from "rxjs/operators";
import { DiagnosisFacade } from "src/app/facades/diagnosis.facade";
import { Diagnosis } from "src/app/models/diagnosis/diagnosis.model";

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.scss"],
})
export class ProfilePageComponent {
  allData$: Observable<{
    profile: User;
    diagnosis: Diagnosis;
  }>;

  constructor(
    private userFacade: UserFacade,
    private diagnosisFacade: DiagnosisFacade
  ) {
    this.allData$ = combineLatest([
      this.userFacade.profile$,
      this.diagnosisFacade.diagnosis$,
    ]).pipe(map(([profile, diagnosis]) => ({ profile, diagnosis })));
  }
}
