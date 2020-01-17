// import fs from "fs";
import jsyaml from "js-yaml";
import { Workout } from "../types/Workout";
import { remote } from "electron";
import { Scene, SceneType, RestScene } from "../types/Scene";

const fs = remote.require("fs");
const path = remote.require("path");
// const app = remote.require('app');
const BASE_PATH = "workouts";

const fetchAvailableWorkoutsFromDisk = (): Workout[] => {
  console.log("Fetching workouts from disk");
  return fs
    .readdirSync(BASE_PATH, { withFileTypes: true })
    .filter((dirent: any) => dirent.isDirectory())
    .map((dirent: any) => yamlToWorkout(dirent))
    .sort(
      (workoutA: Workout, workoutB: Workout) =>
        workoutA.restTimeTotal - workoutB.restTimeTotal
    );
};

const yamlToWorkout = (file: any): Workout => {
  const yamlWorkout = jsyaml.safeLoad(
    fs.readFileSync(`${BASE_PATH}/${file.name}/routine.yml`, "utf8")
  );
  const scenes = yamlWorkout.segments.map(
    (segment: any): Scene => {
      return segmentToScene(
        segment,
        path.join(
          "file://",
          remote.app.getAppPath(),
          BASE_PATH,
          file.name,
          "main.mp4"
        ),
        yamlWorkout.restLengths
      );
    }
  );
  const restScenes = scenes.filter(
    (scene: Scene) => scene.sceneType === SceneType.rest
  );

  return {
    id: file.filename,
    name: yamlWorkout.name,
    scenes: scenes,
    restCount: restScenes.length,
    restTimeTotal: restScenes.reduce(
      (sum: number, rest: RestScene) => sum + rest.timeInSeconds,
      0
    )
  };
};

const segmentToScene = (
  segment: any,
  filepath: string,
  restLengths: any
): Scene => {
  if (segment.type === "video") {
    console.log(segment);
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
      name: "Rest",
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
