import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Diagnosis } from "src/app/models/diagnosis/diagnosis.model";
import { ExaminationForm } from "src/app/models/examination/examination-form.model";
import { PainLocation } from "src/app/models/examination/pain-location";
import { ChestPainRadiation } from "src/app/models/examination/chest-pain-radiation";
import { OnsetOfPain } from "src/app/models/examination/onset-of-pain";
import { PainCharacter } from "src/app/models/examination/pain-character";
import { DurationOfTheLastEpisode } from "src/app/models/examination/duration-of-the-last-episode";
import { AssociatedSymptoms } from "src/app/models/examination/associated-symptoms";
import { PalliativeFactors } from "src/app/models/examination/palliative-factors";
import { HistoryOfSimiliarPain } from "src/app/models/examination/history-of-similiar-pain";
import { PastMedicalHistory } from "src/app/models/examination/past-medical-history";
import { CurrentMedicationUsage } from "src/app/models/examination/current-medication-usage";
import { PhysicalExaminations } from "src/app/models/examination/physical-examinations";
import { EcgExamination } from "src/app/models/examination/ecg-examination";
import { User } from "src/app/models/user/user.model";
import { DecodedToken } from "src/app/models/user/token.model";

@Injectable({
  providedIn: "root",
})
export class ExaminationService {
  constructor(private http: HttpClient) {}

  sendExaminationForm(
    form: ExaminationForm,
    user: User,
    token: DecodedToken
  ): Observable<Diagnosis> {
    const body = {
      userId: "18",
      age: user.age,
      sex: user.sex,
      ...this.convertFormToBody(form),
    };

    console.log(body);

    return this.http.post<Diagnosis>("api/examination", body);
  }

  private convertFormToBody(form): any {
    return {
      painLocation: this.getPainLocation(form.painLocation),
      chestPainRadiation: this.getChestPainRadiation(form.chestPainRadiation),
      painCharacter: this.getPainCharacter(form.painCharacter),
      onsetOfPain: this.getOnsetOfPain(form.onsetOfPain),
      numberOfHoursSinceOnset: form.numberOfHoursSinceOnset,
      durationOfTheLastEpisode: this.getDurationOfTheLastEpisode(
        form.durationOfTheLastEpisode
      ),
      nausea: form.associatedSymptoms.includes(AssociatedSymptoms.NAUSEA)
        ? 1
        : 0,
      diaphoresis_associatedSymptoms: form.associatedSymptoms.includes(
        AssociatedSymptoms.DIAPHORESIS
      )
        ? 1
        : 0,
      palpitations: form.associatedSymptoms.includes(
        AssociatedSymptoms.PALPITATIONS
      )
        ? 1
        : 0,
      dyspnea: form.associatedSymptoms.includes(AssociatedSymptoms.DYSPNEA)
        ? 1
        : 0,
      dizzinessSyncope: form.associatedSymptoms.includes(
        AssociatedSymptoms.DIZZINESS_SYNCOPE
      )
        ? 1
        : 0,
      burping: form.associatedSymptoms.includes(AssociatedSymptoms.BURPING)
        ? 1
        : 0,
      palliativeFactors: this.getPalliativeFactors(form.palliativeFactor),
      priorChestPain: form.historyOfSimiliarPain.includes(
        HistoryOfSimiliarPain.PRIOR_CHEST_PAIN_OF_THIS_TYPE
      )
        ? 1
        : 0,
      physicianConsultedForPriorPain: form.historyOfSimiliarPain.includes(
        HistoryOfSimiliarPain.PHYSICIAN_CONSULTED_FOR_PRIOR_PAIN
      )
        ? 1
        : 0,
      priorPainRelatedToHeart: form.historyOfSimiliarPain.includes(
        HistoryOfSimiliarPain.PRIOR_PAIN_RELATED_TO_HEART
      )
        ? 1
        : 0,
      priorPainDueToMI: form.historyOfSimiliarPain.includes(
        HistoryOfSimiliarPain.PRIOR_PAIN_DUE_TO_MI
      )
        ? 1
        : 0,
      priorPainDueToAnginaPrectoris: form.historyOfSimiliarPain.includes(
        HistoryOfSimiliarPain.PRIOR_PAIN_DUE_TO_ANGINA_PRECTORIS
      )
        ? 1
        : 0,
      priorMI: form.pastMedicalHistory.includes(PastMedicalHistory.PRIOR_MI)
        ? 1
        : 0,
      priorAnginaPrectoris: form.pastMedicalHistory.includes(
        PastMedicalHistory.PRIOR_ANGINA_PRECTORIS
      )
        ? 1
        : 0,
      priorAtypicalChestPain: form.pastMedicalHistory.includes(
        PastMedicalHistory.PRIOR_ATYPICAL_CHEST_PAIN
      )
        ? 1
        : 0,
      congestiveHeartFailure: form.pastMedicalHistory.includes(
        PastMedicalHistory.CONGESTIVE_HEART_FAILURE
      )
        ? 1
        : 0,
      peripheralVascularDisease: form.pastMedicalHistory.includes(
        PastMedicalHistory.PERIPHERAL_VASCULAR_DISEASE
      )
        ? 1
        : 0,
      hiatalHernia: form.pastMedicalHistory.includes(
        PastMedicalHistory.HIATAL_HERNIA
      )
        ? 1
        : 0,
      hypertension: form.pastMedicalHistory.includes(
        PastMedicalHistory.HYPERTENSION
      )
        ? 1
        : 0,
      diabetes: form.pastMedicalHistory.includes(PastMedicalHistory.DIABETES)
        ? 1
        : 0,
      smoker: form.pastMedicalHistory.includes(PastMedicalHistory.SMOKER)
        ? 1
        : 0,
      diuretics: form.currentMedicationUsage.includes(
        CurrentMedicationUsage.DIURETICS
      )
        ? 1
        : 0,
      nitrates: form.currentMedicationUsage.includes(
        CurrentMedicationUsage.NITRATES
      )
        ? 1
        : 0,
      betaBlockers: form.currentMedicationUsage.includes(
        CurrentMedicationUsage.BETA_BLOCKERS
      )
        ? 1
        : 0,
      digitalis: form.currentMedicationUsage.includes(
        CurrentMedicationUsage.DIGITALIS
      )
        ? 1
        : 0,
      nonSteroidalAntiInflammatory: form.currentMedicationUsage.includes(
        CurrentMedicationUsage.NONSTEROIDAL_ANTIINFLAMMATORY
      )
        ? 1
        : 0,
      antacidsH2Blockers: form.currentMedicationUsage.includes(
        CurrentMedicationUsage.ANTACIDS_H2_BLOCKERS
      )
        ? 1
        : 0,
      systolicBloodPressure: form.systolicBloodPressure,
      diastolicBloodPressure: form.diastolicBloodPressure,
      heartRate: form.heartRate,
      respirationRate: form.respirationRate,
      rales: form.physicalExaminations.includes(PhysicalExaminations.RALES)
        ? 1
        : 0,
      cyanosis: form.physicalExaminations.includes(PhysicalExaminations.CYANOIS)
        ? 1
        : 0,
      pallor: form.physicalExaminations.includes(PhysicalExaminations.PALLOR)
        ? 1
        : 0,
      systolicMurmur: form.physicalExaminations.includes(
        PhysicalExaminations.SYSTOLIC_MURMUR
      )
        ? 1
        : 0,
      diastolicMurmur: form.physicalExaminations.includes(
        PhysicalExaminations.DIASTOLIC_MURMUR
      )
        ? 1
        : 0,
      oedma: form.physicalExaminations.includes(PhysicalExaminations.OEDEMA)
        ? 1
        : 0,
      s3Gallop: form.physicalExaminations.includes(
        PhysicalExaminations.S3_GALLOP
      )
        ? 1
        : 0,
      s4Gallop: form.physicalExaminations.includes(
        PhysicalExaminations.S4_GALLOP
      )
        ? 1
        : 0,
      chestWallTenderness: form.physicalExaminations.includes(
        PhysicalExaminations.CHEST_WALL_TENDERNESS
      )
        ? 1
        : 0,
      diaphoresis_physicalExaminations: form.physicalExaminations.includes(
        PhysicalExaminations.DIAPHORESIS
      )
        ? 1
        : 0,
      newQWave: form.ecgExamination.includes(EcgExamination.NEW_Q_WAVE) ? 1 : 0,
      newSTSegmentElevation: form.ecgExamination.includes(
        EcgExamination.NEW_ST_SEGMENT_ELEVATION
      )
        ? 1
        : 0,
      anySTSegmentElevation: form.ecgExamination.includes(
        EcgExamination.ANY_ST_SEGMENT_ELEVATION
      )
        ? 1
        : 0,
      newSTSegmentDepression: form.ecgExamination.includes(
        EcgExamination.NEW_ST_SEGMENT_DEPRESSION
      )
        ? 1
        : 0,
      anySTSegmentDepression: form.ecgExamination.includes(
        EcgExamination.ANY_ST_SEGMENT_DEPRESSION
      )
        ? 1
        : 0,
      newTWaveInversion: form.ecgExamination.includes(
        EcgExamination.NEW_T_WAVE_INVERSION
      )
        ? 1
        : 0,
      anyTWaveInversion: form.ecgExamination.includes(
        EcgExamination.ANY_T_WAVE_INVERSION
      )
        ? 1
        : 0,
      newIntraventicularConductionDefect: form.ecgExamination.includes(
        EcgExamination.NEW_INTRAVENTRICULAR_CONDUCTION_DEFECT
      )
        ? 1
        : 0,
      anyIntraventicularConductionDefect: form.ecgExamination.includes(
        EcgExamination.ANY_INTRAVENTRICULAR_CONDUCTION_DEFECT
      )
        ? 1
        : 0,
    };
  }

  private getPainLocation(val: string): number {
    switch (val) {
      case PainLocation.RETROSTERNAL:
        return 1;
      case PainLocation.LEFT_PRECORDIAL:
        return 2;
      case PainLocation.RIGHT_PRECORDIAL:
        return 3;
      case PainLocation.LEFT_LATERAL_CHEST:
        return 4;
      case PainLocation.RIGHT_LATERAL_CHEST:
        return 5;
      case PainLocation.ABDOMINAL:
        return 6;
      case PainLocation.BACK:
        return 7;
      case PainLocation.OTHER:
        return 8;
    }
  }

  private getChestPainRadiation(val: string): number {
    switch (val) {
      case ChestPainRadiation.NECK:
        return 1;
      case ChestPainRadiation.JAW:
        return 2;
      case ChestPainRadiation.LEFT_SHOULDER:
        return 3;
      case ChestPainRadiation.LEFT_ARM:
        return 4;
      case ChestPainRadiation.RIGHT_SHOULDER:
        return 5;
      case ChestPainRadiation.BACK:
        return 6;
      case ChestPainRadiation.ABDOMEN:
        return 7;
      case ChestPainRadiation.OTHER:
        return 8;
    }
  }

  private getPainCharacter(val: string): number {
    switch (val) {
      case PainCharacter.CONSTANT:
        return 1;
      case PainCharacter.EPIDOSIC:
        return 2;
      case PainCharacter.EPIDOSIC_THAN_CONSTANT:
        return 3;
      case PainCharacter.CONSTANT_THAN_EPIDOSIC:
        return 4;
      case PainCharacter.DULL_PRESSURE:
        return 5;
      case PainCharacter.SHARP:
        return 6;
      case PainCharacter.BURNING:
        return 7;
      case PainCharacter.PLEURITIC:
        return 8;
    }
  }

  private getOnsetOfPain(val: string): number {
    switch (val) {
      case OnsetOfPain.WITH_EXERTION:
        return 1;
      case OnsetOfPain.AT_REST:
        return 2;
      case OnsetOfPain.ASLEEP:
        return 3;
    }
  }

  private getDurationOfTheLastEpisode(val: string): number {
    switch (val) {
      case DurationOfTheLastEpisode.LESS_THAN_5_MINUTES:
        return 1;
      case DurationOfTheLastEpisode.FIVE_THIRTY_MIN:
        return 2;
      case DurationOfTheLastEpisode.THIRTY_SIXTY_MIN:
        return 3;
      case DurationOfTheLastEpisode.ONE_SIX_HOURS:
        return 4;
      case DurationOfTheLastEpisode.SIX_TWELVE_HOURS:
        return 5;
      case DurationOfTheLastEpisode.GREATER_THAN_TWELVE_HOURS:
        return 6;
    }
  }

  private getPalliativeFactors(val: string): number {
    switch (val) {
      case PalliativeFactors.NONE:
        return 1;
      case PalliativeFactors.RELIEVED_BY_NITROGLYCERIN_WITHIN_5_MIN:
        return 2;
      case PalliativeFactors.RELIEVED_BY_NITROGLYCERIN_AFTER_MORE_THAN_5_MIN:
        return 3;
      case PalliativeFactors.ANTACIDS:
        return 4;
      case PalliativeFactors.ANALGESIA_EXCEPT_MORPHINE:
        return 5;
      case PalliativeFactors.MORPHINE:
        return 6;
    }
  }
}
