import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store';
import { useAppDispatch } from '../../hooks/useAppDispatch';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
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
        <LeftSection>
          <Logo onClick={() => navigate('/')}>투비닥터 캠퍼스</Logo>
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
          <MobileMenuButton onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </MobileMenuButton>
        </LeftSection>

        <RightSection>
          {isAuthenticated ? (
            <>
              <UserInfo>
                <Avatar>
                  {user?.name ? user.name.substring(0, 1).toUpperCase() : 'U'}
                </Avatar>
                <UserName>{user?.name}</UserName>
              </UserInfo>
              <OutlineButton onClick={handleLogout}>
                로그아웃
              </OutlineButton>
            </>
          ) : (
            <>
              <OutlineButton onClick={() => navigate('/login')}>
                로그인
              </OutlineButton>
              <SolidButton onClick={() => navigate('/signup')}>
                회원가입
              </SolidButton>
            </>
          )}
        </RightSection>
      </HeaderContent>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <MobileMenu>
          <MobileMenuItem onClick={() => {
            navigate('/classes');
            setIsMobileMenuOpen(false);
          }}>
            CLASS
          </MobileMenuItem>
          <MobileMenuItem onClick={() => {
            navigate('/archive');
            setIsMobileMenuOpen(false);
          }}>
            ARCHIVE
          </MobileMenuItem>
          <MobileMenuItem onClick={() => {
            navigate('/connect');
            setIsMobileMenuOpen(false);
          }}>
            CONNECT
          </MobileMenuItem>
          
          <MobileActions>
            {isAuthenticated ? (
              <SolidButton 
                fullWidth 
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
              >
                로그아웃
              </SolidButton>
            ) : (
              <>
                <OutlineButton 
                  fullWidth 
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  로그인
                </OutlineButton>
                <SolidButton 
                  fullWidth 
                  onClick={() => {
                    navigate('/signup');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  회원가입
                </SolidButton>
              </>
            )}
          </MobileActions>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 1px solid rgba(112, 115, 124, 0.16);
  background-color: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(64px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1440px;
  padding: 24px 20px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 16px;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 84px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 0;
  }
`;

const Logo = styled.div`
  height: 32px;
  color: #448181;
  font-weight: bold;
  cursor: pointer;
`;

const Navigation = styled.div`
  display: flex;
  gap: 40px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavItem = styled.div<{ active: boolean }>`
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.96%;
  color: #171719;
  cursor: pointer;
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 8px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    & > button:first-child {
      display: none;
    }
  }
`;

const Button = styled.button<{ fullWidth?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px 14px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const OutlineButton = styled(Button)`
  border: 1px solid rgba(112, 115, 124, 0.16);
  background-color: transparent;
  color: #448181;
`;

const SolidButton = styled(Button)`
  background-color: #448181;
  color: #FFFFFF;
  border: none;
  
  &:disabled {
    background-color: #F4F4F5;
    color: rgba(55, 56, 60, 0.28);
    cursor: not-allowed;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #448181;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const UserName = styled.span`
  margin-left: 8px;
  font-weight: 500;
`;

const MobileMenuButton = styled.div`
  display: none;
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: relative;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
  }
  
  span {
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #171719;
    left: 0;
    transition: all 0.3s;
  }
  
  span:nth-child(1) {
    top: 5px;
  }
  
  span:nth-child(2) {
    top: 11px;
  }
  
  span:nth-child(3) {
    top: 17px;
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    background-color: #FFFFFF;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 999;
    padding: 16px;
    flex-direction: column;
    gap: 16px;
  }
`;

const MobileMenuItem = styled.div`
  font-weight: 600;
  font-size: 16px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(112, 115, 124, 0.16);
  color: #171719;
  cursor: pointer;
`;

const MobileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;
`;

export default Header;