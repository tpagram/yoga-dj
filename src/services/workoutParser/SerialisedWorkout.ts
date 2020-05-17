export interface SerialisedWorkout {
  segments: Segment[];
  restLengths: RestLengths;
  name: string;
}

export interface VideoSegment {
  source: string;
  start_time: string;
  end_time: string;
  name: string;
  type: "video";
}

export interface TimerSegment {
  duration: number;
  name: string;
  type: "timer";
}

export interface RestSegment {
  name: "Rest";
  restType: string;
  type: "rest";
}

export type Segment = VideoSegment | TimerSegment | RestSegment;

export interface RestLengths {
  [index: string]: number;
  short: number;
  medium: number;
  long: number;
}