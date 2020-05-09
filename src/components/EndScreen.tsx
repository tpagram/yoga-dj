import React from "react";
import styled from "styled-components";
import { Workout } from "../types/Workout";
import { remote } from "electron";

const EndScreenWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const Title = styled.div`
  font-size: 60px;
  font-weight: bold;
  text-align: center;
`;

const Stats = styled.div`
  font-size: 30px;
  text-align: center;
`;

const Button = styled.div`
  padding: 15px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid black;
  width: 50vw;
  margin: auto;
  margin-bottom: 30px;
`;

const CloseButton = styled(Button)`
  background-color: #f7d66a;
  :hover {
    background-color: #c2c246;
  }
`;

const ReturnButton = styled(Button)`
  background-color: #8bc990;
  :hover {
    background-color: #74a878;
  }
`;

type EndScreenProps = {
  finishedWorkout: Workout;
  returnToStartScreen: () => void;

};

const closeApp = (): void => {
  remote.app.exit();
}

const EndScreen: React.FC<EndScreenProps> = ({
  finishedWorkout,
  returnToStartScreen
}: EndScreenProps) => (
  <EndScreenWrapper>
    <Title>Yoga done!</Title>
    <Stats>
      Finished <strong>{finishedWorkout.name}</strong> with rest times <strong>[ {finishedWorkout.restTimeConfig.short} | {finishedWorkout.restTimeConfig.medium} | {finishedWorkout.restTimeConfig.long} ]</strong>.
    </Stats>
    <ReturnButton onClick={returnToStartScreen}>Back to start</ReturnButton>
    <CloseButton onClick={closeApp}>Close</CloseButton>
  </EndScreenWrapper>
);
export default EndScreen;
