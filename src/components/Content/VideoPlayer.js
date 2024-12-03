import React from "react";

const VideoPlayer = ({ url }) => {
  const getYouTubeEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    if (!videoId) return null;
    const ampersandPosition = videoId.indexOf("&");
    return `https://www.youtube.com/embed/${
      ampersandPosition !== -1 ? videoId.substring(0, ampersandPosition) : videoId
    }`;
  };

  return (
    <div className="w-full aspect-video">
      {url ? (
        <iframe
          src={getYouTubeEmbedUrl(url)}
          width="100%"
          height="100%"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="YouTube Video Player"
        />
      ) : (
        <div>Loading video...</div>
      )}
    </div>
  );
};

export default VideoPlayer;
