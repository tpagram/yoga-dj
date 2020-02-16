import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import { SceneType } from "../types/Scene";
import VideoPlayer from "./VideoPlayer";
import Timer from "./Timer";
import { Workout } from "../types/Workout";
import { remote } from "electron";

type YogaSessionProps = {
  sessionWorkout: Workout;
  endWorkout: () => void;
};

const YogaSession: React.FC<YogaSessionProps> = ({
  sessionWorkout,
  endWorkout
}: YogaSessionProps) => {
  const [currentSceneNumber, setCurrentSceneNumber] = useState(0);

  useEffect(() => {
    const id = remote.powerSaveBlocker.start("prevent-display-sleep");
    console.log("blocking power with:" + id);
    return (): void => {
      console.log("releasing power with:" + id);
      remote.powerSaveBlocker.stop(id);
    };
  }, []);

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
          displayText={currentScene.name}
          timeInMillis={currentScene.timeInSeconds * 1000}
          finished={finishSceneCallback}
        />
      );
    case SceneType.rest:
      return (
        <Timer
          displayText={currentScene.name}
          timeInMillis={currentScene.timeInSeconds * 1000}
          finished={finishSceneCallback}
        />
      );
    case SceneType.video:
      return (
        <VideoPlayer
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
