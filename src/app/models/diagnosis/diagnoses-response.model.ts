import { Diagnosis } from "./diagnosis.model";

export class DiagnosesResponse {
  diagnoses: Diagnosis[];
  totalPages: number;
}
