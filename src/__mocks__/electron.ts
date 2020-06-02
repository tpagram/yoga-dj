/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */

export const remote = {
  require: (module: string): any => ({
    readdirSync: readdirSync,
    readFileSync: readFileSync,
    writeFileSync: (path: string, payload: any): void => {},
  }),
  powerSaveBlocker: {
    start: (): string => "id",
    stop: (id: string): void => {},
  },
};

const readdirSync = (path: string, options: any): any => [
  {
    isDirectory: (): boolean => true,
    name: "timer_workout",
  },
  {
    isDirectory: (): boolean => true,
    name: "rest_workout",
  },
  // {
  //   isDirectory: (): boolean => true,
  //   name: "video_workout",
  // },
];

const readFileSync = (path: string, format: string): any => {
  if (pathContains(path, "timer_workout")) {
    if (pathContains(path, "routine")) {
      return timerWorkoutRoutine;
    } else if (pathContains(path, "rest")) {
      return timerWorkoutRest;
    }
  } else if (pathContains(path, "rest_workout")) {
    if (pathContains(path, "routine")) {
      return restWorkoutRoutine;
    } else if (pathContains(path, "rest")) {
      return restWorkoutRest;
    }
  }
};

const pathContains = (path: string, substring: string): boolean =>
  path.indexOf(substring) !== -1;

const timerWorkoutRoutine = `
name: Timer Workout
segments: [ 
  { type: "timer", name: "Timer scene 1", duration: 999 },
  { type: "timer", name: "Timer scene 2", duration: 999 }
]
`;

const timerWorkoutRest = `
restLengths:
  short: 0
  medium: 0
  long: 0
`;

const restWorkoutRoutine = `
name: Rest Workout
segments: [ 
  { type: "rest", restType: 'short' },
  { type: "rest", restType: 'medium' },
]
`;

const restWorkoutRest = `
restLengths:
  short: 99
  medium: 99
  long: 99
`;
