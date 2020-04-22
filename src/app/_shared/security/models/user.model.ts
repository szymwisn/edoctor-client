import { BloodType } from "./blood-type";
import { Sex } from "./sex";

export class User {
  _id: string;
  email: string;
  age: number;
  height: number;
  mass: number;
  sex: Sex;
  bloodType: BloodType;
}
