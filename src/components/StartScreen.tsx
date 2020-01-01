import React from "react";
import styled from "styled-components";
import { WorkoutListInfo } from "../types/Workout";

const StartScreenWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  align-items: center;
  justify-content: center;
  height: 800px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const StartButton = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  background-color: grey;
  padding: 10px;
`;

type StartScreenProps = {
  startButtonOnClick: () => void;
  workoutInfo: WorkoutListInfo[];
};

const StartScreen : React.FC<StartScreenProps> = ({startButtonOnClick, workoutInfo}) => {
  return (
    <StartScreenWrapper>
      <Title>YogaMotherfuckers!</Title>
      { <StartButton onClick={startButtonOnClick}>Start</StartButton>}
      <div>{workoutInfo}</div>
    </StartScreenWrapper>
  );
};

export default StartScreen;
