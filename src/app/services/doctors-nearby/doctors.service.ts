import * as L from "leaflet";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Doctor } from "src/app/models/map/doctor.model";

@Injectable({
  providedIn: "root",
})
export class DoctorsService {
  constructor(private http: HttpClient) {}

  fetchDoctors(city: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>("api/doctors", {
      params: {
        city,
      },
    });
  }
}
