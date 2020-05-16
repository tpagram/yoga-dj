import React, { useState } from "react";
import { SceneType } from "../types/Scene";
import VideoPlayer from "./VideoPlayer";
import Timer from "./Timer";
import { Workout } from "../types/Workout";
import useSleepBlocker from "../hooks/useSleepBlocker";

type YogaSessionProps = {
  sessionWorkout: Workout;
  endWorkout: () => void;
};

const YogaSession: React.FC<YogaSessionProps> = ({
  sessionWorkout,
  endWorkout,
}: YogaSessionProps) => {
  const [currentSceneNumber, setCurrentSceneNumber] = useState(0);
  useSleepBlocker();

  const currentScene = sessionWorkout.scenes[currentSceneNumber];
  const finishSceneCallback = setNextScene(
    setCurrentSceneNumber,
    currentSceneNumber,
    sessionWorkout.scenes.length,
    endWorkout
  );

  switch (currentScene.sceneType) {
    case SceneType.timer:
      return (
        <Timer
          key={currentScene.name}
          displayText={currentScene.name}
          timeInMillis={currentScene.timeInSeconds * 1000}
          finished={finishSceneCallback}
          rest={false}
        />
      );
    case SceneType.rest:
      return (
        <Timer
          key={currentScene.name}
          displayText={currentScene.name}
          timeInMillis={currentScene.timeInSeconds * 1000}
          finished={finishSceneCallback}
          rest={true}
        />
      );
    case SceneType.video:
      return (
        <VideoPlayer
          key={currentScene.source}
          source={currentScene.source}
          finished={finishSceneCallback}
          startTime={currentScene.startTime}
          endTime={currentScene.endTime}
        />
      );
  }
};

const setNextScene = (
  setCurrentScene: (sceneNumber: number) => void,
  currentScene: number,
  totalScenes: number,
  endWorkout: () => void
): (() => void) => {
  const nextScene = (currentScene += 1);
  if (nextScene < totalScenes) {
    return (): void => setCurrentScene(nextScene);
  }
  return (): void => endWorkout();
};

export default YogaSession;
