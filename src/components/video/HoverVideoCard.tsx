import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Video } from '../../types';
import VimeoEmbed from './VimeoEmbed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Card = styled.div`
  background-color: transparent;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
  aspect-ratio: 16 / 9;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: translateY(-7px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
  }
`;

const VideoContainer = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
  width: 100%;
  flex-grow: 1;
`;

const Thumbnail = styled.div<{ imageUrl: string }>`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  transition: opacity 0.5s ease, transform 0.5s ease;
  z-index: 3;

  /* Add some image enhancement */
  filter: contrast(1.05) brightness(0.95);

  ${Card}:hover & {
    transform: scale(1.02);
  }
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.6) 100%);
  opacity: 1;
  transition: opacity 0.5s ease;
  z-index: 4;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const PlayerControls = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 20;
  display: flex;
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
  }
`;

const ControlButton = styled.button`
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const Title = styled.h3`
  position: absolute;
  bottom: 20px;
  right: 0;
  left: 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--light-text);
  padding: 0 20px;
  text-align: center;
  z-index: 10;
  letter-spacing: 0.7px;
  transition: opacity 0.3s ease, transform 0.3s ease;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);

  ${Card}:hover & {
    opacity: 0;
    transform: translateY(10px);
  }
`;

interface HoverVideoCardProps {
  video: Video;
  onClick: (videoId: string) => void;
}

const HoverVideoCard: React.FC<HoverVideoCardProps> = ({ video, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoKey, setVideoKey] = useState(0); // Used to force remount of video
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLIFrameElement>(null);

  const handleMouseEnter = () => {
    // Add a small delay before showing the video to prevent accidental triggers
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }

    hoverTimer.current = setTimeout(() => {
      setIsHovered(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }

    // Immediately stop the video when mouse leaves
    setIsHovered(false);
    setIsMuted(true); // Reset mute state when mouse leaves

    // Force video reload to ensure it stops
    setVideoKey(prevKey => prevKey + 1);
  };

  const handleClick = () => {
    onClick(video.id);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when toggling mute
    setIsMuted(!isMuted);
  };

  // Make sure we have a high-quality thumbnail
  const thumbnailUrl = video.thumbnailUrl.includes('_640')
    ? video.thumbnailUrl.replace('_640', '_1280')
    : video.thumbnailUrl;

  // Clean up timers when component unmounts
  useEffect(() => {
    return () => {
      if (hoverTimer.current) {
        clearTimeout(hoverTimer.current);
      }
    };
  }, []);

  return (
    <Card
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <VideoContainer>
        {/* Video embedded only when hovered */}
        {isHovered && (
          <VideoOverlay key={videoKey}>
            <VimeoEmbed
              vimeoId={video.vimeoId}
              autoplay={true}
              muted={isMuted}
              ref={videoRef}
            />
          </VideoOverlay>
        )}

        {/* Thumbnail is shown on top of the video when not hovered */}
        <Thumbnail
          imageUrl={thumbnailUrl}
          style={{ opacity: isHovered ? 0 : 1 }}
        />
        <ThumbnailOverlay style={{ opacity: isHovered ? 0 : 1 }} />

        {isHovered && (
          <PlayerControls>
            <ControlButton onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"}>
              <FontAwesomeIcon icon={['fas', isMuted ? 'volume-mute' : 'volume-up']} />
            </ControlButton>
          </PlayerControls>
        )}
      </VideoContainer>
      <Title>{video.title}</Title>
    </Card>
  );
};

export default HoverVideoCard;