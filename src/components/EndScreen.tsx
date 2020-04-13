import React from "react";
import styled from "styled-components";
import { Workout } from "../types/Workout";

const EndScreenWrapper = styled.div`
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

type EndScreenProps = {
  finishedWorkout: Workout;
};

const EndScreen: React.FC<EndScreenProps> = ({
  finishedWorkout
}: EndScreenProps) => (
  <EndScreenWrapper>
    <Title>Yoga done!</Title>
    <div>{finishedWorkout.restTimeConfig.short}</div>
    <div>{finishedWorkout.restTimeConfig.medium}</div>
    <div>{finishedWorkout.restTimeConfig.long}</div>
  </EndScreenWrapper>
);
export default EndScreen;
