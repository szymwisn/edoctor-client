import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user.model";
import { ChangeSettingsForm } from "../models/form/change-settings-form.model";
import { Observable, of } from "rxjs";
import { Sex } from "../models/sex";
import { BloodType } from "../models/blood-type";

const tempUser: User = {
  _id: "5ea099512e74d85412886174",
  email: "john@doe.com",
  age: 21,
  height: 178,
  mass: 82,
  sex: Sex.Male,
  bloodType: BloodType.A_Plus,
};

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  fetchUser(): Observable<User> {
    // return this.http.get<User>("api/profile");
    return of(tempUser);
  }

  changeSettings(form: ChangeSettingsForm): Observable<any> {
    return this.http.put("api/settings", form);
  }
}
