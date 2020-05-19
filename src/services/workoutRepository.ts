import fsNode from "fs"; // Required for fs type declaration.
import { Workout } from "../types/Workout";
import { remote } from "electron";
import jsyaml from "js-yaml";
import parseWorkout from "./workoutParser";

const fsElectron = remote.require("fs");
const BASE_PATH = "workouts";

export const fetchWorkouts = (): Workout[] => {
  return fsElectron
    .readdirSync(BASE_PATH, { withFileTypes: true })
    .filter((dirent: fsNode.Dirent) => dirent.isDirectory())
    .map((dirent: fsNode.Dirent) => parseWorkout(dirent.name));
};

export const saveWorkoutRestTimes = (workout: Workout): void => {
  fsElectron.writeFileSync(
    `${BASE_PATH}/${workout.id}/rest.yml`,
    jsyaml.safeDump({ restLengths: workout.restTimeConfig })
  );
};
