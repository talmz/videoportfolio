import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MenuContainer = styled.nav<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transform: translateY(${({ isVisible }) => (isVisible ? '0' : '-100%')});
  transition: transform 0.3s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const MenuContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const MenuList = styled.ul`
  display: flex;
  gap: 2rem;
  padding: 0;
  direction: rtl;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const MenuItem = styled.li`
  list-style: none;
`;

const MenuLink = styled.a<{ active: boolean }>`
  text-decoration: none;
  color: var(--primary-color);
  font-weight: ${({ active }) => (active ? '600' : '400')};
  position: relative;
  padding: 0.5rem 0;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: var(--accent-color);
    transform: scaleX(${({ active }) => (active ? '1' : '0')});
    transform-origin: center;
    transition: transform 0.3s ease;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;

interface NavItem {
  id: string;
  label: string;
}

interface FloatingMenuProps {
  items: NavItem[];
  activeSection: string;
  onItemClick: (sectionId: string) => void;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({
  items,
  activeSection,
  onItemClick
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the menu after scrolling down a bit
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onItemClick(sectionId);
  };

  return (
    <MenuContainer isVisible={isVisible}>
      <MenuContent>
        <MenuList>
          {items.map((item) => (
            <MenuItem key={item.id}>
              <MenuLink
                href={`#${item.id}`}
                active={activeSection === item.id}
                onClick={(e) => handleClick(e, item.id)}
              >
                {item.label}
              </MenuLink>
            </MenuItem>
          ))}
        </MenuList>
      </MenuContent>
    </MenuContainer>
  );
};

export default FloatingMenu;