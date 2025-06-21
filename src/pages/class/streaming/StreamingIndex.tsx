import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StreamingMaterials from './StreamingMaterials';
import StreamingChapters from './StreamingChapters';
import StreamingQnA from './StreamingQnA';

const StreamingIndex: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chapters' | 'materials' | 'faq' | 'qna'>('chapters');
  const [isScrolled, setIsScrolled] = useState(false);

  // 탭 변경 핸들러
  const handleTabChange = (tab: 'chapters' | 'materials' | 'faq' | 'qna') => {
    setActiveTab(tab);
  };

  // 스크롤 이벤트 감지
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StreamingContainer>
      {/* 왼쪽 비디오 영역 */}
      <LeftVideoArea>
        {/* 왼쪽 헤더 (로고 + 제목 + 수강률) */}
        <VideoHeader scrolled={isScrolled}>
          <HeaderContent>
            <LeftSection>
              <Logo>
                <LogoIcon />
              </Logo>
              <CourseInfo>
                <CourseTitle>머신러닝의 기초 : Linear Regression</CourseTitle>
              </CourseInfo>
            </LeftSection>
            <RightSection>
              <ProgressInfo>수강률 50%</ProgressInfo>
            </RightSection>
          </HeaderContent>
        </VideoHeader>

        {/* 비디오 플레이어 */}
        <VideoSection>
          <VideoPlayer>
            <VideoOverlay />
          </VideoPlayer>
        </VideoSection>
      </LeftVideoArea>

      {/* 오른쪽 사이드 패널 */}
      <RightSidePanel>
        {/* 오른쪽 헤더 (탭 네비게이션) */}
        <SideHeader scrolled={isScrolled}>
          <TabNavigation>
            <Tab 
              active={activeTab === 'chapters'} 
              onClick={() => handleTabChange('chapters')}
            >
              챕터
            </Tab>
            <Tab 
              active={activeTab === 'materials'} 
              onClick={() => handleTabChange('materials')}
            >
              강의자료
            </Tab>
            <Tab 
              active={activeTab === 'faq'} 
              onClick={() => handleTabChange('faq')}
            >
              FAQ
            </Tab>
            <Tab 
              active={activeTab === 'qna'} 
              onClick={() => handleTabChange('qna')}
            >
              Q&A
            </Tab>
          </TabNavigation>
        </SideHeader>

        {/* 탭 컨텐츠 */}
        <TabContent>
          {activeTab === 'chapters' && <StreamingChapters />}
          {activeTab === 'materials' && <StreamingMaterials />}
          {activeTab === 'qna' && <StreamingQnA />}
          {activeTab === 'faq' && (
            <EmptyState>
              <EmptyStateIcon />
              <EmptyStateTitle>강의자료를 찾을 수 없습니다.</EmptyStateTitle>
              <EmptyStateDescription>
                본 강의는 별도의 강의자료가<br/>
                제공되지 않는 강의입니다.
              </EmptyStateDescription>
            </EmptyState>
          )}
        </TabContent>
      </RightSidePanel>
    </StreamingContainer>
  );
};

/* 전체 컨테이너 */
const StreamingContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background: var(--Static-White, white);
  display: flex;
`;

/* 왼쪽 비디오 영역 */
const LeftVideoArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const VideoHeader = styled.div<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 480px; /* 사이드 패널 너비만큼 제외 */
  height: 80px;
  display: flex;
  align-items: center;
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.88)'};
  backdrop-filter: blur(32px);
  border-bottom: 1px solid rgba(112, 115, 124, 0.16);
  z-index: 1000;
  transition: all 0.3s ease;
`;

const HeaderContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
  background: transparent;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.1948 8.5267C21.1403 12.1274 19.7384 15.7118 16.9893 18.4612C14.7105 20.74 11.859 22.094 8.8953 22.5196C11.1549 19.7417 12.387 16.2914 12.387 12.6651C12.387 12.3549 12.3773 12.0444 12.3582 11.7371C14.928 9.64084 18.0551 8.57143 21.1948 8.5267Z' fill='%23448181'/%3E%3Cpath d='M11.107 12.6651C11.107 12.7387 11.107 12.8123 11.1037 12.8859C11.046 16.6881 9.51638 20.1287 7.05511 22.6667L7.05187 22.6635C4.54262 20.0774 3 16.5536 3 12.6651C3 8.77665 4.54262 5.25282 7.05511 2.66675C9.56435 5.25282 11.107 8.77953 11.107 12.6651Z' fill='%23448181'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
const CourseInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const CourseTitle = styled.div`
  color: var(--Label-Neutral, rgba(46, 47, 51, 0.88));
  font-size: 20px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 28px;
  word-wrap: break-word;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const ProgressInfo = styled.div`
  text-align: center;
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 15px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 22.01px;
  letter-spacing: 0.14px;
  word-wrap: break-word;
  white-space: nowrap;
`;

const VideoSection = styled.div`
  flex: 1;
  margin-top: 80px; /* 헤더 높이만큼 마진 */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const VideoPlayer = styled.div`
  width: 100%;
  height: 830px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-image: url('https://placehold.co/1440x830');
  background-size: cover;
  background-position: center;
`;

const VideoOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(101, 65, 242, 0.08);
`;

/* 오른쪽 사이드 패널 */
const RightSidePanel = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  background: var(--Static-White, white);
  position: relative;
`;

const SideHeader = styled.div<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 480px;
  height: 80px;
  display: flex;
  align-items: center;
  background: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.88)'};
  backdrop-filter: blur(32px);
  border-bottom: 1px solid rgba(112, 115, 124, 0.08);
  z-index: 1000;
  transition: all 0.3s ease;
  padding: 0 16px;
`;

const TabNavigation = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;

const Tab = styled.div<{ active: boolean }>`
  flex: 1;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${props => props.active 
    ? 'var(--Primary-Strong, #296768)' 
    : 'var(--Label-Assistive, rgba(55, 56, 60, 0.28))'
  };
  font-size: 20px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 28px;
  text-align: center;
  transition: all 0.2s ease;
  
  ${props => props.active && `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--Primary-Strong, #296768);
    }
  `}
  
  &:hover {
    color: var(--Primary-Strong, #296768);
  }
`;

const TabContent = styled.div`
  flex: 1;
  margin-top: 80px; /* 헤더 높이만큼 마진 */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 24px 16px;
  gap: 24px;
`;

const EmptyState = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 160px 0;
  gap: 24px;
`;

const EmptyStateIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #f5f5f5;
  border-radius: 12px;
`;

const EmptyStateTitle = styled.div`
  text-align: center;
  color: var(--Label-Normal, #171719);
  font-size: 20px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 28px;
  word-wrap: break-word;
`;

const EmptyStateDescription = styled.div`
  text-align: center;
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0.09px;
  word-wrap: break-word;
`;

export default StreamingIndex;
