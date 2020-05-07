import * as L from "leaflet";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Doctor } from "src/app/models/map/doctor.model";

@Injectable({
  providedIn: "root",
})
export class DoctorsService {
  private doctors: Doctor[] = [
    {
      coordinates: new L.LatLng(52.4064, 16.9252),
      name: "Sample Doctor",
      address: "plac grunwaldzki",
      clinic: "Some clinic",
      phone: "123 123 132",
    },
    {
      coordinates: new L.LatLng(52.4064, 16.9252),
      name: "Sample Doctor",
      address: "Olsztyn zamenhofa 14",
      clinic: "Some clinic",
      phone: "123 123 132",
    },
    {
      coordinates: new L.LatLng(52.4064, 16.9252),
      name: "Sample Doctor",
      address: "politechnika wrocławska",
      clinic: "Some clinic",
      phone: "123 123 132",
    },
  ];

  constructor(private http: HttpClient) {}

  fetchDoctors(city: string): Observable<Doctor[]> {
    // return this.http.get<Doctor[]>("api/doctors", {
    //   params: {
    //     city,
    //   },
    // });
    return of(this.doctors);
  }
}
