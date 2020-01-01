import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";

const Timer = styled.div`
  min-width: 100%;
  min-height: 100%;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-rows: 1fr 3fr;
`;

const Title = styled.div`
  font-size: 120px;
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
};

export default ({ displayText, timeInMillis, finished }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(timeInMillis);
  const [finalTimeinMillis, _] = useState(moment().add(timeInMillis, "ms"));

  useEffect(() => {
    if (timeLeft <= 0) {
      finished();
    } else {
      setInterval(() => setTimeLeft(finalTimeinMillis.diff(moment())), 100);
    }
  });

  return (
    <Timer>
      <Title>{displayText}</Title>
      <TimerDigits>{moment(timeLeft).format("m:ss")}</TimerDigits>
    </Timer>
  );
};
