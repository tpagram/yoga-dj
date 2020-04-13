import React from "react";
import styled from "styled-components";
import moment from "moment";
import useTimer from "../hooks/useTimer";

const TimerWrapper = styled.div<{ rest: boolean }>`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props): string => (props.rest ? "#ecfceb" : "#f7e7d7")};
`;

const TimerDetails = styled.div`
  height: 100vh;
  width: 100vw;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-rows: 1fr 3fr 0.5fr 0.5fr;
`;

const Title = styled.div<{ longText: boolean }>`
  font-size: ${(props): string => (props.longText ? "90px" : "120px")};
  text-align: center;
`;

const TimerDigits = styled.div`
  font-size: 300px;
  text-align: center;
`;

const TimerButton = styled.div`
  background-color: #8bc990;
  padding: 15px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid black;
  width: 50vw;
  margin: auto;
  margin-bottom: 30px;
`;

const SkipButton = styled(TimerButton)`
  background-color: #f7d66a;
  :hover {
    background-color: #c2c246;
  }
`;

const PauseButton = styled(TimerButton)`
  background-color: #8bc990;
  :hover {
    background-color: #74a878;
  }
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
  rest
}: TimerProps) => {
  const [timeLeft, updatePausedState] = useTimer(timeInMillis, finished);

  return (
    <TimerWrapper rest={rest}>
      <TimerDetails>
        <Title longText={displayText.length > 24}>{displayText}</Title>
        <TimerDigits>{moment(timeLeft).format("m:ss")}</TimerDigits>
        <SkipButton onClick={finished}>Skip</SkipButton>
        <PauseButton onClick={updatePausedState}>Pause</PauseButton>
      </TimerDetails>
    </TimerWrapper>
  );
};

export default Timer;
