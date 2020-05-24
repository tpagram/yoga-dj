import styled from "styled-components";

export const Column = styled.div<{ rows: string }>`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: ${(props): string => props.rows};
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

export const FullScreenColumn = styled(Column)`
  height: 100vh;
  width: 100vw;
`;
