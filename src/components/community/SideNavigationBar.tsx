import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface SideNavigationBarProps {
  className?: string;
}

const SideNavigationBar: React.FC<SideNavigationBarProps> = ({ className }) => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // 푸터가 화면에 보이기 시작하면 SNB를 일반 포지션으로 변경
        setIsFooterVisible(footerRect.top < windowHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', title: '커뮤니티 홈', active: true },
    { id: 'questions', title: '강의 질문', active: false },
    { id: 'study', title: '스터디', active: false },
    { id: 'info', title: '정보 공유', active: false },
    { id: 'notice', title: '공지사항', active: false },
  ];

  return (
    <Container className={className} $isFooterVisible={isFooterVisible}>
      <SidebarContent>
        {/* 프로필 섹션 */}
        <ProfileSection>
          <ProfileContainer>
            <ProfileInfo>
              <ProfileImageContainer>
                <ProfileImageWrapper>
                  <ProfileImage src="https://placehold.co/48x48" alt="프로필" />
                </ProfileImageWrapper>
              </ProfileImageContainer>
              <ProfileDetails>
                <ProfileName>김툽닥</ProfileName>
                <ProfileStatus>의대생 · 고려대학교</ProfileStatus>
              </ProfileDetails>
            </ProfileInfo>
          </ProfileContainer>
        </ProfileSection>

        {/* 메뉴 섹션 */}
        <MenuSection>
          <MenuContainer>
            <MenuList>
              {menuItems.map((item) => (
                <MenuItem key={item.id} active={item.active}>
                  <MenuItemContent>
                    <MenuItemTitle active={item.active}>{item.title}</MenuItemTitle>
                    <ChevronIcon>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path 
                          d="M8.6 4.6L15.4 11.4C15.7 11.7 15.7 12.3 15.4 12.6L8.6 19.4" 
                          stroke={item.active ? "#171719" : "rgba(55, 56, 60, 0.28)"} 
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </ChevronIcon>
                  </MenuItemContent>
                </MenuItem>
              ))}
            </MenuList>
            
            {/* 글쓰기 버튼 */}
            <WriteButtonContainer>
              <WriteButton>
                <WriteButtonText>글쓰기</WriteButtonText>
              </WriteButton>
            </WriteButtonContainer>
          </MenuContainer>
        </MenuSection>
      </SidebarContent>
    </Container>
  );
};

const Container = styled.div<{ $isFooterVisible: boolean }>`
  width: 242px;
  position: ${props => props.$isFooterVisible ? 'absolute' : 'fixed'};
  top: ${props => props.$isFooterVisible ? 'auto' : '80px'};
  bottom: ${props => props.$isFooterVisible ? '200px' : 'auto'};
  left: calc(50% - 600px); /* 1200px 컨테이너의 좌측에 맞춤 */
  height: fit-content;
  background: white;
  z-index: 100;
  overflow: visible;
  border-right: 1px solid rgba(112, 115, 124, 0.08);
  
  @media (max-width: 1200px) {
    left: calc((100vw - 1200px) / 2);
  }
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const SidebarContent = styled.div`
  padding: 64px 0 128px 0;
  display: flex;
  flex-direction: column;
  gap: 64px;
`;

const ProfileSection = styled.div`
  padding: 0 24px;
`;

const ProfileContainer = styled.div`
  padding: 0 12px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  cursor: pointer;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  outline: 1px solid rgba(112, 115, 124, 0.08);
  outline-offset: -1px;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProfileName = styled.div`
  color: #171719;
  font-size: 18px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 26.01px;
`;

const ProfileStatus = styled.div`
  color: rgba(55, 56, 60, 0.61);
  font-size: 13px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.25px;
`;

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MenuContainer = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MenuItem = styled.div<{ active: boolean }>`
  padding: 12px 16px 12px 16px;
  border-radius: 12px;
  background: ${props => props.active ? 'rgba(68, 129, 129, 0.1)' : 'transparent'};
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? 'rgba(68, 129, 129, 0.1)' : 'rgba(0, 0, 0, 0.04)'};
  }
`;

const MenuItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuItemTitle = styled.div<{ active: boolean }>`
  color: ${props => props.active ? '#171719' : 'rgba(55, 56, 60, 0.28)'};
  font-size: 20px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 28px;
`;

const ChevronIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WriteButtonContainer = styled.div`
  padding: 12px 8px 0 8px;
`;

const WriteButton = styled.button`
  width: 100%;
  padding: 12px 28px;
  background: #448181;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #3a6f6f;
  }
`;

const WriteButtonText = styled.div`
  color: white;
  font-size: 18px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 26.01px;
`;

export default SideNavigationBar;