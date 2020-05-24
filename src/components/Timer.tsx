import React from "react";
import styled from "styled-components";
import moment from "moment";
import useTimer from "../hooks/useTimer";
import COLOUR from "../styles/colour";
import { SecondaryButton, PrimaryButton } from "./Button";
import { FullScreenColumn } from "./Column";

const TimerWrapper = styled.div<{ rest: boolean }>`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props): string =>
    props.rest ? COLOUR.LIGHTEST_GREEN : COLOUR.LIGHT_PINK};
`;

const Title = styled.div<{ longText: boolean }>`
  font-size: ${(props): string => (props.longText ? "90px" : "120px")};
  text-align: center;
`;

const TimerDigits = styled.div`
  font-size: 300px;
  text-align: center;
`;

type TimerProps = {
  displayText: string;
  timeInMillis: number;
  finished: () => void;
  rest: boolean;
};

const Timer: React.FC<TimerProps> = ({
  displayText,
  timeInMillis,
  finished,
  rest,
}: TimerProps) => {
  const [timeLeft, updatePausedState] = useTimer(timeInMillis, finished);

  return (
    <TimerWrapper rest={rest}>
      <FullScreenColumn rows={"1fr 3fr 0.5fr 0.5fr"}>
        <Title longText={displayText.length > 24}>{displayText}</Title>
        <TimerDigits>{moment(timeLeft).format("m:ss")}</TimerDigits>
        <PrimaryButton onClick={updatePausedState}>Pause</PrimaryButton>
        <SecondaryButton onClick={finished}>Skip</SecondaryButton>
      </FullScreenColumn>
    </TimerWrapper>
  );
};

export default Timer;
