import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { take, map } from "rxjs/operators";
import { Diagnosis } from "src/app/models/diagnosis/diagnosis.model";
import { Observable } from "rxjs";
import { DiagnosisFacade } from "src/app/facades/diagnosis.facade";
import { UserFacade } from "src/app/facades/user.facade";

@Component({
  selector: "app-diagnosis-page",
  templateUrl: "./diagnosis-page.component.html",
  styleUrls: ["./diagnosis-page.component.scss"],
})
export class DiagnosisPageComponent {
  diagnosis$: Observable<Diagnosis>;

  constructor(
    private userFacade: UserFacade,
    private diagnosisFacade: DiagnosisFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.diagnosis$ = this.diagnosisFacade.diagnosis$;

    this.route.paramMap
      .pipe(
        take(1),
        map((params) => params.get("id"))
      )
      .subscribe((diagnosisId) => {
        this.userFacade.token$.pipe(take(1)).subscribe((token) => {
          this.diagnosisFacade.getDiagnosis(token.userId, diagnosisId);
        });
      });
  }

  navigateBack() {
    const params = this.route.snapshot.params;
    if (params["id"]) {
      this.router.navigate(["/history"]);
    } else {
      this.router.navigate(["/profile"]);
    }
  }

  navigateToDoctors() {
    this.router.navigate(["/doctors"]);
  }
}
