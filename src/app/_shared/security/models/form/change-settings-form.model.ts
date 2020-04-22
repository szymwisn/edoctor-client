import { BloodType } from "../blood-type";
import { Sex } from "../sex";

export class ChangeSettingsForm {
  email: string;
  age: number;
  height: number;
  mass: number;
  bloodType: BloodType;
  sex: Sex;
}
