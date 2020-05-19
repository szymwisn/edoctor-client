import { Disease } from "./diseases";

export class Diagnosis {
  id: string;
  date: Date;
  disease: Disease;
  probability: number;
  description: string;
  tips: string;
}
