import React from 'react';
import styled from 'styled-components';

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  max-width: 100%;
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

interface YouTubeEmbedProps {
  youtubeId: string;
  title?: string;
  autoplay?: boolean;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  youtubeId,
  title = 'YouTube video player',
  autoplay = false
}) => {
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?rel=0${autoplay ? '&autoplay=1' : ''}`;

  return (
    <VideoContainer>
      <StyledIframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </VideoContainer>
  );
};

export default YouTubeEmbed;