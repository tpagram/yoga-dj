import { SceneType, Scene, VideoScene, TimerScene } from "../types/Scene";

type WorkoutSettings = {
  restTimes: number[][];
  restDuration: number;
  source: string;
};

const buildWorkout = ({
  restTimes,
  restDuration,
  source
}: WorkoutSettings): Scene[] => {
  let workout: Scene[] = [
    // wristWarmUpScene(),
    {
      sceneType: SceneType.timer,
      timeInSeconds: 10,
      workoutTitle: "Handstands"
    } as TimerScene
  ];

  for (let [startTime, endTime] of restTimes) {
    workout.push({
      sceneType: SceneType.video,
      source: source,
      startTime: startTime,
      endTime: endTime
    } as VideoScene);
    workout.push({
      sceneType: SceneType.timer,
      timeInSeconds: restDuration,
      workoutTitle: "Rest"
    } as TimerScene);
  }
  return workout;
};

const wristWarmUpScene = () => {
  return {
    sceneType: SceneType.video,
    source: "videos/builder_2_2.mp4",
    startTime: 26,
    endTime: 105
  };
};

export default buildWorkout;
