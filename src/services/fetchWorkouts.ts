// import fs from "fs";
import yaml from "js-yaml";
import { WorkoutListInfo } from "../types/Workout";

const { remote } = require("electron");
const fs = remote.require("fs");

const BASE_PATH = "workouts";

const fetchWorkoutList = (): WorkoutListInfo[] => {
  console.log(fs.readdirSync("./"));
  return fs
    .readdirSync(BASE_PATH, { withFileTypes: true })
    .filter((dirent: any) => dirent.isDirectory())
    .map((dirent: any) =>
      yamlToDisplayInfo(
        yaml.safeLoad(
          fs.readFileSync(`${BASE_PATH}/${dirent.name}/routine.yml`, "utf8")
        )
      )
    );
};

const yamlToDisplayInfo = (doc: any): WorkoutListInfo => {
  console.log(doc);
  return {
    name: doc.name,
    restCount: doc.restTimes.length,
    restTimeTotal: doc.restTimes.reduce(
      (sum: number, rest: any) => sum + doc.restLengths[rest.duration],
      0
    )
  };
};

export default fetchWorkoutList;
