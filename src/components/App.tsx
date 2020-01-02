import React, { useState } from "react";
import StartScreen from "./StartScreen";
import EndScreen from "./EndScreen";
import YogaSession from "./YogaSession";
import buildWorkout from "../services/buildWorkout";
import fetchWorkouts from "../services/fetchWorkouts";

enum Stage {
  startScreen,
  yogaSession,
  endScreen
}

const App: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(Stage.startScreen);

  switch (currentStage) {
    case Stage.yogaSession:
      return (
        <YogaSession
          scenes={buildWorkout(exampleWorkoutSettings)}
          endWorkout={() => setCurrentStage(Stage.endScreen)}
        />
      );
    case Stage.endScreen:
      return <EndScreen />;
    case Stage.startScreen:
    default:
      return (
        <StartScreen
          startButtonOnClick={() => setCurrentStage(Stage.yogaSession)}
          workoutList={fetchWorkouts()}
        />
      );
  }
};

const exampleWorkoutSettings = {
  restTimes: [
    [105, 110],
    [130, 135],
    [356, 361]
  ],
  restDuration: 5,
  source: "videos/builder_2_2.mp4"
};

export default App;
