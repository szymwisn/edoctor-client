import { Disease } from "./diseases";

export class DiagnosisFilters {
  phrase: string;
  diseases: Disease[];
  minProbability: number;
  maxProbability: number;
  dateFrom: Date;
  dateTo: Date;
}
