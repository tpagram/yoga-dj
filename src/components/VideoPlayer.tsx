import React from "react";
import styled from "styled-components";

const VideoPlayer = styled.div`
  min-width: 100%;
  min-height: 100%;
`;

type VideoPlayerProps = {
  source: string;
  finished: () => void;
};

export default ({source, finished} : VideoPlayerProps) => {
  return (
    <VideoPlayer>
      <video onPause={finished} controls autoPlay>
        <source src={source} type="video/mp4" />
      </video>
    </VideoPlayer>
  );
};
