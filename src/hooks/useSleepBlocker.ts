import { useEffect } from "react";
import { remote } from "electron";

const useSleepBlocker = (): void => {
  useEffect(() => {
    const id = remote.powerSaveBlocker.start("prevent-display-sleep");
    console.log("Blocking power with:" + id);
    return (): void => {
      console.log("Releasing power with:" + id);
      remote.powerSaveBlocker.stop(id);
    };
  }, []);
};

export default useSleepBlocker;
