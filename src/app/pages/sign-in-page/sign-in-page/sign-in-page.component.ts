import { Component } from "@angular/core";
import { UserFacade } from "src/app/facades/user.facade";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-sign-in-page",
  templateUrl: "./sign-in-page.component.html",
  styleUrls: ["./sign-in-page.component.scss"],
})
export class SignInPageComponent {
  form: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder, private userFacade: UserFacade) {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  signin() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.userFacade.signin(this.form.value);
      this.formSubmitted = false;
    }
  }

  forgotPassword() {
    // TODO: someday maybe we will implement this functionality. Or not.
  }
}
