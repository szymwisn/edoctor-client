import { BloodType } from "../blood-type";
import { Sex } from "../sex";

export class RegisterForm {
  email: string;
  password: string;
  age: number;
  height: number;
  mass: number;
  bloodType: BloodType;
  sex: Sex;
}
