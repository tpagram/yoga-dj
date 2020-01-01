import React, { useState } from "react";
import StartScreen from "./StartScreen";
import VideoPlayer from "./VideoPlayer";
import { SceneType } from "../types/Scene";
import EndScreen from "./EndScreen";
import YogaSession from "./YogaSession";

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
          scenes={exampleScenes}
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
        />
      );
  }
};

const exampleScenes = [
  { sceneType: SceneType.timer, timeInSeconds: 5 },
  { sceneType: SceneType.video, source: "videos/test.mp4" },
  { sceneType: SceneType.timer, timeInSeconds: 5 },
  { sceneType: SceneType.video, source: "videos/first-5-sec.m4v" },
  { sceneType: SceneType.timer, timeInSeconds: 5 },
  { sceneType: SceneType.video, source: "videos/first-5-sec.m4v" }
];

export default App;
