import { PainLocation } from "./pain-location";
import { PainCharacter } from "./pain-character";
import { ChestPainRadiation } from "./chest-pain-radiation";
import { OnsetOfPain } from "./onset-of-pain";
import { DurationOfTheLastEpisode } from "./duration-of-the-last-episode";
import { HistoryOfSimiliarPain } from "./history-of-similiar-pain";
import { PalliativeFactors } from "./palliative-factors";
import { AssociatedSymptoms } from "./associated-symptoms";
import { PastMedicalHistory } from "./past-medical-history";
import { CurrentMedicationUsage } from "./current-medication-usage";
import { PhysicalExaminations } from "./physical-examinations";
import { EcgExamination } from "./ecg-examination";

export class ExaminationForm {
  painLocation: PainLocation;
  chestPainRadiation: ChestPainRadiation;
  painCharacter: PainCharacter;
  onsetOfPain: OnsetOfPain;
  durationOfTheLastEpisode: DurationOfTheLastEpisode;
  numberOfHoursSinceOnset: number;
  historyOfSimiliarPain: HistoryOfSimiliarPain;
  palliativeFactor: PalliativeFactors;
  associatedSymptoms: AssociatedSymptoms;
  pastMedicalHistory: PastMedicalHistory;
  currentMedicationUsage: CurrentMedicationUsage;
  physicalExaminations: PhysicalExaminations;
  systolicBloodPressure: number;
  diastolicBloodPressure: number;
  heartRate: number;
  respirationRate: number;
  ecgExamination: EcgExamination;
}
