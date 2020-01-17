import React from "react";
import styled from "styled-components";

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

const EndScreen: React.FC = () => (
  <EndScreenWrapper>
    <Title>Yoga done!</Title>
  </EndScreenWrapper>
);
export default EndScreen;
