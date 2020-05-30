import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { take } from "rxjs/operators";
import { PainLocation } from "src/app/models/examination/pain-location";
import { ChestPainRadiation } from "src/app/models/examination/chest-pain-radiation";
import { PainCharacter } from "src/app/models/examination/pain-character";
import { OnsetOfPain } from "src/app/models/examination/onset-of-pain";
import { PalliativeFactors } from "src/app/models/examination/palliative-factors";
import { AssociatedSymptoms } from "src/app/models/examination/associated-symptoms";
import { PastMedicalHistory } from "src/app/models/examination/past-medical-history";
import { CurrentMedicationUsage } from "src/app/models/examination/current-medication-usage";
import { PhysicalExaminations } from "src/app/models/examination/physical-examinations";
import { EcgExamination } from "src/app/models/examination/ecg-examination";
import { ExaminationFormAvailableValues } from "src/app/models/examination/examination-form-available-values.model";
import { DurationOfTheLastEpisode } from "src/app/models/examination/duration-of-the-last-episode";
import { HistoryOfSimiliarPain } from "src/app/models/examination/history-of-similiar-pain";
import { ExaminationService } from "src/app/services/examination/examination.service";
import { NotificationService } from "src/app/services/utils/notification.service";
import { UserService } from "src/app/services/user/user.service";
import { UserFacade } from "src/app/facades/user.facade";
import { AuthService } from "src/app/services/user/auth.service";

@Component({
  selector: "app-examination-page",
  templateUrl: "./examination-page.component.html",
  styleUrls: ["./examination-page.component.scss"],
})
export class ExaminationPageComponent {
  formSubmitted: boolean = false;
  form: FormGroup;
  availableValues: ExaminationFormAvailableValues;

  constructor(
    private userFacade: UserFacade,
    private examinationService: ExaminationService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initializeFormAvailableValues();

    this.form = this.fb.group({
      painLocation: ["", [Validators.required]],
      chestPainRadiation: ["", [Validators.required]],
      painCharacter: ["", [Validators.required]],
      onsetOfPain: ["", [Validators.required]],
      durationOfTheLastEpisode: ["", [Validators.required]],
      numberOfHoursSinceOnset: ["", [Validators.required]],
      historyOfSimiliarPain: [""],
      palliativeFactor: ["", [Validators.required]],
      associatedSymptoms: [""],
      pastMedicalHistory: [""],
      currentMedicationUsage: [""],
      physicalExaminations: [""],
      systolicBloodPressure: ["", [Validators.required]],
      diastolicBloodPressure: ["", [Validators.required]],
      heartRate: ["", [Validators.required]],
      respirationRate: ["", [Validators.required]],
      ecgExamination: [""],
    });
  }

  submitForm() {
    this.formSubmitted = true;
    window.scrollTo(0, 0);

    if (this.form.valid) {
      console.log(this.form.value);
      this.userFacade.profile$.pipe(take(1)).subscribe((user) => {
        this.examinationService
          .sendExaminationForm(
            this.form.value,
            user,
            this.authService.decodeToken(this.authService.getToken())
          )
          .pipe(take(1))
          .subscribe(
            (diagnosis) => {
              this.form.reset();
              this.router.navigate(["diagnosis"]);
            },
            (error) => {
              this.notificationService.addNotification(
                "Error with backend connection."
              );
            }
          );
      });
    }
  }

  private initializeFormAvailableValues() {
    this.availableValues = new ExaminationFormAvailableValues();
    this.availableValues.painLocations = Object.values(PainLocation);
    this.availableValues.chestPainRadiations = Object.values(
      ChestPainRadiation
    );
    this.availableValues.painCharacters = Object.values(PainCharacter);
    this.availableValues.onsetsOfPain = Object.values(OnsetOfPain);
    this.availableValues.durationsOfTheLastEpisode = Object.values(
      DurationOfTheLastEpisode
    );
    this.availableValues.historiesOfSimiliarPain = Object.values(
      HistoryOfSimiliarPain
    );
    this.availableValues.palliativeFactors = Object.values(PalliativeFactors);
    this.availableValues.associatedSymptoms = Object.values(AssociatedSymptoms);
    this.availableValues.pastMedicalHistories = Object.values(
      PastMedicalHistory
    );
    this.availableValues.currentMedicationUsages = Object.values(
      CurrentMedicationUsage
    );
    this.availableValues.physicalExaminations = Object.values(
      PhysicalExaminations
    );
    this.availableValues.ecgExaminations = Object.values(EcgExamination);
  }
}
