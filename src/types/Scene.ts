export enum SceneType {
  timer,
  video,
  rest
}

export interface BaseScene {
  sceneType: SceneType;
}

export interface VideoScene extends BaseScene {
  sceneType: SceneType.video;
  source: string;
  startTime: number;
  endTime: number;
  name: string;
}

export interface TimerScene extends BaseScene {
  sceneType: SceneType.timer;
  timeInSeconds: number;
  name: string;
}

export interface RestScene extends BaseScene {
  sceneType: SceneType.rest;
  timeInSeconds: number;
  name: string;
  durationType: string;
}

export type Scene = VideoScene | TimerScene | RestScene;
