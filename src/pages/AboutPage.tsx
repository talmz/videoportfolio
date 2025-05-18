import React from 'react';
import styled from 'styled-components';
import portfolioData from '../data/portfolioData';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 20px;
`;

const AboutHeader = styled.div`
  margin-bottom: 4rem;
  text-align: center;
`;

const AboutTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-color);
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProfileImage = styled.div`
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const AboutInfo = styled.div`
  color: var(--text-color);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
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

const Bio = styled.div`
  margin-bottom: 3rem;

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
`;

const SkillsSection = styled.div`
  margin-bottom: 3rem;
`;

const SkillsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Skill = styled.div`
  background-color: var(--card-background);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
  }

  p {
    font-size: 0.9rem;
    opacity: 0.8;
  }
`;

const AboutPage: React.FC = () => {
  return (
    <AboutContainer>
      <AboutHeader>
        <AboutTitle>About Me</AboutTitle>
        <Subtitle>
          Learn more about my background, skills, and professional journey
        </Subtitle>
      </AboutHeader>

      <AboutContent>
        <ProfileImage>
          <img src="https://via.placeholder.com/500x600" alt={portfolioData.name} />
        </ProfileImage>

        <AboutInfo>
          <SectionTitle>My Story</SectionTitle>
          <Bio>
            <p>
              Hello, I'm {portfolioData.name}, a passionate {portfolioData.title} with over 10 years of experience in the industry.
              {portfolioData.bio}
            </p>
            <p>
              My journey in video production began after completing my degree in Film and Media Studies. Since then, I've worked with a diverse range of clients from small businesses to international brands, helping them tell their stories through compelling visual content.
            </p>
            <p>
              My approach combines technical expertise with creative storytelling, ensuring that each project not only looks professional but also connects with the target audience on an emotional level. I believe that great videos don't just inform—they inspire and motivate.
            </p>
          </Bio>

          <SkillsSection>
            <SectionTitle>Expertise</SectionTitle>
            <SkillsList>
              <Skill>
                <h3>Video Editing</h3>
                <p>Expert in Adobe Premiere Pro, Final Cut Pro, and DaVinci Resolve</p>
              </Skill>
              <Skill>
                <h3>Motion Graphics</h3>
                <p>Creating engaging animations with After Effects and Cinema 4D</p>
              </Skill>
              <Skill>
                <h3>Color Grading</h3>
                <p>Professional color correction and grading to enhance visual storytelling</p>
              </Skill>
              <Skill>
                <h3>Sound Design</h3>
                <p>Audio mixing and sound effects to create immersive experiences</p>
              </Skill>
              <Skill>
                <h3>Cinematography</h3>
                <p>Skilled in camera operation and lighting techniques</p>
              </Skill>
              <Skill>
                <h3>Project Management</h3>
                <p>Efficient workflow management from pre to post-production</p>
              </Skill>
            </SkillsList>
          </SkillsSection>
        </AboutInfo>
      </AboutContent>
    </AboutContainer>
  );
};

export default AboutPage;
