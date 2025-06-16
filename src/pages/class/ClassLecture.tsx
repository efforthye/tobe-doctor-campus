import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
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
  
  // 탭 섹션의 원래 위치를 저장 (변하지 않는 값)
  const originalTabPositionRef = useRef<number>(0);

  // 초기 탭 위치 저장
  useEffect(() => {
    if (tabSectionRef.current && originalTabPositionRef.current === 0) {
      originalTabPositionRef.current = tabSectionRef.current.offsetTop;
    }
  }, []);

  // 강의 정보 (임시 데이터)
  const lectureData = {
    title: id ? `머신러닝의 기초 : Linear Regression (강의 ${id})` : '머신러닝의 기초 : Linear Regression',
    instructor: '김승종',
    institution: '고려대학교 의과대학 의공학교실',
    image: 'https://placehold.co/1200x480/DDDDDD/999999?text=Temp+Image'
  };

  // 탭 데이터
  const tabs = useMemo(() => [
    { id: 'introduction', label: '강의 소개' },
    { id: 'instructor', label: '강사 소개' },
    { id: 'recommended', label: '추천 강의' },
    { id: 'reviews', label: '수강 후기' },
    { id: 'faq', label: 'FAQ' },
    { id: 'qna', label: 'Q&A' }
  ], []);

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
      if (!tabSectionRef.current || originalTabPositionRef.current === 0) return;

      const scrollY = window.scrollY;
      const headerHeight = 80;
      
      // 원래 탭 위치 사용 (변하지 않는 값)
      const tabSectionTop = originalTabPositionRef.current;
      
      // 간단한 조건: 탭 섹션의 상단이 헤더 아래로 가면 sticky
      const shouldBeSticky = scrollY + headerHeight > tabSectionTop;
      
      if (shouldBeSticky !== isTabSticky) {
        setIsTabSticky(shouldBeSticky);
      }

      // 현재 보이는 섹션 찾기
      const sectionOffsets = tabs.map(tab => {
        const element = sectionRefs.current[tab.id];
        if (!element) return { id: tab.id, offset: 0 };
        return { id: tab.id, offset: element.offsetTop };
      });

      // 현재 스크롤 위치에서 가장 적합한 섹션 찾기
      const offsetForActiveSection = shouldBeSticky ? 72 : headerHeight + 100; // sticky일 때는 탭 높이만
      const targetScrollPosition = scrollY + offsetForActiveSection;
      
      let currentSection = sectionOffsets[0];
      for (let i = 0; i < sectionOffsets.length; i++) {
        if (sectionOffsets[i].offset <= targetScrollPosition) {
          currentSection = sectionOffsets[i];
        } else {
          break;
        }
      }

      if (currentSection.id !== activeTab) {
        setActiveTab(currentSection.id);
      }
    };

    // 초기 실행
    const timer = setTimeout(() => {
      if (originalTabPositionRef.current === 0 && tabSectionRef.current) {
        originalTabPositionRef.current = tabSectionRef.current.offsetTop;
      }
      handleScroll();
    }, 100);

    // 스로틀링을 위한 requestAnimationFrame 사용
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      clearTimeout(timer);
    };
  }, [activeTab, tabs, isTabSticky]);

  // 탭 클릭 시 해당 섹션으로 스크롤
  const handleTabClick = useCallback((tabId: string) => {
    const element = sectionRefs.current[tabId];
    if (element) {
      const tabHeight = 72;
      const offset = isTabSticky ? tabHeight : 0; // sticky일 때만 탭 높이만큼 오프셋
      
      const elementRect = element.getBoundingClientRect();
      const elementPosition = window.pageYOffset + elementRect.top - offset;
      
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
          <TabSection ref={tabSectionRef} $isSticky={isTabSticky}>
            <TabContainer>
              <TabList $isSticky={isTabSticky} ref={tabListRef}>
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
              <TabDivider $isSticky={isTabSticky} />
            </TabContainer>
          </TabSection>

          {/* Sticky 상태일 때 콘텐츠 여백 */}
          {isTabSticky && <StickyPlaceholder />}
          
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
const TabSection = styled.section<{ $isSticky?: boolean }>`
  width: 100%;
  background: white;
  z-index: 1001;
  transition: all 0.2s ease;
  
  ${props => props.$isSticky && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid rgba(112, 115, 124, 0.22);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
  `}
`;

const TabContainer = styled.div`
  width: 100%;
  background: white;
  position: relative;
`;

const TabList = styled.div<{ $isSticky?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 48px;
  overflow-x: auto;
  max-width: ${({ theme }) => theme.layout.containerWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.layout.containerPadding} 0 ${props => props.$isSticky ? ({ theme }) => theme.layout.containerPadding : '0'};
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  
  @media (max-width: 1024px) {
    padding: 0 ${({ theme }) => theme.layout.containerPaddingTablet} 0 ${props => props.$isSticky ? ({ theme }) => theme.layout.containerPaddingTablet : '0'};
  }
  
  @media (max-width: 768px) {
    gap: 24px;
    padding: 0 ${({ theme }) => theme.layout.containerPaddingMobile} 0 ${props => props.$isSticky ? ({ theme }) => theme.layout.containerPaddingMobile : '0'};
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

const TabDivider = styled.div<{ $isSticky?: boolean }>`
  width: 100%;
  height: 1px;
  background: rgba(112, 115, 124, 0.22);
  display: ${props => props.$isSticky ? 'none' : 'block'};
`;

/* Sticky 플레이스홀더 */
const StickyPlaceholder = styled.div`
  height: 72px;
  width: 100%;
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
