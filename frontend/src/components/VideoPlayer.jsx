import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ videoUrl }) {
  return (
    <div>
      {videoUrl ? (
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="640px"
          controls
          playing={false}
        />
      ) : (
        <p>No video available</p>
      )}
    </div>
  );
}

export default VideoPlayer;
