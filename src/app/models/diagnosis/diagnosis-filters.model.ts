import { Disease } from "./diseases";

export class DiagnosisFilters {
  diseases: Disease[];
  minProbability: number;
  maxProbability: number;
  dateFrom: Date;
  dateTo: Date;

  getStr(): string {
    return "xd";
  }
}
