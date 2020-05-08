import { PainLocation } from "./pain-location";
import { ChestPainRadiation } from "./chest-pain-radiation";
import { PainCharacter } from "./pain-character";
import { OnsetOfPain } from "./onset-of-pain";
import { PalliativeFactors } from "./palliative-factors";
import { AssociatedSymptoms } from "./associated-symptoms";
import { PastMedicalHistory } from "./past-medical-history";
import { CurrentMedicationUsage } from "./current-medication-usage";
import { PhysicalExaminations } from "./physical-examinations";
import { EcgExamination } from "./ecg-examination";
import { DurationOfTheLastEpisode } from "./duration-of-the-last-episode";
import { HistoryOfSimiliarPain } from "./history-of-similiar-pain";

export class ExaminationFormAvailableValues {
  painLocations: PainLocation[];
  chestPainRadiations: ChestPainRadiation[];
  painCharacters: PainCharacter[];
  onsetsOfPain: OnsetOfPain[];
  durationsOfTheLastEpisode: DurationOfTheLastEpisode[];
  historiesOfSimiliarPain: HistoryOfSimiliarPain[];
  palliativeFactors: PalliativeFactors[];
  associatedSymptoms: AssociatedSymptoms[];
  pastMedicalHistories: PastMedicalHistory[];
  currentMedicationUsages: CurrentMedicationUsage[];
  physicalExaminations: PhysicalExaminations[];
  ecgExaminations: EcgExamination[];

  constructor() {}
}
