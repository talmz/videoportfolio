import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 20px;
`;

const ContactHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const ContactTitle = styled.h1`
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

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled.form`
  background-color: var(--card-background);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const FormTitle = styled.h2`
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

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: var(--transition);

  &:focus {
    border-color: var(--accent-color);
    outline: none;
    box-shadow: 0 0 0 2px rgba(233, 69, 96, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: var(--transition);
  min-height: 150px;
  resize: vertical;

  &:focus {
    border-color: var(--accent-color);
    outline: none;
    box-shadow: 0 0 0 2px rgba(233, 69, 96, 0.2);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  transition: var(--transition);
  margin-top: 1rem;

  &:hover {
    background-color: #d23c55;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const Message = styled.div<{ success?: boolean }>`
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 4px;
  background-color: ${({ success }) => success ? '#d4edda' : '#f8d7da'};
  color: ${({ success }) => success ? '#155724' : '#721c24'};
`;

const ContactInfo = styled.div`
  color: var(--text-color);
`;

const InfoTitle = styled.h2`
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

const InfoText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const ContactDetails = styled.div`
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ContactIcon = styled.span`
  font-size: 1.2rem;
  margin-right: 1rem;
  width: 24px;
  color: var(--accent-color);
`;

const ContactText = styled.span`
  font-size: 1rem;
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
  font-size: 1.2rem;
  transition: var(--transition);

  &:hover {
    background-color: var(--accent-color);
    transform: translateY(-3px);
  }
`;

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ text: string; success: boolean } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      setFormMessage({
        text: 'Thank you for your message! I will get back to you soon.',
        success: true
      });

      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setFormMessage(null);
      }, 5000);
    }, 1500);
  };

  return (
    <ContactContainer>
      <ContactHeader>
        <ContactTitle>Contact Me</ContactTitle>
        <Subtitle>
          Have a project in mind? Let's discuss how we can collaborate
        </Subtitle>
      </ContactHeader>

      <ContactContent>
        <ContactForm onSubmit={handleSubmit}>
          <FormTitle>Send a Message</FormTitle>

          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>

          {formMessage && (
            <Message success={formMessage.success}>
              {formMessage.text}
            </Message>
          )}
        </ContactForm>

        <ContactInfo>
          <InfoTitle>Get in Touch</InfoTitle>
          <InfoText>
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision. Feel free to reach out using the contact form or through any of the methods below.
          </InfoText>

          <ContactDetails>
            <ContactItem>
              <ContactIcon>📍</ContactIcon>
              <ContactText>123 Creative Ave. Los Angeles, CA 90001</ContactText>
            </ContactItem>
            <ContactItem>
              <ContactIcon>📧</ContactIcon>
              <ContactText>info@johndoe.com</ContactText>
            </ContactItem>
            <ContactItem>
              <ContactIcon>📞</ContactIcon>
              <ContactText>(123) 456-7890</ContactText>
            </ContactItem>
          </ContactDetails>

          <InfoText>
            Follow me on social media for the latest updates and behind-the-scenes content from my projects.
          </InfoText>

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
        </ContactInfo>
      </ContactContent>
    </ContactContainer>
  );
};

export default ContactPage;