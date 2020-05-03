import { BloodType } from "../user/blood-type";
import { Sex } from "../user/sex";

export class ChangeSettingsForm {
  email: string;
  age: number;
  height: number;
  mass: number;
  bloodType: BloodType;
  sex: Sex;
}
