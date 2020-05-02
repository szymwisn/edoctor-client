import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserFacade } from "src/app/_shared/security/user.facade";
import { Sex } from "src/app/_shared/security/models/sex";
import { BloodType } from "src/app/_shared/security/models/blood-type";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"],
})
export class RegisterPageComponent {
  form: FormGroup;
  formSubmitted = false;

  sexes: Sex[] = [Sex.Female, Sex.Male, Sex.Other];
  bloodTypes: BloodType[] = [
    BloodType.A_Plus,
    BloodType.A_Minus,
    BloodType.B_Plus,
    BloodType.B_Minus,
    BloodType.AB_Plus,
    BloodType.AB_Minus,
    BloodType.Zero_Plus,
    BloodType.Zero_Minus,
  ];

  constructor(private fb: FormBuilder, private userFacade: UserFacade) {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      age: ["", [Validators.required]],
      height: ["", [Validators.required]],
      mass: ["", [Validators.required]],
      bloodType: ["", [Validators.required]],
      sex: ["", [Validators.required]],
    });
  }

  register() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.userFacade.register(this.form.value);
      this.formSubmitted = false;
    }
  }
}
