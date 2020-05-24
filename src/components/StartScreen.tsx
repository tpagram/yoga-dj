import React from "react";
import styled from "styled-components";
import { Workout, RestTimesConfig } from "../types/Workout";
import WorkoutList from "./WorkoutList";
import SelectedWorkout from "./SelectedWorkout";
import { PrimaryButton } from "./Button";
import { FullScreenColumn } from "./Column";

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

type StartScreenProps = {
  startButtonOnClick: () => void;
  availableWorkouts: Workout[];
  onSelectWorkout: (workoutId: string) => void;
  currentWorkout: Workout;
  updateCurrentWorkoutRestTimes: (value: RestTimesConfig) => void;
};

const StartScreen: React.FC<StartScreenProps> = ({
  startButtonOnClick,
  availableWorkouts,
  onSelectWorkout,
  currentWorkout,
  updateCurrentWorkoutRestTimes,
}: StartScreenProps) => (
  <FullScreenColumn rows={"1fr 4fr 1fr 1fr"}>
    <Title>YogaDJ!</Title>
    <SelectedWorkout
      workout={currentWorkout}
      updateCurrentWorkoutRestTimes={updateCurrentWorkoutRestTimes}
    ></SelectedWorkout>
    <WorkoutList
      availableWorkouts={availableWorkouts}
      currentWorkoutId={currentWorkout.id}
      onSelect={onSelectWorkout}
    />
    <PrimaryButton onClick={startButtonOnClick}>Start</PrimaryButton>
  </FullScreenColumn>
);

export default StartScreen;
