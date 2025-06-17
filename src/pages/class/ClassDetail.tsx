import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const ClassDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // 클래스 정보 (실제로는 API에서 가져올 데이터)
  const classData = {
    id: Number(id || 1),
    title: "휴학 의대생과 사직 전공의를 위한 의학연구 아카데미 : ChatGPT와 함께",
    tags: ["AI", "의학 연구", "논문 작성"],
    instructor: {
      name: "이준서",
      title: "가톨릭대학교 인천성모병원 간담췌외과 교수",
      image: "/images/instructor-placeholder.jpg"
    },
    description: `ChatGPT와 다른 AI 도구를 활용하여 의학 연구를 가속화하는 방법을 배워보세요. 
    휴학 중인 의대생이나 연구에 관심 있는 전공의를 위한 실용적인 강의입니다.
    
    연구 주제 선정부터 데이터 분석, 논문 작성까지 ChatGPT를 활용하는 전체 과정을 다룹니다.`,
    thumbnail: "/images/course-thumbnail-placeholder.jpg",
    chapters: [
      { id: 1, title: "제1강. 왜 연구가 필요한가?", duration: "45분" },
      { id: 2, title: "제2강. ChatGPT 연구에서 활용하기", duration: "52분" },
      { id: 3, title: "제3강. ChatGPT 데이터 분석과 시각화", duration: "48분" },
      { id: 4, title: "제4강. 논문 쓰기 A-Z", duration: "60분" }
    ],
    reviews: [
      { id: 1, user: "김의사", rating: 5, content: "정말 유용한 강의였습니다. 실제 연구에 바로 적용할 수 있는 팁이 많아요." },
      { id: 2, user: "박전공의", rating: 4, content: "ChatGPT를 연구에 활용하는 방법을 체계적으로 배울 수 있었습니다." }
    ],
    faq: [
      { id: 1, question: "이 강의는 누구를 위한 건가요?", answer: "의학 연구에 관심이 있는 의대생, 전공의, 의사 등 모든 의료 전문가를 위한 강의입니다." },
      { id: 2, question: "사전 지식이 필요한가요?", answer: "기본적인 의학 지식만 있으면 충분합니다. ChatGPT 사용법은 강의에서 기초부터 다룹니다." }
    ]
  };

  return (
    <Layout>
      <Container>
        <HeroSection>
          <HeroContent>
            <Breadcrumbs>
              <BreadcrumbLink to="/classes">CLASS</BreadcrumbLink>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbLink to="/classes/ai">AI</BreadcrumbLink>
            </Breadcrumbs>
            
            <Tags>
              {classData.tags.map((tag, index) => (
                <Tag key={index}>{tag}</Tag>
              ))}
            </Tags>
            
            <CourseTitle>{classData.title}</CourseTitle>
            
            <InstructorInfo>
              <InstructorName>{classData.instructor.name}</InstructorName>
              <InstructorTitle>{classData.instructor.title}</InstructorTitle>
            </InstructorInfo>
          </HeroContent>
          
          <CourseThumbnail />
        </HeroSection>
        
        <ContentSection>
          <MainContent>
            <Section>
              <SectionTitle>강의 소개</SectionTitle>
              <Description>{classData.description}</Description>
            </Section>
            
            <Section>
              <SectionTitle>커리큘럼</SectionTitle>
              <ChapterList>
                {classData.chapters.map((chapter) => (
                  <ChapterItem key={chapter.id}>
                    <ChapterInfo>
                      <ChapterTitle>{chapter.title}</ChapterTitle>
                      <ChapterDuration>{chapter.duration}</ChapterDuration>
                    </ChapterInfo>
                    <PlayButton to={`/classes/classroom/${classData.id}?chapter=${chapter.id}`}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.33301 6.66667V13.3333L13.333 10L8.33301 6.66667Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      수강하기
                    </PlayButton>
                  </ChapterItem>
                ))}
              </ChapterList>
            </Section>
            
            <Section>
              <SectionTitle>강사 소개</SectionTitle>
              <Instructor>
                <InstructorAvatar />
                <InstructorDetails>
                  <InstructorName>{classData.instructor.name}</InstructorName>
                  <InstructorTitle>{classData.instructor.title}</InstructorTitle>
                  <InstructorBio>
                    {classData.instructor.name} 교수는 의학연구 방법론과 디지털 헬스케어 분야의 전문가로, 
                    다수의 논문을 국제 저널에 발표했습니다. 현재는 가톨릭대학교 인천성모병원에서 교수로 재직 중이며,
                    의학 연구에 AI를 접목하는 방법론을 연구하고 있습니다.
                  </InstructorBio>
                </InstructorDetails>
              </Instructor>
            </Section>
            
            <Section>
              <SectionTitle>수강생 후기</SectionTitle>
              <ReviewList>
                {classData.reviews.map((review) => (
                  <ReviewItem key={review.id}>
                    <ReviewHeader>
                      <ReviewerName>{review.user}</ReviewerName>
                      <Rating>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</Rating>
                    </ReviewHeader>
                    <ReviewContent>{review.content}</ReviewContent>
                  </ReviewItem>
                ))}
              </ReviewList>
            </Section>
            
            <Section>
              <SectionTitle>자주 묻는 질문</SectionTitle>
              <FaqList>
                {classData.faq.map((faq) => (
                  <FaqItem key={faq.id}>
                    <FaqQuestion>{faq.question}</FaqQuestion>
                    <FaqAnswer>{faq.answer}</FaqAnswer>
                  </FaqItem>
                ))}
              </FaqList>
            </Section>
          </MainContent>
          
          <Sidebar>
            <SidebarCard>
              <EnrollButton to={`/classes/classroom/${classData.id}`}>
                첫 강의 무료 수강하기
              </EnrollButton>
              <ClassDetails>
                <DetailItem>
                  <DetailIcon>📚</DetailIcon>
                  <DetailText>총 {classData.chapters.length}강</DetailText>
                </DetailItem>
                <DetailItem>
                  <DetailIcon>⏱️</DetailIcon>
                  <DetailText>약 3시간 45분 강의</DetailText>
                </DetailItem>
                <DetailItem>
                  <DetailIcon>💻</DetailIcon>
                  <DetailText>모바일 및 PC에서 수강 가능</DetailText>
                </DetailItem>
                <DetailItem>
                  <DetailIcon>🔄</DetailIcon>
                  <DetailText>평생 무제한 반복 수강</DetailText>
                </DetailItem>
              </ClassDetails>
              <ShareSection>
                <ShareTitle>공유하기</ShareTitle>
                <ShareButtons>
                  <ShareButton type="button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.6663 10.0003C16.6663 5.85033 13.1497 2.33366 8.99967 2.33366C4.84967 2.33366 1.33301 5.85033 1.33301 10.0003C1.33301 13.7587 4.17134 16.9337 7.83301 17.5337V12.167H6.16634V10.0003H7.83301V8.33366C7.83301 6.49199 8.82801 5.50033 10.4997 5.50033C11.2997 5.50033 12.1663 5.66699 12.1663 5.66699V7.33366H11.258C10.358 7.33366 10.1663 7.93366 10.1663 8.50033V10.0003H12.083L11.858 12.167H10.1663V17.5337C13.828 16.9337 16.6663 13.7587 16.6663 10.0003Z" fill="currentColor"/>
                    </svg>
                  </ShareButton>
                  <ShareButton type="button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.9172 6.01667C17.8422 5.74167 17.7089 5.48333 17.5255 5.26667C17.3339 5.04167 17.1005 4.85833 16.8339 4.73333C15.4505 4.15 10.0005 4.15 10.0005 4.15C10.0005 4.15 4.55052 4.15 3.16719 4.73333C2.90052 4.85833 2.66719 5.04167 2.47552 5.26667C2.29219 5.48333 2.15885 5.74167 2.08385 6.01667C1.67552 7.99167 1.67552 11.5 1.67552 11.5C1.67552 11.5 1.67552 15.0083 2.08385 16.9833C2.15885 17.2583 2.29219 17.5167 2.47552 17.7333C2.66719 17.9583 2.90052 18.1417 3.16719 18.2667C4.55052 18.85 10.0005 18.85 10.0005 18.85C10.0005 18.85 15.4505 18.85 16.8339 18.2667C17.1005 18.1417 17.3339 17.9583 17.5255 17.7333C17.7089 17.5167 17.8422 17.2583 17.9172 16.9833C18.3255 15.0083 18.3255 11.5 18.3255 11.5C18.3255 11.5 18.3255 7.99167 17.9172 6.01667ZM8.25885 14.35V8.64167L12.9172 11.5L8.25885 14.35Z" fill="currentColor"/>
                    </svg>
                  </ShareButton>
                  <ShareButton type="button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.0003 1.66699C5.39199 1.66699 1.66699 5.39199 1.66699 10.0003C1.66699 14.1503 4.65866 17.6253 8.65866 18.2337V12.5503H6.45866V10.0003H8.65866V8.12533C8.65866 5.87533 9.94199 4.66699 12.0003 4.66699C12.9587 4.66699 13.917 4.81699 13.917 4.81699V6.94199H12.8337C11.75 6.94199 11.342 7.61699 11.342 8.33366V10.0003H13.8087L13.4587 12.5503H11.342V18.2337C15.342 17.6253 18.3337 14.1503 18.3337 10.0003C18.3337 5.39199 14.6087 1.66699 10.0003 1.66699Z" fill="currentColor"/>
                    </svg>
                  </ShareButton>
                  <ShareButton type="button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.8337 5.34163C15.8337 5.90829 15.4003 6.34163 14.8337 6.34163C14.267 6.34163 13.8337 5.90829 13.8337 5.34163C13.8337 4.77496 14.267 4.34163 14.8337 4.34163C15.4003 4.34163 15.8337 4.77496 15.8337 5.34163Z" fill="currentColor"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M10.0003 13.3333C11.8413 13.3333 13.3337 11.841 13.3337 10C13.3337 8.15907 11.8413 6.66667 10.0003 6.66667C8.15938 6.66667 6.66699 8.15907 6.66699 10C6.66699 11.841 8.15938 13.3333 10.0003 13.3333ZM10.0003 11.6667C10.9208 11.6667 11.667 10.9205 11.667 10C11.667 9.07957 10.9208 8.33333 10.0003 8.33333C9.07985 8.33333 8.33366 9.07957 8.33366 10C8.33366 10.9205 9.07985 11.6667 10.0003 11.6667Z" fill="currentColor"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M6.31699 3.92461C7.46649 3.80118 7.91891 3.78332 10.0003 3.78332C12.0817 3.78332 12.5341 3.80118 13.6837 3.92461C14.7424 4.03949 15.4125 4.24102 15.9834 4.52589C16.5835 4.81993 17.0776 5.21488 17.4583 5.69984C17.839 6.18481 18.2336 6.75002 18.5283 7.50016C18.8126 8.14661 19.0142 8.89051 19.1297 10.0623C19.2531 11.3307 19.267 11.8236 19.267 14.0833C19.267 16.3431 19.2531 16.836 19.1297 18.1044C19.0142 19.2762 18.8126 20.0201 18.5283 20.6665C18.2336 21.4167 17.839 21.9819 17.4583 22.4668C16.9734 22.8474 16.5082 23.242 15.9834 23.5407C15.4125 23.8255 14.7424 24.0271 13.6836 24.1419C12.4152 24.2653 11.9223 24.2792 10.0003 24.2792C8.07839 24.2792 7.58546 24.2653 6.31699 24.1419C5.14526 24.0271 4.40136 23.8255 3.75491 23.5407C3.23013 23.242 2.76494 22.8474 2.37998 22.4668C1.99927 21.9819 1.60471 21.4167 1.30995 20.6665C1.02508 20.0201 0.823551 19.2762 0.708091 18.1044C0.58474 16.836 0.570879 16.3431 0.570879 14.0833C0.570879 11.8236 0.58474 11.3307 0.708091 10.0623C0.823551 8.89055 1.02508 8.14661 1.30995 7.50016C1.60471 6.75002 1.99927 6.18481 2.37998 5.69984C2.76494 5.21488 3.23013 4.81993 3.75491 4.52589C4.40136 4.24102 5.14526 4.03949 6.31699 3.92461ZM13.562 5.57461C12.4373 5.45333 12.0222 5.44999 10.0003 5.44999C7.97839 5.44999 7.56331 5.45333 6.43866 5.57461C5.4133 5.68349 4.85814 5.87675 4.48482 6.04032C3.95982 6.26849 3.57991 6.53766 3.18532 6.93225C2.79073 7.32683 2.52156 7.70674 2.29339 8.23174C2.12982 8.60506 1.93656 9.16022 1.82768 10.1856C1.70641 11.3102 1.70305 11.7253 1.70305 13.7473C1.70305 15.7692 1.70641 16.1843 1.82768 17.309C1.93656 18.3344 2.12982 18.8895 2.29339 19.2628C2.52156 19.7878 2.79073 20.1677 3.18532 20.5623C3.57991 20.9569 3.95982 21.2261 4.48482 21.4543C4.85814 21.6178 5.4133 21.8111 6.43866 21.92C7.56331 22.0413 7.97813 22.0446 10.0003 22.0446C12.0226 22.0446 12.4374 22.0413 13.562 21.92C14.5874 21.8111 15.1426 21.6178 15.5159 21.4543C16.0409 21.2261 16.4208 20.9569 16.8154 20.5623C17.21 20.1677 17.4791 19.7878 17.7073 19.2628C17.8709 18.8895 18.0641 18.3344 18.173 17.309C18.2943 16.1843 18.2976 15.7692 18.2976 13.7473C18.2976 11.7253 18.2943 11.3102 18.173 10.1856C18.0641 9.16022 17.8709 8.60506 17.7073 8.23174C17.4791 7.70674 17.21 7.32683 16.8154 6.93225C16.4208 6.53766 16.0409 6.26849 15.5159 6.04032C15.1426 5.87675 14.5874 5.68349 13.562 5.57461Z" fill="currentColor"/>
                    </svg>
                  </ShareButton>
                </ShareButtons>
              </ShareSection>
            </SidebarCard>
            
            <RelatedClassesCard>
              <RelatedClassesTitle>관련 강의</RelatedClassesTitle>
              <RelatedClassesList>
                <RelatedClassItem to="/classes/detail/2">
                  <RelatedClassThumbnail />
                  <RelatedClassInfo>
                    <RelatedClassName>의사들을 위한 데이터 분석 기초</RelatedClassName>
                    <RelatedClassInstructor>김교수</RelatedClassInstructor>
                  </RelatedClassInfo>
                </RelatedClassItem>
                <RelatedClassItem to="/classes/detail/3">
                  <RelatedClassThumbnail />
                  <RelatedClassInfo>
                    <RelatedClassName>의학논문 작성 실전 가이드</RelatedClassName>
                    <RelatedClassInstructor>박교수</RelatedClassInstructor>
                  </RelatedClassInfo>
                </RelatedClassItem>
              </RelatedClassesList>
            </RelatedClassesCard>
          </Sidebar>
        </ContentSection>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  width: 100%;
  padding-bottom: 100px;
`;

const HeroSection = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  padding: 60px 0;
  margin-bottom: 60px;
  display: flex;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px;
  
  @media (max-width: 1024px) {
    padding: 0 40px;
    margin-bottom: 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const BreadcrumbLink = styled(Link)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BreadcrumbSeparator = styled.span`
  margin: 0 8px;
  color: ${({ theme }) => theme.colors.textLight};
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tag = styled.span`
  background-color: rgba(68, 129, 129, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 20px;
`;

const CourseTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 20px 0;
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const InstructorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
`;

const InstructorName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const InstructorTitle = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CourseThumbnail = styled.div`
  width: 100%;
  max-width: 600px;
  height: 330px;
  background-color: #E5E5E5;
  border-radius: 12px;
  overflow: hidden;
  margin: 0 80px;
  
  @media (max-width: 1024px) {
    margin: 0 40px;
  }
  
  @media (max-width: 768px) {
    margin: 0 20px;
    height: 220px;
  }
`;

const ContentSection = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px;
  display: flex;
  gap: 80px;
  
  @media (max-width: 1024px) {
    padding: 0 40px;
    gap: 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 1;
`;

const Section = styled.div`
  margin-bottom: 60px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: pre-line;
`;

const ChapterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ChapterItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
`;

const ChapterInfo = styled.div`
  flex: 1;
`;

const ChapterTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.colors.text};
`;

const ChapterDuration = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const PlayButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Instructor = styled.div`
  display: flex;
  gap: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InstructorAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #E5E5E5;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const InstructorDetails = styled.div`
  flex: 1;
`;

const InstructorBio = styled.p`
  margin-top: 12px;
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ReviewItem = styled.div`
  padding: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const ReviewerName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const Rating = styled.div`
  font-size: 14px;
  color: #FFB800;
`;

const ReviewContent = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FaqItem = styled.div`
  padding: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
`;

const FaqQuestion = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: ${({ theme }) => theme.colors.text};
`;

const FaqAnswer = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const Sidebar = styled.aside`
  width: 360px;
  flex-shrink: 0;
  
  @media (max-width: 1024px) {
    width: 320px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SidebarCard = styled.div`
  position: sticky;
  top: 100px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
  margin-bottom: 24px;
`;

const EnrollButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  text-align: center;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 24px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ClassDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DetailIcon = styled.span`
  font-size: 18px;
`;

const DetailText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ShareSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 24px;
`;

const ShareTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: ${({ theme }) => theme.colors.text};
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const RelatedClassesCard = styled.div`
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const RelatedClassesTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;
  color: ${({ theme }) => theme.colors.text};
`;

const RelatedClassesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const RelatedClassItem = styled(Link)`
  display: flex;
  gap: 12px;
  text-decoration: none;
`;

const RelatedClassThumbnail = styled.div`
  width: 80px;
  height: 60px;
  background-color: #E5E5E5;
  border-radius: 6px;
  flex-shrink: 0;
`;

const RelatedClassInfo = styled.div`
  flex: 1;
`;

const RelatedClassName = styled.h4`
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 4px 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

const RelatedClassInstructor = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

export default ClassDetail;