import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Layout from '../../components/layout/Layout';
import { useParams } from 'react-router-dom';

const ClassLecture: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('introduction');
  const [isTabSticky, setIsTabSticky] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  
  // 탭과 섹션 참조
  const tabSectionRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // 배너 데이터 제거 - 더 이상 필요하지 않음

  // 강의 정보 (임시 데이터)
  const lectureData = {
    title: id ? `머신러닝의 기초 : Linear Regression (강의 ${id})` : '머신러닝의 기초 : Linear Regression',
    instructor: '김승종',
    institution: '고려대학교 의과대학 의공학교실',
    image: 'https://placehold.co/1200x480/DDDDDD/999999?text=Temp+Image'
  };

  // 탭 데이터
  const tabs = [
    { id: 'introduction', label: '강의 소개' },
    { id: 'instructor', label: '강사 소개' },
    { id: 'recommended', label: '추천 강의' },
    { id: 'reviews', label: '수강 후기' },
    { id: 'faq', label: 'FAQ' },
    { id: 'qna', label: 'Q&A' }
  ];

  // 인디케이터 위치 업데이트
  const updateIndicatorPosition = useCallback((tabId: string) => {
    const activeTabElement = tabRefs.current[tabId];
    const tabListElement = tabListRef.current;
    
    if (activeTabElement && tabListElement) {
      const tabRect = activeTabElement.getBoundingClientRect();
      const listRect = tabListElement.getBoundingClientRect();
      
      setIndicatorStyle({
        left: tabRect.left - listRect.left,
        width: tabRect.width
      });
    }
  }, []);

  // activeTab 변경 시 인디케이터 위치 업데이트
  useEffect(() => {
    updateIndicatorPosition(activeTab);
  }, [activeTab, updateIndicatorPosition]);

  // 초기 렌더링 후 인디케이터 위치 설정
  useEffect(() => {
    const timer = setTimeout(() => {
      updateIndicatorPosition(activeTab);
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTab, updateIndicatorPosition]);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const handleScroll = () => {
      if (!tabSectionRef.current) return;

      const tabSectionTop = tabSectionRef.current.offsetTop;
      const tabSectionBottom = tabSectionTop + tabSectionRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const viewportTop = scrollY + 80; // 헤더 높이 고려
      
      // 탭 영역이 헤더 아래로 사라질 때 sticky 활성화
      setIsTabSticky(viewportTop > tabSectionBottom);

      // 현재 보이는 섹션 찾기
      const sectionOffsets = tabs.map(tab => {
        const element = sectionRefs.current[tab.id];
        if (!element) return { id: tab.id, offset: 0 };
        
        const rect = element.getBoundingClientRect();
        const offset = rect.top + scrollY;
        return { id: tab.id, offset };
      });

      // 현재 스크롤 위치에서 가장 가까운 섹션 찾기
      const adjustedScrollY = scrollY + (isTabSticky ? 160 : 200);
      const currentSection = sectionOffsets.reduce((prev, current) => {
        const prevDistance = Math.abs(prev.offset - adjustedScrollY);
        const currentDistance = Math.abs(current.offset - adjustedScrollY);
        return currentDistance < prevDistance ? current : prev;
      });

      if (currentSection.id !== activeTab) {
        setActiveTab(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab, tabs, isTabSticky]);

  // 탭 클릭 시 해당 섹션으로 스크롤
  const handleTabClick = useCallback((tabId: string) => {
    const element = sectionRefs.current[tabId];
    if (element) {
      const offset = isTabSticky ? 160 : 200; // sticky일 때 탭 높이 고려
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, [isTabSticky]);

  return (
    <Layout>
      <Container>
        {/* 메인 콘텐츠 컨테이너 */}
        <MainContainer>
          {/* 강의 정보 섹션 */}
          <LectureInfoSection>
            {/* 강의 배너 이미지 */}
            <LectureBanner>
              <LectureBannerImage>
                <img src={lectureData.image} alt={lectureData.title} />
              </LectureBannerImage>
            </LectureBanner>

            {/* 강의 제목과 정보 */}
            <LectureHeader>
              <LectureInfo>
                <LectureTitle>{lectureData.title}</LectureTitle>
                <LectureSubtitle>
                  {lectureData.instructor} · {lectureData.institution}
                </LectureSubtitle>
              </LectureInfo>
              <StartButton>
                <ButtonText>시작하기</ButtonText>
              </StartButton>
            </LectureHeader>
          </LectureInfoSection>

          {/* 탭 네비게이션 */}
          <TabSection ref={tabSectionRef} isSticky={isTabSticky}>
            <TabContainer>
              <TabList ref={tabListRef}>
                {tabs.map((tab) => (
                  <TabItem 
                    key={tab.id}
                    ref={(el) => tabRefs.current[tab.id] = el}
                    active={activeTab === tab.id}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    <TabText active={activeTab === tab.id}>{tab.label}</TabText>
                  </TabItem>
                ))}
                <TabIndicator 
                  style={{
                    left: `${indicatorStyle.left}px`,
                    width: `${indicatorStyle.width}px`
                  }}
                />
              </TabList>
              <TabDivider />
            </TabContainer>
          </TabSection>

          {/* Sticky 상태일 때 콘텐츠 여백 */}
          {isTabSticky && <div style={{ height: '72px' }} />}
          
          {/* 콘텐츠 영역 */}
          <ContentSection>
            {tabs.map((tab, index) => (
              <ContentItem
                key={tab.id}
                ref={(el) => sectionRefs.current[tab.id] = el}
                id={`section-${tab.id}`}
              >
                <SectionTitle>{tab.label}</SectionTitle>
                <div style={{alignSelf: 'stretch', height: 480, opacity: 0.08, background: '#9747FF'}} />
              </ContentItem>
            ))}
          </ContentSection>
        </MainContainer>
      </Container>
    </Layout>
  );
};

// 스타일 컴포넌트들
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
`;

/* 메인 컨테이너 */
const MainContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.containerWidth};
  margin: 0 auto;
  padding: 64px ${({ theme }) => theme.layout.containerPadding} 128px;
  display: flex;
  flex-direction: column;
  gap: 64px;
  
  @media (max-width: 1024px) {
    padding: 64px ${({ theme }) => theme.layout.containerPaddingTablet} 128px;
  }
  
  @media (max-width: 768px) {
    padding: 64px ${({ theme }) => theme.layout.containerPaddingMobile} 100px;
    gap: 48px;
  }
`;

/* 강의 정보 섹션 */
const LectureInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const LectureBanner = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1200/480;
  
  @media (max-width: 768px) {
    aspect-ratio: 2/1;
  }
`;

const LectureBannerImage = styled.div`
  width: 100%;
  height: 100%;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    pointer-events: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
  }
`;

const LectureHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const LectureInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const LectureTitle = styled.h1`
  color: #171719;
  font-size: 28px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 700;
  line-height: 38.08px;
  letter-spacing: -0.66px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

const LectureSubtitle = styled.p`
  color: rgba(55, 56, 60, 0.61);
  font-size: 18px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 26.1px;
  letter-spacing: 0px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const StartButton = styled.button`
  width: 240px;
  height: 64px;
  padding: 12px 28px;
  background: #448181;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(68, 129, 129, 0.9);
  }
  
  @media (max-width: 768px) {
    align-self: stretch;
    width: 100%;
    height: 56px;
    padding: 12px 24px;
  }
`;

const ButtonText = styled.span`
  color: white;
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.09px;
`;

/* 탭 섹션 */
const TabSection = styled.section<{ isSticky?: boolean }>`
  width: 100%;
  background: white;
  z-index: 100;
  transition: all 0.3s ease;
  
  ${props => props.isSticky && `
    position: fixed;
    top: 80px;
    left: 0;
    right: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  `}
`;

const TabContainer = styled.div`
  width: 100%;
  background: white;
`;

const TabList = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 48px;
  overflow-x: auto;
  max-width: ${({ theme }) => theme.layout.containerWidth};
  margin: 0 auto;
  padding-right: ${({ theme }) => theme.layout.containerPadding};
  
  @media (max-width: 1024px) {
    padding-right: ${({ theme }) => theme.layout.containerPaddingTablet};
  }
  
  @media (max-width: 768px) {
    gap: 24px;
    padding-right: ${({ theme }) => theme.layout.containerPaddingMobile};
  }
`;

const TabItem = styled.div<{ active?: boolean }>`
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  padding: 12px 0;
  transition: all 0.2s ease;
  
  @media (max-width: 768px) {
    padding: 12px 0;
  }
`;

const TabText = styled.span<{ active?: boolean }>`
  color: ${props => props.active ? '#296768' : 'rgba(55, 56, 60, 0.28)'};
  font-size: 20px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: -0.24px;
  transition: color 0.2s ease;
  
  ${TabItem}:hover & {
    color: #296768;
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

const TabIndicator = styled.div`
  position: absolute;
  bottom: 0;
  height: 2px;
  background: #296768;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left;
`;

const TabDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(112, 115, 124, 0.22);
`;

/* 콘텐츠 섹션 */
const ContentSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ContentItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 0 64px 0;
  
  &:first-child {
    padding-top: 0;
  }
  
  @media (max-width: 768px) {
    padding: 24px 0 48px 0;
    gap: 24px;
    
    &:first-child {
      padding-top: 0;
    }
  }
`;

const SectionTitle = styled.h2`
  color: #171719;
  font-size: 24px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 700;
  line-height: 32px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 28px;
  }
`;

export default ClassLecture;
