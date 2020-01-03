import React, { useState } from "react";
import styled from "styled-components";
import { WorkoutListInfo } from "../types/Workout";
import moment from "moment";
import Select from "react-select";

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
`;

const WorkoutSelect = styled(Select)`
  width: 50vw;
`;

type WorkoutListProps = {
  workoutList: WorkoutListInfo[];
};

const WorkoutList: React.FC<WorkoutListProps> = ({
  workoutList
}: WorkoutListProps) => {
  let workoutOptions = createWorkoutOptions(workoutList);
  const [selectedWorkout, setSelectedWorkout] = useState(workoutOptions[0]);

  const handleChange = (selectedOption: any) => {
    setSelectedWorkout(selectedOption);
  };

  return (
    <WorkoutSelect
      isSearchable={true}
      value={selectedWorkout}
      onChange={handleChange}
      options={workoutOptions}
      styles={colourStyles}
    />
  );
};

const colourStyles = {
  option: (styles: any, { data, isFocused, isSelected }: any) => {
    return {
      ...styles,
      color: data.colour,
      backgroundColor: isFocused ? "#e1effa" : null,
      border: isSelected ? "1px solid" : null
    };
  }
};

const createWorkoutOptions = (workoutList: WorkoutListInfo[]) =>
  workoutList
    .sort((workout: WorkoutListInfo) => -workout.restTimeTotal)
    .map((workout: WorkoutListInfo) => {
      return {
        value: workout.id,
        label: `${workout.name} -- ${moment([0, 0])
          .seconds(workout.restTimeTotal)
          .format("m:s")}`,
        colour: workout.restTimeTotal > 0 ? null : "green"
      };
    });

export default WorkoutList;
