import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import portfolioData from '../data/portfolioData';
import VideoGrid from '../components/video/VideoGrid';
import TopicFilter from '../components/video/TopicFilter';
import VimeoEmbed from '../components/video/VimeoEmbed';
import FloatingMenu from '../components/layout/FloatingMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Video } from '../types';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  overflow-x: hidden;
`;

// Hero Section
const Hero = styled.section`
  height: 100vh;
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
    background: linear-gradient(to right, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.4) 100%);
    z-index: 1;
  }
`;

const BackgroundVideo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
  }
`;

const FullscreenVideo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%; /* Even more stretched for emphasis */
  height: 150%; /* Even more stretched for emphasis */
  transform: translate(-50%, -50%);
  pointer-events: none;

  @media (max-width: 768px) {
    width: 250%; /* Much wider on mobile to ensure coverage */
    height: 250%;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fadeIn 1.5s ease-out forwards;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  letter-spacing: 1px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 300;
  margin-bottom: 2rem;
  max-width: 700px;
  text-align: center;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

// Section Styles
const Section = styled.section`
  padding: 6rem 0;
  scroll-margin-top: 80px;
`;

const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    right: 50%;
    transform: translateX(50%);
    bottom: -10px;
    width: 80px;
    height: 3px;
    background-color: var(--accent-color);
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: var(--secondary-color);
  opacity: 0.85;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  font-weight: 300;
`;

// About Section
const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  gap: 3rem;
`;

const ProfileImage = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Bio = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
`;

// Contact Section
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  gap: 3rem;
`;

const ContactDetails = styled.div`
  background-color: var(--card-background);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 150px;
`;

const ContactIcon = styled.span`
  width: 50px;
  height: 50px;
  background-color: var(--accent-color);
  color: var(--light-text);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const ContactText = styled.div`
  h4 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: var(--secondary-color);
    opacity: 0.8;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: var(--light-text);
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--accent-color);
    transform: translateY(-3px);
  }
`;

// Modal for video playback
const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ModalContent = styled.div`
  width: 100%;
  max-width: 1200px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: -60px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 3rem;
  cursor: pointer;
  z-index: 10;
  transition: transform 0.2s ease, color 0.2s ease;
  padding: 10px;

  &:hover {
    transform: scale(1.1);
    color: #ccc;
  }

  @media (max-width: 768px) {
    top: -50px;
    right: 5px;
    font-size: 2.5rem;
  }
`;

const ModalInstruction = styled.div`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  text-align: center;

  @media (max-width: 768px) {
    bottom: -35px;
    font-size: 0.8rem;
  }
`;

const ResponsiveVideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -10px;
    width: 50px;
    height: 2px;
    background-color: var(--accent-color);
  }
`;

const FooterLink = styled(Link)`
  color: var(--secondary-color);
  margin-bottom: 0.8rem;
  transition: var(--transition);

  &:hover {
    color: var(--accent-color);
    transform: translateX(-5px);
  }
`;

const navItems = [
  { id: 'portfolio', label: 'תיק עבודות' },
  { id: 'about', label: 'אודות' },
  { id: 'contact', label: 'צור קשר' }
];

const PortfolioOnePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [filteredVideos, setFilteredVideos] = useState<Video[]>(portfolioData.videos);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Create individual refs for each section
  const heroRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Filter videos based on selected topic
  useEffect(() => {
    // Since filter is hidden, just show all videos
    setFilteredVideos(portfolioData.videos);

    /* Uncomment when filter is restored
    if (selectedTopic) {
      setFilteredVideos(
        portfolioData.videos.filter(video => video.topics.includes(selectedTopic))
      );
    } else {
      setFilteredVideos(portfolioData.videos);
    }
    */
  }, [selectedTopic]);

  // Intersection Observer for sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px 0px 0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each section
    if (heroRef.current) observer.observe(heroRef.current);
    if (portfolioRef.current) observer.observe(portfolioRef.current);
    if (aboutRef.current) observer.observe(aboutRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    let ref;
    switch(sectionId) {
      case 'portfolio':
        ref = portfolioRef;
        break;
      case 'about':
        ref = aboutRef;
        break;
      case 'contact':
        ref = contactRef;
        break;
      default:
        ref = heroRef;
    }

    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTopicChange = (topicId: string | null) => {
    setSelectedTopic(topicId);
  };

  const handleVideoClick = (videoId: string) => {
    const video = portfolioData.videos.find(v => v.id === videoId);
    if (video) {
      setSelectedVideo(video);
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  // Add keyboard event listener for ESC key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <PageContainer>
      <FloatingMenu
        items={navItems}
        activeSection={activeSection}
        onItemClick={scrollToSection}
      />

      {/* Hero Section */}
      <Hero id="hero">
        <BackgroundVideo>
          <FullscreenVideo>
            <iframe
              src="https://player.vimeo.com/video/1005809580?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1&quality=1080p&autopause=0&dnt=1"
              frameBorder="0"
              allow="autoplay; fullscreen"
              title="Background video"
            ></iframe>
          </FullscreenVideo>
        </BackgroundVideo>
        <HeroContent>
          <HeroTitle>עמית אלגלי</HeroTitle>
          <HeroSubtitle>במאי ועורך | יוצר סיפורים חזותיים מרתקים</HeroSubtitle>
        </HeroContent>
      </Hero>

      {/* Portfolio Section */}
      <Section id="portfolio" ref={portfolioRef}>
        <SectionContent>
          <SectionTitle>תיק עבודות</SectionTitle>
          <SectionSubtitle>
            סקירה של פרויקטי הוידאו שלי
          </SectionSubtitle>

          {/*
            Category filter temporarily hidden - uncomment to enable filtering
            <TopicFilter
              topics={portfolioData.topics}
              activeTopic={selectedTopic}
              onTopicChange={handleTopicChange}
            />
          */}

          <VideoGrid
            videos={filteredVideos}
            emptyMessage="לא נמצאו סרטונים בקטגוריה הנבחרת"
            onVideoClick={handleVideoClick}
          />
        </SectionContent>
      </Section>

      {/* About Section */}
      <Section id="about" ref={aboutRef}>
        <SectionContent>
          <SectionTitle>אודות</SectionTitle>
          <SectionSubtitle>מידע נוסף על העבודה והניסיון שלי</SectionSubtitle>

          <AboutContent>
            <ProfileImage>
              <img src="https://i.vimeocdn.com/portrait/64490447_640x640" alt="עמית אלגלי" />
            </ProfileImage>

            <Bio>
              <p>
                עמית אלגלי הוא במאי ועורך המתגורר בלוס אנג'לס עם תשוקה לסיפורים חזותיים.
                עם ניסיון בפרסומות, קליפים וסרטים נרטיביים, עמית מביא נקודת מבט ייחודית וסגנון
                קולנועי לכל פרויקט.
              </p>
              <p>
                עבודתו עבור מותגים כמו קיה, יונדאי ואודיבל מדגימה את יכולתו ליצור
                סיפורים מרתקים שמדברים עם הקהל תוך העברת מסרי המותג ביעילות.
                העבודה הנרטיבית שלו חוקרת קשרים אנושיים ורגשות דרך דימויים חזותיים מרהיבים.
              </p>
              <p>
                הגישה של עמית משלבת דיוק טכני עם חזון אמנותי, שמביא
                לתוצאות חזותיות מיוחדות שמשאירות רושם עמוק. באמצעות בימוי מחושב
                ועריכה מדויקת, הוא מעביר רעיונות לחוויות חזותיות עוצמתיות.
              </p>

              <SocialLinks>
                <SocialLink href="https://vimeo.com/amitalgali" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={['fab', 'vimeo-v']} />
                </SocialLink>
                <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={['fab', 'instagram']} />
                </SocialLink>
                <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
                </SocialLink>
              </SocialLinks>
            </Bio>
          </AboutContent>
        </SectionContent>
      </Section>

      {/* Contact Section */}
      <Section id="contact" ref={contactRef}>
        <SectionContent>
          <SectionTitle>צור קשר</SectionTitle>
          <SectionSubtitle>מעוניינים לעבוד יחד? צרו קשר.</SectionSubtitle>

          <ContactInfo>
            <ContactDetails>
              <ContactItems>
                <ContactItem>
                  <ContactIcon>
                    <FontAwesomeIcon icon={['fas', 'envelope']} />
                  </ContactIcon>
                  <ContactText>
                    <h4>אימייל</h4>
                    <p>amit@algali.com</p>
                  </ContactText>
                </ContactItem>

                <ContactItem>
                  <ContactIcon>
                    <FontAwesomeIcon icon={['fas', 'location-dot']} />
                  </ContactIcon>
                  <ContactText>
                    <h4>מיקום</h4>
                    <p>לוס אנג'לס, קליפורניה</p>
                  </ContactText>
                </ContactItem>

                <ContactItem>
                  <ContactIcon>
                    <FontAwesomeIcon icon={['fas', 'video']} />
                  </ContactIcon>
                  <ContactText>
                    <h4>וימאו</h4>
                    <p><a href="https://vimeo.com/amitalgali" target="_blank" rel="noopener noreferrer">vimeo.com/amitalgali</a></p>
                  </ContactText>
                </ContactItem>
              </ContactItems>

              <SocialLinks>
                <SocialLink href="https://vimeo.com/amitalgali" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={['fab', 'vimeo-v']} />
                </SocialLink>
                <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={['fab', 'instagram']} />
                </SocialLink>
                <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
                </SocialLink>
              </SocialLinks>
            </ContactDetails>

            <ContactDetails>
              <h3 style={{ marginBottom: '1.5rem' }}>פנייה לפרויקט</h3>
              <p style={{ marginBottom: '1.5rem', maxWidth: '500px' }}>
                לשיתופי פעולה או לדון בפרויקט שלכם, אנא צרו קשר באמצעות האימייל
                או דרך ערוצי המדיה החברתית המפורטים.
              </p>
              <p>
                זמין לפרויקטים מסחריים, וידאו קליפים ופרויקטי סרטים נרטיביים ברחבי העולם.
              </p>
            </ContactDetails>
          </ContactInfo>
        </SectionContent>
      </Section>

      {/* Video Modal */}
      <Modal
        isOpen={isModalOpen}
        onClick={() => closeModal()}
        ref={modalRef}
      >
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={() => closeModal()} aria-label="Close">
            <FontAwesomeIcon icon={['fas', 'times']} />
          </CloseButton>
          {selectedVideo && (
            <ResponsiveVideoContainer>
              <iframe
                src={`https://player.vimeo.com/video/${selectedVideo.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={selectedVideo.title}
              ></iframe>
            </ResponsiveVideoContainer>
          )}
          <ModalInstruction>לחצו ESC לסגירה</ModalInstruction>
        </ModalContent>
      </Modal>
    </PageContainer>
  );
};

export default PortfolioOnePage;