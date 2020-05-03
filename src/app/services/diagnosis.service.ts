import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Diagnosis } from "../models/diagnosis/diagnosis.model";
import { History } from "../models/diagnosis/history.model";

const tempHistory: History = {
  diagnoses: [
    {
      date: new Date(),
      name: "Cancer",
      description: "Wrong news, doc",
      probability: 98,
      tips: ["eat less", "workout"],
    },
    {
      date: new Date(),
      name: "Not cancer",
      description: "Niceee, ezpz",
      probability: 97,
      tips: ["eat less", "workout", "live your life"],
    },
  ],
};

@Injectable({
  providedIn: "root",
})
export class DiagnosisService {
  constructor(private http: HttpClient) {}

  fetchHistory(userId: string): Observable<History> {
    // return this.http.get<History>(`api/history/${userId}`);
    return of(tempHistory);
  }

  saveDiagnosis(userId: string, diagnosis: Diagnosis): Observable<Diagnosis> {
    return this.http.post<Diagnosis>("api/savediagnosis", {
      userId,
      diagnosis,
    });
  }
}
