import { Component } from "@angular/core";
import { UserFacade } from "./_shared/security/user.facade";
import { Observable, combineLatest } from "rxjs";
import { DecodedToken } from "./_shared/security/models/token.model";
import { User } from "./_shared/security/models/user.model";
import { map } from "rxjs/operators";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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

  formSubmitted = false;

  onSubmit() {
    this.formSubmitted = true;
    if (this.testForm.valid) {
      console.log(this.testForm.value);
    } else {
      console.log("form invalid");
    }
  }

  constructor(private fb: FormBuilder, private userFacade: UserFacade) {
    this.allData$ = combineLatest(
      this.userFacade.token$,
      this.userFacade.profile$
    ).pipe(map(([token, profile]) => ({ token, profile })));

    this.testForm = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      description: ["", [Validators.required]],
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
