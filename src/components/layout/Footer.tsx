import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FooterContainer = styled.footer`
  background-color: var(--primary-color);
  color: var(--light-text);
  padding: 3rem 0 2rem;
  margin-top: 5rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 0;
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
    transform: translateX(5px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  color: var(--light-text);
  font-size: 1.5rem;
  transition: var(--transition);

  &:hover {
    color: var(--accent-color);
    transform: translateY(-3px);
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--secondary-color);
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>John Doe</FooterTitle>
          <p>Professional video editor and producer creating compelling visual stories for brands and individuals.</p>
          <SocialLinks>
            <SocialLink href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={["fab", "youtube"]} />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={["fab", "instagram"]} />
            </SocialLink>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={["fab", "twitter"]} />
            </SocialLink>
            <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={["fab", "linkedin"]} />
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/portfolio">Portfolio</FooterLink>
          <FooterLink to="/about">About</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <p>123 Creative Ave.</p>
          <p>Los Angeles, CA 90001</p>
          <p>info@johndoe.com</p>
          <p>(123) 456-7890</p>
        </FooterSection>
      </FooterContent>

      <Copyright>
        &copy; {new Date().getFullYear()} John Doe. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;