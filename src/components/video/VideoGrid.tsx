import React from 'react';
import styled from 'styled-components';
import { Video } from '../../types';
import HoverVideoCard from './HoverVideoCard';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 3.5rem;
  margin: 4rem 0 6rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem 3rem;
  }
`;

const VideoCardWrapper = styled.div`
  height: 100%;
  aspect-ratio: 16 / 9;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  will-change: transform;
  transform-style: preserve-3d;
  backface-visibility: hidden;

  &:hover {
    z-index: 10;
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  margin: 4rem 0;
  font-size: 1.1rem;
  color: var(--light-text);
  opacity: 0.7;
`;

// Preloads thumbnails for smoother experience
const ThumbnailPreloader = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
`;

interface VideoGridProps {
  videos: Video[];
  emptyMessage?: string;
  onVideoClick: (videoId: string) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({
  videos,
  emptyMessage = 'No videos found',
  onVideoClick
}) => {
  if (videos.length === 0) {
    return <EmptyMessage>{emptyMessage}</EmptyMessage>;
  }

  // Preload all thumbnails for faster display
  const thumbnailUrls = videos.map(video => {
    // Ensure we're using high-quality thumbnails
    return video.thumbnailUrl.includes('_640')
      ? video.thumbnailUrl.replace('_640', '_1280')
      : video.thumbnailUrl;
  });

  return (
    <>
      {/* Hidden preloader for thumbnails */}
      <ThumbnailPreloader>
        {thumbnailUrls.map((url, index) => (
          <img key={index} src={url} alt="" />
        ))}
      </ThumbnailPreloader>

      <Grid>
        {videos.map((video) => (
          <VideoCardWrapper key={video.id}>
            <HoverVideoCard video={video} onClick={onVideoClick} />
          </VideoCardWrapper>
        ))}
      </Grid>
    </>
  );
};

export default VideoGrid;