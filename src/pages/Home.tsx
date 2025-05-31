import React, { useState } from 'react';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';

const Home: React.FC = () => {
  const [classroomPage, setClassroomPage] = useState(1);
  const [connectPage, setConnectPage] = useState(1);

  // 강의 더미 데이터 (3페이지)
  const classroomData = {
    1: [
      {
        title: "심전도 읽기 기초",
        subtitle: "기본적인 심전도 판독법을 배워보세요",
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop&crop=center"
      },
      {
        title: "흉부 X-ray 판독",
        subtitle: "흉부 영상의학의 기본기를 다져보세요",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center"
      },
      {
        title: "응급실 처치법",
        subtitle: "응급상황에서의 대처법을 익혀보세요",
        image: "https://images.unsplash.com/photo-1583912086296-8c8b3660d94f?w=600&h=400&fit=crop&crop=center"
      }
    ],
    2: [
      {
        title: "혈액검사 해석",
        subtitle: "혈액검사 결과를 정확히 해석하는 방법",
        image: "https://images.unsplash.com/photo-1576669801820-6eca57e3dc95?w=600&h=400&fit=crop&crop=center"
      },
      {
        title: "MRI 영상 판독",
        subtitle: "자기공명영상의 기본 판독 원리",
        image: "https://images.unsplash.com/photo-1559757175-7d4a71724884?w=600&h=400&fit=crop&crop=center"
      },
      {
        title: "외상환자 처치",
        subtitle: "외상환자의 체계적 접근법",
        image: "https://images.unsplash.com/photo-1609188076864-c35269136896?w=600&h=400&fit=crop&crop=center"
      }
    ],
    3: [
      {
        title: "임상병리학 기초",
        subtitle: "진단검사의학의 핵심 원리",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&crop=center"
      },
      {
        title: "초음파 검사법",
        subtitle: "초음파를 이용한 진단 기법",
        image: "https://images.unsplash.com/photo-1594824475317-d7345bdd5b13?w=600&h=400&fit=crop&crop=center"
      },
      {
        title: "중환자 관리",
        subtitle: "중환자실에서의 환자 관리법",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop&crop=center"
      }
    ]
  };

  // 커피챗 더미 데이터 (3페이지)
  const connectData = {
    1: [
      {
        title: "김의사 선생님",
        subtitle: "내과 전문의",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
      },
      {
        title: "박의사 선생님",
        subtitle: "외과 전문의",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
      },
      {
        title: "이의사 선생님",
        subtitle: "소아과 전문의",
        image: "https://images.unsplash.com/photo-1594824475317-d7345bdd5b13?w=400&h=400&fit=crop&crop=face"
      },
      {
        title: "최의사 선생님",
        subtitle: "산부인과 전문의",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face"
      }
    ],
    2: [
      {
        title: "정교수 선생님",
        subtitle: "정신과 전문의",
        image: "https://images.unsplash.com/photo-1576669801820-6eca57e3dc95?w=400&h=400&fit=crop&crop=face"
      },
      {
        title: "강의사 선생님",
        subtitle: "영상의학과 전문의",
        image: "https://images.unsplash.com/photo-1559757175-7d4a71724884?w=400&h=400&fit=crop&crop=face"
      },
      {
        title: "조원장 선생님",
        subtitle: "마취과 전문의",
        image: "https://images.unsplash.com/photo-1609188076864-c35269136896?w=400&h=400&fit=crop&crop=face"
      },
      {
        title: "한교수 선생님",
        subtitle: "병리과 전문의",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face"
      }
    ],
    3: [
      {
        title: "윤의사 선생님",
        subtitle: "응급의학과 전문의",
        image: "https://images.unsplash.com/photo-1583912086296-8c8b3660d94f?w=400&h=400&fit=crop&crop=face"
      },
      {
        title: "서교수 선생님",
        subtitle: "재활의학과 전문의",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
      },
      {
        title: "송원장 선생님",
        subtitle: "가정의학과 전문의",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face"
      },
      {
        title: "홍의사 선생님",
        subtitle: "신경과 전문의",
        image: "https://images.unsplash.com/photo-1594824475317-d7345bdd5b13?w=400&h=400&fit=crop&crop=face"
      }
    ]
  };

  const handleClassroomPageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && classroomPage > 1) {
      setClassroomPage(classroomPage - 1);
    } else if (direction === 'next' && classroomPage < 3) {
      setClassroomPage(classroomPage + 1);
    }
  };

  const handleConnectPageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && connectPage > 1) {
      setConnectPage(connectPage - 1);
    } else if (direction === 'next' && connectPage < 3) {
      setConnectPage(connectPage + 1);
    }
  };

  return (
    <Layout>
      <Container>
        {/* 배너 섹션 */}
        <BannerSection>
          <BannerContent>
            <BannerTitle>젊은 의사의 학습 러닝메이트,</BannerTitle>
            <BannerSubtitle>투비닥터 캠퍼스</BannerSubtitle>
          </BannerContent>
        </BannerSection>

        {/* 메인 콘텐츠 컨테이너 */}
        <MainContainer>
          {/* EXPLORE THE CAMPUS 섹션 */}
          <Section>
            <SectionHeader>
              <SectionTitleGroup>
                <SectionTitle>EXPLORE THE CAMPUS</SectionTitle>
                <SectionCaption>클래스 카테고리별 페이지로 이동하는 버튼입니다</SectionCaption>
              </SectionTitleGroup>
            </SectionHeader>
            <CategoryGrid>
              <CategoryCard>
                <CategoryCardImage style={{backgroundImage: "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center')"}} />
                <CategoryCardOverlay>
                  <CategoryCardTitle>내과</CategoryCardTitle>
                </CategoryCardOverlay>
              </CategoryCard>
              <CategoryCard>
                <CategoryCardImage style={{backgroundImage: "url('https://images.unsplash.com/photo-1583912086296-8c8b3660d94f?w=400&h=400&fit=crop&crop=center')"}} />
                <CategoryCardOverlay>
                  <CategoryCardTitle>외과</CategoryCardTitle>
                </CategoryCardOverlay>
              </CategoryCard>
              <CategoryCard>
                <CategoryCardImage style={{backgroundImage: "url('https://images.unsplash.com/photo-1609188076864-c35269136896?w=400&h=400&fit=crop&crop=center')"}} />
                <CategoryCardOverlay>
                  <CategoryCardTitle>소아과</CategoryCardTitle>
                </CategoryCardOverlay>
              </CategoryCard>
              <CategoryCard>
                <CategoryCardImage style={{backgroundImage: "url('https://images.unsplash.com/photo-1559757175-7d4a71724884?w=400&h=400&fit=crop&crop=center')"}} />
                <CategoryCardOverlay>
                  <CategoryCardTitle>산부인과</CategoryCardTitle>
                </CategoryCardOverlay>
              </CategoryCard>
              <CategoryCard>
                <CategoryCardImage style={{backgroundImage: "url('https://images.unsplash.com/photo-1576669801820-6eca57e3dc95?w=400&h=400&fit=crop&crop=center')"}} />
                <CategoryCardOverlay>
                  <CategoryCardTitle>정신과</CategoryCardTitle>
                </CategoryCardOverlay>
              </CategoryCard>
              <CategoryCard>
                <CategoryCardImage style={{backgroundImage: "url('https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop&crop=center')"}} />
                <CategoryCardOverlay>
                  <CategoryCardTitle>영상의학과</CategoryCardTitle>
                </CategoryCardOverlay>
              </CategoryCard>
            </CategoryGrid>
          </Section>

          {/* VISIT THE CLASSROOM 섹션 */}
          <Section>
            <SectionHeader>
              <SectionTitleGroup>
                <SectionTitle>VISIT THE CLASSROOM</SectionTitle>
                <SectionCaption>클래스 강의별 페이지로 이동하는 버튼입니다</SectionCaption>
              </SectionTitleGroup>
              <SectionTrailing>
                <PaginationButtons>
                  <PaginationBtn 
                    onClick={() => handleClassroomPageChange('prev')}
                    disabled={classroomPage === 1}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                  </PaginationBtn>
                  <PaginationBtn 
                    onClick={() => handleClassroomPageChange('next')}
                    disabled={classroomPage === 3}
                    className="active"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </PaginationBtn>
                </PaginationButtons>
              </SectionTrailing>
            </SectionHeader>
            <LectureGrid>
              {classroomData[classroomPage as keyof typeof classroomData].map((lecture, index) => (
                <LectureCard key={index}>
                  <LectureCardImage>
                    <LectureCardBg style={{backgroundImage: `url('${lecture.image}')`}} />
                    <LectureCardOverlay>
                      <LectureCardContent>
                        <LectureCardTitle>{lecture.title}</LectureCardTitle>
                        <LectureCardSubtitle>{lecture.subtitle}</LectureCardSubtitle>
                      </LectureCardContent>
                    </LectureCardOverlay>
                  </LectureCardImage>
                </LectureCard>
              ))}
            </LectureGrid>
          </Section>

          {/* CONNECT TO THE WORLD 섹션 */}
          <Section>
            <SectionHeader>
              <SectionTitleGroup>
                <SectionTitle>CONNECT TO THE WORLD</SectionTitle>
                <SectionCaption>커피챗 연자별 페이지로 이동하는 버튼입니다</SectionCaption>
              </SectionTitleGroup>
              <SectionTrailing>
                <PaginationButtons>
                  <PaginationBtn 
                    onClick={() => handleConnectPageChange('prev')}
                    disabled={connectPage === 1}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                  </PaginationBtn>
                  <PaginationBtn 
                    onClick={() => handleConnectPageChange('next')}
                    disabled={connectPage === 3}
                    className="active"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </PaginationBtn>
                </PaginationButtons>
              </SectionTrailing>
            </SectionHeader>
            <CoffeeChatGrid>
              {connectData[connectPage as keyof typeof connectData].map((person, index) => (
                <CoffeeChatCard key={index}>
                  <CoffeeChatCardImage>
                    <CoffeeChatCardBg style={{backgroundImage: `url('${person.image}')`}} />
                    <CoffeeChatCardOverlay>
                      <CoffeeChatCardContent>
                        <CoffeeChatCardTitle>{person.title}</CoffeeChatCardTitle>
                        <CoffeeChatCardSubtitle>{person.subtitle}</CoffeeChatCardSubtitle>
                      </CoffeeChatCardContent>
                    </CoffeeChatCardOverlay>
                  </CoffeeChatCardImage>
                </CoffeeChatCard>
              ))}
            </CoffeeChatGrid>
          </Section>
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

/* 배너 섹션 */
const BannerSection = styled.section`
  height: 480px;
  background: url('/images/image.jpg') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  
  @media (max-width: 768px) {
    height: 400px;
  }
`;

const BannerContent = styled.div`
  max-width: 1440px;
  width: 100%;
  padding: 0 80px;
  color: #000000;
  z-index: 2;
  
  @media (max-width: 1024px) {
    padding: 0 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const BannerTitle = styled.h1`
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 28px;
  font-weight: 400;
  line-height: 1.358;
  letter-spacing: -2.36%;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const BannerSubtitle = styled.h2`
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -2.82%;
  
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

/* 메인 컨테이너 */
const MainContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 64px 80px 160px;
  display: flex;
  flex-direction: column;
  gap: 64px;
  
  @media (max-width: 1024px) {
    padding: 64px 40px 160px;
  }
  
  @media (max-width: 768px) {
    padding: 40px 20px 100px;
    gap: 48px;
  }
`;

/* 섹션 공통 스타일 */
const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const SectionTitleGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SectionTitle = styled.h2`
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.358;
  letter-spacing: -2.36%;
  color: #000000;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const SectionCaption = styled.p`
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 1.445;
  letter-spacing: -0.02%;
  color: rgba(55, 56, 60, 0.61);
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SectionTrailing = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  height: 38px;
  
  @media (max-width: 768px) {
    align-self: flex-end;
  }
`;

/* 페이지네이션 버튼 */
const PaginationButtons = styled.div`
  display: flex;
  border: 1px solid rgba(112, 115, 124, 0.16);
  border-radius: 10px;
  overflow: hidden;
`;

const PaginationBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  
  &:first-child {
    border-right: 1px solid rgba(112, 115, 124, 0.16);
  }
  
  &:hover:not(:disabled) {
    background-color: #f5f5f5;
  }
  
  &.active {
    background-color: #f0f0f0;
  }
  
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  svg {
    color: rgba(55, 56, 60, 0.61);
  }
`;

/* 카테고리 카드 그리드 (6개, 1:1 비율) */
const CategoryGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;

const CategoryCard = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(112, 115, 124, 0.16);
`;

const CategoryCardImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center');
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
  
  ${CategoryCard}:hover & {
    transform: scale(1.1);
  }
`;

const CategoryCardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  transition: background 0.3s ease;
  
  ${CategoryCard}:hover & {
    background: rgba(0, 0, 0, 0.6);
  }
`;

const CategoryCardTitle = styled.h3`
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

/* 강의 카드 그리드 (3개, 3:2 비율) */
const LectureGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const LectureCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(112, 115, 124, 0.08);
`;

const LectureCardImage = styled.div`
  width: 100%;
  aspect-ratio: 3/2;
  position: relative;
  overflow: hidden;
`;

const LectureCardBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
  
  ${LectureCard}:hover & {
    transform: scale(1.1);
  }
`;

const LectureCardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 50%);
  display: flex;
  align-items: flex-end;
  padding: 24px;
`;

const LectureCardContent = styled.div`
  color: white;
`;

const LectureCardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const LectureCardSubtitle = styled.p`
  font-size: 14px;
  opacity: 0.9;
`;

/* 커피챗 카드 그리드 (4개, 1:1 비율) */
const CoffeeChatGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`;

const CoffeeChatCard = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(112, 115, 124, 0.08);
`;

const CoffeeChatCardImage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const CoffeeChatCardBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
  
  ${CoffeeChatCard}:hover & {
    transform: scale(1.1);
  }
`;

const CoffeeChatCardOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 50%);
  display: flex;
  align-items: flex-end;
  padding: 24px;
`;

const CoffeeChatCardContent = styled.div`
  color: white;
`;

const CoffeeChatCardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const CoffeeChatCardSubtitle = styled.p`
  font-size: 14px;
  opacity: 0.9;
`;

export default Home;