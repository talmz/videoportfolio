import React, { useRef, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import VimeoEmbed from './VimeoEmbed';
import YouTubeEmbed from './YouTubeEmbed';
import { Video } from '../../types';

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  max-width: 100%;
`;

interface VideoEmbedProps {
  video: Video;
  autoplay?: boolean;
  muted?: boolean;
  minimalControls?: boolean;
}

// Use forwardRef to allow parent components to access the iframe
const VideoEmbed = forwardRef<HTMLIFrameElement, VideoEmbedProps>(({
  video,
  autoplay = false,
  muted = true,
  minimalControls = true
}, ref) => {

  if (video.videoType === 'youtube' && video.youtubeId) {
    return (
      <YouTubeEmbed
        youtubeId={video.youtubeId}
        title={video.title}
        autoplay={autoplay}
        muted={muted}
        ref={ref}
      />
    );
  } else if (video.videoType === 'vimeo' && video.vimeoId) {
    return (
      <VimeoEmbed
        vimeoId={video.vimeoId}
        title={video.title}
        autoplay={autoplay}
        muted={muted}
        minimalControls={minimalControls}
        ref={ref}
      />
    );
  }

  // Fallback in case of invalid video data
  return (
    <VideoContainer>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
      }}>
        Video unavailable
      </div>
    </VideoContainer>
  );
});

export default VideoEmbed;