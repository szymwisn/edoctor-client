import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../../models/user/user.model";
import { ChangeSettingsForm } from "../../models/form/change-settings-form.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  fetchUser(userId: string): Observable<User> {
    return this.http.get<any>(`api/user/${userId}`).pipe(
      map((response) => ({
        name: response.name ? response.name : "",
        email: response.email ? response.email : "",
        age: response.age ? response.age : 0,
        height: response.height ? response.height : 0,
        mass: response.weight ? response.weight : 0,
        sex: response.sex ? response.sex : "",
        bloodType: response.bloodType ? response.bloodType : "",
      }))
    );
  }

  changeSettings(userId: string, form: ChangeSettingsForm) {
    return this.http.put("api/settings", { userId, ...form });
  }
}
