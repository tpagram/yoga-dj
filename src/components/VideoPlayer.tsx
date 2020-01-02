import React from "react";
import styled from "styled-components";

const VideoPlayer = styled.div`
  min-width: 100%;
  min-height: 100%;
`;

type VideoPlayerProps = {
  source: string;
  finished: () => void;
  startTime: number;
  endTime: number;
};

export default ({ source, finished, startTime, endTime }: VideoPlayerProps) => {
  return (
    <VideoPlayer>
      <video onPause={finished} controls autoPlay>
        <source src={`${source}#t=${startTime},${endTime}`} type="video/mp4" />
      </video>
    </VideoPlayer>
  );
};
