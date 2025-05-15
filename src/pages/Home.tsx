import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <Container>
        {/* 메인 배너 */}
        <BannerSection>
          <BannerImage src="/images/banner-placeholder.jpg" alt="투비닥터 캠퍼스" />
          <BannerGradient />
          <BannerContent>
            <BannerSubtitle>젊은 의사의 학습 러닝메이트</BannerSubtitle>
            <BannerTitle>투비닥터 캠퍼스</BannerTitle>
          </BannerContent>
        </BannerSection>

        {/* 카테고리 섹션 */}
        <Section>
          <SectionHeader>
            <div>
              <SectionTitle>EXPLORE THE CAMPUS</SectionTitle>
              <SectionSubtitle>클래스 카테고리별 페이지로 이동하는 버튼입니다</SectionSubtitle>
            </div>
            <SectionArrow>→</SectionArrow>
          </SectionHeader>
          
          <CardContainer>
            <ExploreCard>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </ExploreCard>
            <ExploreCard>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </ExploreCard>
            <ExploreCard>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </ExploreCard>
            <ExploreCard>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </ExploreCard>
            <ExploreCard>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </ExploreCard>
          </CardContainer>
        </Section>

        {/* 강의 섹션 */}
        <Section>
          <SectionHeader>
            <div>
              <SectionTitle>VISIT THE CLASSROOM</SectionTitle>
              <SectionSubtitle>클래스 강의별 페이지로 이동하는 버튼입니다</SectionSubtitle>
            </div>
            <SectionArrow>→</SectionArrow>
          </SectionHeader>
          
          <ClassroomList>
            <ClassroomCard>
              <ClassroomTitle>강의 제목</ClassroomTitle>
              <ClassroomDescription>설명</ClassroomDescription>
            </ClassroomCard>
            <ClassroomCard>
              <ClassroomTitle>강의 제목</ClassroomTitle>
              <ClassroomDescription>설명</ClassroomDescription>
            </ClassroomCard>
            <ClassroomCard>
              <ClassroomTitle>강의 제목</ClassroomTitle>
              <ClassroomDescription>설명</ClassroomDescription>
            </ClassroomCard>
          </ClassroomList>
        </Section>

        {/* 커넥트 섹션 */}
        <Section>
          <SectionHeader>
            <div>
              <SectionTitle>CONNECT TO THE WORLD</SectionTitle>
              <SectionSubtitle>커피챗 연자별 페이지로 이동하는 버튼입니다</SectionSubtitle>
            </div>
            <SectionArrow>→</SectionArrow>
          </SectionHeader>
          
          <CardContainer className="connect">
            <ConnectCard>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </ConnectCard>
            <ConnectCard>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </ConnectCard>
            <ConnectCard>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </ConnectCard>
            <ConnectCard>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </ConnectCard>
          </CardContainer>
        </Section>
      </Container>
    </Layout>
  );
};

// 스타일 컴포넌트
const Container = styled.div`
  width: 100%;
  padding: 36px 0 160px;
  box-sizing: border-box;
`;

const BannerSection = styled.section`
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 80px;
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 16 / 5;
  display: block;
  
  @media (max-width: 768px) {
    aspect-ratio: 16 / 9;
  }
`;

const BannerGradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
`;

const BannerContent = styled.div`
  position: absolute;
  bottom: 60px;
  left: 60px;
  color: white;
  
  @media (max-width: 768px) {
    bottom: 30px;
    left: 30px;
  }
`;

const BannerSubtitle = styled.p`
  font-size: 18px;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const BannerTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Section = styled.section`
  margin-bottom: 80px;
  padding: 0 80px;
  
  @media (max-width: 1024px) {
    padding: 0 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
    margin-bottom: 60px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 10px 0;
  line-height: 1.35;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SectionArrow = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: black;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 24px;
  width: 100%;
  overflow-x: auto;
  padding-bottom: 12px;
  
  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  
  &.connect {
    /* 연결 섹션은 4개의 카드 */
  }
`;

const baseCardStyles = `
  border-radius: 12px;
  overflow: hidden;
  background-color: #F5F5F5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

// EXPLORE THE CAMPUS 카드 스타일 (5개의 카드)
const ExploreCard = styled.div`
  ${baseCardStyles}
  flex: 0 0 auto;
  width: calc((100% - 96px) / 5); /* 5개 카드, 4개의 간격(24px * 4) */
  
  @media (max-width: 1024px) {
    width: calc((100% - 48px) / 3);
  }
  
  @media (max-width: 768px) {
    width: calc((100% - 24px) / 2);
  }
`;

// CONNECT TO THE WORLD 카드 스타일 (4개의 카드)
const ConnectCard = styled.div`
  ${baseCardStyles}
  flex: 0 0 auto;
  width: calc((100% - 72px) / 4); /* 4개 카드, 3개의 간격(24px * 3) */
  
  @media (max-width: 1024px) {
    width: calc((100% - 48px) / 3);
  }
  
  @media (max-width: 768px) {
    width: calc((100% - 24px) / 2);
  }
`;

const CardThumbnail = styled.div`
  height: 210px;
  background-color: #E5E5E5;
  transition: filter 0.3s ease;
  
  ${ExploreCard}:hover &, ${ConnectCard}:hover & {
    filter: brightness(1.05);
  }
`;

const CardContent = styled.div`
  padding: 20px;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.colors.text};
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: rgba(55, 56, 60, 0.61);
  margin: 0;
  line-height: 1.5;
`;

const ClassroomList = styled.div`
  display: flex;
  gap: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ClassroomCard = styled.div`
  flex: 1;
  height: 180px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  padding: 24px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
    z-index: 1;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    height: 160px;
  }
`;

const ClassroomTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ClassroomDescription = styled.p`
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
  position: relative;
  z-index: 2;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export default Home;