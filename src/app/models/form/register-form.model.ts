import { BloodType } from "../user/blood-type";
import { Sex } from "../user/sex";

export class RegisterForm {
  email: string;
  password: string;
  age: number;
  height: number;
  mass: number;
  bloodType: BloodType;
  sex: Sex;
}
