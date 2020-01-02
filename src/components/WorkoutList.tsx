import React from "react";
import styled from "styled-components";
import { WorkoutListInfo } from "../types/Workout";

const WorkoutTable = styled.table`
  font-size: 13px;
  width: 70vw;
  height: 100%;
  border-collapse: true;
  th,td {
    /* padding-bottom: 30px; */
    /* padding-right: 200px; */
    /* border: 2px solid; */
    text-align: center; 
    vertical-align: middle;
  }
`;


type WorkoutListProps = {
  workoutList: WorkoutListInfo[];
};

const WorkoutList: React.FC<WorkoutListProps> = ({
  workoutList
}: WorkoutListProps) => (
  <WorkoutTable>
    <thead>
      <tr>
        <th>Workout </th>
        <th>Rests </th>
        <th>Rest time </th>
      </tr>
    </thead>
    <tbody>
      {workoutList.map(workout => (
        <tr>
          <td>{workout.name}</td>
          <td>{workout.restCount}</td>
          <td>{workout.restTimeTotal}</td>
        </tr>
      ))}
    </tbody>
  </WorkoutTable>
);

export default WorkoutList;
