import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // 호버한 메뉴 아이템에 따라 다른 메뉴를 비활성화하고 해당 메뉴만 활성화하는 로직
  const handleMouseEnter = (menu: string) => {
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
    setHoveredItem(null);
  };

  const handleItemMouseEnter = (item: string) => {
    setHoveredItem(item);
  };

  const handleItemMouseLeave = () => {
    // 피그마 디자인에 맞게 호버 상태 유지
    // setHoveredItem(null);
  };

  return (
    <HeaderContainer scrolled={isScrolled}>
      <HeaderContent>
        <LeftSection>
          <Logo onClick={() => navigate('/')}>
            <img src="/logo.svg" alt="THE DOCTOR CAMPUS" />
          </Logo>
          <Navigation className={mobileMenuOpen ? 'mobile-open' : ''} onMouseLeave={handleMouseLeave}>
            <NavItem 
              active={isActive('/classes')}
              onMouseEnter={() => handleMouseEnter('classes')}
            >
              <NavLink 
                to="/classes" 
                $isActive={activeDropdown === 'classes'}
                $hasActiveDropdown={activeDropdown !== null}
              >
                CLASS
              </NavLink>
              {activeDropdown === 'classes' && (
                <DropdownMenu>
                  <DropdownItem 
                    isHovered={hoveredItem === 'classes-1'}
                    onMouseEnter={() => handleItemMouseEnter('classes-1')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/classes/all"
                      isHovered={hoveredItem === 'classes-1'}
                      hasHoveredItem={hoveredItem !== null}
                    >메뉴 하나</DropdownLink>
                  </DropdownItem>
                  <DropdownItem 
                    isHovered={hoveredItem === 'classes-2'}
                    onMouseEnter={() => handleItemMouseEnter('classes-2')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/classes/new"
                      isHovered={hoveredItem === 'classes-2'}
                      hasHoveredItem={hoveredItem !== null}
                    >메뉴 둘</DropdownLink>
                  </DropdownItem>
                  <DropdownItem 
                    isHovered={hoveredItem === 'classes-3'}
                    onMouseEnter={() => handleItemMouseEnter('classes-3')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/classes/popular"
                      isHovered={hoveredItem === 'classes-3'}
                      hasHoveredItem={hoveredItem !== null}
                    >메뉴 셋</DropdownLink>
                  </DropdownItem>
                  <DropdownItem 
                    isHovered={hoveredItem === 'classes-4'}
                    onMouseEnter={() => handleItemMouseEnter('classes-4')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/classes/popular"
                      isHovered={hoveredItem === 'classes-4'}
                      hasHoveredItem={hoveredItem !== null}
                    >메뉴 넷</DropdownLink>
                  </DropdownItem>
                  <DropdownItem 
                    isHovered={hoveredItem === 'classes-5'}
                    onMouseEnter={() => handleItemMouseEnter('classes-5')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/classes/popular"
                      isHovered={hoveredItem === 'classes-5'}
                      hasHoveredItem={hoveredItem !== null}
                    >메뉴 다섯</DropdownLink>
                  </DropdownItem>
                  <DropdownItem 
                    isHovered={hoveredItem === 'classes-6'}
                    onMouseEnter={() => handleItemMouseEnter('classes-6')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/classes/popular"
                      isHovered={hoveredItem === 'classes-6'}
                      hasHoveredItem={hoveredItem !== null}
                    >메뉴 여섯</DropdownLink>
                  </DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem 
                    isHovered={hoveredItem === 'classes-all'}
                    onMouseEnter={() => handleItemMouseEnter('classes-all')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/classes"
                      isHovered={hoveredItem === 'classes-all'}
                      hasHoveredItem={hoveredItem !== null}
                      isSpecial={true}
                    >클래스 전체 보기</DropdownLink>
                  </DropdownItem>
                </DropdownMenu>
              )}
            </NavItem>
            <NavItem 
              active={isActive('/coffee-chat')}
              onMouseEnter={() => handleMouseEnter('coffee-chat')}
            >
              <NavLink 
                to="/coffee-chat" 
                $isActive={activeDropdown === 'coffee-chat'}
                $hasActiveDropdown={activeDropdown !== null}
              >
                COFFEE CHAT
              </NavLink>
              {activeDropdown === 'coffee-chat' && (
                <DropdownMenu>
                  <DropdownItem 
                    isHovered={hoveredItem === 'coffee-1'}
                    onMouseEnter={() => handleItemMouseEnter('coffee-1')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/coffee-chat/all"
                      isHovered={hoveredItem === 'coffee-1'}
                      hasHoveredItem={hoveredItem !== null}
                    >메뉴 하나</DropdownLink>
                  </DropdownItem>
                  <DropdownItem 
                    isHovered={hoveredItem === 'coffee-2'}
                    onMouseEnter={() => handleItemMouseEnter('coffee-2')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/coffee-chat/new"
                      isHovered={hoveredItem === 'coffee-2'}
                      hasHoveredItem={hoveredItem !== null}
                    >메뉴 둘</DropdownLink>
                  </DropdownItem>
                  <DropdownItem 
                    isHovered={hoveredItem === 'coffee-3'}
                    onMouseEnter={() => handleItemMouseEnter('coffee-3')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/coffee-chat/popular"
                      isHovered={hoveredItem === 'coffee-3'}
                      hasHoveredItem={hoveredItem !== null}
                    >메뉴 셋</DropdownLink>
                  </DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem 
                    isHovered={hoveredItem === 'coffee-all'}
                    onMouseEnter={() => handleItemMouseEnter('coffee-all')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/coffee-chat"
                      isHovered={hoveredItem === 'coffee-all'}
                      hasHoveredItem={hoveredItem !== null}
                      isSpecial={true}
                    >커피챗 전체 보기</DropdownLink>
                  </DropdownItem>
                </DropdownMenu>
              )}
            </NavItem>
            <NavItem 
              active={isActive('/archive')}
              onMouseEnter={() => handleMouseEnter('archive')}
            >
              <NavLink 
                to="/archive" 
                $isActive={activeDropdown === 'archive'}
                $hasActiveDropdown={activeDropdown !== null}
              >
                ARCHIVE
              </NavLink>
              {activeDropdown === 'archive' && (
                <DropdownMenu>
                  <DropdownItem 
                    isHovered={hoveredItem === 'archive-1'}
                    onMouseEnter={() => handleItemMouseEnter('archive-1')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/archive/articles"
                      isHovered={hoveredItem === 'archive-1'}
                      hasHoveredItem={hoveredItem !== null}
                    >메뉴 하나</DropdownLink>
                  </DropdownItem>
                  <DropdownItem 
                    isHovered={hoveredItem === 'archive-2'}
                    onMouseEnter={() => handleItemMouseEnter('archive-2')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/archive/videos"
                      isHovered={hoveredItem === 'archive-2'}
                      hasHoveredItem={hoveredItem !== null}
                    >메뉴 둘</DropdownLink>
                  </DropdownItem>
                  <DropdownItem 
                    isHovered={hoveredItem === 'archive-3'}
                    onMouseEnter={() => handleItemMouseEnter('archive-3')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/archive/podcasts"
                      isHovered={hoveredItem === 'archive-3'}
                      hasHoveredItem={hoveredItem !== null}
                    >메뉴 셋</DropdownLink>
                  </DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem 
                    isHovered={hoveredItem === 'archive-all'}
                    onMouseEnter={() => handleItemMouseEnter('archive-all')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/archive"
                      isHovered={hoveredItem === 'archive-all'}
                      hasHoveredItem={hoveredItem !== null}
                      isSpecial={true}
                    >아카이브 전체 보기</DropdownLink>
                  </DropdownItem>
                </DropdownMenu>
              )}
            </NavItem>
            <NavItem 
              active={isActive('/community')}
              onMouseEnter={() => handleMouseEnter('community')}
            >
              <NavLink 
                to="/community" 
                $isActive={activeDropdown === 'community'}
                $hasActiveDropdown={activeDropdown !== null}
              >
                COMMUNITY
              </NavLink>
              {activeDropdown === 'community' && (
                <DropdownMenu>
                  <DropdownItem 
                    isHovered={hoveredItem === 'community-1'}
                    onMouseEnter={() => handleItemMouseEnter('community-1')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/community/events"
                      isHovered={hoveredItem === 'community-1'}
                      hasHoveredItem={hoveredItem !== null}
                    >메뉴 하나</DropdownLink>
                  </DropdownItem>
                  <DropdownItem 
                    isHovered={hoveredItem === 'community-2'}
                    onMouseEnter={() => handleItemMouseEnter('community-2')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/community/mentoring"
                      isHovered={hoveredItem === 'community-2'}
                      hasHoveredItem={hoveredItem !== null}
                    >메뉴 둘</DropdownLink>
                  </DropdownItem>
                  <DropdownItem 
                    isHovered={hoveredItem === 'community-3'}
                    onMouseEnter={() => handleItemMouseEnter('community-3')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/community/forum"
                      isHovered={hoveredItem === 'community-3'}
                      hasHoveredItem={hoveredItem !== null}
                    >메뉴 셋</DropdownLink>
                  </DropdownItem>
                  <DropdownSeparator />
                  <DropdownItem 
                    isHovered={hoveredItem === 'community-all'}
                    onMouseEnter={() => handleItemMouseEnter('community-all')}
                    onMouseLeave={handleItemMouseLeave}
                  >
                    <DropdownLink 
                      to="/community"
                      isHovered={hoveredItem === 'community-all'}
                      hasHoveredItem={hoveredItem !== null}
                      isSpecial={true}
                    >커뮤니티 전체 보기</DropdownLink>
                  </DropdownItem>
                </DropdownMenu>
              )}
            </NavItem>
            <MobileCloseButton onClick={toggleMobileMenu}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </MobileCloseButton>
          </Navigation>
        </LeftSection>

        <RightSection>
          {/* 피그마 디자인에 따라 검색 버튼 제거 */}
          {isAuthenticated ? (
            <>
              <NotificationButton>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 15.8333H12.5M4.16667 9.16667V7.5C4.16667 4.27834 6.77834 1.66667 10 1.66667C13.2217 1.66667 15.8333 4.27834 15.8333 7.5V9.16667C15.8333 10.4673 16.4477 11.7008 17.5 12.5V12.5C18.0602 12.9371 17.7545 13.8333 17.0796 13.8333H2.92038C2.24545 13.8333 1.93982 12.9371 2.5 12.5V12.5C3.55228 11.7008 4.16667 10.4673 4.16667 9.16667Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </NotificationButton>
              <ProfileButton onClick={() => navigate('/profile')}>
                <img src="/default-avatar.png" alt="Profile" />
              </ProfileButton>
            </>
          ) : (
            <>
              <LoginButton onClick={() => navigate('/login')}>로그인</LoginButton>
              <SignupButton onClick={() => navigate('/signup')}>회원가입</SignupButton>
            </>
          )}
          <MobileMenuButton onClick={toggleMobileMenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </MobileMenuButton>
        </RightSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header<{ scrolled: boolean }>`
  background-color: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.88)'};
  backdrop-filter: blur(64px);
  border-bottom: 1px solid rgba(112, 115, 124, 0.16);
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: ${props => props.scrolled ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
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
  gap: 64px;
  
  @media (max-width: 768px) {
    gap: 32px;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  img {
    height: 28px;
    width: auto;
    display: block;
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 36px;
  
  @media (max-width: 768px) {
    display: none;
    
    &.mobile-open {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background-color: white;
      z-index: 1100;
      padding: 80px 20px 20px;
      gap: 16px;
    }
  }
`;

const NavItem = styled.div<{ active: boolean }>`
  position: relative;
  padding: 8px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  
  @media (max-width: 768px) {
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    width: 100%;
  }
`;

const NavLink = styled(Link)<{ $isActive?: boolean; $hasActiveDropdown?: boolean }>`
  /* 기본 상태에서는 검정색 */
  color: var(--Label-Normal, #171719);
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 600;
  font-family: 'Pretendard JP', sans-serif;
  font-size: 15px;
  line-height: 22.01px;
  letter-spacing: 0.14px;
  text-align: center;
  text-transform: uppercase;
  
  /* 드롭다운이 활성화되면 호버되지 않은 항목은 회색으로 변경 */
  ${({ $isActive, $hasActiveDropdown }) => 
    $hasActiveDropdown && !$isActive && css`
      color: var(--Label-Assistive, rgba(55, 56, 60, 0.28));
    `
  }
  
  &:hover {
    color: var(--Label-Normal, #171719);
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: var(--Background-Elevated-Normal, white);
  border-radius: 18px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.03);
  padding: 19px 32px;
  z-index: 10;
  margin-top: 0; /* 피그마 디자인에 맞게 조정 */
  outline: 1px rgba(112, 115, 124, 0.08) solid;
  outline-offset: -1px;
  overflow: hidden;
  
  /* 드롭다운과 네비게이션 아이템 사이의 공간 메움 */
  &:before {
    content: '';
    position: absolute;
    top: -4px; /* 피그마 디자인에 맞게 조정 */
    left: 0;
    width: 100%;
    height: 4px; /* 피그마 디자인에 맞게 조정 */
  }
  
  @media (max-width: 768px) {
    position: static;
    transform: none;
    box-shadow: none;
    padding: 8px 0 8px 16px;
    border-radius: 0;
    margin-top: 0;
    
    &:before {
      display: none;
    }
  }
`;

const DropdownItem = styled.div<{ isHovered?: boolean }>`
  padding: 11px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
  @media (max-width: 768px) {
    padding: 8px 0;
  }
`;

const DropdownSeparator = styled.div`
  align-self: stretch;
  padding: 8px 0;
  
  &:after {
    content: '';
    display: block;
    height: 1px;
    background: rgba(112, 115, 124, 0.08);
    width: 100%;
  }
`;

const DropdownLink = styled(Link)<{ isHovered?: boolean; hasHoveredItem?: boolean; isSpecial?: boolean }>`
  flex: 1 1 0;
  /* 기본 상태는 검정색 */
  color: var(--Label-Normal, #171719);
  text-decoration: none;
  font-size: 15px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 22.01px;
  letter-spacing: 0.14px;
  display: block;
  transition: color 0.3s ease;
  word-wrap: break-word;
  
  /* "전체 보기" 항목은 녹색 */
  ${({ isSpecial }) => 
    isSpecial && css`
      color: var(--Primary-Strong, #296768);
    `
  }
  
  /* 다른 항목이 호버되었을 때 호버되지 않은 항목은 회색으로 표시 */
  ${({ isHovered, hasHoveredItem, isSpecial }) => 
    hasHoveredItem && !isHovered && !isSpecial && css`
      color: var(--Label-Assistive, rgba(55, 56, 60, 0.28));
    `
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  background: none;
  border: 1px solid rgba(112, 115, 124, 0.25);
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(112, 115, 124, 0.05);
  }
  
  @media (max-width: 768px) {
    display: none;
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
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileCloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Header;