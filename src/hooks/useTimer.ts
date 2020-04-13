import { useState, useEffect, useRef } from "react";
import moment from "moment";

const useTimer = (
  duration: number,
  finishedCallback: () => void
): [number, () => void] => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [paused, setPaused] = useState(false);
  const [finalTimeInMillis, setFinalTimeInMillis] = useState(
    moment().add(duration, "ms")
  );
  const pausedRef = useRef<boolean>(false);

  useEffect(() => {
    const wasPaused = pausedRef.current;
    pausedRef.current = paused;

    if (timeLeft <= 0) {
      // The timer has finished, clean up.
      finishedCallback();
      return;
    } else if (paused) {
      // The timer is paused, skip update.
      return;
    } else if (wasPaused) {
      // The timer has just been unpaused, update the final time.
      setFinalTimeInMillis(moment().add(timeLeft, "ms"));
    } else {
      // The timer is running, update the time remaining.
      setTimeout(() => {
        setTimeLeft(finalTimeInMillis.diff(moment()));
      }, 100);
    }
  }, [paused, timeLeft, finalTimeInMillis, finishedCallback]);

  useEffect(() => {
    const chime = new Audio("chimes.mp3");
    chime.play();
    return (): void => {
      chime.play();
    };
  }, []);

  return [timeLeft, (): void => setPaused(!paused)];
};

export default useTimer;