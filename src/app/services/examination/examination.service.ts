import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Diagnosis } from "src/app/models/diagnosis/diagnosis.model";
import { ExaminationForm } from "src/app/models/examination/examination-form.model";

@Injectable({
  providedIn: "root",
})
export class ExaminationService {
  constructor(private http: HttpClient) {}

  sendExaminationForm(form: ExaminationForm): Observable<Diagnosis> {
    return this.http.post<Diagnosis>("api/examination", form);
  }
}
