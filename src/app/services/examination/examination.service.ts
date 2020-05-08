import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Diagnosis } from "src/app/models/diagnosis/diagnosis.model";

@Injectable({
  providedIn: "root",
})
export class ExaminationService {
  constructor(private http: HttpClient) {}

  sendExaminationForm(form): Observable<Diagnosis> {
    return this.http.post<Diagnosis>("api/examination", form);
  }
}
