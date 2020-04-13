import React, { useState } from "react";
import StartScreen from "./StartScreen";
import EndScreen from "./EndScreen";
import YogaSession from "./YogaSession";
import useWorkoutManager from "../hooks/useWorkoutManager";

enum Stage {
  startScreen,
  yogaSession,
  endScreen
}

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(Stage.startScreen);
  const [
    currentWorkout,
    setCurrentWorkout,
    availableWorkouts,
    updateCurrentWorkoutRestTimes,
    saveCurrentWorkoutRestTimesToDisk
  ] = useWorkoutManager();

  switch (currentStage) {
    case Stage.yogaSession:
      saveCurrentWorkoutRestTimesToDisk();
      return (
        <YogaSession
          sessionWorkout={currentWorkout}
          endWorkout={(): void => setCurrentStage(Stage.endScreen)}
        />
      );
    case Stage.endScreen:
      return <EndScreen finishedWorkout={currentWorkout} />;
    case Stage.startScreen:
    default:
      return (
        <StartScreen
          startButtonOnClick={(): void => setCurrentStage(Stage.yogaSession)}
          availableWorkouts={availableWorkouts}
          onSelectWorkout={setCurrentWorkout}
          currentWorkout={currentWorkout}
          updateCurrentWorkoutRestTimes={updateCurrentWorkoutRestTimes}
        />
      );
  }
};

export default App;
