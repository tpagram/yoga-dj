import { Scene } from "./Scene";

export interface Workout {
  id: string;
  name: string;
  restCount: number;
  restTimeTotal: number;
  scenes: Scene[];
}
