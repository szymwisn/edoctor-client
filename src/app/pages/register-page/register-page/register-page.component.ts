import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserFacade } from "src/app/facades/user.facade";
import { Sex } from "src/app/models/user/sex";
import { BloodType } from "src/app/models/user/blood-type";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"],
})
export class RegisterPageComponent {
  form: FormGroup;
  formSubmitted = false;

  sexes: Sex[] = [Sex.FEMALE, Sex.MALE, Sex.OTHER];
  bloodTypes: BloodType[] = [
    BloodType.A_PLUS,
    BloodType.A_MINUS,
    BloodType.B_PLUS,
    BloodType.B_MINUS,
    BloodType.AB_PLUS,
    BloodType.AB_MINUS,
    BloodType.ZERO_PLUS,
    BloodType.ZERO_MINUS,
  ];

  constructor(private fb: FormBuilder, private userFacade: UserFacade) {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      age: ["", [Validators.required, Validators.min(36), Validators.max(79)]],
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
