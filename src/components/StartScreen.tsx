import React from "react";
import styled from "styled-components";

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
};

const StartScreen : React.FC<StartScreenProps> = ({startButtonOnClick}) => {
  return (
    <StartScreenWrapper>
      <Title>YogaMotherfuckers!</Title>
      { <StartButton onClick={startButtonOnClick}>Start</StartButton>}
    </StartScreenWrapper>
  );
};

export default StartScreen;
