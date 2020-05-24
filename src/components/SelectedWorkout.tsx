import React from "react";
import styled from "styled-components";
import { Workout, RestTimesConfig } from "../types/Workout";
import moment from "moment";
import { SceneType, Scene, RestScene } from "../types/Scene";
import { Column } from "./Column";

const WorkoutTitle = styled.div`
  font-size: 50px;
`;

const RestInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
`;

const RestInput = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;
  margin: 20px;
`;

const RestInputBox = styled.input`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 0px;
`;

const RestTimes = styled.ul`
  overflow: scroll;
  height: 100%;
  list-style: none;
  line-height: 150%;
`;

type SelectedWorkoutProps = {
  workout: Workout;
  updateCurrentWorkoutRestTimes: (value: RestTimesConfig) => void;
};

const SelectedWorkout: React.FC<SelectedWorkoutProps> = ({
  workout,
  updateCurrentWorkoutRestTimes,
}: SelectedWorkoutProps) => {
  return (
    <Column rows={"2fr 3fr 1fr 1fr"}>
      <WorkoutTitle>{workout.name}</WorkoutTitle>
      <RestTimes>{workoutRestTimes(workout)}</RestTimes>
      <RestInputWrapper>
        {restInputs(workout.restTimeConfig, updateCurrentWorkoutRestTimes)}
      </RestInputWrapper>
      <div>{`Total rest length: ${totalRestTime(workout)}`}</div>
      <div>{`Workout length: ${totalWorkoutTime(workout)}`}</div>
    </Column>
  );
};

const workoutRestTimes = (workout: Workout): JSX.Element[] => {
  return workout.scenes.map((scene, index) => {
    switch (scene.sceneType) {
      case SceneType.timer:
        return (
          <li
            key={index}
          >{`${scene.name} timer, ${scene.timeInSeconds} seconds\n`}</li>
        );
      case SceneType.rest:
        return (
          <li key={index}>
            {`${scene.durationType} rest, ${scene.timeInSeconds} seconds\n`}
          </li>
        );
      case SceneType.video:
      default:
        return <li key={index}>{`${scene.name}\n`}</li>;
    }
  });
};

const restInputs = (
  restTimes: RestTimesConfig,
  setRestTimes: (value: RestTimesConfig) => void
): JSX.Element[] => {
  return ["short", "medium", "long"].map((duration) => {
    return (
      <RestInput key={duration}>
        <div>{duration}</div>
        <RestInputBox
          type="number"
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            const input = parseInt(event.target.value);
            if (input < 0) return;
            const newRestTimes = { ...restTimes };
            newRestTimes[duration] = input;
            setRestTimes(newRestTimes);
          }}
          placeholder={duration}
          value={restTimes[duration]}
        />
      </RestInput>
    );
  });
};

const totalRestTime = (workout: Workout): string => {
  const restScenes = workout.scenes.filter(
    (scene: Scene) => scene.sceneType === SceneType.rest
  );

  const totalRestTime = (restScenes as RestScene[]).reduce(
    (sum: number, rest: RestScene) => sum + rest.timeInSeconds,
    0
  );
  return moment([0, 0]).seconds(totalRestTime).format("m:ss");
};

const totalWorkoutTime = (workout: Workout): string => {
  const totalWorkoutTime = workout.scenes
    .map((scene: Scene): number => {
      switch (scene.sceneType) {
        case SceneType.video:
          return scene.endTime - scene.startTime;
        case SceneType.timer:
        case SceneType.rest:
        default:
          return scene.timeInSeconds;
      }
    })
    .reduce((sum: number, sceneTime: number) => sum + sceneTime, 0);
  return moment([0, 0]).seconds(totalWorkoutTime).format("m:ss");
};

export default SelectedWorkout;
