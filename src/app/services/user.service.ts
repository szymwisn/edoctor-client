import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user/user.model";
import { ChangeSettingsForm } from "../models/form/change-settings-form.model";
import { Observable, of } from "rxjs";
import { Sex } from "../models/user/sex";
import { BloodType } from "../models/user/blood-type";

const tempUser: User = {
  email: "john@doe.com",
  age: 35,
  height: 168,
  mass: 103,
  sex: Sex.Male,
  bloodType: BloodType.AB_Plus,
};

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  fetchUser(userId: string): Observable<User> {
    // return this.http.get<User>(`api/user/${id}`);
    return of(tempUser);
  }

  changeSettings(userId: string, form: ChangeSettingsForm) {
    return this.http.put("api/settings", { userId, ...form });
  }
}
