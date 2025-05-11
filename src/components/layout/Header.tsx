import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LeftSection>
          <Logo onClick={() => navigate('/')}>
            <img src="/logo.svg" alt="THE DOCTOR CAMPUS" />
          </Logo>
          <Navigation>
            <NavItem active={isActive('/classes')}>
              <Link to="/classes">CLASS</Link>
            </NavItem>
            <NavItem active={isActive('/archive')}>
              <Link to="/archive">ARCHIVE</Link>
            </NavItem>
            <NavItem active={isActive('/connect')}>
              <Link to="/connect">CONNECT</Link>
            </NavItem>
          </Navigation>
        </LeftSection>

        <RightSection>
          <IconButton aria-label="알림">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.8332 6.66671C15.8332 5.34059 15.3063 4.07224 14.3686 3.13455C13.4309 2.19686 12.1626 1.67004 10.8332 1.67004C9.50366 1.67004 8.23531 2.19686 7.29762 3.13455C6.35993 4.07224 5.83311 5.34059 5.83311 6.66671C5.83311 12.5 3.33311 14.1667 3.33311 14.1667H18.3331C18.3331 14.1667 15.8332 12.5 15.8332 6.66671Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11.6665 17.5C11.4778 17.8536 11.1938 18.1471 10.8456 18.3445C10.4973 18.5419 10.1007 18.6354 9.69978 18.6135C9.2989 18.5915 8.91648 18.4551 8.59412 18.2216C8.27175 17.9881 8.02385 17.6674 7.87646 17.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconButton>
          <IconButton aria-label="프로필">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6667 17.5V15.8333C16.6667 14.9493 16.3155 14.1014 15.6904 13.4763C15.0653 12.8512 14.2174 12.5 13.3334 12.5H6.66675C5.78269 12.5 4.93484 12.8512 4.30971 13.4763C3.68458 14.1014 3.33341 14.9493 3.33341 15.8333V17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.0001 9.16667C11.8411 9.16667 13.3334 7.67428 13.3334 5.83333C13.3334 3.99238 11.8411 2.5 10.0001 2.5C8.15913 2.5 6.66675 3.99238 6.66675 5.83333C6.66675 7.67428 8.15913 9.16667 10.0001 9.16667Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconButton>
        </RightSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(64px);
  border-bottom: 1px solid rgba(112, 115, 124, 0.16);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
  height: 80px;
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 84px;
`;

const Logo = styled.div`
  cursor: pointer;
  img {
    height: 24px;
    width: auto;
    display: block;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 24px;
`;

const NavItem = styled.div<{ active: boolean }>`
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  
  a {
    color: #333;
    text-decoration: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #333;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Header;