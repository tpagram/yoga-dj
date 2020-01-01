export enum SceneType {
  timer,
  video,
}

export interface Scene {
  sceneType: SceneType
}

export interface VideoScene extends Scene {
  sceneType: SceneType.video,
  source: string
}

export interface TimerScene extends Scene {
  sceneType: SceneType.timer
  timeInSeconds: number
}