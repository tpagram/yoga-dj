import React, { useState } from "react";
import StartScreen from "./StartScreen";
import EndScreen from "./EndScreen";
import YogaSession from "./YogaSession";
import fetchAvailableWorkoutsFromDisk from "../services/fetchAvailableWorkoutsFromDisk";
import { SceneType } from "../types/Scene";
import { RestTimesConfig, Workout } from "../types/Workout";

enum Stage {
  startScreen,
  yogaSession,
  endScreen
}

const App: React.FC = () => {
  const [availableWorkouts] = useState(fetchAvailableWorkoutsFromDisk);
  const [currentStage, setCurrentStage] = useState(Stage.startScreen);
  const [selectedWorkout, setSelectedWorkout] = useState(availableWorkouts[0]);
  const [restTimes, setRestTimes] = useState({ short: 0, medium: 0, long: 0 });

  const newWorkoutFromRestTimes = (
    workout: Workout,
    restTimes: RestTimesConfig
  ): Workout => {
    return {
      ...workout,
      scenes: workout.scenes.map(scene => {
        if (scene.sceneType === SceneType.rest) {
          const newScene = { ...scene };
          newScene.timeInSeconds = restTimes[newScene.durationType];
          return newScene;
        }
        return scene;
      })
    };
  };

  switch (currentStage) {
    case Stage.yogaSession:
      if (selectedWorkout === undefined) {
        throw new Error("Yoga session started without a selected workout.");
      }
      return (
        <YogaSession
          sessionWorkout={selectedWorkout}
          endWorkout={(): void => setCurrentStage(Stage.endScreen)}
        />
      );
    case Stage.endScreen:
      return (
        <EndScreen finishedWorkout={selectedWorkout} restTimes={restTimes} />
      );
    case Stage.startScreen:
    default:
      return (
        <StartScreen
          startButtonOnClick={(): void => setCurrentStage(Stage.yogaSession)}
          availableWorkouts={availableWorkouts}
          onSelect={(workout: Workout): void => {
            setSelectedWorkout(newWorkoutFromRestTimes(workout, restTimes));
          }}
          selectedWorkout={selectedWorkout}
          setRestTimes={(restTimes: RestTimesConfig): void => {
            const newWorkout = newWorkoutFromRestTimes(
              selectedWorkout,
              restTimes
            );
            setRestTimes(restTimes);
            setSelectedWorkout(newWorkout);
          }}
          restTimes={restTimes}
        />
      );
  }
};

export default App;
