import fsNode from "fs"; // Required for fs type declaration.
import { Workout } from "../types/Workout";
import { remote } from "electron";
import parseWorkout from "./workoutParser/workoutParser";

const fsElectron = remote.require("fs");
const BASE_PATH = "workouts";

export const fetchWorkouts = (): Workout[] => {
  console.log("Fetching workouts from yml");
  return fsElectron
    .readdirSync(BASE_PATH, { withFileTypes: true })
    .filter((dirent: fsNode.Dirent) => dirent.isDirectory())
    .map((dirent: fsNode.Dirent) => parseWorkout(dirent.name));
};
