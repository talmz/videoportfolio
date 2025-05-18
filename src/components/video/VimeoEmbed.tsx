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

interface VimeoEmbedProps {
  vimeoId: string;
  title?: string;
  autoplay?: boolean;
  muted?: boolean;
  minimalControls?: boolean;
}

// Use forwardRef to allow parent components to access the iframe
const VimeoEmbed = forwardRef<HTMLIFrameElement, VimeoEmbedProps>(({
  vimeoId,
  title = 'Vimeo video player',
  autoplay = false,
  muted = true,
  minimalControls = true
}, ref) => {
  const localRef = useRef<HTMLIFrameElement>(null);

  // Combine refs
  const iframeRef = (ref || localRef) as React.RefObject<HTMLIFrameElement>;

  // Build the base embed URL parameters
  const baseParams = [
    'byline=0',
    'portrait=0',
    'title=0',
    'background=1',    // Use background mode for clean appearance
    'controls=0',      // Hide default controls
    'loop=1',          // Loop the video
    'autopause=0',     // Prevent autopause when another video starts
    'quality=auto',    // Adaptive quality
    muted ? 'muted=1' : '',
    autoplay ? 'autoplay=1' : ''
  ].filter(Boolean).join('&');

  // Create the embed URL
  const embedUrl = `https://player.vimeo.com/video/${vimeoId}?${baseParams}`;

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
  }, [vimeoId, iframeRef]);

  // Handle mute state changes
  useEffect(() => {
    if (iframeRef.current && autoplay) {
      try {
        const message = {
          method: 'setVolume',
          value: muted ? 0 : 1
        };

        iframeRef.current.contentWindow?.postMessage(
          JSON.stringify(message),
          '*'
        );
      } catch (error) {
        console.error("Failed to control volume:", error);
      }
    }
  }, [muted, autoplay, iframeRef]);

  return (
    <VideoContainer>
      <StyledIframe
        ref={iframeRef}
        src={embedUrl}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </VideoContainer>
  );
});

export default VimeoEmbed;