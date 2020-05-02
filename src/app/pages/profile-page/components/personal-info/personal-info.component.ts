import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserFacade } from "src/app/_shared/security/user.facade";
import { take } from "rxjs/operators";
import { Sex } from "src/app/_shared/security/models/sex";
import { BloodType } from "src/app/_shared/security/models/blood-type";
import { User } from "src/app/_shared/security/models/user.model";

@Component({
  selector: "app-personal-info",
  templateUrl: "./personal-info.component.html",
  styleUrls: ["./personal-info.component.scss"],
})
export class PersonalInfoComponent {
  defaultProfile: User;

  editMode: boolean = false;
  formSubmitted: boolean = false;
  form: FormGroup;

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
    this.userFacade.profile$.pipe(take(1)).subscribe((profile) => {
      this.defaultProfile = profile;
      this.form = this.fb.group({
        email: [profile.email, [Validators.required, Validators.email]],
        age: [profile.age, [Validators.required]],
        height: [profile.height, [Validators.required]],
        mass: [profile.mass, [Validators.required]],
        bloodType: [profile.bloodType, [Validators.required]],
        sex: [profile.sex, [Validators.required]],
      });
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  save() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.userFacade.changeSettings(this.form.value);
      this.defaultProfile = this.form.value;
      this.toggleEditMode();
      this.formSubmitted = false;
    }
  }

  cancel() {
    this.form.reset(this.defaultProfile);
    this.toggleEditMode();
  }
}
