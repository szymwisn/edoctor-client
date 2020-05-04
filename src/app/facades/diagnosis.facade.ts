import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DiagnosisService } from "../services/diagnosis.service";
import { Diagnosis } from "../models/diagnosis/diagnosis.model";
import { DiagnosisFilters } from "../models/diagnosis/diagnosis-filters.model";

class State {
  diagnoses: Diagnosis[] = null;
  diagnosis: Diagnosis = null;
  currentPage: number = 1;
  totalPages: number = 5;
  filters: DiagnosisFilters = null;
  searchPhrase: string = null;
}

@Injectable({ providedIn: "root" })
export class DiagnosisFacade {
  private state = new State();
  state$ = new BehaviorSubject<State>(this.state);

  diagnoses$: Observable<Diagnosis[]> = this.state$.pipe(
    map((state) => state.diagnoses)
  );

  diagnosis$: Observable<Diagnosis> = this.state$.pipe(
    map((state) => state.diagnosis)
  );

  currentPage$: Observable<number> = this.state$.pipe(
    map((state) => state.currentPage)
  );

  totalPages$: Observable<number> = this.state$.pipe(
    map((state) => state.totalPages)
  );

  filters$: Observable<DiagnosisFilters> = this.state$.pipe(
    map((state) => state.filters)
  );

  searchPhrase$: Observable<string> = this.state$.pipe(
    map((state) => state.searchPhrase)
  );

  constructor(private diagnoseService: DiagnosisService) {}

  saveDiagnosis(userId: string, diagnosis: Diagnosis) {
    this.diagnoseService.saveDiagnosis(userId, diagnosis).subscribe(
      (success) => {
        //TODO: show success notification
        console.log("History fetched");
      },
      (error) => {
        //TODO: show error notification
        console.log("Problem with server connection", error);
      }
    );
  }

  changeFilters(userId: string, filters: DiagnosisFilters) {
    this.state$.next((this.state = { ...this.state, filters }));
    this.getDiagnoses(userId);
  }

  changeSearchPhrase(userId: string, searchPhrase: string) {
    this.state$.next((this.state = { ...this.state, searchPhrase }));
    this.getDiagnoses(userId);
  }

  resetFilters(userId: string) {
    this.state$.next((this.state = { ...this.state, filters: null }));
    this.getDiagnoses(userId);
  }

  switchPage(userId: string, pageNumber: number) {
    this.state$.next((this.state = { ...this.state, currentPage: pageNumber }));
    this.getDiagnoses(userId);
  }

  getDiagnoses(userId: string) {
    this.diagnoseService
      .fetchDiagnoses(
        userId,
        this.state.currentPage,
        this.state.filters,
        this.state.searchPhrase
      )
      .subscribe(
        (diagnoses) =>
          this.state$.next((this.state = { ...this.state, diagnoses })),
        (error) => {
          //TODO: show error notification
          console.log("Problem with server connection", error);
        }
      );
  }

  getDiagnosis(userId: string, diagnosisId?: string) {
    this.diagnoseService.fetchDiagnosis(userId, diagnosisId).subscribe(
      (diagnosis) => {
        this.state$.next((this.state = { ...this.state, diagnosis }));
        console.log(diagnosis);
      },
      (error) => {
        //TODO: show error notification
        console.log("Problem with server connection", error);
      }
    );
  }
}
