import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { RootState } from '../store';
import { fetchCourses } from '../store/slices/courseSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, categories, loading } = useSelector((state: RootState) => state.course);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // 인기 강의 (최대 4개)
  const popularCourses = courses
    .slice()
    .sort((a, b) => b.studentsCount - a.studentsCount)
    .slice(0, 4);

  // 최근 추가된 강의 (최대 4개)
  const recentCourses = courses
    .slice()
    .sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime())
    .slice(0, 4);

  return (
    <Layout>
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            미래를 위한 학습,<br />
            투비닥터 캠퍼스와 함께하세요
          </HeroTitle>
          <HeroSubtitle>
            전문가와 함께하는 고품질 온라인 강의로 언제 어디서나 성장하세요.
          </HeroSubtitle>
          <HeroActions>
            <Button size="large" onClick={() => navigate('/courses')}>
              강의 둘러보기
            </Button>
            <Button size="large" variant="outline" onClick={() => navigate('/signup')}>
              무료 회원가입
            </Button>
          </HeroActions>
        </HeroContent>
        <HeroImageContainer>
          <HeroImage src="/hero-image.jpg" alt="투비닥터 캠퍼스 학습 장면" />
        </HeroImageContainer>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>투비닥터 캠퍼스의 특별함</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>🎓</FeatureIcon>
            <FeatureTitle>전문가의 지식</FeatureTitle>
            <FeatureDescription>
              각 분야 최고의 전문가들이 직접 제작한 체계적인 커리큘럼을 제공합니다.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>🔄</FeatureIcon>
            <FeatureTitle>유연한 학습</FeatureTitle>
            <FeatureDescription>
              언제 어디서나 자유롭게 접속하여 개인 일정에 맞게 학습할 수 있습니다.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>💬</FeatureIcon>
            <FeatureTitle>커뮤니티 지원</FeatureTitle>
            <FeatureDescription>
              수강생들과 강사들이 함께하는 활발한 커뮤니티로 궁금증을 해결하세요.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard>
            <FeatureIcon>📱</FeatureIcon>
            <FeatureTitle>모바일 최적화</FeatureTitle>
            <FeatureDescription>
              스마트폰, 태블릿 등 다양한 기기에서 최적화된 학습 경험을 제공합니다.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <PopularCoursesSection>
        <SectionHeader>
          <SectionTitle>인기 강의</SectionTitle>
          <Button variant="text" onClick={() => navigate('/courses')}>
            모두 보기 →
          </Button>
        </SectionHeader>
        <CoursesGrid>
          {loading ? (
            <p>강의를 불러오는 중입니다...</p>
          ) : (
            popularCourses.map((course) => (
              <CourseCard
                key={course.id}
                variant="elevated"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <CourseImage src={course.thumbnailUrl} alt={course.title} />
                <CourseContent>
                  <CourseCategory>{course.category}</CourseCategory>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseInstructor>{course.instructor}</CourseInstructor>
                  <CourseDetails>
                    <CourseStat>⭐ {course.rating.toFixed(1)}</CourseStat>
                    <CourseStat>👨‍👩‍👧‍👦 {course.studentsCount}명</CourseStat>
                    <CourseStat>⏱️ {Math.floor(course.duration / 60)}시간</CourseStat>
                  </CourseDetails>
                  <CoursePrice>
                    {course.discount ? (
                      <>
                        <OriginalPrice>{course.price.toLocaleString()}원</OriginalPrice>
                        <span>{Math.round(course.price * (1 - course.discount)).toLocaleString()}원</span>
                      </>
                    ) : (
                      <span>{course.price.toLocaleString()}원</span>
                    )}
                  </CoursePrice>
                </CourseContent>
              </CourseCard>
            ))
          )}
        </CoursesGrid>
      </PopularCoursesSection>

      <CategoriesSection>
        <SectionTitle>카테고리별 탐색</SectionTitle>
        <CategoriesGrid>
          {categories.map((category) => (
            <CategoryCard
              key={category}
              variant="outlined"
              onClick={() => navigate(`/courses?category=${category}`)}
            >
              <CategoryName>{category}</CategoryName>
              <CategoryCount>
                {courses.filter((course) => course.category === category).length}개 강의
              </CategoryCount>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </CategoriesSection>

      <RecentCoursesSection>
        <SectionHeader>
          <SectionTitle>최근 추가된 강의</SectionTitle>
          <Button variant="text" onClick={() => navigate('/courses')}>
            모두 보기 →
          </Button>
        </SectionHeader>
        <CoursesGrid>
          {loading ? (
            <p>강의를 불러오는 중입니다...</p>
          ) : (
            recentCourses.map((course) => (
              <CourseCard
                key={course.id}
                variant="elevated"
                onClick={() => navigate(`/courses/${course.id}`)}
              >
                <CourseImage src={course.thumbnailUrl} alt={course.title} />
                <CourseContent>
                  <CourseCategory>{course.category}</CourseCategory>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseInstructor>{course.instructor}</CourseInstructor>
                  <CourseDetails>
                    <CourseStat>⭐ {course.rating.toFixed(1)}</CourseStat>
                    <CourseStat>👨‍👩‍👧‍👦 {course.studentsCount}명</CourseStat>
                    <CourseStat>⏱️ {Math.floor(course.duration / 60)}시간</CourseStat>
                  </CourseDetails>
                  <CoursePrice>
                    {course.discount ? (
                      <>
                        <OriginalPrice>{course.price.toLocaleString()}원</OriginalPrice>
                        <span>{Math.round(course.price * (1 - course.discount)).toLocaleString()}원</span>
                      </>
                    ) : (
                      <span>{course.price.toLocaleString()}원</span>
                    )}
                  </CoursePrice>
                </CourseContent>
              </CourseCard>
            ))
          )}
        </CoursesGrid>
      </RecentCoursesSection>

      <CtaSection>
        <CtaContent>
          <CtaTitle>지금 시작해보세요</CtaTitle>
          <CtaDescription>
            투비닥터 캠퍼스는 언제나 여러분의 학습을 지원합니다.
            지금 바로 시작하고 성장의 여정에 동참하세요.
          </CtaDescription>
          <CtaButtons>
            <Button size="large" onClick={() => navigate('/signup')}>
              무료 회원가입
            </Button>
            <Button size="large" variant="outline" onClick={() => navigate('/courses')}>
              강의 둘러보기
            </Button>
          </CtaButtons>
        </CtaContent>
      </CtaSection>
    </Layout>
  );
};

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  flex: 1;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.2;
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.5;
`;

const HeroActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const HeroImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeroImage = styled.img`
  max-width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const FeaturesSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  height: 100%;
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

const PopularCoursesSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const CourseCard = styled(Card)`
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.fast};
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.large};
  }
`;

const CourseImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const CourseContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const CourseCategory = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CourseTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.8em;
`;

const CourseInstructor = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CourseDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CourseStat = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textLight};
  display: flex;
  align-items: center;
`;

const CoursePrice = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const OriginalPrice = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: line-through;
`;

const CategoriesSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const CategoryName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const CategoryCount = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const RecentCoursesSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const CtaSection = styled.section`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: ${({ theme }) => theme.spacing.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CtaContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const CtaTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const CtaDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: 1.5;
`;

const CtaButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

export default Home;