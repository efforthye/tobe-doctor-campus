import React, { useState } from 'react';
import styled from 'styled-components';

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

  const questions: Question[] = [
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
  ];

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

  return (
    <QnAContainer>
      <SearchSection>
        <SearchInput
          type="text"
          placeholder="검색어를 입력해주세요."
          value={searchQuery}
          onChange={handleSearch}
        />
        
        <QuickAccessWrapper>
          <QuickAccessText>강의 질문 바로가기</QuickAccessText>
          <ChevronIcon />
        </QuickAccessWrapper>
      </SearchSection>

      <ContentSection>
        <QuestionsList>
          {questions.map((question) => (
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
              <QuestionDivider />
            </QuestionItem>
          ))}
        </QuestionsList>

        <BottomGradient />
        
        {showQuestionForm ? (
          <QuestionFormSection>
            <FormContainer>
              <FormFields>
                <TitleInput
                  type="text"
                  placeholder="제목을 입력해주세요."
                  value={questionTitle}
                  onChange={(e) => setQuestionTitle(e.target.value)}
                />
                
                <ContentInputSection>
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
                </ContentInputSection>
              </FormFields>
            </FormContainer>
            
            <FormActions>
              <AskButton onClick={handleQuestionSubmit}>
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

const QnAContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 24px;
`;

const SearchSection = styled.div`
  width: 100%;
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
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

const ChevronIcon = styled.div`
  width: 8px;
  height: 16px;
  position: relative;
  
  &::after {
    content: '';
    width: 5.53px;
    height: 9.87px;
    position: absolute;
    left: 1.73px;
    top: 3.07px;
    background: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
    clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
    transform: rotate(90deg);
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
`;

const QuestionsList = styled.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const QuestionItem = styled.div`
  width: 100%;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(112, 115, 124, 0.08);
    border-radius: 12px;
    margin: 0 -16px;
    padding: 0 32px;
  }
  
  &:focus {
    background: rgba(112, 115, 124, 0.08);
    border-radius: 12px;
    outline: none;
    margin: 0 -16px;
    padding: 0 32px;
  }
  
  &:active {
    background: rgba(112, 115, 124, 0.12);
    border-radius: 12px;
    margin: 0 -16px;
    padding: 0 32px;
  }
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
  width: 448px;
  height: 64px;
  position: absolute;
  bottom: 80px;
  left: 0;
  background: linear-gradient(
    180deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.98) 5%, 
    rgba(255, 255, 255, 0.96) 9%, 
    rgba(255, 255, 255, 0.93) 13%, 
    rgba(255, 255, 255, 0.90) 17%, 
    rgba(255, 255, 255, 0.86) 20%, 
    rgba(255, 255, 255, 0.82) 24%, 
    rgba(255, 255, 255, 0.77) 29%, 
    rgba(255, 255, 255, 0.71) 34%, 
    rgba(255, 255, 255, 0.65) 40%, 
    rgba(255, 255, 255, 0.57) 46%, 
    rgba(255, 255, 255, 0.48) 54%, 
    rgba(255, 255, 255, 0.38) 63%, 
    rgba(255, 255, 255, 0.27) 74%, 
    rgba(255, 255, 255, 0.14) 86%, 
    var(--Background-Normal-Normal, white) 100%
  );
`;

const BottomSection = styled.div`
  width: 100%;
  padding-bottom: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const QuestionFormSection = styled.div`
  width: 100%;
  padding-bottom: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
`;

const FormContainer = styled.div`
  width: 100%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  overflow: hidden;
  background: var(--Background-Elevated-Normal, white);
`;

const FormFields = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--Line-Normal-Neutral, rgba(112, 115, 124, 0.16));
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.03);
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
    border-color: var(--Primary-Normal, #448181);
  }
`;

const ContentInputSection = styled.div`
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
  
  color: var(--Label-Assistive, rgba(55, 56, 60, 0.28));
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0.09px;
  
  &::placeholder {
    color: var(--Label-Assistive, rgba(55, 56, 60, 0.28));
  }
  
  &:focus {
    color: var(--Label-Normal, #171719);
    border-color: var(--Primary-Normal, #448181);
  }
`;

const FormToolbar = styled.div`
  width: 100%;
  padding: 16px;
  background: var(--Fill-Normal, rgba(112, 115, 124, 0.08));
  overflow: hidden;
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.09px;
  text-align: center;
  word-wrap: break-word;
  
  &:hover {
    color: var(--Label-Normal, #171719);
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
