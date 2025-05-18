import React from 'react';
import styled from 'styled-components';
import { Video } from '../../types';
import { Link } from 'react-router-dom';

const Card = styled.div`
  background-color: var(--card-background);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ThumbnailContainer = styled.div`
  position: relative;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
`;

const Thumbnail = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);

  &:before {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 0 10px 16px;
    border-color: transparent transparent transparent white;
    margin-left: 5px;
  }

  ${Card}:hover & {
    opacity: 1;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
`;

const Description = styled.p`
  color: var(--text-color);
  margin-bottom: 1rem;
  font-size: 0.9rem;
  opacity: 0.8;
  flex-grow: 1;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const DateText = styled.span`
  font-size: 0.8rem;
  color: var(--text-color);
  opacity: 0.7;
`;

const Topics = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Topic = styled.span`
  font-size: 0.7rem;
  background-color: var(--primary-color);
  color: var(--light-text);
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
`;

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <Link to={`/video/${video.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <Card>
        <ThumbnailContainer>
          <Thumbnail src={video.thumbnailUrl} alt={video.title} />
          <PlayIcon />
        </ThumbnailContainer>
        <CardContent>
          <Title>{video.title}</Title>
          <Description>{video.description}</Description>
          <CardFooter>
            <DateText>{new Date(video.date).toLocaleDateString()}</DateText>
            <Topics>
              {video.topics.slice(0, 2).map((topic, index) => (
                <Topic key={index}>{topic}</Topic>
              ))}
            </Topics>
          </CardFooter>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VideoCard;