import {
  Component,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  OnInit,
  ElementRef,
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
import { DiagnosisFilters } from "src/app/models/diagnosis/diagnosis-filters.model";
import { Sorting } from "src/app/models/diagnosis/sorting";

@Component({
  selector: "app-history-page",
  templateUrl: "./history-page.component.html",
  styleUrls: ["./history-page.component.scss"],
})
export class HistoryPageComponent implements OnInit {
  @ViewChild("filtersModalContent") filtersModalContent: TemplateRef<any>;

  filtersModal: ElementRef;
  form: FormGroup;

  diseases: Disease[] = [
    Disease.NON_HEART_RELATED,
    Disease.CORONARY_ARTERY,
    Disease.VARIANT_ANGINA,
    Disease.MYOCARDIAL_INFARCTION_TRANSMURAL,
    Disease.MYOCARDIAL_INFARCTION_SUBENDOCARDIAL,
  ];

  allData$: Observable<{
    token: DecodedToken;
    diagnoses: Diagnosis[];
    currentPage: number;
    totalPages: number;
    filters: DiagnosisFilters;
    sorting: Sorting;
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
      this.diagnosisFacade.filters$,
      this.diagnosisFacade.sorting$,
    ]).pipe(
      map(([token, diagnoses, currentPage, totalPages, filters, sorting]) => ({
        token,
        diagnoses,
        currentPage,
        totalPages,
        filters,
        sorting,
      }))
    );

    this.form = this.fb.group({
      diseases: "",
      minProbability: ["0", Validators.required],
      maxProbability: ["100", Validators.required],
      dateFrom: "",
      dateTo: "",
    });
  }

  ngOnInit() {
    this.diagnosisFacade.filters$.pipe(take(1)).subscribe((filters) => {
      if (filters) {
        this.form.setValue(filters);
      }
    });
  }

  sortByDate(currentSorting: Sorting, userId: string) {
    if (currentSorting === Sorting.DATE_ASC) {
      this.diagnosisFacade.changeSorting(userId, Sorting.DATE_DESC);
    } else {
      this.diagnosisFacade.changeSorting(userId, Sorting.DATE_ASC);
    }
  }

  sortByDisease(currentSorting: Sorting, userId: string) {
    if (currentSorting === Sorting.DISEASE_ASC) {
      this.diagnosisFacade.changeSorting(userId, Sorting.DISEASE_DESC);
    } else {
      this.diagnosisFacade.changeSorting(userId, Sorting.DISEASE_ASC);
    }
  }

  sortByProbability(currentSorting: Sorting, userId: string) {
    if (currentSorting === Sorting.PROBABILITY_ASC) {
      this.diagnosisFacade.changeSorting(userId, Sorting.PROBABILITY_DESC);
    } else {
      this.diagnosisFacade.changeSorting(userId, Sorting.PROBABILITY_ASC);
    }
  }

  changePage(page: number, userId: string) {
    this.diagnosisFacade.switchPage(userId, page);
  }

  openFiltersModal() {
    this.filtersModal = this.modalService.openModal(this.filtersModalContent);
  }

  applyFilters(userId: string) {
    this.diagnosisFacade.changeFilters(userId, this.form.value);
    this.filtersModal.nativeElement.remove();
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
    this.filtersModal.nativeElement.remove();
  }

  openDiagnosis(diagnosis: Diagnosis) {
    this.router.navigate(["/diagnosis", diagnosis.id]);
  }
}
