// import fs from "fs";
import jsyaml from "js-yaml";
import { Workout } from "../types/Workout";
import { remote } from "electron";
import { Scene, SceneType } from "../types/Scene";

const fs = remote.require("fs");
const path = remote.require("path");
const BASE_PATH = "workouts";

const fetchAvailableWorkoutsFromDisk = (): Workout[] => {
  console.log("Fetching workouts from disk");
  return fs
    .readdirSync(BASE_PATH, { withFileTypes: true })
    .filter((dirent: any) => dirent.isDirectory())
    .map((dirent: any) => yamlToWorkout(dirent));
};

const yamlToWorkout = (file: any): Workout => {
  const yamlWorkout = jsyaml.safeLoad(
    fs.readFileSync(`${BASE_PATH}/${file.name}/routine.yml`, "utf8")
  );
  const scenes = yamlWorkout.segments.map(
    (segment: any, index: number, array: any[]): Scene => {
      return segmentToScene(
        segment,
        path.join(
          "file://",
          remote.app.getAppPath(),
          BASE_PATH,
          file.name,
          "main.mp4"
        ),
        yamlWorkout.restLengths,
        index >= array.length - 1 ? "Rest" : array[index + 1].name
      );
    }
  );
  return {
    id: file.filename,
    name: yamlWorkout.name,
    scenes: scenes,
    restTimeConfig: yamlWorkout.restLengths
  };
};

const segmentToScene = (
  segment: any,
  filepath: string,
  restLengths: any,
  nextSegmentName: string
): Scene => {
  if (segment.type === "video") {
    return {
      sceneType: SceneType.video,
      source: filepath,
      startTime: timeToInteger(segment.start_time),
      endTime: timeToInteger(segment.end_time),
      name: segment.name
    };
  } else if (segment.type === "rest") {
    return {
      sceneType: SceneType.rest,
      timeInSeconds: restLengths[segment.restType],
      name: `Next: ${nextSegmentName}`,
      durationType: segment.restType
    };
  } else {
    return {
      sceneType: SceneType.timer,
      timeInSeconds: timeToInteger(segment.duration),
      name: segment.name
    };
  }
};

const timeToInteger = (time: string | number): number => {
  if (typeof time !== "number") {
    let base = 1;
    return time
      .split(":")
      .reverse()
      .reduce((sum, duration) => {
        sum += parseInt(duration) * base;
        base *= 60;
        return sum;
      }, 0);
  } else return time;
};

export default fetchAvailableWorkoutsFromDisk;
