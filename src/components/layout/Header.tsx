import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import NotificationMenu from './NotificationMenu';
import ProfileMenu from './ProfileMenu';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  // 임시로 로그인 처리를 위한 상태
  const [mockAuth, setMockAuth] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // 알림 및 프로필 메뉴 참조
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  
  // 마우스 떠날 때 딜레이 추가를 위한 참조
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    // 이전 타이머가 있으면 취소
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    // 마우스가 떠나도 바로 사라지지 않고 지연 후 사라짐
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredItem(null);
    }, 100); // 100ms 딜레이
  };

  // 헤더 전체에서 마우스가 떠날 때 즉시 모든 상태 리셋
  const handleHeaderMouseLeave = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(null);
    setHoveredItem(null);
  };

  const handleItemMouseEnter = (item: string) => {
    // 이전 타이머가 있으면 취소
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setHoveredItem(item);
  };

  const handleItemMouseLeave = () => {
    // 드롭다운 아이템에서 마우스가 떠나면 호버 상태 리셋
    setHoveredItem(null);
  };
  
  // 알림 메뉴 열기/닫기
  const toggleNotification = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotificationOpen(!notificationOpen);
    setProfileMenuOpen(false);
  };
  
  // 프로필 메뉴 열기/닫기
  const toggleProfileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfileMenuOpen(!profileMenuOpen);
    setNotificationOpen(false);
  };
  
  // 로그아웃 처리
  const handleLogout = () => {
    setMockAuth(false);
    setProfileMenuOpen(false);
    // 실제 로그아웃 처리 추가
    // dispatch(logout());
    navigate('/');
  };
  
  // 로그인 처리 - 한 번 클릭: 로그인 페이지 이동, 더블 클릭: 임시 로그인
  const toggleLogin = () => {
    if (clickTimeout) {
      // 더블 클릭 감지 - 임시 로그인/로그아웃
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      setMockAuth(prevState => !prevState);
    } else {
      // 첫 번째 클릭 - 250ms 후에 로그인 페이지로 이동
      const timeout = setTimeout(() => {
        navigate('/login');
        setClickTimeout(null);
      }, 250);
      setClickTimeout(timeout);
    }
  };
  
  // 알림 메뉴나 프로필 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 알림 메뉴 외부 클릭 처리
      if (
        notificationOpen &&
        notificationRef.current && 
        !notificationRef.current.contains(event.target as Node) &&
        notificationButtonRef.current &&
        !notificationButtonRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }
      
      // 프로필 메뉴 외부 클릭 처리
      if (
        profileMenuOpen &&
        profileMenuRef.current && 
        !profileMenuRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [notificationOpen, profileMenuOpen]);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
    };
  }, [clickTimeout]);

  return (
    <HeaderContainer scrolled={isScrolled} onMouseLeave={handleHeaderMouseLeave}>
      <HeaderContent>
        <LeftSection>
          <Logo onClick={() => navigate('/')}>
            <img 
              src={`${process.env.PUBLIC_URL}/logo.svg`}
              alt="TOBE DOCTOR CAMPUS" 
              onError={(e) => {
                console.error('Logo failed to load');
                const target = e.currentTarget;
                target.style.display = 'none';
                const logoDiv = target.parentElement;
                if (logoDiv) {
                  logoDiv.innerHTML = '<div style="color: #448181; font-weight: 600; font-size: 16px; white-space: nowrap;">TOBE DOCTOR CAMPUS</div>';
                }
              }}
            />
          </Logo>
          <Navigation className={mobileMenuOpen ? 'mobile-open' : ''} onMouseLeave={handleMouseLeave}>
            <NavItem 
              active={isActive('/class')}
              onMouseEnter={() => handleMouseEnter('classes')}
            >
              <NavLink 
                to="/class" 
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
                      to="/class/category"
                      isHovered={hoveredItem === 'classes-1'}
                      hasHoveredItem={hoveredItem !== null}
                      hoveredItemIsSpecial={hoveredItem === 'classes-all'}
                    >카테고리</DropdownLink>
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
                      hoveredItemIsSpecial={hoveredItem === 'classes-all'}
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
                      hoveredItemIsSpecial={hoveredItem === 'classes-all'}
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
                      hoveredItemIsSpecial={hoveredItem === 'classes-all'}
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
                      hoveredItemIsSpecial={hoveredItem === 'classes-all'}
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
                      hoveredItemIsSpecial={hoveredItem === 'classes-all'}
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
                      hoveredItemIsSpecial={hoveredItem === 'classes-all'}
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
              {/* {activeDropdown === 'coffee-chat' && (
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
                      hoveredItemIsSpecial={hoveredItem === 'coffee-all'}
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
                      hoveredItemIsSpecial={hoveredItem === 'coffee-all'}
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
                      hoveredItemIsSpecial={hoveredItem === 'coffee-all'}
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
                      hoveredItemIsSpecial={hoveredItem === 'coffee-all'}
                      isSpecial={true}
                    >커피챗 전체 보기</DropdownLink>
                  </DropdownItem>
                </DropdownMenu>
              )} */}
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
              {/* {activeDropdown === 'archive' && (
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
                      hoveredItemIsSpecial={hoveredItem === 'archive-all'}
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
                      hoveredItemIsSpecial={hoveredItem === 'archive-all'}
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
                      hoveredItemIsSpecial={hoveredItem === 'archive-all'}
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
                      hoveredItemIsSpecial={hoveredItem === 'archive-all'}
                      isSpecial={true}
                    >아카이브 전체 보기</DropdownLink>
                  </DropdownItem>
                </DropdownMenu>
              )} */}
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
              {/* {activeDropdown === 'community' && (
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
                      hoveredItemIsSpecial={hoveredItem === 'community-all'}
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
                      hoveredItemIsSpecial={hoveredItem === 'community-all'}
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
                      hoveredItemIsSpecial={hoveredItem === 'community-all'}
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
                      hoveredItemIsSpecial={hoveredItem === 'community-all'}
                      isSpecial={true}
                    >커뮤니티 전체 보기</DropdownLink>
                  </DropdownItem>
                </DropdownMenu>
              )} */}
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
          {isAuthenticated || mockAuth ? (
            <>
              <NotificationButtonWrapper>
                <NotificationButton 
                  ref={notificationButtonRef}
                  onClick={toggleNotification}
                  isActive={notificationOpen}
                >
                  <img src="/images/alarm.svg" alt="Notification" width="24" height="24" />
                  {/* 알림이 있을 경우 뱃지 표시 */}
                  <NotificationBadge />
                </NotificationButton>
                <NotificationMenu 
                  ref={notificationRef}
                  isOpen={notificationOpen} 
                  onClose={() => setNotificationOpen(false)} 
                />
              </NotificationButtonWrapper>
              
              <ProfileButtonWrapper>
                <ProfileButton 
                  ref={profileButtonRef}
                  onClick={toggleProfileMenu}
                  isActive={profileMenuOpen}
                >
                  <img src="/images/profile.png" alt="Profile" />
                </ProfileButton>
                <ProfileMenu 
                  ref={profileMenuRef}
                  isOpen={profileMenuOpen} 
                  onClose={() => setProfileMenuOpen(false)} 
                  onLogout={handleLogout} 
                />
              </ProfileButtonWrapper>
            </>
          ) : (
            <>
              <LoginButton onClick={toggleLogin}>
                로그인
              </LoginButton>
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
  max-width: ${({ theme }) => theme.layout.containerWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.layout.containerPadding};
  height: 80px;
  box-sizing: border-box;
  
  @media (max-width: 1024px) {
    padding: 0 ${({ theme }) => theme.layout.containerPaddingTablet};
  }
  
  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.layout.containerPaddingMobile};
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
    height: 28px;
    width: auto;
    display: block;
  }
  
  /* 로고가 안 보이는 경우를 대비한 디버깅 스타일 */
  min-height: 28px;
  min-width: 134px;
  background-color: transparent;
  
  /* 이미지 로딩 실패 시 텍스트 표시 */
  &::after {
    content: '';
    display: ${props => props.theme ? 'none' : 'block'};
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: 40px;
  
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
  transition: color 0.1s ease;
  font-weight: 600;
  font-family: 'Pretendard JP', sans-serif;
  font-size: 15px;
  line-height: 22.01px;
  letter-spacing: 0.14px;
  text-align: center;
  text-transform: uppercase;
  
  /* 드롭다운이 활성화되고 다른 메뉴가 호버된 경우에만 회색으로 변경 */
  ${({ $isActive, $hasActiveDropdown }) => 
    $hasActiveDropdown && !$isActive && css`
      color: var(--Label-Assistive, rgba(55, 56, 60, 0.28));
    `
  }
  
  /* 호버 시에는 항상 검정색 */
  &:hover {
    color: var(--Label-Normal, #171719) !important;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0; /* 텍스트 앞에 정렬 */
  transform: translateX(-30px); /* 너비가 넘어져서 왼쪽으로 이동, 정확한 값으로 조정 */
  width: 304px; /* 피그마 디자인 스펙에 맞게 수정 */
  background: var(--Background-Elevated-Normal, white);
  border-radius: 18px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.03);
  padding: 19px 32px; /* 피그마 디자인 스펙에 맞게 수정 */
  z-index: 10;
  margin-top: 4px; /* 드롭다운을 삼숙 더 아래로 이동 */
  outline: 1px rgba(112, 115, 124, 0.08) solid;
  outline-offset: -1px;
  display: flex; /* 피그마 스펙에 맞게 flex 추가 */
  flex-direction: column; /* 피그마 스펙에 맞게 수직 배치 */
  align-items: flex-start; /* 피그마 스펙에 맞게 왼쪽 정렬 */
  overflow: hidden;
  
  /* 드롭다운과 네비게이션 아이템 사이의 공간 메움 */
  &:before {
    content: '';
    position: absolute;
    top: -4px; /* 피그마 디자인에 맞게 조정 */
    left: 0;
    width: 100%;
    height: 4px; /* 피그마 디자인에 맞게 조정 */
  };
  
  /* 드롭다운에 마우스 진입 시 타이머 취소를 위한 건 */
  &:hover {
    pointer-events: auto;
  }
  
  @media (max-width: 768px) {
    position: static;
    transform: none; /* 모바일에서는 중앙 정렬 제거 */
    left: auto;
    width: 100%;
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
  width: 100%; /* 너비 전체 차지 */
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

const DropdownLink = styled(Link)<{ isHovered?: boolean; hasHoveredItem?: boolean; isSpecial?: boolean; hoveredItemIsSpecial?: boolean }>`
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
  transition: color 0.1s ease;
  word-wrap: break-word;
  
  /* "전체 보기" 항목은 녹색 */
  ${({ isSpecial }) => 
    isSpecial && css`
      color: var(--Primary-Strong, #296768);
    `
  }
  
  /* 호버 로직:
   * 1. 일반 항목이 호버된 경우: 호버되지 않은 일반 항목들은 회색
   * 2. 특수 항목(전체보기)이 호버된 경우: 모든 일반 항목들은 검정색 유지
   */
  ${({ isHovered, hasHoveredItem, isSpecial, hoveredItemIsSpecial }) => {
    if (hasHoveredItem && !isHovered && !isSpecial && !hoveredItemIsSpecial) {
      return css`
        color: var(--Label-Assistive, rgba(55, 56, 60, 0.28));
      `;
    }
  }}
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NotificationButtonWrapper = styled.div`
  position: relative;
  height: 24px;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NotificationButton = styled.button<{ isActive?: boolean }>`
  background: none;
  border: none;
  padding: 0;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;
  flex: 1 1 0;
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  /* 호버 시 배경 효과 */
  &:after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 1000px;
    background-color: var(--Label-Normal, #171719);
    opacity: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: opacity 0.2s ease;
  }
  
  &:hover:after {
    opacity: 0.04;
  }
  
  &:active:after {
    opacity: 0.09;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #E53935;
  top: 0;
  right: 0;
`;

const ProfileButtonWrapper = styled.div`
  position: relative;
  height: 24px;
  border-radius: 10000px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfileButton = styled.button<{ isActive?: boolean }>`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--Static-White, white);
  outline: 1px var(--Line-Normal-Alternative, rgba(112, 115, 124, 0.08)) solid;
  outline-offset: -1px;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* 호버 시 배경 효과 */
  &:after {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 1000px;
    background-color: var(--Label-Normal, #171719);
    opacity: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: opacity 0.2s ease;
  }
  
  &:hover:after {
    opacity: 0.04;
  }
  
  &:active:after {
    opacity: 0.09;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  background: none;
  border: 1px solid rgba(112, 115, 124, 0.25);
  border-radius: 8px;
  padding: 7px 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(112, 115, 124, 0.05);
    cursor: pointer;
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
  border-radius: 8px;
  padding: 7px 14px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    cursor: pointer;
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