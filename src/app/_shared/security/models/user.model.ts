export enum Sex {
  Male = "male",
  Female = "female",
  Other = "other",
}

export enum BloodType {
  A_Plus = "A+",
  A_Minus = "A-",
  B_Plus = "B+",
  B_Minus = "B-",
  AB_Plus = "AB+",
  AB_Minus = "AB-",
  Zero_Plus = "0+",
  Zero_Minus = "0-",
}

export class User {
  email: string;
  age: number;
  height: number;
  mass: number;
  sex: Sex;
  bloodType: BloodType;
}
