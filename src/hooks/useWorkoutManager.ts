import { useState } from "react";
import { fetchWorkouts, saveWorkoutRestTimes } from "../services/workoutRepository";
import { SceneType } from "../types/Scene";
import { RestTimesConfig, Workout } from "../types/Workout";

const useWorkoutManager = (): [
  Workout,
  (workoutId: string) => void,
  Workout[],
  (restTimes: RestTimesConfig) => void,
  () => void
] => {
  const [availableWorkouts, setAvailableWorkouts] = useState(fetchWorkouts);
  const [currentWorkoutId, setCurrentWorkoutId] = useState(
    availableWorkouts[0].id
  );

  const updateCurrentWorkoutRestTimes = (
    newRestTimes: RestTimesConfig
  ): void => {
    const newWorkouts = availableWorkouts.map((workout: Workout) => ({
      ...workout,
    }));
    const newCurrentWorkout = newWorkouts.filter(
      (workout: Workout) => workout.id === currentWorkoutId
    )[0];

    newCurrentWorkout.restTimeConfig = newRestTimes;
    newCurrentWorkout.scenes = newCurrentWorkout.scenes.map((scene) => {
      if (scene.sceneType === SceneType.rest) {
        const newScene = { ...scene };
        newScene.timeInSeconds = newRestTimes[newScene.durationType];
        return newScene;
      }
      return scene;
    });
    setAvailableWorkouts(newWorkouts);
  };

  const currentWorkout = availableWorkouts.filter(
    (workout: Workout) => workout.id === currentWorkoutId
  )[0];

  return [
    currentWorkout,
    setCurrentWorkoutId,
    availableWorkouts,
    updateCurrentWorkoutRestTimes,
    (): void => saveWorkoutRestTimes(currentWorkout),
  ];
};

export default useWorkoutManager;
