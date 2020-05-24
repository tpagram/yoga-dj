import styled from "styled-components";
import COLOUR from "../styles/colour";

const BaseButton = styled.div`
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  border: 1px solid black;
  padding: 15px;
  width: 40vw; 
  margin: auto;
  margin-bottom: 30px;
`;

export const PrimaryButton = styled(BaseButton)`
  background-color: ${COLOUR.LIGHT_GREEN};
  :hover {
    background-color: ${COLOUR.DARK_GREEN};
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background-color: ${COLOUR.LIGHT_YELLOW};
  :hover {
    background-color: ${COLOUR.DARK_YELLOW};
  }
`;
