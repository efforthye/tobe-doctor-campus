import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <Container>
        {/* 메인 배너 */}
        <BannerSection>
          <BannerImage src="/images/banner-placeholder.jpg" alt="투비더더 캠퍼스" />
          <BannerGradient />
          <BannerContent>
            <BannerSubtitle>김쌤 하이닥 학습 라이브러리</BannerSubtitle>
            <BannerTitle>투비더더 캠퍼스</BannerTitle>
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
          
          <CardList>
            <Card>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </Card>
          </CardList>
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
          
          <CardList>
            <Card>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardThumbnail />
              <CardContent>
                <CardTitle>제목</CardTitle>
                <CardDescription>설명</CardDescription>
              </CardContent>
            </Card>
          </CardList>
        </Section>
      </Container>
    </Layout>
  );
};

// 스타일 컴포넌트
const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 36px 20px 160px;
  box-sizing: border-box;
`;

const BannerSection = styled.section`
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 64px;
`;

const BannerImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  aspect-ratio: 16 / 6;
  display: block;
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
  bottom: 32px;
  left: 32px;
  color: white;
`;

const BannerSubtitle = styled.p`
  font-size: 14px;
  margin-bottom: 4px;
`;

const BannerTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
`;

const Section = styled.section`
  margin-bottom: 64px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  line-height: 1.35;
`;

const SectionSubtitle = styled.p`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
  line-height: 1.4;
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

const CardList = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 8px;
  
  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const Card = styled.div`
  flex: 0 0 auto;
  width: 144px;
  border-radius: 8px;
  overflow: hidden;
  background-color: #F5F5F5;
`;

const CardThumbnail = styled.div`
  height: 144px;
  background-color: #DDD;
`;

const CardContent = styled.div`
  padding: 12px;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 4px 0;
`;

const CardDescription = styled.p`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
  margin: 0;
`;

const ClassroomList = styled.div`
  display: flex;
  gap: 20px;
`;

const ClassroomCard = styled.div`
  flex: 1;
  height: 160px;
  background-color: #4A6E6E;
  border-radius: 8px;
  padding: 16px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ClassroomTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 4px 0;
`;

const ClassroomDescription = styled.p`
  font-size: 12px;
  opacity: 0.8;
  margin: 0;
`;

export default Home;