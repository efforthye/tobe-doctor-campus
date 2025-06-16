import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Layout from '../../components/layout/Layout';
import { useParams } from 'react-router-dom';

const ClassLecture: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('introduction');

  // 배너 데이터 제거 - 더 이상 필요하지 않음

  // 강의 정보 (임시 데이터)
  const lectureData = {
    title: id ? `머신러닝의 기초 : Linear Regression (강의 ${id})` : '머신러닝의 기초 : Linear Regression',
    instructor: '김승종',
    institution: '고려대학교 의과대학 의공학교실',
    image: 'https://placehold.co/1200x400/DDDDDD/666666?text=Lecture+Banner'
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
          <TabSection>
            <TabContainer>
              <TabList>
                {tabs.map((tab) => (
                  <TabItem 
                    key={tab.id}
                    active={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <TabText active={activeTab === tab.id}>{tab.label}</TabText>
                    {activeTab === tab.id && <TabIndicator />}
                  </TabItem>
                ))}
              </TabList>
              <TabDivider />
            </TabContainer>
          </TabSection>

          {/* 콘텐츠 영역 */}
          <ContentSection>
            <ContentPlaceholder>
              {/* 탭별 콘텐츠가 여기에 들어갑니다 */}
              <PlaceholderText>
                {tabs.find(tab => tab.id === activeTab)?.label} 콘텐츠 영역
              </PlaceholderText>
            </ContentPlaceholder>
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
  aspect-ratio: 3/1;
  
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
  font-size: 40px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 700;
  line-height: 54.01px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 44px;
  }
`;

const LectureSubtitle = styled.p`
  color: rgba(55, 56, 60, 0.61);
  font-size: 18px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 26.01px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const StartButton = styled.button`
  padding: 16px 32px;
  background: #171719;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(23, 23, 25, 0.9);
  }
  
  @media (max-width: 768px) {
    align-self: stretch;
    padding: 14px 24px;
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
const TabSection = styled.section`
  width: 100%;
`;

const TabContainer = styled.div`
  width: 100%;
  background: white;
`;

const TabList = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  overflow-x: auto;
  
  @media (max-width: 768px) {
    gap: 0;
  }
`;

const TabItem = styled.div<{ active?: boolean }>`
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  padding: 16px 20px;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(23, 23, 25, 0.04);
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px;
  }
`;

const TabText = styled.span<{ active?: boolean }>`
  color: ${props => props.active ? '#171719' : 'rgba(55, 56, 60, 0.61)'};
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.09px;
  transition: color 0.2s ease;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const TabIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #171719;
`;

const TabDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(112, 115, 124, 0.22);
`;

/* 콘텐츠 섹션 */
const ContentSection = styled.section`
  width: 100%;
  min-height: 400px;
`;

const ContentPlaceholder = styled.div`
  width: 100%;
  height: 400px;
  background: rgba(55, 56, 60, 0.08);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaceholderText = styled.div`
  color: rgba(55, 56, 60, 0.61);
  font-size: 18px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 26.01px;
  text-align: center;
`;

export default ClassLecture;
