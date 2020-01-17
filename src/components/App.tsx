import React, { useState } from "react";
import StartScreen from "./StartScreen";
import EndScreen from "./EndScreen";
import YogaSession from "./YogaSession";
import fetchAvailableWorkoutsFromDisk from "../services/fetchAvailableWorkoutsFromDisk";

enum Stage {
  startScreen,
  yogaSession,
  endScreen
}

const App: React.FC = () => {
  const [availableWorkouts] = useState(fetchAvailableWorkoutsFromDisk())
  const [currentStage, setCurrentStage] = useState(Stage.startScreen);
  const [selectedWorkout, setSelectedWorkout] = useState(availableWorkouts[0])

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
      return <EndScreen />;
    case Stage.startScreen:
    default:
      return (
        <StartScreen
          startButtonOnClick={(): void => setCurrentStage(Stage.yogaSession)}
          availableWorkouts={availableWorkouts}
          onSelect={setSelectedWorkout}
          selectedWorkout={selectedWorkout}
        />
      );
  }
};

export default App;
