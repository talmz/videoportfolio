import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import portfolioData from '../data/portfolioData';
import VideoGrid from '../components/video/VideoGrid';
import TopicFilter from '../components/video/TopicFilter';
import { Video } from '../types';

const PageHeader = styled.div`
  padding: 3rem 0;
  background-color: var(--secondary-color);
  margin-bottom: 2rem;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: var(--text-color);
  opacity: 0.8;
  max-width: 600px;
`;

const PortfolioPage: React.FC = () => {
  // Get topic ID from URL params
  const { topicId } = useParams<{ topicId: string }>();

  // Filter videos based on the selected topic
  const filteredVideos: Video[] = topicId
    ? portfolioData.videos.filter(video => video.topics.includes(topicId))
    : portfolioData.videos;

  // Find the current topic for display purposes
  const currentTopic = topicId
    ? portfolioData.topics.find(topic => topic.id === topicId)
    : null;

  // Sort videos by date (most recent first)
  const sortedVideos = [...filteredVideos].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Handle topic changes
  const handleTopicChange = (selectedTopicId: string | null) => {
    console.log('Topic changed:', selectedTopicId);
    // In a real implementation, we would navigate to the new topic
  };

  // Handle video clicks
  const handleVideoClick = (videoId: string) => {
    console.log('Video clicked:', videoId);
    // In a real implementation, we would open the video details
  };

  return (
    <>
      <PageHeader>
        <HeaderContent>
          <PageTitle>
            {currentTopic ? `${currentTopic.name} Videos` : 'Video Portfolio'}
          </PageTitle>
          <PageDescription>
            {currentTopic
              ? currentTopic.description
              : 'Browse through my video projects categorized by topic'}
          </PageDescription>
        </HeaderContent>
      </PageHeader>

      <div className="container">
        <TopicFilter
          topics={portfolioData.topics}
          activeTopic={topicId || null}
          onTopicChange={handleTopicChange}
        />

        <VideoGrid
          videos={sortedVideos}
          emptyMessage={`No videos found for the ${currentTopic?.name || ''} category`}
          onVideoClick={handleVideoClick}
        />
      </div>
    </>
  );
};

export default PortfolioPage;