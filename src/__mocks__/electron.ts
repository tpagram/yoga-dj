/* eslint-disable @typescript-eslint/no-explicit-any */

export const remote = {
  require: (module: string): any => ({
    readdirSync: readdirSync,
    readFileSync: readFileSync,
  }),
};

const readdirSync = (path: string, options: any): any => [
  {
    isDirectory: (): boolean => true,
    name: "timer_workout",
  },
  // {
  //   isDirectory: (): boolean => true,
  //   name: "rest_workout",
  // },
  // {
  //   isDirectory: (): boolean => true,
  //   name: "video_workout",
  // },
];

const readFileSync = (path: string, format: string): any => {
  if (path.indexOf("routine") !== -1) {
    return timerWorkoutRoutine;
  } else if (path.indexOf("rest") !== -1) {
    return timerWorkoutRest;
  }
};

const timerWorkoutRoutine = `
name: Timer Workout
segments: [ 
  { type: "timer", name: "Timer scene 1", duration: 999 },
  { type: "timer", name: "Timer scene 2", duration: 999 }
]
`;

const timerWorkoutRest = `
restLengths:
  short: 4
  medium: 4
  long: 5
`;
