import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as ChevronDownIcon } from '../../../assets/images/chevron-down.svg';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isExpanded: boolean;
}

interface FAQAnswerProps {
  isExpanded: boolean;
  children: React.ReactNode;
}

const AnimatedFAQAnswer: React.FC<FAQAnswerProps> = ({ isExpanded, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(isExpanded ? contentHeight : 0);
    }
  }, [isExpanded]);

  return (
    <FAQAnswerContainer height={height}>
      <FAQAnswer ref={contentRef}>
        {children}
      </FAQAnswer>
    </FAQAnswerContainer>
  );
};

const StreamingFAQ: React.FC = () => {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: 1,
      question: '질문을 하세요?',
      answer: '제목에 대한 상세 내용을 입력해주세요.\n긴 컨텐츠라면 접은 상태를 기본값으로 사용하세요.',
      isExpanded: false
    },
    {
      id: 2,
      question: '질문을 하세요?',
      answer: '제목에 대한 상세 내용을 입력해주세요.\n긴 컨텐츠라면 접은 상태를 기본값으로 사용하세요.',
      isExpanded: true
    },
    {
      id: 3,
      question: '질문을 하세요?',
      answer: '제목에 대한 상세 내용을 입력해주세요.\n긴 컨텐츠라면 접은 상태를 기본값으로 사용하세요.',
      isExpanded: false
    },
    {
      id: 4,
      question: '질문을 하세요?',
      answer: '제목에 대한 상세 내용을 입력해주세요.\n긴 컨텐츠라면 접은 상태를 기본값으로 사용하세요.',
      isExpanded: false
    },
    {
      id: 5,
      question: '질문을 하세요?',
      answer: '제목에 대한 상세 내용을 입력해주세요.\n긴 컨텐츠라면 접은 상태를 기본값으로 사용하세요.',
      isExpanded: false
    },
    {
      id: 6,
      question: '질문을 하세요?',
      answer: '제목에 대한 상세 내용을 입력해주세요.\n긴 컨텐츠라면 접은 상태를 기본값으로 사용하세요.',
      isExpanded: false
    }
  ]);

  const toggleFAQ = (id: number) => {
    setFaqItems(items =>
      items.map(item =>
        item.id === id ? { ...item, isExpanded: !item.isExpanded } : item
      )
    );
  };

  return (
    <FAQContainer>
      <FAQList>
        {faqItems.map((item) => (
          <FAQItemContainer key={item.id}>
            <FAQItemWrapper isExpanded={item.isExpanded}>
              <FAQHeader onClick={() => toggleFAQ(item.id)}>
                <FAQQuestion>{item.question}</FAQQuestion>
                <ChevronIcon isExpanded={item.isExpanded}>
                  <ChevronDownIcon />
                </ChevronIcon>
              </FAQHeader>
              
              <AnimatedFAQAnswer isExpanded={item.isExpanded}>
                {item.answer}
              </AnimatedFAQAnswer>
            </FAQItemWrapper>
          </FAQItemContainer>
        ))}
      </FAQList>
    </FAQContainer>
  );
};

const FAQContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
`;

const FAQList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const FAQItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const FAQItemWrapper = styled.div<{ isExpanded: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  background: transparent;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
`;

const FAQHeader = styled.div`
  width: 100%;
  padding: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0px);
  }
`;

const FAQQuestion = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  
  min-height: 24px;
  color: var(--Label-Normal, #171719);
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.09px;
  word-wrap: break-word;
`;

const ChevronIcon = styled.div<{ isExpanded: boolean }>`
  width: 20px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: ${props => props.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  
  svg {
    width: 20px;
    height: 20px;
    
    path {
      fill: var(--Label-Normal, #171719);
    }
  }
`;

const FAQAnswerContainer = styled.div<{ height: number }>`
  width: 100%;
  height: ${props => props.height}px;
  overflow: hidden;
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const FAQAnswer = styled.div`
  width: 100%;
  padding: 0 16px 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  color: var(--Label-Neutral, rgba(46, 47, 51, 0.88));
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 20.01px;
  letter-spacing: 0.2px;
  word-wrap: break-word;
  white-space: pre-line;
`;

export default StreamingFAQ;