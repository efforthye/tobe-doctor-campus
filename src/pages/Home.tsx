import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Container>
        {/* 히어로 섹션 */}
        <HeroSection>
          <HeroContent>
            <HeroTitle>
              임상 의사를 위한<br/>
              온라인 교육 플랫폼
            </HeroTitle>
            <HeroSubtitle>
              투비닥터 캠퍼스는 최신 의학 정보와 임상 지식을 쉽고 효율적으로 학습할 수 있는 온라인 교육 플랫폼입니다.
            </HeroSubtitle>
            <HeroButtons>
              <PrimaryButton onClick={() => navigate('/signup')}>지금 시작하기</PrimaryButton>
              <SecondaryButton onClick={() => navigate('/classes')}>강의 둘러보기</SecondaryButton>
            </HeroButtons>
          </HeroContent>
          <HeroImage src="/images/hero-image.jpg" alt="투비닥터 캠퍼스" />
        </HeroSection>

        {/* 특징 섹션 */}
        <FeaturesSection>
          <SectionTitle>왜 투비닥터 캠퍼스인가요?</SectionTitle>
          <FeaturesList>
            <FeatureItem>
              <FeatureIcon>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="24" fill="#EFF8F8"/>
                  <path d="M24 16V32" stroke="#448181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 24H32" stroke="#448181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </FeatureIcon>
              <FeatureTitle>최신 의학 지식</FeatureTitle>
              <FeatureDescription>
                최신 의학 연구와 임상 가이드라인을 바탕으로 만들어진 강의로, 항상 최신 정보를 제공합니다.
              </FeatureDescription>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="24" fill="#EFF8F8"/>
                  <path d="M32 18H16C14.8954 18 14 18.8954 14 20V32C14 33.1046 14.8954 34 16 34H32C33.1046 34 34 33.1046 34 32V20C34 18.8954 33.1046 18 32 18Z" stroke="#448181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M28 34V16C28 15.4696 27.7893 14.9609 27.4142 14.5858C27.0391 14.2107 26.5304 14 26 14H22C21.4696 14 20.9609 14.2107 20.5858 14.5858C20.2107 14.9609 20 15.4696 20 16V34" stroke="#448181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </FeatureIcon>
              <FeatureTitle>언제 어디서나 학습</FeatureTitle>
              <FeatureDescription>
                모바일, 태블릿, PC 등 다양한 기기에서 언제 어디서나 편리하게 학습할 수 있습니다.
              </FeatureDescription>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="24" fill="#EFF8F8"/>
                  <path d="M34 31.0001C34 29.6868 33.4732 28.4268 32.5355 27.4891C31.5979 26.5515 30.3478 26.0247 29.0345 26.0247H19.587C18.2737 26.0247 17.0236 26.5515 16.086 27.4891C15.1484 28.4268 14.6215 29.6868 14.6215 31.0001" stroke="#448181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M24.3107 21.0493C26.5219 21.0493 28.317 19.2542 28.317 17.0431C28.317 14.8319 26.5219 13.0368 24.3107 13.0368C22.0996 13.0368 20.3044 14.8319 20.3044 17.0431C20.3044 19.2542 22.0996 21.0493 24.3107 21.0493Z" stroke="#448181" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </FeatureIcon>
              <FeatureTitle>현직 의사 강사진</FeatureTitle>
              <FeatureDescription>
                현직에서 활발히 활동 중인 의사들이 직접 강의를 제작하고 실무 경험을 공유합니다.
              </FeatureDescription>
            </FeatureItem>
          </FeaturesList>
        </FeaturesSection>

        {/* 카테고리 섹션 */}
        <CategoriesSection>
          <SectionTitle>주요 강의 카테고리</SectionTitle>
          <CategoriesList>
            <CategoryItem onClick={() => navigate('/classes?category=internal')}>
              <CategoryTitle>내과</CategoryTitle>
              <CategoryDescription>순환기, 호흡기, 소화기, 신장, 내분비, 혈액종양, 감염</CategoryDescription>
              <ArrowIcon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16669 10H15.8334" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 4.16667L15.8333 10L10 15.8333" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ArrowIcon>
            </CategoryItem>
            <CategoryItem onClick={() => navigate('/classes?category=surgery')}>
              <CategoryTitle>외과</CategoryTitle>
              <CategoryDescription>일반외과, 흉부외과, 신경외과, 정형외과, 성형외과</CategoryDescription>
              <ArrowIcon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16669 10H15.8334" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 4.16667L15.8333 10L10 15.8333" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ArrowIcon>
            </CategoryItem>
            <CategoryItem onClick={() => navigate('/classes?category=emergency')}>
              <CategoryTitle>응급의학</CategoryTitle>
              <CategoryDescription>응급처치, 중환자관리, 외상, 재난의학</CategoryDescription>
              <ArrowIcon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16669 10H15.8334" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 4.16667L15.8333 10L10 15.8333" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ArrowIcon>
            </CategoryItem>
            <CategoryItem onClick={() => navigate('/classes?category=pediatrics')}>
              <CategoryTitle>소아과</CategoryTitle>
              <CategoryDescription>신생아, 발달, 소아감염, 소아호흡기, 소아소화기</CategoryDescription>
              <ArrowIcon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16669 10H15.8334" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 4.16667L15.8333 10L10 15.8333" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ArrowIcon>
            </CategoryItem>
            <CategoryItem onClick={() => navigate('/classes?category=obgyn')}>
              <CategoryTitle>산부인과</CategoryTitle>
              <CategoryDescription>산과, 부인과, 생식내분비학, 부인종양학</CategoryDescription>
              <ArrowIcon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16669 10H15.8334" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 4.16667L15.8333 10L10 15.8333" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ArrowIcon>
            </CategoryItem>
            <CategoryItem onClick={() => navigate('/classes?category=psychiatry')}>
              <CategoryTitle>정신건강의학과</CategoryTitle>
              <CategoryDescription>기분장애, 불안장애, 정신병, 소아정신, 노인정신</CategoryDescription>
              <ArrowIcon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16669 10H15.8334" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 4.16667L15.8333 10L10 15.8333" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ArrowIcon>
            </CategoryItem>
          </CategoriesList>
          <ViewAllButton onClick={() => navigate('/classes')}>
            모든 카테고리 보기
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16669 10H15.8334" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 4.16667L15.8333 10L10 15.8333" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ViewAllButton>
        </CategoriesSection>

        {/* 추천 강의 섹션 */}
        <RecommendedSection>
          <SectionTitle>추천 강의</SectionTitle>
          <CoursesList>
            <CourseCard onClick={() => navigate('/classes/1')}>
              <CourseImage src="/images/course1.jpg" alt="강의 이미지" />
              <CourseContent>
                <CourseCategory>내과</CourseCategory>
                <CourseTitle>고혈압 관리의 최신 가이드라인</CourseTitle>
                <CourseInstructor>김영수 교수</CourseInstructor>
                <CourseInfo>
                  <CourseRating>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 1.5L10.163 5.77865L15 6.46898L11.5 9.79758L12.326 14.5L8 12.3L3.674 14.5L4.5 9.79758L1 6.46898L5.837 5.77865L8 1.5Z" fill="#FFD600" stroke="#FFD600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    4.9
                  </CourseRating>
                  <CourseLength>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 4V8L10.6667 9.33333" stroke="#71747A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.14046 6.5481C2.52961 5.27767 3.31328 4.16648 4.37554 3.40138C5.4378 2.63629 6.72061 2.26133 8.01954 2.33755C9.31847 2.41376 10.5454 2.93726 11.5071 3.82164C12.4688 4.70602 13.107 5.89742 13.3173 7.1875C13.5277 8.47759 13.2981 9.80005 12.6666 10.9457C12.035 12.0913 11.0394 12.9961 9.84333 13.5188C8.64727 14.0415 7.31442 14.152 6.04241 13.8347C4.77041 13.5174 3.63346 12.7896 2.81379 11.7669C2.40516 11.242 2.09392 10.6474 1.89379 10.0144" stroke="#71747A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1.33334 6.66671V4.00004H4.00001" stroke="#71747A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    6시간 32분
                  </CourseLength>
                </CourseInfo>
              </CourseContent>
            </CourseCard>
            <CourseCard onClick={() => navigate('/classes/2')}>
              <CourseImage src="/images/course2.jpg" alt="강의 이미지" />
              <CourseContent>
                <CourseCategory>외과</CourseCategory>
                <CourseTitle>복강경 수술의 기본 원리와 술기</CourseTitle>
                <CourseInstructor>박지원 교수</CourseInstructor>
                <CourseInfo>
                  <CourseRating>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 1.5L10.163 5.77865L15 6.46898L11.5 9.79758L12.326 14.5L8 12.3L3.674 14.5L4.5 9.79758L1 6.46898L5.837 5.77865L8 1.5Z" fill="#FFD600" stroke="#FFD600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    4.8
                  </CourseRating>
                  <CourseLength>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 4V8L10.6667 9.33333" stroke="#71747A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.14046 6.5481C2.52961 5.27767 3.31328 4.16648 4.37554 3.40138C5.4378 2.63629 6.72061 2.26133 8.01954 2.33755C9.31847 2.41376 10.5454 2.93726 11.5071 3.82164C12.4688 4.70602 13.107 5.89742 13.3173 7.1875C13.5277 8.47759 13.2981 9.80005 12.6666 10.9457C12.035 12.0913 11.0394 12.9961 9.84333 13.5188C8.64727 14.0415 7.31442 14.152 6.04241 13.8347C4.77041 13.5174 3.63346 12.7896 2.81379 11.7669C2.40516 11.242 2.09392 10.6474 1.89379 10.0144" stroke="#71747A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1.33334 6.66671V4.00004H4.00001" stroke="#71747A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    8시간 15분
                  </CourseLength>
                </CourseInfo>
              </CourseContent>
            </CourseCard>
            <CourseCard onClick={() => navigate('/classes/3')}>
              <CourseImage src="/images/course3.jpg" alt="강의 이미지" />
              <CourseContent>
                <CourseCategory>응급의학</CourseCategory>
                <CourseTitle>급성 심장질환 응급처치 프로토콜</CourseTitle>
                <CourseInstructor>이민호 교수</CourseInstructor>
                <CourseInfo>
                  <CourseRating>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 1.5L10.163 5.77865L15 6.46898L11.5 9.79758L12.326 14.5L8 12.3L3.674 14.5L4.5 9.79758L1 6.46898L5.837 5.77865L8 1.5Z" fill="#FFD600" stroke="#FFD600" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    4.9
                  </CourseRating>
                  <CourseLength>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 4V8L10.6667 9.33333" stroke="#71747A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2.14046 6.5481C2.52961 5.27767 3.31328 4.16648 4.37554 3.40138C5.4378 2.63629 6.72061 2.26133 8.01954 2.33755C9.31847 2.41376 10.5454 2.93726 11.5071 3.82164C12.4688 4.70602 13.107 5.89742 13.3173 7.1875C13.5277 8.47759 13.2981 9.80005 12.6666 10.9457C12.035 12.0913 11.0394 12.9961 9.84333 13.5188C8.64727 14.0415 7.31442 14.152 6.04241 13.8347C4.77041 13.5174 3.63346 12.7896 2.81379 11.7669C2.40516 11.242 2.09392 10.6474 1.89379 10.0144" stroke="#71747A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M1.33334 6.66671V4.00004H4.00001" stroke="#71747A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    5시간 45분
                  </CourseLength>
                </CourseInfo>
              </CourseContent>
            </CourseCard>
          </CoursesList>
          <ViewAllButton onClick={() => navigate('/classes')}>
            모든 강의 보기
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.16669 10H15.8334" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 4.16667L15.8333 10L10 15.8333" stroke="#448181" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </ViewAllButton>
        </RecommendedSection>

        {/* CTA 섹션 */}
        <CtaSection>
          <CtaContent>
            <CtaText>
              <CtaTitle>지금 바로 시작하세요</CtaTitle>
              <CtaDescription>
                투비닥터 캠퍼스와 함께 더 나은 의료인으로 성장하세요.
                오늘 가입하고 무료 강의를 체험해보세요.
              </CtaDescription>
            </CtaText>
            <CtaButton onClick={() => navigate('/signup')}>무료로 시작하기</CtaButton>
          </CtaContent>
        </CtaSection>
      </Container>
    </Layout>
  );
};

// 스타일 컴포넌트
const Container = styled.div`
  max-width: 100%;
  margin-top: 80px; // 헤더 높이만큼 여백
`;

const HeroSection = styled.section`
  display: flex;
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px 20px;
  align-items: center;
  gap: 60px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 60px 20px;
    gap: 40px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    padding: 40px 20px;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  flex: 1;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  color: #171719;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    font-size: 40px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 36px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 32px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 32px;
  color: rgba(55, 56, 60, 0.88);
  max-width: 600px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0 auto 32px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 16px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: center;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
`;

const PrimaryButton = styled(Button)`
  background-color: #448181;
  color: white;
  border: none;
  
  &:hover {
    background-color: #336060;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: transparent;
  color: #448181;
  border: 1px solid #448181;
  
  &:hover {
    background-color: rgba(68, 129, 129, 0.05);
  }
`;

const HeroImage = styled.img`
  flex: 1;
  max-width: 50%;
  border-radius: 16px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 100%;
    width: 100%;
  }
`;

const SectionTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
  text-align: center;
  color: #171719;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 28px;
    margin-bottom: 32px;
  }
`;

const FeaturesSection = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px 20px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 60px 20px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 40px 20px;
  }
`;

const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FeatureIcon = styled.div`
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #171719;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: rgba(55, 56, 60, 0.61);
`;

const CategoriesSection = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px 20px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 60px 20px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 40px 20px;
  }
`;

const CategoriesList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-bottom: 40px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const CategoryItem = styled.div`
  background-color: #FFFFFF;
  border: 1px solid rgba(112, 115, 124, 0.16);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #448181;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }
`;

const CategoryTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #171719;
`;

const CategoryDescription = styled.p`
  font-size: 15px;
  line-height: 1.5;
  color: rgba(55, 56, 60, 0.61);
  max-width: 90%;
`;

const ArrowIcon = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
`;

const ViewAllButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 0 auto;
  background-color: transparent;
  border: none;
  color: #448181;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RecommendedSection = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: 80px 20px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 60px 20px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 40px 20px;
  }
`;

const CoursesList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const CourseCard = styled.div`
  background-color: #FFFFFF;
  border: 1px solid rgba(112, 115, 124, 0.16);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  }
`;

const CourseImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CourseContent = styled.div`
  padding: 20px;
`;

const CourseCategory = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #448181;
  margin-bottom: 8px;
`;

const CourseTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #171719;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.7em;
`;

const CourseInstructor = styled.p`
  font-size: 14px;
  color: rgba(55, 56, 60, 0.88);
  margin-bottom: 16px;
`;

const CourseInfo = styled.div`
  display: flex;
  gap: 16px;
`;

const CourseRating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: rgba(55, 56, 60, 0.88);
`;

const CourseLength = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  color: rgba(55, 56, 60, 0.61);
`;

const CtaSection = styled.section`
  background-color: #EFF8F8;
  padding: 80px 20px;
  margin-top: 40px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 60px 20px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 40px 20px;
  }
`;

const CtaContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`;

const CtaText = styled.div`
  flex: 1;
`;

const CtaTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #171719;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 28px;
  }
`;

const CtaDescription = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: rgba(55, 56, 60, 0.88);
  max-width: 600px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 16px;
  }
`;

const CtaButton = styled(PrimaryButton)`
  min-width: 180px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100%;
    max-width: 300px;
  }
`;

export default Home;