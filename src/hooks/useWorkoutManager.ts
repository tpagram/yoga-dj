import { useState } from "react";
import fetchAvailableWorkoutsFromDisk from "../services/fetchAvailableWorkoutsFromDisk";
import { SceneType } from "../types/Scene";
import { RestTimesConfig, Workout } from "../types/Workout";

const useWorkoutManager = (): [
  Workout,
  (workoutId: string) => void,
  Workout[],
  (restTimes: RestTimesConfig) => void,
  () => void
] => {
  const [availableWorkouts, setAvailableWorkouts] = useState(
    fetchAvailableWorkoutsFromDisk
  );
  const [currentWorkoutId, setCurrentWorkoutId] = useState(
    availableWorkouts[0].id
  );

  const updateCurrentWorkoutRestTimes = (
    newRestTimes: RestTimesConfig
  ): void => {
    const newWorkouts = availableWorkouts.map((workout: Workout) => ({
      ...workout
    }));
    const newCurrentWorkout = newWorkouts.filter(
      (workout: Workout) => workout.id === currentWorkoutId
    )[0];

    newCurrentWorkout.restTimeConfig = newRestTimes
    newCurrentWorkout.scenes = newCurrentWorkout.scenes.map(scene => {
      if (scene.sceneType === SceneType.rest) {
        const newScene = { ...scene };
        newScene.timeInSeconds = newRestTimes[newScene.durationType];
        return newScene;
      }
      return scene;
    })
    setAvailableWorkouts(newWorkouts)
  };

  const saveCurrentWorkoutRestTimesToDisk = (): void => {
    // TODO
    console.log("saving rest times to disk!");
  };

  const currentWorkout = availableWorkouts.filter(
    (workout: Workout) => workout.id === currentWorkoutId
  )[0];

  return [
    currentWorkout,
    setCurrentWorkoutId,
    availableWorkouts,
    updateCurrentWorkoutRestTimes,
    saveCurrentWorkoutRestTimesToDisk
  ];
};

export default useWorkoutManager;
