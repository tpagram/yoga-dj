import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

const TimerWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimerDetails = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-rows: 1fr 3fr 1fr;
`;

const Title = styled.div`
  font-size: 120px;
  text-align: center;
`;

const TimerDigits = styled.div`
  font-size: 300px;
  text-align: center;
`;

const SkipButton = styled.div`
  background-color: #8bc990;
  padding: 15px;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  border: 1px solid black;
  :hover {
    background-color: #74a878;
  }
`

type TimerProps = {
  displayText: string;
  timeInMillis: number;
  finished: () => void;
};

const Timer: React.FC<TimerProps> = ({
  displayText,
  timeInMillis,
  finished
}: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(timeInMillis);
  const [finalTimeinMillis] = useState(moment().add(timeInMillis, "ms"));
  const chime = new Audio("chimes.mp3")

  useEffect(() => {
    if (timeLeft <= 0) {
      chime.play()
      finished();
    } else {
      setTimeout(() => setTimeLeft(finalTimeinMillis.diff(moment())), 100);
    }
  });

  useEffect(() => {chime.play()}, []);

  return (
    <TimerWrapper>
      <TimerDetails>
        <Title>{displayText}</Title>
        <TimerDigits>{moment(timeLeft).format("m:ss")}</TimerDigits>
        <SkipButton onClick={finished}>Skip</SkipButton>
      </TimerDetails>
    </TimerWrapper>
  );
};

export default Timer;
