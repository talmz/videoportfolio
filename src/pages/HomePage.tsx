import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import portfolioData from '../data/portfolioData';
import VideoGrid from '../components/video/VideoGrid';

const Hero = styled.section`
  height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
  background-color: var(--primary-color);
  color: var(--light-text);
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 2rem;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const HeroButton = styled(Link)`
  display: inline-block;
  background-color: var(--accent-color);
  color: var(--light-text);
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: var(--transition);

  &:hover {
    background-color: #d23c55;
    transform: translateY(-3px);
  }
`;

const Section = styled.section`
  padding: 5rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 80px;
    height: 3px;
    background-color: var(--accent-color);
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 3rem;
  max-width: 600px;
`;

const ViewMoreLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 3rem;
  font-weight: 600;
  color: var(--accent-color);
  font-size: 1.1rem;
  transition: var(--transition);

  &:hover {
    transform: translateY(-3px);
  }
`;

const HomePage: React.FC = () => {
  // Get the 4 most recent videos for the featured section
  const featuredVideos = [...portfolioData.videos]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  const handleVideoClick = (videoId: string) => {
    // We don't need actual implementation since we're not using this page anymore
    console.log('Video clicked:', videoId);
  };

  return (
    <>
      <Hero>
        <HeroContent>
          <HeroTitle>{portfolioData.name}</HeroTitle>
          <HeroSubtitle>{portfolioData.title}</HeroSubtitle>
          <HeroButton to="/portfolio">View Portfolio</HeroButton>
        </HeroContent>
      </Hero>

      <div className="container">
        <Section>
          <SectionTitle>Featured Work</SectionTitle>
          <SectionSubtitle>
            Check out some of my recent video projects
          </SectionSubtitle>

          <VideoGrid
            videos={featuredVideos}
            onVideoClick={handleVideoClick}
          />

          <ViewMoreLink to="/portfolio">
            View Complete Portfolio →
          </ViewMoreLink>
        </Section>
      </div>
    </>
  );
};

export default HomePage;