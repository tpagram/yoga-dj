import { useEffect } from "react";
import { remote } from "electron";

const useSleepBlocker = (): void => {
  useEffect(() => {
    const id = remote.powerSaveBlocker.start("prevent-display-sleep");
    return (): void => {
      remote.powerSaveBlocker.stop(id);
    };
  }, []);
};

export default useSleepBlocker;
