import React from "react";
import styled from "styled-components";
import { WorkoutListInfo } from "../types/Workout";
import WorkoutList from "./WorkoutList";

const StartScreenWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 1fr;
  align-items: center;
  justify-content: center;
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
  background-color: grey;
  padding: 1vw;
`;

type StartScreenProps = {
  startButtonOnClick: () => void;
  workoutList: WorkoutListInfo[];
};

const StartScreen: React.FC<StartScreenProps> = ({
  startButtonOnClick,
  workoutList
}: StartScreenProps) => (
  <StartScreenWrapper>
    <Title>YogaMotherfuckers!</Title>
    <WorkoutList workoutList={workoutList} />
    <StartButton onClick={startButtonOnClick}>Start</StartButton>
  </StartScreenWrapper>
);

export default StartScreen;
