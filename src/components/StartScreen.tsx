import React from "react";
import styled from "styled-components";
import { Workout, RestTimesConfig } from "../types/Workout";
import WorkoutList from "./WorkoutList";
import SelectedWorkout from "./SelectedWorkout";

const StartScreenWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr 1fr 1fr;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;
  height: 100vh;
  width: 100vw;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const StartButton = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  background-color: #8bc990;
  padding: 12px 100px;
  border: 1px solid black;
  :hover {
    background-color: #74a878;
  }
`;

type StartScreenProps = {
  startButtonOnClick: () => void;
  availableWorkouts: Workout[];
  onSelect: (value: Workout) => void;
  selectedWorkout: Workout;
  setRestTimes: (value: RestTimesConfig) => void;
  restTimes: RestTimesConfig;
};

const StartScreen: React.FC<StartScreenProps> = ({
  startButtonOnClick,
  availableWorkouts,
  onSelect,
  selectedWorkout,
  setRestTimes,
  restTimes
}: StartScreenProps) => (
  <StartScreenWrapper>
    <Title>YogaMotherfuckers!</Title>
    <SelectedWorkout
      workout={selectedWorkout}
      setRestTimes={setRestTimes}
      restTimes={restTimes}
    ></SelectedWorkout>
    <WorkoutList availableWorkouts={availableWorkouts} onSelect={onSelect} />
    <StartButton onClick={startButtonOnClick}>Start</StartButton>
  </StartScreenWrapper>
);

export default StartScreen;
