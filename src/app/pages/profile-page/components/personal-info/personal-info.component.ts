import { Component, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserFacade } from "src/app/facades/user.facade";
import { Sex } from "src/app/models/user/sex";
import { BloodType } from "src/app/models/user/blood-type";
import { User } from "src/app/models/user/user.model";

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

  @Input()
  set profile(profile: User) {
    if (profile) {
      this.form.setValue({
        email: profile.email,
        age: profile.age,
        height: profile.height,
        mass: profile.mass,
        bloodType: profile.bloodType,
        sex: profile.sex,
      });
      this.defaultProfile = profile;
    }
  }

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
      email: ["", [Validators.required, Validators.email]],
      age: ["", [Validators.required, Validators.min(36), Validators.max(79)]],
      height: ["", [Validators.required]],
      mass: ["", [Validators.required]],
      bloodType: ["", [Validators.required]],
      sex: ["", [Validators.required]],
    });

    this.form.disable();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;

    if (this.editMode) {
      this.form.enable();
    } else {
      this.form.disable();
    }
  }

  save() {
    this.formSubmitted = true;
    if (this.form.valid) {
      this.userFacade.changeSettings(this.form.value);
      this.toggleEditMode();
      this.formSubmitted = false;
    }
  }

  cancel() {
    this.form.setValue({
      email: this.defaultProfile.email,
      age: this.defaultProfile.age,
      height: this.defaultProfile.height,
      mass: this.defaultProfile.mass,
      bloodType: this.defaultProfile.bloodType,
      sex: this.defaultProfile.sex,
    });
    this.toggleEditMode();
  }
}
