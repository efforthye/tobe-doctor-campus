import React from 'react';
import styled from 'styled-components';

interface Material {
  id: number;
  name: string;
  type: string;
}

const StreamingMaterials: React.FC = () => {
  const materials: Material[] = [
    // { id: 1, name: '파일명', type: '구분' },
    // { id: 2, name: '파일명', type: '구분' },
    // { id: 3, name: '파일명', type: '구분' },
    // { id: 4, name: '파일명', type: '구분' },
  ];

  // 강의자료가 없는 경우 빈 상태 표시
  if (materials.length === 0) {
    return (
      <EmptyState>
        <EmptyStateTitle>강의자료를 찾을 수 없습니다.</EmptyStateTitle>
        <EmptyStateDescription>
          본 강의는 별도의 강의자료가<br/>
          제공되지 않는 강의입니다.
        </EmptyStateDescription>
      </EmptyState>
    );
  }

  return (
    <MaterialsContainer>
      <MaterialsList>
        {materials.map((material) => (
          <MaterialItem key={material.id}>
            <MaterialContent>
              <IconSection>
                <IconWrapper>
                  <DocumentIcon />
                </IconWrapper>
              </IconSection>
              <ContentSection>
                <MainContent>
                  <MaterialTitle>{material.name}</MaterialTitle>
                </MainContent>
                <TypeSection>
                  <MaterialType>{material.type}</MaterialType>
                </TypeSection>
              </ContentSection>
            </MaterialContent>
          </MaterialItem>
        ))}
      </MaterialsList>
    </MaterialsContainer>
  );
};

const MaterialsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 12px;
`;

const MaterialsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
`;

const MaterialItem = styled.div`
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

const MaterialContent = styled.div`
  flex: 1;
  width: 100%;
  padding: 12px 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  position: relative;
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

const DocumentIcon = styled.div`
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
    width: 21.73px;
    height: 26.4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: var(--Primary-Strong, #296768);
    opacity: 0.74;
    
    /* Document icon shape */
    clip-path: polygon(
      0% 0%, 
      70% 0%, 
      100% 30%, 
      100% 100%, 
      0% 100%
    );
  }
`;

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MaterialTitle = styled.div`
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

const TypeSection = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const MaterialType = styled.div`
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

const EmptyState = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 160px 0;
  gap: 24px;
`;

const EmptyStateTitle = styled.div`
  text-align: center;
  color: var(--Label-Normal, #171719);
  font-size: 20px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 28px;
  word-wrap: break-word;
`;

const EmptyStateDescription = styled.div`
  text-align: center;
  color: var(--Label-Alternative, rgba(55, 56, 60, 0.61));
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0.09px;
  word-wrap: break-word;
`;

export default StreamingMaterials;
