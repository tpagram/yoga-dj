import React from "react";
import styled from "styled-components";
import { RestTimesConfig, Workout } from "../types/Workout";

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
  restTimes: RestTimesConfig;
};

const EndScreen: React.FC<EndScreenProps> = ({
  finishedWorkout,
  restTimes
}: EndScreenProps) => (
  <EndScreenWrapper>
    <Title>Yoga done!</Title>
    <div>{restTimes.short}</div>
    <div>{restTimes.medium}</div>
    <div>{restTimes.long}</div>
  </EndScreenWrapper>
);
export default EndScreen;
