import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const ClassRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const chapterParam = searchParams.get('chapter');
  
  const [activeTab, setActiveTab] = useState<'lecture' | 'notes' | 'resources' | 'qa'>('lecture');
  const [activeChapter, setActiveChapter] = useState<number>(chapterParam ? parseInt(chapterParam) : 1);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  
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
    chapters: [
      { 
        id: 1, 
        title: "제1강. 왜 연구가 필요한가?", 
        duration: "45:00",
        videoUrl: "https://player.vimeo.com/video/123456789",
        progress: 100, // 퍼센트
        notes: "이 강의에서는 의학 연구의 중요성과 기본 개념을 다룹니다. 연구 질문을 설정하는 방법과 적절한 연구 방법론을 선택하는 방법에 대해 배우게 됩니다.\n\n주요 내용:\n- 연구의 필요성\n- 연구 질문 설정하기\n- 연구 설계의 기본 원칙"
      },
      { 
        id: 2, 
        title: "제2강. ChatGPT 연구에서 활용하기", 
        duration: "52:00",
        videoUrl: "https://player.vimeo.com/video/123456790",
        progress: 75,
        notes: "이 챕터에서는 ChatGPT를 연구에 활용하는 방법에 대해 알아봅니다. 연구 주제 선정, 문헌 검토, 가설 설정 등에 ChatGPT를 어떻게 활용할 수 있는지 실습을 통해 배워봅니다.\n\n주요 내용:\n- ChatGPT의 효과적인 프롬프트 작성법\n- 연구 주제 탐색 및 선정\n- 문헌 검토 과정 자동화"
      },
      { 
        id: 3, 
        title: "제3강. ChatGPT 데이터 분석과 시각화", 
        duration: "48:00",
        videoUrl: "https://player.vimeo.com/video/123456791",
        progress: 30,
        notes: "이 챕터에서는 ChatGPT를 활용한 데이터 분석 방법과 시각화 기법을 배웁니다. 통계 분석 코드 생성, 데이터 시각화 스크립트 작성 방법을 실습합니다.\n\n주요 내용:\n- ChatGPT로 R과 Python 코드 생성하기\n- 데이터 분석 및 통계 처리\n- 데이터 시각화 및 해석"
      },
      { 
        id: 4, 
        title: "제4강. 논문 쓰기 A-Z", 
        duration: "60:00",
        videoUrl: "https://player.vimeo.com/video/123456792",
        progress: 0,
        notes: "이 챕터에서는 의학 논문 작성의 전체 과정을 배웁니다. ChatGPT를 활용하여 초안 작성, 교정, 참고문헌 관리 등을 효율적으로 수행하는 방법을 다룹니다.\n\n주요 내용:\n- 논문의 구조와 각 섹션 작성법\n- ChatGPT로 초안 작성하기\n- 논문 교정 및 리뷰 대응 방법"
      }
    ],
    resources: [
      { id: 1, title: "연구 방법론 가이드 PDF", type: "pdf", url: "#", size: "2.4MB" },
      { id: 2, title: "ChatGPT 프롬프트 템플릿", type: "doc", url: "#", size: "520KB" },
      { id: 3, title: "논문 작성 체크리스트", type: "xlsx", url: "#", size: "320KB" }
    ],
    qas: [
      { 
        id: 1, 
        question: "ChatGPT로 생성한 코드를 논문에 사용해도 괜찮을까요?",
        answer: "ChatGPT로 생성한 코드를 논문에 사용하는 것은 일반적으로 괜찮습니다. 그러나 반드시 코드를 검증하고 결과가 정확한지 확인해야 합니다. 또한 방법론 섹션에서 ChatGPT를 사용했다는 사실을 언급하는 것이 좋습니다. 많은 학술지에서 AI 도구 사용에 대한 공개를 요구하고 있습니다.",
        author: "이준서 교수",
        date: "2023-08-15"
      },
      { 
        id: 2, 
        question: "논문 리뷰어들이 ChatGPT로 작성한 논문을 알아볼 수 있나요?",
        answer: "경험 많은 리뷰어들은 때때로 AI가 생성한 텍스트의 패턴을 인식할 수 있습니다. 그러나 중요한 것은 AI의 사용 여부가 아니라 내용의 질입니다. ChatGPT를 사용하더라도 생성된 내용을 비판적으로 검토하고, 사실 확인을 하며, 자신의 스타일과 전문 지식을 반영하여 편집하는 것이 중요합니다. 또한 AI 사용을 명시적으로 언급하는 것이 윤리적입니다.",
        author: "이준서 교수",
        date: "2023-09-02"
      }
    ]
  };

  // 현재 활성화된 챕터 정보
  const currentChapter = classData.chapters.find(chapter => chapter.id === activeChapter) || classData.chapters[0];
  
  // URL 파라미터 업데이트 (챕터 변경 시)
  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('chapter', activeChapter.toString());
    navigate(`${location.pathname}?${newSearchParams.toString()}`, { replace: true });
  }, [activeChapter, location.pathname, location.search, navigate]);

  // 다음 챕터로 이동
  const goToNextChapter = () => {
    const nextChapterId = activeChapter + 1;
    if (nextChapterId <= classData.chapters.length) {
      setActiveChapter(nextChapterId);
    }
  };

  // 이전 챕터로 이동
  const goToPrevChapter = () => {
    const prevChapterId = activeChapter - 1;
    if (prevChapterId >= 1) {
      setActiveChapter(prevChapterId);
    }
  };

  return (
    <Layout hideFooter>
      <Container>
        {/* 상단 헤더 */}
        <Header>
          <HeaderLeft>
            <BackButton onClick={() => navigate(`/classes/detail/${id}`)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              돌아가기
            </BackButton>
            <CourseTitle>{classData.title}</CourseTitle>
          </HeaderLeft>
          <HeaderRight>
            <ToggleSidebarButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M5 12L11 18M5 12L11 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </ToggleSidebarButton>
          </HeaderRight>
        </Header>
        
        {/* 메인 콘텐츠 */}
        <Content>
          <MainContent isSidebarOpen={isSidebarOpen}>
            {/* 비디오 */}
            <VideoContainer>
              <iframe 
                src={currentChapter.videoUrl} 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
                title={currentChapter.title}
              ></iframe>
            </VideoContainer>
            
            {/* 비디오 컨트롤 */}
            <VideoControls>
              <ChapterNavigation>
                <ChapterButton 
                  onClick={goToPrevChapter} 
                  disabled={activeChapter === 1}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  이전 강의
                </ChapterButton>
                <ChapterButton 
                  onClick={goToNextChapter} 
                  disabled={activeChapter === classData.chapters.length}
                >
                  다음 강의
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </ChapterButton>
              </ChapterNavigation>
            </VideoControls>
            
            {/* 탭 메뉴 */}
            <TabMenu>
              <Tab 
                active={activeTab === 'lecture'} 
                onClick={() => setActiveTab('lecture')}
              >
                강의 내용
              </Tab>
              <Tab 
                active={activeTab === 'notes'} 
                onClick={() => setActiveTab('notes')}
              >
                강의 노트
              </Tab>
              <Tab 
                active={activeTab === 'resources'} 
                onClick={() => setActiveTab('resources')}
              >
                학습 자료
              </Tab>
              <Tab 
                active={activeTab === 'qa'} 
                onClick={() => setActiveTab('qa')}
              >
                Q&A
              </Tab>
            </TabMenu>
            
            {/* 탭 콘텐츠 */}
            <TabContent>
              {activeTab === 'lecture' && (
                <LectureContent>
                  <ChapterTitle>{currentChapter.title}</ChapterTitle>
                  <ChapterInfos>
                    <ChapterInfo>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 5V10L13.3333 11.6667M18.3333 10C18.3333 14.6024 14.6024 18.3333 10 18.3333C5.39763 18.3333 1.66667 14.6024 1.66667 10C1.66667 5.39763 5.39763 1.66667 10 1.66667C14.6024 1.66667 18.3333 5.39763 18.3333 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {currentChapter.duration}
                    </ChapterInfo>
                    <ChapterInfo>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.99984 5.83366V10.0003L12.4998 12.5003M17.4998 10.0003C17.4998 14.1424 14.1419 17.5003 9.99984 17.5003C5.85779 17.5003 2.49984 14.1424 2.49984 10.0003C2.49984 5.85824 5.85779 2.50033 9.99984 2.50033C14.1419 2.50033 17.4998 5.85824 17.4998 10.0003Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {currentChapter.progress}% 완료
                    </ChapterInfo>
                  </ChapterInfos>
                  <ChapterDescription>
                    이 강의에서는 의학 연구의 기본 개념과 ChatGPT를 활용한 연구 방법론에 대해 배웁니다. 
                    연구 주제 선정부터 데이터 분석, 논문 작성까지 전체 과정을 다룹니다.
                  </ChapterDescription>
                </LectureContent>
              )}
              
              {activeTab === 'notes' && (
                <NotesContent>
                  <NotesTitle>강의 노트</NotesTitle>
                  <Notes>{currentChapter.notes}</Notes>
                </NotesContent>
              )}
              
              {activeTab === 'resources' && (
                <ResourcesContent>
                  <ResourcesTitle>학습 자료</ResourcesTitle>
                  <ResourcesList>
                    {classData.resources.map(resource => (
                      <ResourceItem key={resource.id}>
                        <ResourceIcon type={resource.type}>
                          {resource.type === 'pdf' && 'PDF'}
                          {resource.type === 'doc' && 'DOC'}
                          {resource.type === 'xlsx' && 'XLS'}
                        </ResourceIcon>
                        <ResourceInfo>
                          <ResourceName>{resource.title}</ResourceName>
                          <ResourceSize>{resource.size}</ResourceSize>
                        </ResourceInfo>
                        <ResourceDownload href={resource.url} target="_blank" rel="noopener noreferrer">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.66699 10L10.0003 13.3333M10.0003 13.3333L13.3337 10M10.0003 13.3333V5M16.667 15V16.6667C16.667 17.1269 16.4914 17.5681 16.1788 17.8907C15.8663 18.2133 15.4349 18.3889 14.9837 18.3889H5.01699C4.56577 18.3889 4.13439 18.2133 3.82183 17.8907C3.50927 17.5681 3.33366 17.1269 3.33366 16.6667V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </ResourceDownload>
                      </ResourceItem>
                    ))}
                  </ResourcesList>
                </ResourcesContent>
              )}
              
              {activeTab === 'qa' && (
                <QaContent>
                  <QaTitle>질문 & 답변</QaTitle>
                  <QaList>
                    {classData.qas.map(qa => (
                      <QaItem key={qa.id}>
                        <QaQuestion>
                          <QaQuestionText>Q. {qa.question}</QaQuestionText>
                        </QaQuestion>
                        <QaAnswer>
                          <QaAnswerText>A. {qa.answer}</QaAnswerText>
                          <QaAnswerInfo>
                            {qa.author} • {qa.date}
                          </QaAnswerInfo>
                        </QaAnswer>
                      </QaItem>
                    ))}
                  </QaList>
                  <AskQuestionButton>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 6.66699V13.3337M6.66667 10.0003H13.3333M10 18.3337C14.6024 18.3337 18.3333 14.6027 18.3333 10.0003C18.3333 5.39795 14.6024 1.66699 10 1.66699C5.39763 1.66699 1.66667 5.39795 1.66667 10.0003C1.66667 14.6027 5.39763 18.3337 10 18.3337Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    질문하기
                  </AskQuestionButton>
                </QaContent>
              )}
            </TabContent>
          </MainContent>
          
          {/* 사이드바 */}
          {isSidebarOpen && (
            <Sidebar>
              <SidebarTitle>강의 커리큘럼</SidebarTitle>
              <ChaptersList>
                {classData.chapters.map(chapter => (
                  <ChaptersItem 
                    key={chapter.id} 
                    active={chapter.id === activeChapter}
                    onClick={() => setActiveChapter(chapter.id)}
                  >
                    <ChaptersInfo>
                      <ChaptersTitle>{chapter.title}</ChaptersTitle>
                      <ChaptersDuration>{chapter.duration}</ChaptersDuration>
                    </ChaptersInfo>
                    <ChaptersProgress>
                      <ChaptersProgressBar progress={chapter.progress} />
                    </ChaptersProgress>
                  </ChaptersItem>
                ))}
              </ChaptersList>
            </Sidebar>
          )}
        </Content>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CourseTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ToggleSidebarButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const MainContent = styled.div<{ isSidebarOpen: boolean }>`
  flex: 1;
  padding: 24px;
  max-width: ${({ isSidebarOpen }) => isSidebarOpen ? 'calc(100% - 320px)' : '100%'};
  overflow-y: auto;
  
  @media (max-width: 1024px) {
    max-width: ${({ isSidebarOpen }) => isSidebarOpen ? 'calc(100% - 280px)' : '100%'};
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 16px;
  }
`;

const VideoContainer = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
  
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const VideoControls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const ChapterNavigation = styled.div`
  display: flex;
  gap: 16px;
`;

const ChapterButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: ${({ disabled, theme }) => disabled ? theme.colors.textLighter : theme.colors.textSecondary};
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  
  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const TabMenu = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 24px;
`;

const Tab = styled.button<{ active: boolean }>`
  padding: 16px 24px;
  background: none;
  border: none;
  border-bottom: 2px solid ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  font-size: 16px;
  font-weight: ${({ active }) => active ? '600' : '400'};
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 14px;
  }
`;

const TabContent = styled.div`
  padding: 16px 0;
`;

const LectureContent = styled.div``;

const ChapterTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const ChapterInfos = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
`;

const ChapterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ChapterDescription = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const NotesContent = styled.div``;

const NotesTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Notes = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  white-space: pre-line;
`;

const ResourcesContent = styled.div``;

const ResourcesTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const ResourcesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ResourceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border-radius: 8px;
`;

const ResourceIcon = styled.div<{ type: string }>`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background-color: ${({ type }) => 
    type === 'pdf' ? '#E53935' : 
    type === 'doc' ? '#1E88E5' : 
    type === 'xlsx' ? '#43A047' : '#757575'
  };
`;

const ResourceInfo = styled.div`
  flex: 1;
`;

const ResourceName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 4px 0;
  color: ${({ theme }) => theme.colors.text};
`;

const ResourceSize = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const ResourceDownload = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  color: ${({ theme }) => theme.colors.textSecondary};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const QaContent = styled.div``;

const QaTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const QaList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
`;

const QaItem = styled.div`
  border-radius: 12px;
  overflow: hidden;
`;

const QaQuestion = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  padding: 20px;
  border-radius: 12px 12px 0 0;
`;

const QaQuestionText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const QaAnswer = styled.div`
  background-color: ${({ theme }) => `rgba(68, 129, 129, 0.1)`};
  padding: 20px;
  border-radius: 0 0 12px 12px;
`;

const QaAnswerText = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 12px 0;
`;

const QaAnswerInfo = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0;
`;

const AskQuestionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Sidebar = styled.aside`
  width: 320px;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  overflow-y: auto;
  
  @media (max-width: 1024px) {
    width: 280px;
  }
  
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    z-index: 1000;
    box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  }
`;

const SidebarTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  padding: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
`;

const ChaptersList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChaptersItem = styled.div<{ active: boolean }>`
  padding: 16px 24px;
  cursor: pointer;
  border-left: 4px solid ${({ active, theme }) => active ? theme.colors.primary : 'transparent'};
  background-color: ${({ active, theme }) => active ? 'white' : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ active }) => active ? 'white' : 'rgba(0, 0, 0, 0.03)'};
  }
`;

const ChaptersInfo = styled.div`
  margin-bottom: 12px;
`;

const ChaptersTitle = styled.h3`
  font-size: 15px;
  font-weight: 500;
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.colors.text};
`;

const ChaptersDuration = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const ChaptersProgress = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  overflow: hidden;
`;

const ChaptersProgressBar = styled.div<{ progress: number }>`
  width: ${({ progress }) => `${progress}%`};
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 2px;
`;

export default ClassRoom;