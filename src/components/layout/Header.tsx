import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import Button from '../common/Button';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer>
          <Link to="/">
            <Logo>투비닥터 캠퍼스</Logo>
          </Link>
        </LogoContainer>

        <DesktopNavigation>
          <NavItems>
            <NavItem active={isActive('/')}>
              <Link to="/">홈</Link>
            </NavItem>
            <NavItem active={isActive('/courses')}>
              <Link to="/courses">강의</Link>
            </NavItem>
            <NavItem active={isActive('/community')}>
              <Link to="/community">커뮤니티</Link>
            </NavItem>
            <NavItem active={isActive('/about')}>
              <Link to="/about">소개</Link>
            </NavItem>
          </NavItems>

          <AuthContainer>
            {isAuthenticated ? (
              <>
                <UserInfo>
                  <Avatar>
                    {user?.name ? user.name.substring(0, 1).toUpperCase() : 'U'}
                  </Avatar>
                  <UserName>{user?.name}</UserName>
                </UserInfo>
                <Button size="small" variant="outline" onClick={handleLogout}>
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button 
                  size="small" 
                  variant="text" 
                  onClick={() => navigate('/login')}
                >
                  로그인
                </Button>
                <Button 
                  size="small" 
                  onClick={() => navigate('/signup')}
                >
                  회원가입
                </Button>
              </>
            )}
          </AuthContainer>
        </DesktopNavigation>

        <MobileMenuButton onClick={toggleMobileMenu}>
          <span>☰</span>
        </MobileMenuButton>
      </HeaderContent>

      {isMobileMenuOpen && (
        <MobileMenu>
          <MobileNavItems>
            <MobileNavItem active={isActive('/')}>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>홈</Link>
            </MobileNavItem>
            <MobileNavItem active={isActive('/courses')}>
              <Link to="/courses" onClick={() => setIsMobileMenuOpen(false)}>강의</Link>
            </MobileNavItem>
            <MobileNavItem active={isActive('/community')}>
              <Link to="/community" onClick={() => setIsMobileMenuOpen(false)}>커뮤니티</Link>
            </MobileNavItem>
            <MobileNavItem active={isActive('/about')}>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>소개</Link>
            </MobileNavItem>
          </MobileNavItems>

          <MobileAuthContainer>
            {isAuthenticated ? (
              <>
                <UserInfo>
                  <Avatar>
                    {user?.name ? user.name.substring(0, 1).toUpperCase() : 'U'}
                  </Avatar>
                  <UserName>{user?.name}</UserName>
                </UserInfo>
                <Button 
                  fullWidth 
                  variant="outline" 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button 
                  fullWidth 
                  variant="outline" 
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  로그인
                </Button>
                <Button 
                  fullWidth 
                  onClick={() => {
                    navigate('/signup');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  회원가입
                </Button>
              </>
            )}
          </MobileAuthContainer>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.xl};
  height: 70px;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
`;

const DesktopNavigation = styled.nav`
  display: flex;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavItems = styled.ul`
  display: flex;
  margin-right: ${({ theme }) => theme.spacing.xl};
`;

const NavItem = styled.li<{ active: boolean }>`
  margin: 0 ${({ theme }) => theme.spacing.md};
  
  a {
    display: block;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.text)};
    font-weight: ${({ theme, active }) => (active ? theme.fontWeights.bold : theme.fontWeights.medium)};
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${({ theme }) => theme.colors.primary};
      transform: scaleX(${({ active }) => (active ? 1 : 0)});
      transition: transform ${({ theme }) => theme.transitions.fast};
    }
    
    &:hover::after {
      transform: scaleX(1);
    }
  }
`;

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  
  > button {
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const UserName = styled.span`
  margin-left: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  cursor: pointer;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.background};
    box-shadow: ${({ theme }) => theme.shadows.medium};
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const MobileNavItems = styled.ul`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const MobileNavItem = styled.li<{ active: boolean }>`
  margin: ${({ theme }) => theme.spacing.sm} 0;
  
  a {
    display: block;
    padding: ${({ theme }) => theme.spacing.md};
    color: ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.text)};
    font-weight: ${({ theme, active }) => (active ? theme.fontWeights.bold : theme.fontWeights.medium)};
    border-left: 3px solid ${({ theme, active }) => (active ? theme.colors.primary : 'transparent')};
    background-color: ${({ theme, active }) => (active ? 'rgba(92, 122, 255, 0.1)' : 'transparent')};
    
    &:hover {
      background-color: rgba(92, 122, 255, 0.05);
    }
  }
`;

const MobileAuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  
  ${UserInfo} {
    margin: ${({ theme }) => theme.spacing.md} 0;
  }
`;

export default Header;