import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { DiagnosisService } from "../services/diagnosis/diagnosis.service";
import { Diagnosis } from "../models/diagnosis/diagnosis.model";
import { DiagnosisFilters } from "../models/diagnosis/diagnosis-filters.model";
import { NotificationService } from "../services/utils/notification.service";

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

  constructor(
    private diagnoseService: DiagnosisService,
    private notificationService: NotificationService
  ) {}

  saveDiagnosis(userId: string, diagnosis: Diagnosis) {
    this.diagnoseService
      .saveDiagnosis(userId, diagnosis)
      .pipe(take(1))
      .subscribe(
        (success) => {
          this.notificationService.addNotification("Diagnosis saved");
        },
        (error) => {
          this.notificationService.addNotification(
            "Problem with server connection"
          );
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
          this.notificationService.addNotification(
            "Problem with server connection"
          );
        }
      );
  }

  getDiagnosis(userId: string, diagnosisId?: string) {
    this.diagnoseService
      .fetchDiagnosis(userId, diagnosisId)
      .pipe(take(1))
      .subscribe(
        (diagnosis) => {
          this.state$.next((this.state = { ...this.state, diagnosis }));
        },
        (error) => {
          this.notificationService.addNotification(
            "Problem with server connection"
          );
        }
      );
  }
}
