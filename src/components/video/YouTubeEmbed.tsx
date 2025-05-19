import React, { useRef, useEffect, forwardRef } from 'react';
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
  opacity: 0;
  transition: opacity 0.5s ease;

  &.loaded {
    opacity: 1;
  }
`;

interface YouTubeEmbedProps {
  youtubeId: string;
  title?: string;
  autoplay?: boolean;
  muted?: boolean;
}

const YouTubeEmbed = forwardRef<HTMLIFrameElement, YouTubeEmbedProps>(({
  youtubeId,
  title = 'YouTube video player',
  autoplay = false,
  muted = true
}, ref) => {
  const localRef = useRef<HTMLIFrameElement>(null);

  // Combine refs
  const iframeRef = (ref || localRef) as React.RefObject<HTMLIFrameElement>;

  // Build parameters
  const params = [
    'rel=0',
    'showinfo=0',
    'enablejsapi=1',
    autoplay ? 'autoplay=1' : '',
    muted ? 'mute=1' : '',
    'modestbranding=1',
    'loop=1',
    'playsinline=1',
    'controls=0'
  ].filter(Boolean).join('&');

  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?${params}`;

  // Handle iframe load event to fade in smoothly
  useEffect(() => {
    const iframe = iframeRef.current;

    if (iframe) {
      const handleLoad = () => {
        iframe.classList.add('loaded');
      };

      iframe.addEventListener('load', handleLoad);

      return () => {
        iframe.removeEventListener('load', handleLoad);
      };
    }
  }, [youtubeId, iframeRef]);

  return (
    <VideoContainer>
      <StyledIframe
        ref={iframeRef}
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </VideoContainer>
  );
});

export default YouTubeEmbed;