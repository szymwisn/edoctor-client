import { Disease } from "./diseases";

export class Diagnosis {
  date: Date;
  disease: Disease;
  probability: number;
  description: string;
  tips: string[];
}
