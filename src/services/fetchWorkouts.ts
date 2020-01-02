// import fs from "fs";
import yaml from "js-yaml";
import { WorkoutListInfo } from "../types/Workout";

const { remote } = require("electron");
const fs = remote.require("fs");

const BASE_PATH = "workouts";

const fetchWorkoutList = (): WorkoutListInfo[] => {
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
  let restSegments = doc.segments.filter((segment: any) => segment.type == "rest")
  console.log(restSegments)
  console.log(doc.segments)
  return {
    name: doc.name,
    restCount: restSegments.length,
    restTimeTotal: restSegments.reduce(
      (sum: number, rest: any) => sum + doc.restLengths[rest.restType],
      0
    )
  };
};

export default fetchWorkoutList;
