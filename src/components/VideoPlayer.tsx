import React from "react";
import styled from "styled-components";

const VideoPlayerWrapper = styled.div`
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

type VideoPlayerProps = {
  source: string;
  finished: () => void;
  startTime: number;
  endTime: number;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  source,
  finished,
  startTime,
  endTime
}: VideoPlayerProps) => {
  const videoPlayerReference = React.createRef<HTMLVideoElement>();
  return (
    <VideoPlayerWrapper>
      <video
        onLoadedMetadata={(): void => {
          if (videoPlayerReference.current) {
            videoPlayerReference.current.currentTime = startTime;
          }
        }}
        onTimeUpdate={(): void => {
          if (videoPlayerReference.current) {
            if (videoPlayerReference.current.currentTime >= endTime) {
              finished();
            }
            if (videoPlayerReference.current.currentTime < startTime) {
              videoPlayerReference.current.currentTime = startTime;
            }
          }
        }}
        ref={videoPlayerReference}
        controls
        autoPlay
        data-testid="video-player"
      >
        <source src={source} type="video/mp4" />
      </video>
    </VideoPlayerWrapper>
  );
};

export default VideoPlayer;
