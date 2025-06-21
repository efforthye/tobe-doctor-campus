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
}

const StreamingQnA: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionContent, setQuestionContent] = useState('');
  const [hasMoreContent, setHasMoreContent] = useState(true);
  const questionsListRef = useRef<HTMLDivElement>(null);

  const questions: Question[] = useMemo(() => [
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
  ], []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleQuestionSubmit = () => {
    if (questionTitle.trim() && questionContent.trim()) {
      // 질문 제출 로직
      console.log('Question submitted:', { title: questionTitle, content: questionContent });
      setQuestionTitle('');
      setQuestionContent('');
      setShowQuestionForm(false);
    }
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
                  <QuestionBody>{question.content}</QuestionBody>
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
                  placeholder="내용을 입력해주세요."
                  value={questionContent}
                  onChange={(e) => setQuestionContent(e.target.value)}
                />
                <FormToolbar>
                  <ToolbarLeft>
                    <ImageButton />
                    <CodeButton />
                  </ToolbarLeft>
                  <SubmitButton onClick={handleQuestionSubmit}>
                    등록하기
                  </SubmitButton>
                </FormToolbar>
              </ContentInputContainer>
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
  max-height: 60vh;
  padding: 16px;
  background: var(--Background-Normal-Normal, white);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  overflow: hidden; /* 스크롤 제거하여 흔들림 방지 */
  z-index: 20;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
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
  
  &:focus {
    border-color: var(--Primary-Normal, #448181);
  }
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
  
  &::placeholder {
    color: var(--Label-Assistive, rgba(55, 56, 60, 0.28));
  }
  
  &:focus {
    border-color: var(--Primary-Normal, #448181);
  }
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
  
  &::after {
    content: '';
    width: 18.8px;
    height: 18.8px;
    position: absolute;
    left: 2.6px;
    top: 2.6px;
    background: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  }
  
  &:hover::before {
    content: '';
    position: absolute;
    width: 32px;
    height: 32px;
    left: -4px;
    top: -4px;
    border-radius: 1000px;
    background: var(--Label-Assistive, rgba(55, 56, 60, 0.28));
    opacity: 0.5;
  }
`;

const CodeButton = styled.button`
  width: 24px;
  height: 24px;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  
  &::after {
    content: '';
    width: 21.8px;
    height: 17.8px;
    position: absolute;
    left: 1.1px;
    top: 3.1px;
    background: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  }
  
  &:hover::before {
    content: '';
    position: absolute;
    width: 32px;
    height: 32px;
    left: -4px;
    top: -4px;
    border-radius: 1000px;
    background: var(--Label-Assistive, rgba(55, 56, 60, 0.28));
    opacity: 0.5;
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
  
  &:hover {
    color: var(--Label-Normal, #171719);
    
    &::before {
      content: '';
      position: absolute;
      width: 70px;
      height: 32px;
      left: -7px;
      top: -4px;
      border-radius: 6px;
      background: var(--Label-Normal, #171719);
      opacity: 0.05;
    }
  }
`;

const FormActions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
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
  
  &:hover {
    background: var(--Primary-Strong, #296768);
  }
  
  &:active {
    background: var(--Primary-Strong, #296768);
    transform: translateY(1px);
  }
`;

export default StreamingQnA;
