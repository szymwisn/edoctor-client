import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Diagnosis } from "../models/diagnosis/diagnosis.model";
import { DiagnosisFilters } from "../models/diagnosis/diagnosis-filters.model";
import { Disease } from "../models/diagnosis/diseases";

const diagnoses: Diagnosis[] = [
  {
    date: new Date(),
    disease: Disease.CORONARY_ARTERY,
    description: "Wrong news, doc",
    probability: 100,
    tips: ["eat less", "workout"],
  },
  {
    date: new Date(),
    disease: Disease.HEALTHY,
    description: "Niceee, ezpz",
    probability: 97,
    tips: ["eat less", "workout", "live your life"],
  },
  {
    date: new Date(),
    disease: Disease.HEALTHY,
    description: "Niceee, ezpz",
    probability: 92,
    tips: ["eat less", "live your life"],
  },
  {
    date: new Date(),
    disease: Disease.HEALTHY,
    description: "Niceee, ezpz",
    probability: 97,
    tips: ["eat less", "workout", "live your life"],
  },
  {
    date: new Date(),
    disease: Disease.HEALTHY,
    description: "Niceee, ezpz",
    probability: 97,
    tips: ["eat less", "workout", "live your life"],
  },
];

@Injectable({
  providedIn: "root",
})
export class DiagnosisService {
  constructor(private http: HttpClient) {}

  fetchDiagnoses(
    userId: string,
    pageNumber: number,
    filters: DiagnosisFilters,
    searchPhrase: string
  ): Observable<Diagnosis[]> {
    // return this.http.get<Diagnosis[]>("api/diagnoses", {
    //   params: {
    //     userId,
    //     pageNumber: pageNumber.toString(),
    //     searchPhrase,
    //     diseases: filters.diseases.toString(),
    //     minProbability: filters.minProbability.toString(),
    //     maxProbability: filters.maxProbability.toString(),
    //     dateFrom: filters.dateFrom.toString(),
    //     dateTo: filters.dateTo.toString(),
    //   },
    // });
    return of(diagnoses);
  }

  fetchLatestDiagnosis(userId: string): Observable<Diagnosis> {
    // return this.http.get<Diagnosis>("api/latestdiagnose", {
    //   params: {
    //     userId,
    //   },
    // });
    return of(diagnoses[0]);
  }

  saveDiagnosis(userId: string, diagnosis: Diagnosis): Observable<Diagnosis> {
    return this.http.post<Diagnosis>("api/savediagnosis", {
      userId,
      diagnosis,
    });
  }
}
