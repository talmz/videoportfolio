import React from 'react';
import styled from 'styled-components';
import { Topic } from '../../types';

const FilterContainer = styled.div`
  margin: 2rem auto;
  text-align: center;
`;

const FilterTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: var(--light-text);
  font-weight: 500;
`;

const TopicsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const TopicButton = styled.button<{ active: boolean }>`
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  font-size: 0.95rem;
  transition: var(--transition);
  background-color: ${({ active }) => active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.05)'};
  color: var(--light-text);
  font-weight: ${({ active }) => active ? '600' : '400'};
  cursor: pointer;
  border: 1px solid ${({ active }) => active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.1)'};
  letter-spacing: 0.5px;

  &:hover {
    background-color: ${({ active }) => active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.1)'};
    transform: translateY(-2px);
    border-color: ${({ active }) => active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

interface TopicFilterProps {
  topics: Topic[];
  activeTopic: string | null;
  onTopicChange: (topicId: string | null) => void;
}

const TopicFilter: React.FC<TopicFilterProps> = ({ topics, activeTopic, onTopicChange }) => {
  return (
    <FilterContainer>
      <FilterTitle>Filter by Category</FilterTitle>
      <TopicsList>
        <TopicButton
          active={activeTopic === null}
          onClick={() => onTopicChange(null)}
        >
          All Work
        </TopicButton>
        {topics.map((topic) => (
          <TopicButton
            key={topic.id}
            active={activeTopic === topic.id}
            onClick={() => onTopicChange(topic.id)}
          >
            {topic.name}
          </TopicButton>
        ))}
      </TopicsList>
    </FilterContainer>
  );
};

export default TopicFilter;