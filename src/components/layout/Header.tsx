import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

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
          {/* 항상 비로그인 상태로 표시 (테스트용) */}
          <>
            <LoginButton onClick={() => navigate('/login')}>로그인</LoginButton>
            <SignupButton onClick={() => navigate('/signup')}>회원가입</SignupButton>
          </>
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
  padding: 0 80px;
  height: 80px;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    padding: 0 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 84px;
  
  @media (max-width: 768px) {
    gap: 32px;
  }
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

const LoginButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: #444;
  background: none;
  border: 1px solid rgba(112, 115, 124, 0.25);
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(112, 115, 124, 0.05);
  }
`;

const SignupButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: white;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export default Header;