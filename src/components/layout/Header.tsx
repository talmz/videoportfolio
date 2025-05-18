import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--background);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  transition: var(--transition);

  &:hover {
    color: var(--accent-color);
  }
`;

const NavLinks = styled.nav<{ isOpen: boolean }>`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--background);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    gap: 0;
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transition: var(--transition);
    z-index: 99;
    padding: 1rem 0;
  }
`;

const NavLink = styled(Link)<{ active: boolean }>`
  font-weight: ${({ active }) => (active ? '600' : '400')};
  color: ${({ active }) => (active ? 'var(--accent-color)' : 'var(--primary-color)')};
  padding: 0.5rem 1rem;
  transition: var(--transition);

  &:hover {
    color: var(--accent-color);
  }

  @media (max-width: 768px) {
    display: block;
    padding: 1rem 2rem;
    border-bottom: 1px solid var(--secondary-color);
  }
`;

const MenuButton = styled.button`
  display: none;
  font-size: 1.5rem;
  color: var(--primary-color);
  transition: var(--transition);

  &:hover {
    color: var(--accent-color);
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <NavContainer>
        <Logo to="/">John Doe</Logo>
        <MenuButton onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </MenuButton>
        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="/" active={pathname === '/'}>
            Home
          </NavLink>
          <NavLink to="/portfolio" active={pathname.includes('/portfolio')}>
            Portfolio
          </NavLink>
          <NavLink to="/about" active={pathname === '/about'}>
            About
          </NavLink>
          <NavLink to="/contact" active={pathname === '/contact'}>
            Contact
          </NavLink>
        </NavLinks>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;