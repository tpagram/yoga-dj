/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */

export const remote = {
  require: (module: string): any => ({
    readdirSync: readdirSync,
    readFileSync: readFileSync,
    writeFileSync: (path: string, payload: any): void => {},
    join: (...paths: string[]): string => "/full_path",
  }),
  powerSaveBlocker: {
    start: (): string => "id",
    stop: (id: string): void => {},
  },
  app: {
    exit: jest.fn(),
    getAppPath: (): string => "/path"
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
  {
    isDirectory: (): boolean => true,
    name: "video_workout",
  },
];

const readFileSync = (path: string, format: string): any => {
  if (pathContains(path, "rest.yml")) {
    return restTimes;
  } else if (pathContains(path, "timer_workout")) {
    return timerWorkoutRoutine;
  } else if (pathContains(path, "rest_workout")) {
    return restWorkoutRoutine;
  } else if (pathContains(path, "video_workout")) {
    return videoWorkoutRoutine;
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

const restWorkoutRoutine = `
name: Rest Workout
segments: [ 
  { type: "rest", restType: 'short' },
  { type: "rest", restType: 'medium' },
]
`;

const videoWorkoutRoutine = `
name: Video Workout
segments: [ 
  { type: "video", name: "Video scene 1", start_time: 0:00, end_time: 1:30 },
  { type: "video", name: "Video scene 1", start_time: 1:30, end_time: 3:00 },
]
`;

const restTimes = `
restLengths:
  short: 99
  medium: 99
  long: 99
`;