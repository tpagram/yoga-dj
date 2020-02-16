import React, { useState } from "react";
import styled from "styled-components";
import { Workout } from "../types/Workout";
import moment from "moment";
import Select from "react-select";

type SelectOption = {
  value: Workout;
  label: string;
  colour: string | null;
};
const WorkoutSelect = styled(Select)`
  width: 60%;
`;

type WorkoutListProps = {
  availableWorkouts: Workout[];
  onSelect: (value: Workout) => void;
};

const WorkoutList: React.FC<WorkoutListProps> = ({
  availableWorkouts,
  onSelect
}: WorkoutListProps) => {
  const workoutOptions = createWorkoutOptions(availableWorkouts);
  const [selectedOption, setSelectedOption] = useState(workoutOptions[0]);

  const handleChange = (newOption: SelectOption): void => {
    setSelectedOption(newOption);
    onSelect(newOption.value);
  };
  return (
    <WorkoutSelect
      isSearchable={true}
      value={selectedOption}
      onChange={handleChange}
      options={workoutOptions}
      styles={colourStyles}
    />
  );
};

const colourStyles = {
  option: (
    styles: {},
    {
      data,
      isFocused,
      isSelected
    }: { data: { colour: string }; isFocused: boolean; isSelected: boolean }
  ): {} => {
    return {
      ...styles,
      color: data.colour,
      backgroundColor: isFocused ? "#e1effa" : null,
      border: isSelected ? "1px solid" : null
    };
  }
};

const createWorkoutOptions = (availableWorkouts: Workout[]): SelectOption[] =>
  availableWorkouts.map((workout: Workout) => {
    return {
      value: workout,
      label: workout.name,
      colour: null
    };
  });

export default WorkoutList;
