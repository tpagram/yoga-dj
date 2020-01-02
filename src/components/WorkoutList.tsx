import React from "react";
import styled from "styled-components";
import { WorkoutListInfo } from "../types/Workout";
import moment from "moment";

const WorkoutTable = styled.div`
  display: grid;
  grid-auto-rows: auto;
  width: 80vw;
  /* height: 100%; */
  border-collapse: true;
`;

const WorkoutRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  div {
    text-align: center;
    vertical-align: true;
    padding-right: 30px;
    padding-bottom: 30px;
  }
`


type WorkoutListProps = {
  workoutList: WorkoutListInfo[];
};

const WorkoutList: React.FC<WorkoutListProps> = ({
  workoutList
}: WorkoutListProps) => (
  <WorkoutTable>
    <WorkoutRow>
        <div>Workout</div>
        <div>Rests</div>
        <div>Rest time</div>
    </WorkoutRow>
      {workoutList.map(workout => (
        <WorkoutRow>
          <div>{workout.name}</div>
          <div>{workout.restCount}</div>
          <div>{moment([0,0]).seconds(workout.restTimeTotal).format("m:s")}</div>
        </WorkoutRow>
      ))}
  </WorkoutTable>
);

export default WorkoutList;
