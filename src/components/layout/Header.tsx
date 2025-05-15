import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
    setSearchOpen(false);
  };
  
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setMobileMenuOpen(false);
  };

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
    setHoveredItem(null);
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
              <NavLink to="/classes">CLASS</NavLink>
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
                      isSpecial
                    >클래스 전체 보기</DropdownLink>
                  </DropdownItem>
                </DropdownMenu>
              )}
            </NavItem>
            <NavItem 
              active={isActive('/coffee-chat')}
              onMouseEnter={() => handleMouseEnter('coffee-chat')}
            >
              <NavLink to="/coffee-chat">COFFEE CHAT</NavLink>
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
                      isSpecial
                    >커피챗 전체 보기</DropdownLink>
                  </DropdownItem>
                </DropdownMenu>
              )}
            </NavItem>
            <NavItem 
              active={isActive('/archive')}
              onMouseEnter={() => handleMouseEnter('archive')}
            >
              <NavLink to="/archive">ARCHIVE</NavLink>
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
                      isSpecial
                    >아카이브 전체 보기</DropdownLink>
                  </DropdownItem>
                </DropdownMenu>
              )}
            </NavItem>
            <NavItem 
              active={isActive('/community')}
              onMouseEnter={() => handleMouseEnter('community')}
            >
              <NavLink to="/community">COMMUNITY</NavLink>
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
                      isSpecial
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
          <SearchButton onClick={toggleSearch}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </SearchButton>
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
      
      {/* 검색 오버레이 */}
      {searchOpen && (
        <SearchOverlay>
          <SearchContainer>
            <SearchCloseButton onClick={toggleSearch}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SearchCloseButton>
            <SearchForm>
              <SearchInput type="text" placeholder="검색어를 입력하세요" autoFocus />
              <SearchSubmitButton type="submit">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SearchSubmitButton>
            </SearchForm>
            <SearchKeywords>
              <KeywordTitle>인기 검색어</KeywordTitle>
              <KeywordList>
                <KeywordItem>의학 연구</KeywordItem>
                <KeywordItem>논문 작성</KeywordItem>
                <KeywordItem>ChatGPT</KeywordItem>
                <KeywordItem>디지털 헬스케어</KeywordItem>
              </KeywordList>
            </SearchKeywords>
          </SearchContainer>
        </SearchOverlay>
      )}
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
  font-size: 15px;
  font-weight: 500;
  text-transform: uppercase;
  position: relative;
  padding: 8px 0;
  cursor: pointer;
  
  @media (max-width: 768px) {
    padding: 12px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    width: 100%;
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  min-width: 180px;
  border-radius: 18px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 12px 0;
  z-index: 10;
  margin-top: 8px;
  
  /* 드롭다운과 네비게이션 아이템 사이의 공간 메움 */
  &:before {
    content: '';
    position: absolute;
    top: -8px;
    left: 0;
    width: 100%;
    height: 8px;
  }
  
  @media (max-width: 768px) {
    position: static;
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
  padding: 8px 16px;
  background-color: ${({ isHovered, theme }) => isHovered ? theme.colors.backgroundGray : 'transparent'};
  
  @media (max-width: 768px) {
    padding: 8px 0;
  }
`;

const DropdownSeparator = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: 8px 0;
`;

const DropdownLink = styled(Link)<{ isHovered?: boolean; isSpecial?: boolean }>`
  color: ${({ isHovered, isSpecial, theme }) => 
    isHovered ? 'rgba(55, 56, 60, 0.28)' : 
    isSpecial ? '#296768' : 
    theme.colors.text
  };
  text-decoration: none;
  font-size: 14px;
  display: block;
  transition: color 0.3s ease;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const SearchButton = styled.button`
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

const SearchOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const SearchContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 600px;
  padding: 24px;
  position: relative;
  animation: slideDown 0.3s ease;
  
  @keyframes slideDown {
    from {
      transform: translateY(-20px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const SearchCloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchForm = styled.form`
  display: flex;
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  padding: 12px 0;
  font-size: 18px;
  outline: none;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SearchSubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const SearchKeywords = styled.div`
  margin-top: 20px;
`;

const KeywordTitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textLight};
  margin-bottom: 8px;
`;

const KeywordList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const KeywordItem = styled.button`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border: none;
  border-radius: 16px;
  padding: 8px 12px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export default Header;