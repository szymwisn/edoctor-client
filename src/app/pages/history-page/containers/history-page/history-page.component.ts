import { Component } from "@angular/core";
import { UserFacade } from "src/app/facades/user.facade";
import { DiagnosisFacade } from "src/app/facades/diagnosis.facade";
import { Observable, combineLatest } from "rxjs";
import { Diagnosis } from "src/app/models/diagnosis/diagnosis.model";
import { DecodedToken } from "src/app/models/user/token.model";
import { map, take } from "rxjs/operators";

@Component({
  selector: "app-history-page",
  templateUrl: "./history-page.component.html",
  styleUrls: ["./history-page.component.scss"],
})
export class HistoryPageComponent {
  allData$: Observable<{
    token: DecodedToken;
    diagnoses: Diagnosis[];
    currentPage: number;
    totalPages: number;
  }>;

  constructor(
    private userFacade: UserFacade,
    private diagnosisFacade: DiagnosisFacade
  ) {
    this.allData$ = combineLatest([
      this.userFacade.token$,
      this.diagnosisFacade.diagnoses$,
      this.diagnosisFacade.currentPage$,
      this.diagnosisFacade.totalPages$,
    ]).pipe(
      map(([token, diagnoses, currentPage, totalPages]) => ({
        token,
        diagnoses,
        currentPage,
        totalPages,
      }))
    );

    this.userFacade.token$.pipe(take(1)).subscribe((token) => {
      this.diagnosisFacade.getDiagnoses(token.userId);
    });
  }

  changePage(page: number, userId: string) {
    this.diagnosisFacade.switchPage(userId, page);
    console.log(userId, page);
  }

  openFiltersModal() {}

  applyFilters() {
    console.log("filters applied");
  }

  searchByPhrase(phrase: string) {
    console.log(phrase);
  }
}
