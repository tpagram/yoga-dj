import React from "react";
import styled from "styled-components";
import { Workout } from "../types/Workout";
import { remote } from "electron";
import { PrimaryButton, SecondaryButton } from "./Button";
import { FullScreenColumn } from "./Column";

const Title = styled.div`
  font-size: 60px;
  font-weight: bold;
  text-align: center;
`;

const Stats = styled.div`
  font-size: 30px;
  text-align: center;
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
  <FullScreenColumn rows={"1fr 1fr 1fr"}>
    <Title>Yoga done!</Title>
    <Stats>
      Finished <strong>{finishedWorkout.name}</strong> with rest times <strong>[ {finishedWorkout.restTimeConfig.short} | {finishedWorkout.restTimeConfig.medium} | {finishedWorkout.restTimeConfig.long} ]</strong>.
    </Stats>
    <PrimaryButton onClick={returnToStartScreen}>Back to start</PrimaryButton>
    <SecondaryButton onClick={closeApp}>Close</SecondaryButton>
  </FullScreenColumn>
);
export default EndScreen;
