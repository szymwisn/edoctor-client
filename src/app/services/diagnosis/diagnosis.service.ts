import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Diagnosis } from "../../models/diagnosis/diagnosis.model";
import { DiagnosisFilters } from "../../models/diagnosis/diagnosis-filters.model";
import { Disease } from "../../models/diagnosis/diseases";

const diagnoses: Diagnosis[] = [
  {
    id: "1",
    date: new Date(),
    disease: Disease.CORONARY_ARTERY,
    description: "Wrong news, doc",
    probability: 100,
    tips: ["eat less", "workout"],
  },
  {
    id: "2",
    date: new Date(),
    disease: Disease.NON_HEART_RELATED,
    description: "Lorem ipsum",
    probability: 99,
    tips: ["eat less", "workout", "live your life"],
  },
  {
    id: "3",
    date: new Date(),
    disease: Disease.HEALTHY,
    description: "Niceee, ezpz",
    probability: 92,
    tips: ["eat less", "live your life"],
  },
  {
    id: "4",
    date: new Date(),
    disease: Disease.MYOCARDIAL_INFARCTION_TRANSMURAL,
    description: "Sample something",
    probability: 93,
    tips: ["eat less", "workout", "live your life"],
  },
  {
    id: "5",
    date: new Date(),
    disease: Disease.HEALTHY,
    description: "Dolor sit",
    probability: 91,
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

  fetchDiagnosis(userId: string, diagnosisId?: string): Observable<Diagnosis> {
    if (diagnosisId) {
      // return this.http.get<Diagnosis>("api/diagnosis", {
      //   params: {
      //     userId,
      //     diagnosisId,
      //   },
      // });
      return of(
        diagnoses.filter((diagnosis) => diagnosis.id === diagnosisId)[0]
      );
    } else {
      // return this.http.get<Diagnosis>("api/diagnosis", {
      //   params: {
      //     userId,
      //   },
      // });
      return of(diagnoses[0]);
    }
  }

  saveDiagnosis(userId: string, diagnosis: Diagnosis): Observable<Diagnosis> {
    return this.http.post<Diagnosis>("api/savediagnosis", {
      userId,
      diagnosis,
    });
  }
}
