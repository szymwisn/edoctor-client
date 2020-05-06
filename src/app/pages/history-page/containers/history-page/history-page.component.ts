import {
  Component,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
} from "@angular/core";
import { UserFacade } from "src/app/facades/user.facade";
import { DiagnosisFacade } from "src/app/facades/diagnosis.facade";
import { Observable, combineLatest } from "rxjs";
import { Diagnosis } from "src/app/models/diagnosis/diagnosis.model";
import { DecodedToken } from "src/app/models/user/token.model";
import { map, take } from "rxjs/operators";
import { ModalService } from "src/app/services/utils/modal.service";
import { Disease } from "src/app/models/diagnosis/diseases";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-history-page",
  templateUrl: "./history-page.component.html",
  styleUrls: ["./history-page.component.scss"],
})
export class HistoryPageComponent {
  @ViewChild("filtersModalContent") filtersModalContent: TemplateRef<any>;

  diseases: Disease[] = [
    Disease.HEALTHY,
    Disease.CORONARY_ARTERY,
    Disease.VARIANT_ANGINA,
    Disease.MYOCARDIAL_INFARCTION_TRANSMURAL,
    Disease.MYOCARDIAL_INFARCTION_SUBENDOCARDIAL,
    Disease.NON_HEART_RELATED,
  ];

  form: FormGroup;

  allData$: Observable<{
    token: DecodedToken;
    diagnoses: Diagnosis[];
    currentPage: number;
    totalPages: number;
  }>;

  constructor(
    private userFacade: UserFacade,
    private diagnosisFacade: DiagnosisFacade,
    private modalService: ModalService,
    private viewContainerRef: ViewContainerRef,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.modalService.setViewContainerRef(this.viewContainerRef);

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

    this.form = this.fb.group({
      diseases: "",
      minProbability: ["0", Validators.required],
      maxProbability: ["100", Validators.required],
      dateFrom: "",
      dateTo: "",
    });
  }

  changePage(page: number, userId: string) {
    this.diagnosisFacade.switchPage(userId, page);
  }

  openFiltersModal() {
    this.modalService.openModal(this.filtersModalContent);
  }

  applyFilters(userId: string) {
    this.diagnosisFacade.changeFilters(userId, this.form.value);
    console.log(this.form.value);
  }

  applySearchPhrase(phrase: string, userId: string) {
    this.diagnosisFacade.changeSearchPhrase(userId, phrase);
  }

  resetFilters(userId: string) {
    this.form.reset({
      diseases: "",
      minProbability: "0",
      maxProbability: "100",
      dateFrom: "",
      dateTo: "",
    });
    this.diagnosisFacade.resetFilters(userId);
  }

  openDiagnosis(diagnosis: Diagnosis) {
    this.router.navigate(["/diagnosis", diagnosis.id]);
  }
}
