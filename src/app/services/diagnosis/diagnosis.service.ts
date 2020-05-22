import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Diagnosis } from "../../models/diagnosis/diagnosis.model";
import { DiagnosisFilters } from "../../models/diagnosis/diagnosis-filters.model";
import { DiagnosesResponse } from "src/app/models/diagnosis/diagnoses-response.model";
import { Sorting } from "src/app/models/diagnosis/sorting";

@Injectable({
  providedIn: "root",
})
export class DiagnosisService {
  constructor(private http: HttpClient) {}

  fetchDiagnoses(
    userId: string,
    pageNumber: number,
    sorting: Sorting,
    filters?: DiagnosisFilters
  ): Observable<DiagnosesResponse> {
    if (filters) {
      return this.http.get<DiagnosesResponse>("api/diagnoses", {
        params: {
          userId: "18",
          pageNumber: pageNumber.toString(),
          diseases: filters.diseases.toString(),
          minProbability: filters.minProbability.toString(),
          maxProbability: filters.maxProbability.toString(),
          dateFrom: filters.dateFrom.toString(),
          dateTo: filters.dateTo.toString(),
          sorting: sorting.toString(),
        },
      });
    } else {
      return this.http.get<DiagnosesResponse>("api/diagnoses", {
        params: {
          userId: "18",
          pageNumber: pageNumber.toString(),
          sorting: sorting.toString(),
        },
      });
    }
  }

  fetchDiagnosis(userId: string, diagnosisId?: string): Observable<Diagnosis> {
    if (diagnosisId) {
      return this.http.get<Diagnosis>("api/diagnosis", {
        params: {
          userId: "18",
          diagnosisId,
        },
      });
    } else {
      return this.http.get<Diagnosis>("api/diagnosis", {
        params: {
          userId: "18",
        },
      });
    }
  }

  saveDiagnosis(userId: string, diagnosis: Diagnosis): Observable<Diagnosis> {
    return this.http.post<Diagnosis>("api/savediagnosis", {
      userId,
      ...diagnosis,
    });
  }
}
