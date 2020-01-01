// import fs from "fs";
import yaml from "js-yaml";
import { WorkoutListInfo } from "../types/Workout";

const BASE_PATH = "../../workouts";
var app = window.require('electron').remote;
const fs = app.require('fs');

const fetchWorkoutList = (): WorkoutListInfo[] => {
  return fs
    .readdirSync(BASE_PATH, { withFileTypes: true })
    .filter((dirent: any) => dirent.isDirectory())
    .map((dirent: any) =>
      yamlToDisplayInfo(
        yaml.safeLoad(fs.readFileSync(`${BASE_PATH}/${dirent.name}`, "utf8"))
      )
    );
};

const yamlToDisplayInfo = (doc: any): WorkoutListInfo => {
  return {
    name: doc.name,
    restCount: doc.restTimes.length,
    restTimeTotal: doc.restTimes.reduce(
      (rest: any) => rest.restLength[rest.duration],
      0
    )
  };
};

export default fetchWorkoutList;
