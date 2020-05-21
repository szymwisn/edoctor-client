import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { DiagnosisService } from "../services/diagnosis/diagnosis.service";
import { Diagnosis } from "../models/diagnosis/diagnosis.model";
import { DiagnosisFilters } from "../models/diagnosis/diagnosis-filters.model";
import { DiagnosesResponse } from "../models/diagnosis/diagnoses-response.model";
import { NotificationService } from "../services/utils/notification.service";
import { LoadingService } from "../services/utils/loading.service";
import { Sorting } from "../models/diagnosis/sorting";

class State {
  diagnoses: Diagnosis[] = [];
  diagnosis: Diagnosis = {
    date: null,
    description: null,
    disease: null,
    id: null,
    probability: null,
    tips: null,
  };
  currentPage: number = 1;
  totalPages: number = 1;
  filters: DiagnosisFilters = null;
  sorting: Sorting = Sorting.DATE_DESC;
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

  sorting$: Observable<Sorting> = this.state$.pipe(
    map((state) => state.sorting)
  );

  constructor(
    private diagnoseService: DiagnosisService,
    private notificationService: NotificationService,
    private loadingService: LoadingService
  ) {}

  saveDiagnosis(userId: string, diagnosis: Diagnosis) {
    this.loadingService.start();
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
        },
        () => {
          this.loadingService.stop();
        }
      );
  }

  changeFilters(userId: string, filters: DiagnosisFilters) {
    this.state$.next((this.state = { ...this.state, currentPage: 1, filters }));
    this.getDiagnoses(userId);
  }

  changeSorting(userId: string, sorting: Sorting) {
    this.state$.next((this.state = { ...this.state, currentPage: 1, sorting }));
    this.getDiagnoses(userId);
  }

  resetFilters(userId: string) {
    this.state$.next(
      (this.state = { ...this.state, currentPage: 1, filters: null })
    );
    this.getDiagnoses(userId);
  }

  switchPage(userId: string, pageNumber: number) {
    this.state$.next((this.state = { ...this.state, currentPage: pageNumber }));
    this.getDiagnoses(userId);
  }

  getDiagnoses(userId: string) {
    this.loadingService.start();
    this.diagnoseService
      .fetchDiagnoses(
        userId,
        this.state.currentPage,
        this.state.sorting,
        this.state.filters
      )
      .pipe(take(1))
      .subscribe(
        (response: DiagnosesResponse) => {
          this.state$.next(
            (this.state = {
              ...this.state,
              diagnoses: response[0],
              totalPages: response[1],
            })
          );
        },
        (error) => {
          this.loadingService.stop();
          this.notificationService.addNotification(
            "Problem with server connection"
          );
        },
        () => {
          this.loadingService.stop();
        }
      );
  }

  getDiagnosis(userId: string, diagnosisId?: string) {
    this.loadingService.start();
    this.diagnoseService
      .fetchDiagnosis(userId, diagnosisId)
      .pipe(take(1))
      .subscribe(
        (diagnosis) => {
          this.state$.next((this.state = { ...this.state, diagnosis }));
        },
        (error) => {
          this.loadingService.stop();
          this.notificationService.addNotification(
            "Problem with server connection"
          );
        },
        () => {
          this.loadingService.stop();
        }
      );
  }
}
