import React, { useState, useRef, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { ReactComponent as ChevronDownIcon } from '../../../assets/images/chevron-down.svg';

interface Question {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  answers: number;
  views: number;
  images?: string[]; // 첨부된 이미지들
}

const StreamingQnA: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionContent, setQuestionContent] = useState('');
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [submittedQuestions, setSubmittedQuestions] = useState<Question[]>([]);
  const questionsListRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const questions: Question[] = useMemo(() => [
    ...submittedQuestions, // 제출된 질문들을 먼저 표시
    {
      id: 1,
      title: '제목',
      content: '그리고는 구슬 같은 눈물이 글썽글썽 눈에 괴는 걸보고, 그만 나까지도 울고 싶어지는 것이었습니다. 그렇게 손으로 턱을 괸 채 염소 모피를 두르고 있는 모습은, 그대로 귀여운 천국의 목자였습니다. 그런데, 지금 그 아가씨가 바로 내 눈앞에 와 있는 것입니다.',
      author: '김*닥',
      date: '2025년 0월 0일 00:00',
      answers: 0,
      views: 0
    },
    {
      id: 2,
      title: '제목',
      content: '그리고는 구슬 같은 눈물이 글썽글썽 눈에 괴는 걸보고, 그만 나까지도 울고 싶어지는 것이었습니다. 그렇게 손으로 턱을 괸 채 염소 모피를 두르고 있는 모습은, 그대로 귀여운 천국의 목자였습니다. 그런데, 지금 그 아가씨가 바로 내 눈앞에 와 있는 것입니다.',
      author: '김*닥',
      date: '2025년 0월 0일 00:00',
      answers: 0,
      views: 0
    },
    {
      id: 3,
      title: '제목',
      content: '그리고는 구슬 같은 눈물이 글썽글썽 눈에 괴는 걸보고, 그만 나까지도 울고 싶어지는 것이었습니다. 그렇게 손으로 턱을 괸 채 염소 모피를 두르고 있는 모습은, 그대로 귀여운 천국의 목자였습니다. 그런데, 지금 그 아가씨가 바로 내 눈앞에 와 있는 것입니다.',
      author: '김*닥',
      date: '2025년 0월 0일 00:00',
      answers: 0,
      views: 0
    },
    {
      id: 4,
      title: '제목',
      content: '그리고는 구슬 같은 눈물이 글썽글썽 눈에 괴는 걸보고, 그만 나까지도 울고 싶어지는 것이었습니다. 그렇게 손으로 턱을 괸 채 염소 모피를 두르고 있는 모습은, 그대로 귀여운 천국의 목자였습니다. 그런데, 지금 그 아가씨가 바로 내 눈앞에 와 있는 것입니다.',
      author: '김*닥',
      date: '2025년 0월 0일 00:00',
      answers: 0,
      views: 0
    },
    {
      id: 5,
      title: '제목',
      content: '그리고는 구슬 같은 눈물이 글썽글썽 눈에 괴는 걸보고, 그만 나까지도 울고 싶어지는 것이었습니다. 그렇게 손으로 턱을 괸 채 염소 모피를 두르고 있는 모습은, 그대로 귀여운 천국의 목자였습니다. 그런데, 지금 그 아가씨가 바로 내 눈앞에 와 있는 것입니다.',
      author: '김*닥',
      date: '2025년 0월 0일 00:00',
      answers: 0,
      views: 0
    },
    {
      id: 6,
      title: '제목',
      content: '그리고는 구슬 같은 눈물이 글썽글썽 눈에 괴는 걸보고, 그만 나까지도 울고 싶어지는 것이었습니다. 그렇게 손으로 턱을 괸 채 염소 모피를 두르고 있는 모습은, 그대로 귀여운 천국의 목자였습니다. 그런데, 지금 그 아가씨가 바로 내 눈앞에 와 있는 것입니다.',
      author: '김*닥',
      date: '2025년 0월 0일 00:00',
      answers: 0,
      views: 0
    }
  ], [submittedQuestions]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleQuestionSubmit = () => {
    if (questionTitle.trim() && questionContent.trim()) {
      // 현재 시간 생성
      const now = new Date();
      const dateString = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      // 이미지 URL 생성 (실제로는 서버에 업로드 후 URL 받아야 함)
      const imageUrls = selectedImages.map((image, index) => 
        URL.createObjectURL(image) // 임시 로컬 URL 생성
      );
      
      // 새 질문 객체 생성
      const newQuestion: Question = {
        id: Date.now(), // 임시 ID (실제로는 서버에서 생성)
        title: questionTitle,
        content: questionContent,
        author: '나', // 현재 사용자
        date: dateString,
        answers: 0,
        views: 0,
        images: imageUrls.length > 0 ? imageUrls : undefined
      };
      
      // FormData 생성
      const formData = new FormData();
      formData.append('title', questionTitle);
      formData.append('content', questionContent);
      
      // 이미지 파일들 추가
      selectedImages.forEach((image, index) => {
        formData.append(`image_${index}`, image);
      });
      
      // FormData 내용 콘솔에 출력
      console.log('=== 질문 제출 데이터 ===');
      console.log('제목:', questionTitle);
      console.log('내용:', questionContent);
      console.log('첨부된 이미지 수:', selectedImages.length);
      
      // FormData의 모든 항목 출력 (TypeScript 호환)
      const formEntries = Array.from(formData.entries());
      formEntries.forEach(([key, value]) => {
        if (value instanceof File) {
          console.log(`${key}:`, value.name, `(${value.size} bytes)`);
        } else {
          console.log(`${key}:`, value);
        }
      });
      
      // 제출된 질문을 목록에 추가
      setSubmittedQuestions(prev => [newQuestion, ...prev]);
      
      // Alert로도 표시
      alert(`제목: ${questionTitle}\n내용: ${questionContent}\n첨부 이미지: ${selectedImages.length}개`);
      
      // 폼 초기화
      setQuestionTitle('');
      setQuestionContent('');
      setSelectedImages([]);
      setShowQuestionForm(false);
    } else {
      alert('제목과 내용을 모두 입력해주세요.');
    }
  };

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setSelectedImages(prev => [...prev, ...newImages]);
    }
  };

  const insertCodeSnippet = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // 기존 내용이 있으면 줄바꿈 추가
      const beforeText = questionContent.substring(0, start);
      const afterText = questionContent.substring(end);
      const needsNewline = beforeText.length > 0 && !beforeText.endsWith('\n');
      
      const codeTemplate = `${needsNewline ? '\n' : ''}\`\`\`
// 여기에 코드를 입력하세요

\`\`\`${afterText.length > 0 ? '\n' : ''}`;
      
      const newContent = beforeText + codeTemplate + afterText;
      setQuestionContent(newContent);
      
      // 주석 부분만 정확히 선택하고 포커스
      setTimeout(() => {
        if (textarea) {
          const newlineOffset = needsNewline ? 1 : 0;
          const commentStart = start + newlineOffset + 4; // ```\n 다음 위치
          const commentEnd = commentStart + 17; // "// 여기에 코드를 입력하세요" 정확한 길이 (18글자)
          
          textarea.focus();
          textarea.setSelectionRange(commentStart, commentEnd);
        }
      }, 0);
    }
  };

  // 마크다운 코드 블록을 HTML로 변환하는 함수
  const renderContent = (content: string) => {
    // ```로 감싸진 코드 블록을 <pre><code>로 변환
    const codeBlockRegex = /```[\w]*\n?([\s\S]*?)```/g;
    const htmlContent = content.replace(codeBlockRegex, (match, code) => {
      return `<pre><code>${code.trim()}</code></pre>`;
    });
    
    // 인라인 코드 `code`를 <code>로 변환
    const inlineCodeRegex = /`([^`]+)`/g;
    const finalContent = htmlContent.replace(inlineCodeRegex, '<code>$1</code>');
    
    return finalContent;
  };

  const toggleQuestionForm = () => {
    setShowQuestionForm(!showQuestionForm);
  };

  // 스크롤 감지하여 하단 그라데이션 표시 여부 결정
  useEffect(() => {
    const handleScroll = () => {
      if (questionsListRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = questionsListRef.current;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 10;
        setHasMoreContent(!isNearBottom);
      }
    };

    const questionsListElement = questionsListRef.current;
    if (questionsListElement) {
      questionsListElement.addEventListener('scroll', handleScroll);
      handleScroll(); // 초기 체크
      
      return () => {
        questionsListElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [questions]);

  return (
    <QnAContainer>
      <SearchSection>
        <SearchInputWrapper>
          <SearchIcon>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.0833 17.5L10.875 12.2917C10.5 12.6111 10.0625 12.8611 9.5625 13.0417C9.0625 13.2222 8.52778 13.3125 7.95833 13.3125C6.26389 13.3125 4.82639 12.7361 3.64583 11.5833C2.46528 10.4306 1.875 9.02778 1.875 7.375C1.875 5.72222 2.46528 4.31944 3.64583 3.16667C4.82639 2.01389 6.26389 1.4375 7.95833 1.4375C9.65278 1.4375 11.0903 2.01389 12.2708 3.16667C13.4514 4.31944 14.0417 5.72222 14.0417 7.375C14.0417 7.94444 13.9514 8.47917 13.7708 8.97917C13.5903 9.47917 13.3403 9.91667 13.0208 10.2917L18.2292 15.5L16.0833 17.5ZM7.95833 10.8125C9.01389 10.8125 9.89583 10.4375 10.6042 9.6875C11.3125 8.9375 11.6667 8.02778 11.6667 6.95833C11.6667 5.88889 11.3125 4.97917 10.6042 4.22917C9.89583 3.47917 9.01389 3.10417 7.95833 3.10417C6.90278 3.10417 5.02083 3.47917 4.3125 4.22917C3.60417 4.97917 3.25 5.88889 3.25 6.95833C3.25 8.02778 3.60417 8.9375 4.3125 9.6875C5.02083 10.4375 6.90278 10.8125 7.95833 10.8125Z" fill="rgba(55, 56, 60, 0.28)"/>
            </svg>
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchQuery}
            onChange={handleSearch}
          />
        </SearchInputWrapper>
        
        <QuickAccessWrapper>
          <QuickAccessText>강의 질문 바로가기</QuickAccessText>
          <ChevronRightIcon>
            <ChevronDownIcon />
          </ChevronRightIcon>
        </QuickAccessWrapper>
      </SearchSection>

      <ContentSection>
        <QuestionsList ref={questionsListRef}>
          {questions.map((question, index) => (
            <QuestionItem key={question.id}>
              <QuestionContent>
                <QuestionHeader>
                  <QuestionTitle>{question.title}</QuestionTitle>
                  <QuestionBody>
                    <QuestionContentDisplay 
                      dangerouslySetInnerHTML={{ __html: renderContent(question.content) }}
                    />
                    {/* 첨부된 이미지들 표시 */}
                    {question.images && question.images.length > 0 && (
                      <AttachedImages>
                        {question.images.map((imageUrl, imgIndex) => (
                          <AttachedImage key={imgIndex} src={imageUrl} alt={`첨부 이미지 ${imgIndex + 1}`} />
                        ))}
                      </AttachedImages>
                    )}
                  </QuestionBody>
                </QuestionHeader>
                
                <QuestionMeta>
                  <LeftMeta>
                    <AuthorAvatar />
                    <AuthorName>{question.author}</AuthorName>
                    <Separator />
                    <QuestionDate>{question.date}</QuestionDate>
                  </LeftMeta>
                  <RightMeta>
                    <AnswerCount>답변 {question.answers}</AnswerCount>
                    <Separator />
                    <ViewCount>조회수 {question.views}</ViewCount>
                  </RightMeta>
                </QuestionMeta>
              </QuestionContent>
              {/* 마지막 아이템이 아닐 때만 구분선 표시 */}
              {index < questions.length - 1 && <QuestionDivider />}
            </QuestionItem>
          ))}
        </QuestionsList>

        {/* 하단 그라데이션 - 스크롤 감지에 따라 표시 */}
        {hasMoreContent && <BottomGradient />}
        
        {showQuestionForm ? (
          <QuestionFormSection>
            <FormContainer>
              <TitleInputContainer>
                <TitleInput
                  type="text"
                  placeholder="제목을 입력해주세요."
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                />
              </TitleInputContainer>
              
              <ContentInputContainer>
                <ContentTextarea
                  ref={textareaRef}
                  placeholder="내용을 입력해주세요."
                  value={questionContent}
                  onChange={(e) => setQuestionContent(e.target.value)}
                />
                
                {/* 선택된 이미지 미리보기 */}
                {selectedImages.length > 0 && (
                  <ImagePreviewContainer>
                    <ImagePreviewTitle>첨부된 이미지 ({selectedImages.length}개)</ImagePreviewTitle>
                    <ImagePreviewList>
                      {selectedImages.map((image, index) => (
                        <ImagePreviewItem key={index}>
                          <ImagePreviewName>{image.name}</ImagePreviewName>
                          <RemoveImageButton 
                            onClick={() => setSelectedImages(prev => prev.filter((_, i) => i !== index))}
                          >
                            ×
                          </RemoveImageButton>
                        </ImagePreviewItem>
                      ))}
                    </ImagePreviewList>
                  </ImagePreviewContainer>
                )}
                
                <FormToolbar>
                  <ToolbarLeft>
                    <ImageButton onClick={handleImageUpload} />
                    <CodeButton onClick={insertCodeSnippet} />
                  </ToolbarLeft>
                  <SubmitButton onClick={handleQuestionSubmit}>
                    등록하기
                  </SubmitButton>
                </FormToolbar>
              </ContentInputContainer>
              
              {/* 숨겨진 파일 입력 */}
              <HiddenFileInput
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </FormContainer>
            
            <FormActions>
              <AskButton onClick={toggleQuestionForm}>
                질문하기
              </AskButton>
            </FormActions>
          </QuestionFormSection>
        ) : (
          <BottomSection>
            <AskButton onClick={toggleQuestionForm}>
              질문하기
            </AskButton>
          </BottomSection>
        )}
      </ContentSection>
    </QnAContainer>
  );
};

/* 전체 브라우저 스크롤바 공간 예약으로 흔들림 방지 */
const QnAContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  scrollbar-gutter: stable; /* 스크롤바 공간 항상 예약 */
`;

const SearchSection = styled.div`
  width: 100%;
  padding: 24px 16px 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  flex-shrink: 0; /* 검색 영역은 고정 크기 */
`;

const SearchInputWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 12px 12px 44px; /* 왼쪽 패딩을 늘려서 아이콘 공간 확보 */
  background: var(--Fill-Normal, rgba(112, 115, 124, 0.08));
  overflow: hidden;
  border-radius: 12px;
  backdrop-filter: blur(32px);
  border: none;
  outline: none;
  
  color: var(--Label-Assistive, rgba(55, 56, 60, 0.28));
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.09px;
  
  &::placeholder {
    color: var(--Label-Assistive, rgba(55, 56, 60, 0.28));
  }
  
  &:focus {
    color: var(--Label-Normal, #171719);
  }
`;

const QuickAccessWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding-bottom: 8px;
`;

const QuickAccessText = styled.div`
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 20.01px;
  letter-spacing: 0.2px;
  word-wrap: break-word;
`;

const ChevronRightIcon = styled.div`
  width: 16px;
  height: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
  
  svg {
    width: 16px;
    height: 16px;
    
    path {
      fill: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
    }
  }
`;

const ContentSection = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  min-height: 0; /* flexbox가 제대로 작동하도록 */
`;

const QuestionsList = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto; /* 세로 스크롤 허용 */
  overflow-x: hidden; /* 가로 스크롤은 숨김 */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 16px;
  margin-bottom: 80px; /* 버튼 영역을 위한 여백 */
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const QuestionItem = styled.div`
  width: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: pointer;
  /* 호버 효과 완전 제거 */
`;

const QuestionContent = styled.div`
  width: 100%;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
`;

const QuestionHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
`;

const QuestionTitle = styled.div`
  width: 100%;
  color: var(--Label-Normal, #171719);
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.09px;
  word-wrap: break-word;
`;

const QuestionBody = styled.div`
  width: 100%;
  min-height: 44px;
  color: var(--Label-Neutral, rgba(46, 47, 51, 0.88));
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 21.99px;
  letter-spacing: 0.2px;
  word-wrap: break-word;
`;

const QuestionMeta = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftMeta = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
  position: relative;
  border-radius: 50%;
  background: var(--Static-White, white);
  border: 1px solid var(--Line-Normal-Alternative, rgba(112, 115, 124, 0.08));
  background-image: url('https://placehold.co/24x24');
  background-size: cover;
  background-position: center;
`;

const AuthorName = styled.div`
  color: var(--Label-Neutral, rgba(46, 47, 51, 0.88));
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 20.01px;
  letter-spacing: 0.2px;
  word-wrap: break-word;
`;

const Separator = styled.div`
  width: 1px;
  height: 12px;
  background: var(--Line-Normal-Normal, rgba(112, 115, 124, 0.22));
`;

const QuestionDate = styled.div`
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 20.01px;
  letter-spacing: 0.2px;
  word-wrap: break-word;
`;

const RightMeta = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const AnswerCount = styled.div`
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 20.01px;
  letter-spacing: 0.2px;
  word-wrap: break-word;
`;

const ViewCount = styled.div`
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 20.01px;
  letter-spacing: 0.2px;
  word-wrap: break-word;
`;

const QuestionDivider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  
  &::after {
    content: '';
    width: 100%;
    height: 1px;
    background: var(--Line-Normal-Normal, rgba(112, 115, 124, 0.22));
  }
`;

const BottomGradient = styled.div`
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 80px; /* 버튼 영역 바로 위에 위치 */
  left: 0;
  background: linear-gradient(
    0deg,
    var(--Background-Normal-Normal, white) 0%,
    rgba(255, 255, 255, 0.9) 20%,
    rgba(255, 255, 255, 0.7) 40%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0.3) 80%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 10;
`;

const BottomSection = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  padding: 16px;
  background: var(--Background-Normal-Normal, white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  z-index: 20;
`;

const QuestionFormSection = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 80vh; /* 최대 높이를 더 크게 설정 */
  padding: 16px;
  background: var(--Background-Normal-Normal, white);
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* 아래쪽 정렬로 버튼 고정 */
  align-items: flex-start;
  gap: 16px;
  overflow: hidden; /* 전체 섹션은 overflow 숨김 */
  z-index: 20;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  max-height: calc(80vh - 120px); /* 버튼 영역을 제외한 최대 높이 */
  overflow-y: auto; /* 내용이 많아지면 스크롤 가능 */
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const TitleInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--Line-Normal-Neutral, rgba(112, 115, 124, 0.16));
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.03);
  outline: none;
  
  color: var(--Label-Normal, #171719);
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.09px;
  
  &::placeholder {
    color: var(--Label-Assistive, rgba(55, 56, 60, 0.28));
  }
  
  /* 포커스 시 색상 변화 제거 */
`;

const ContentInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  min-height: 156px;
  padding: 12px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border: 1px solid var(--Line-Normal-Neutral, rgba(112, 115, 124, 0.16));
  border-bottom: none;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.03);
  outline: none;
  resize: none;
  
  color: var(--Label-Normal, #171719);
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0.09px;
  white-space: pre-wrap; /* 줄바꿈과 공백 유지 */
  
  &::placeholder {
    color: var(--Label-Assistive, rgba(55, 56, 60, 0.28));
  }
  
  /* 포커스 시 색상 변화 제거 */
`;

const FormToolbar = styled.div`
  width: 100%;
  padding: 16px;
  background: var(--Fill-Normal, rgba(112, 115, 124, 0.08));
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  border: 1px solid var(--Line-Normal-Neutral, rgba(112, 115, 124, 0.16));
  border-top: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ToolbarLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`;

const ImageButton = styled.button`
  width: 24px;
  height: 24px;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  background-image: url('/images/picture.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  
  /* 호버 효과 완전 제거 */
`;

const CodeButton = styled.button`
  width: 24px;
  height: 24px;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  background-image: url('/images/codesnipet.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  
  /* 호버 효과 완전 제거 */
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImagePreviewContainer = styled.div`
  width: 100%;
  max-height: 200px; /* 이미지 미리보기 영역 최대 높이 제한 */
  padding: 8px 12px;
  background: var(--Fill-Normal, rgba(112, 115, 124, 0.08));
  border-radius: 8px;
  margin-bottom: 8px;
  overflow-y: auto; /* 이미지가 많을 때 스크롤 */
  
  /* 스크롤바 숨기기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const ImagePreviewTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--Label-Normal, #171719);
  margin-bottom: 8px;
`;

const ImagePreviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ImagePreviewItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  background: var(--Static-White, white);
  border-radius: 6px;
`;

const ImagePreviewName = styled.span`
  font-size: 12px;
  color: var(--Label-Neutral, rgba(46, 47, 51, 0.88));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
`;

const RemoveImageButton = styled.button`
  width: 16px;
  height: 16px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 14px;
  font-weight: bold;
`;

const AttachedImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
`;

const AttachedImage = styled.img`
  max-width: 200px;
  max-height: 150px;
  border-radius: 8px;
  border: 1px solid var(--Line-Normal-Normal, rgba(112, 115, 124, 0.22));
  object-fit: cover;
`;

const QuestionContentDisplay = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  
  /* 인라인 코드 스타일링 */
  code {
    background: #2d3748;
    color: #e2e8f0;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 14px;
  }
  
  /* 코드 블록 스타일링 - 검정 에디터 스타일 */
  pre {
    background: #1a202c;
    color: #e2e8f0;
    padding: 20px;
    border-radius: 8px;
    overflow-x: auto;
    margin: 12px 0;
    border: 1px solid #2d3748;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    
    /* 에디터 느낌을 위한 상단 바 */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 30px;
      background: #2d3748;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border-bottom: 1px solid #4a5568;
    }
    
    /* 상단 바의 점 3개 */
    &::after {
      content: '● ● ●';
      position: absolute;
      top: 8px;
      left: 12px;
      color: #718096;
      font-size: 12px;
      line-height: 1;
    }
    
    code {
      background: none;
      color: #e2e8f0;
      padding: 0;
      font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
      font-size: 14px;
      line-height: 1.6;
      display: block;
      margin-top: 30px; /* 상단 바 공간 확보 */
    }
  }
`;

const SubmitButton = styled.button`
  width: 56px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 6px;
  position: relative;
  
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.09px;
  text-align: center;
  
  /* 호버 효과 완전 제거 */
`;

const FormActions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-shrink: 0; /* 버튼 영역은 고정 크기 유지 */
  margin-top: auto; /* 항상 하단에 위치 */
`;

const AskButton = styled.button`
  width: 100%;
  padding: 12px 28px;
  position: relative;
  background: var(--Primary-Normal, #448181);
  overflow: hidden;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  color: var(--Static-White, white);
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.09px;
  word-wrap: break-word;
  
  /* 모든 클릭 효과 제거 */
`;

export default StreamingQnA;
