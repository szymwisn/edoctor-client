import { Component } from "@angular/core";
import { UserFacade } from "./_shared/security/user.facade";
import { Observable, combineLatest } from "rxjs";
import { DecodedToken } from "./_shared/security/models/token.model";
import { User } from "./_shared/security/models/user.model";
import { map } from "rxjs/operators";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  testForm: FormGroup;

  allData$: Observable<{
    token: DecodedToken;
    profile: User;
  }>;

  onSubmit() {
    console.log(this.testForm.value);
  }

  constructor(private fb: FormBuilder, private userFacade: UserFacade) {
    this.allData$ = combineLatest(
      this.userFacade.token$,
      this.userFacade.profile$
    ).pipe(map(([token, profile]) => ({ token, profile })));

    this.testForm = fb.group({
      email: "test",
      password: "test",
    });
  }

  tempSignIn() {
    console.log("a");
    this.userFacade.signin(null);
  }

  tempSignOut() {
    console.log("b");
    this.userFacade.signout();
  }
}
