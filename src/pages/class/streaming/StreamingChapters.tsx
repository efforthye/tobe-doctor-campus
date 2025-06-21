import React from 'react';
import styled from 'styled-components';

const StreamingChapters: React.FC = () => {
  const chapters = [
    { id: 1, title: '챕터 제목', duration: '00:00' },
    { id: 2, title: '챕터 제목', duration: '00:00' },
    { id: 3, title: '챕터 제목', duration: '00:00' },
    { id: 4, title: '챕터 제목', duration: '00:00' },
    { id: 5, title: '챕터 제목', duration: '00:00' },
  ];

  const handleChapterClick = (chapterId: number) => {
    // 챕터 클릭 시 비디오 시간 이동 로직
    console.log(`Chapter ${chapterId} clicked`);
  };

  return (
    <ChaptersContainer>
      <ChaptersList>
        {chapters.map((chapter) => (
          <ChapterItem key={chapter.id} onClick={() => handleChapterClick(chapter.id)}>
            <ChapterContent>
              <IconSection>
                <IconWrapper>
                  <PlayIcon />
                </IconWrapper>
              </IconSection>
              <ContentSection>
                <MainContent>
                  <ChapterTitle>{chapter.title}</ChapterTitle>
                </MainContent>
                <DurationSection>
                  <ChapterDuration>{chapter.duration}</ChapterDuration>
                </DurationSection>
              </ContentSection>
            </ChapterContent>
          </ChapterItem>
        ))}
      </ChaptersList>
    </ChaptersContainer>
  );
};

const ChaptersContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
`;

const ChaptersList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const ChapterItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(112, 115, 124, 0.08);
    border-radius: 12px;
    margin: 0 -16px;
    padding: 0 16px;
  }
  
  &:focus {
    background: rgba(112, 115, 124, 0.08);
    border-radius: 12px;
    outline: none;
    margin: 0 -16px;
    padding: 0 16px;
  }
  
  &:active {
    background: rgba(112, 115, 124, 0.12);
    border-radius: 12px;
    margin: 0 -16px;
    padding: 0 16px;
  }
`;

const ChapterContent = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 448px;
    height: 72px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background: transparent;
    opacity: 0;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 12px 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const IconSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

const IconWrapper = styled.div`
  padding-right: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const PlayIcon = styled.div`
  width: 48px;
  height: 48px;
  padding: 8px;
  background: var(--To-Be-Doctor-99, #F0F7F7);
  overflow: hidden;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  
  &::after {
    content: '';
    width: 18.78px;
    height: 21.29px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-40%, -50%); /* 플레이 아이콘은 약간 오른쪽으로 */
    background: var(--Primary-Strong, #296768);
    opacity: 0.74;
    
    /* Play icon triangle shape */
    clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
  }
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ChapterTitle = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  
  min-height: 24px;
  color: var(--Label-Normal, #171719);
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.09px;
  word-wrap: break-word;
`;

const DurationSection = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ChapterDuration = styled.div`
  padding-left: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  
  text-align: right;
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.09px;
  word-wrap: break-word;
`;

export default StreamingChapters;
