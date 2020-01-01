import React, { useState } from "react";
import styled from "styled-components";
import { Scene, SceneType, TimerScene, VideoScene } from "../types/Scene";
import VideoPlayer from "./VideoPlayer";
import Timer from "./Timer";

type YogaSessionProps = {
  scenes: Scene[];
  endWorkout: () => void;
};

const YogaSession: React.FC<YogaSessionProps> = ({
  scenes,
  endWorkout
}: YogaSessionProps) => {
  const [currentSceneNumber, setCurrentSceneNumber] = useState(0);

  let currentScene = scenes[currentSceneNumber];
  let finishSceneCallback = setNextScene(
    setCurrentSceneNumber,
    currentSceneNumber,
    scenes.length,
    endWorkout
  );

  switch (currentScene.sceneType) {
    case SceneType.timer:
      return (
        <Timer
          displayText={(currentScene as TimerScene).workoutTitle}
          timeInMillis={(currentScene as TimerScene).timeInSeconds * 1000}
          finished={finishSceneCallback}
        />
      );
    case SceneType.video:
      return (
        <VideoPlayer
          source={(currentScene as VideoScene).source}
          finished={finishSceneCallback}
          startTime={(currentScene as VideoScene).startTime}
          endTime={(currentScene as VideoScene).endTime}
        />
      );
  }
};

const setNextScene = (
  setCurrentScene: (sceneNumber: number) => void,
  currentScene: number,
  totalScenes: number,
  endWorkout: () => void
) => {
  let nextScene = (currentScene += 1);
  if (nextScene < totalScenes) {
    return () => setCurrentScene(nextScene);
  }
  return () => endWorkout();
};

export default YogaSession;
