import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import portfolioData from '../data/portfolioData';
import VimeoEmbed from '../components/video/VimeoEmbed';
import VideoGrid from '../components/video/VideoGrid';

const VideoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin: 2rem 0;
  color: var(--primary-color);
  font-weight: 600;
  transition: var(--transition);

  &:hover {
    color: var(--accent-color);
    transform: translateX(-5px);
  }

  &:before {
    content: '←';
    margin-right: 0.5rem;
  }
`;

const VideoTitle = styled.h1`
  font-size: 2.5rem;
  margin: 1.5rem 0;
`;

const VideoInfo = styled.div`
  margin: 2rem 0;
`;

const VideoDate = styled.div`
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.7;
  margin-bottom: 1rem;
`;

const VideoDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const TopicContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const TopicTag = styled(Link)`
  background-color: var(--primary-color);
  color: var(--light-text);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: var(--transition);

  &:hover {
    background-color: var(--accent-color);
    transform: translateY(-2px);
  }
`;

const RelatedSection = styled.div`
  margin: 4rem 0;
`;

const RelatedTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 60px;
    height: 3px;
    background-color: var(--accent-color);
  }
`;

const VideoDetailPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();

  // Find the selected video
  const video = portfolioData.videos.find(v => v.id === videoId);

  // If video not found, redirect to portfolio page
  if (!video) {
    return <Navigate to="/portfolio" />;
  }

  // Get related videos (same topics, excluding current video)
  const relatedVideos = portfolioData.videos
    .filter(v =>
      v.id !== video.id &&
      v.topics.some(topic => video.topics.includes(topic))
    )
    .slice(0, 3);

  // Get topic objects for the current video
  const videoTopics = portfolioData.topics.filter(topic =>
    video.topics.includes(topic.id)
  );

  // Handler for video clicks in the related videos section
  const handleVideoClick = (clickedVideoId: string) => {
    console.log('Video clicked:', clickedVideoId);
    // In a real implementation, we would navigate to the clicked video
  };

  return (
    <VideoContainer>
      <BackLink to="/portfolio">Back to Portfolio</BackLink>

      <VimeoEmbed vimeoId={video.vimeoId} title={video.title} />

      <VideoInfo>
        <VideoTitle>{video.title}</VideoTitle>
        <VideoDate>{new Date(video.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</VideoDate>
        <VideoDescription>{video.description}</VideoDescription>

        <TopicContainer>
          {videoTopics.map(topic => (
            <TopicTag key={topic.id} to={`/portfolio/topic/${topic.id}`}>
              {topic.name}
            </TopicTag>
          ))}
        </TopicContainer>
      </VideoInfo>

      {relatedVideos.length > 0 && (
        <RelatedSection>
          <RelatedTitle>Related Videos</RelatedTitle>
          <VideoGrid
            videos={relatedVideos}
            onVideoClick={handleVideoClick}
          />
        </RelatedSection>
      )}
    </VideoContainer>
  );
};

export default VideoDetailPage;