import { Scene } from "./Scene";

export interface Workout {
  id: string;
  name: string;
  scenes: Scene[];
}

export interface RestTimesConfig {
  [index: string]: number;
  short: number;
  medium: number;
  long: number;
}
