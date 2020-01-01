export enum SceneType {
  timer,
  video
}

export interface Scene {
  sceneType: SceneType;
}

export interface VideoScene extends Scene {
  sceneType: SceneType.video;
  source: string;
  startTime: number;
  endTime: number;
}

export interface TimerScene extends Scene {
  sceneType: SceneType.timer;
  timeInSeconds: number;
  workoutTitle: string;
}
