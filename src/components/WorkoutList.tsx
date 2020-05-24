import React from "react";
import styled from "styled-components";
import { Workout } from "../types/Workout";
import Select from "react-select";
import COLOUR from "../styles/colour";

type SelectOption = {
  value: string;
  label: string;
  colour: string | null;
};

const WorkoutSelect = styled(Select)`
  width: 60%;
`;

type WorkoutListProps = {
  availableWorkouts: Workout[];
  currentWorkoutId: string;
  onSelect: (workoutId: string) => void;
};

const WorkoutList: React.FC<WorkoutListProps> = ({
  availableWorkouts,
  currentWorkoutId,
  onSelect,
}: WorkoutListProps) => {
  const options = availableWorkouts.map(workoutToListOption);

  return (
    <WorkoutSelect
      isSearchable={true}
      value={options.find((option) => option.value === currentWorkoutId)}
      onChange={(option: SelectOption): void => onSelect(option.value)}
      options={options}
      styles={colourStyles}
      menuPlacement="top"
    />
  );
};

const colourStyles = {
  option: (
    styles: {},
    {
      data,
      isFocused,
      isSelected,
    }: { data: { colour: string }; isFocused: boolean; isSelected: boolean }
  ): {} => {
    return {
      ...styles,
      color: data.colour,
      backgroundColor: isFocused ? COLOUR.LIGHT_BLUE : null,
      border: isSelected ? "1px solid" : null,
    };
  },
};

const workoutToListOption = (workout: Workout): SelectOption => {
  return {
    value: workout.id,
    label: workout.name,
    colour: null,
  };
};

export default WorkoutList;
