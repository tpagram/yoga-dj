import jsyaml from "js-yaml";
import { Workout } from "../../types/Workout";
import { remote } from "electron";
import { Scene, SceneType } from "../../types/Scene";
import { SerialisedWorkout, Segment, RestLengths } from "./SerialisedWorkout";

const fsElectron = remote.require("fs");
const path = remote.require("path");
const BASE_PATH = "workouts";

const parseWorkout = (workoutId: string): Workout => {
  const yamlWorkout: SerialisedWorkout = jsyaml.safeLoad(
    fsElectron.readFileSync(`${BASE_PATH}/${workoutId}/routine.yml`, "utf8")
  );
  const scenes = yamlWorkout.segments.map(
    (segment: Segment, index: number, array: Segment[]): Scene => {
      return segmentToScene(
        segment,
        workoutId,
        yamlWorkout.restLengths,
        index >= array.length - 1 ? "Rest" : array[index + 1].name
      );
    }
  );
  return {
    id: workoutId,
    name: yamlWorkout.name,
    scenes: scenes,
    restTimeConfig: yamlWorkout.restLengths,
  };
};

const segmentToScene = (
  segment: Segment,
  defaultFolderName: string,
  restLengths: RestLengths,
  nextSegmentName: string
): Scene => {
  if (segment.type === "video") {
    return {
      sceneType: SceneType.video,
      source: segment.source
        ? sourcePath(segment.source)
        : sourcePath(defaultFolderName),
      startTime: timeToInteger(segment.start_time),
      endTime: timeToInteger(segment.end_time),
      name: segment.name,
    };
  } else if (segment.type === "rest") {
    return {
      sceneType: SceneType.rest,
      timeInSeconds: restLengths[segment.restType],
      name: `Next: ${nextSegmentName}`,
      durationType: segment.restType,
    };
  } else {
    return {
      sceneType: SceneType.timer,
      timeInSeconds: timeToInteger(segment.duration),
      name: segment.name,
    };
  }
};

const sourcePath = (workoutId: string): string => {
  return path.join(
    "file://",
    remote.app.getAppPath(),
    BASE_PATH,
    workoutId,
    "main.mp4"
  );
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

export default parseWorkout;
