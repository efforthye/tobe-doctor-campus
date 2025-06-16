import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Layout from '../../components/layout/Layout';

const ClassCategory: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  // 클래스 카드 데이터 (4개 행 × 3개씩)
  const classData = [
    { id: 1, title: '유방영상에서 AI의 적용', caption: '송성은', extraCaption: '고려대학교 안암병원 영상의학과', image: 'https://placehold.co/282x188' },
    { id: 2, title: 'ANN의 기본 구조와 학습 원리', caption: '김승용', extraCaption: '고려대학교 의과대학 의공학교실', image: 'https://placehold.co/282x188' },
    { id: 3, title: '머신러닝의 기초 : Linear Regression', caption: '김승용', extraCaption: '고려대학교 의과대학 의공학교실', image: 'https://placehold.co/282x188' },
    { id: 4, title: 'Deep Learning 기초와 응용', caption: '이지원', extraCaption: '서울대학교 의과대학 의료정보학과', image: 'https://placehold.co/282x188' },
    { id: 5, title: 'CNN을 이용한 의료영상 분석', caption: '박준영', extraCaption: '연세대학교 세브란스병원 영상의학과', image: 'https://placehold.co/282x188' },
    { id: 6, title: 'Natural Language Processing 입문', caption: '최민수', extraCaption: '성균관대학교 의과대학 의료정보학과', image: 'https://placehold.co/282x188' },
    { id: 7, title: 'RNN과 LSTM의 이해', caption: '정혜영', extraCaption: '한양대학교 의과대학 의공학교실', image: 'https://placehold.co/282x188' },
    { id: 8, title: '의료 빅데이터 분석 방법론', caption: '김태형', extraCaption: '가톨릭대학교 의과대학 의료정보학과', image: 'https://placehold.co/282x188' },
    { id: 9, title: 'GAN을 활용한 의료영상 생성', caption: '송미라', extraCaption: '중앙대학교 의과대학 영상의학과', image: 'https://placehold.co/282x188' },
    { id: 10, title: 'Transformer 모델의 의료 적용', caption: '이상현', extraCaption: '울산대학교 의과대학 의료정보학과', image: 'https://placehold.co/282x188' },
    { id: 11, title: '의료 AI 윤리와 규제', caption: '홍지영', extraCaption: '이화여자대학교 의과대학 의료법윤리학과', image: 'https://placehold.co/282x188' },
    { id: 12, title: 'AI 기반 진단 시스템 개발', caption: '강동수', extraCaption: '경희대학교 의과대학 의공학교실', image: 'https://placehold.co/282x188' },
  ];

  // 검색 핸들러
  const handleSearchSubmit = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      const searchTerm = (e.target as HTMLInputElement).value.trim();
      if (searchTerm) {
        alert(`${searchTerm} 검색`);
      }
    }
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  return (
    <Layout>
      <Container>
        {/* 사이드바와 메인 콘텐츠 컨테이너 */}
        <MainContainer>
          {/* 사이드바 */}
          <Sidebar>
            <SidebarContent>
              <SidebarItem active>전체보기</SidebarItem>
              <SidebarItem>카테고리</SidebarItem>
              <SidebarItem>카테고리</SidebarItem>
              <SidebarItem>카테고리</SidebarItem>
              <SidebarItem>카테고리</SidebarItem>
              <SidebarItem>카테고리</SidebarItem>
              <SidebarItem>카테고리</SidebarItem>
            </SidebarContent>
          </Sidebar>

          {/* 메인 콘텐츠 */}
          <ContentArea>
            {/* 페이지 제목 */}
            <PageTitle>카테고리</PageTitle>

            {/* 브레드크럼 */}
            <BreadcrumbContainer>
              <BreadcrumbNavigation>
                <BreadcrumbItem>홈</BreadcrumbItem>
                <BreadcrumbSeparator>
                  <svg width="4" height="8" viewBox="0 0 4 8" fill="none">
                    <path 
                      d="M0.75 7L3.25 4L0.75 1" 
                      stroke="rgba(55, 56, 60, 0.28)" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </BreadcrumbSeparator>
                <BreadcrumbItem>클래스</BreadcrumbItem>
                <BreadcrumbSeparator>
                  <svg width="4" height="8" viewBox="0 0 4 8" fill="none">
                    <path 
                      d="M0.75 7L3.25 4L0.75 1" 
                      stroke="rgba(55, 56, 60, 0.28)" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </BreadcrumbSeparator>
                <BreadcrumbItem>카테고리</BreadcrumbItem>
              </BreadcrumbNavigation>
              
              {/* 검색바 */}
              <SearchContainer>
                <SearchBox>
                  <SearchIcon>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path 
                        d="M14.375 14.375L18.125 18.125M16.25 9.375C16.25 13.1716 13.1716 16.25 9.375 16.25C5.57842 16.25 2.5 13.1716 2.5 9.375C2.5 5.57842 5.57842 2.5 9.375 2.5C13.1716 2.5 16.25 5.57842 16.25 9.375Z" 
                        stroke="rgba(55, 56, 60, 0.28)" 
                        strokeWidth="1.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </SearchIcon>
                  <SearchInput 
                    type="text" 
                    placeholder="검색어를 입력해 주세요. (이부분 추후 문구작성 필요)"
                    value={searchValue}
                    onChange={handleSearchChange}
                    onKeyUp={handleSearchSubmit}
                  />
                </SearchBox>
              </SearchContainer>
            </BreadcrumbContainer>

            {/* 클래스 카드 섹션 */}
            <ClassSection>
              <ClassGridContainer>
                {/* 3개씩 4줄로 배치 */}
                {[0, 1, 2, 3].map((rowIndex) => (
                  <ClassRow key={rowIndex}>
                    {classData.slice(rowIndex * 3, (rowIndex + 1) * 3).map((classItem) => (
                      <ClassCard key={classItem.id}>
                        <ClassThumbnail>
                          <ClassImage src={classItem.image} alt="클래스 썸네일" />
                        </ClassThumbnail>
                        <ClassInfo>
                          <ClassTitle>{classItem.title}</ClassTitle>
                          <ClassCaption>{classItem.caption}</ClassCaption>
                          <ClassExtraCaption>{classItem.extraCaption}</ClassExtraCaption>
                        </ClassInfo>
                      </ClassCard>
                    ))}
                  </ClassRow>
                ))}
              </ClassGridContainer>
            </ClassSection>
          </ContentArea>
        </MainContainer>
      </Container>
    </Layout>
  );
};

// 스타일 컴포넌트들
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
`;

const MainContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.containerWidth};
  margin: 0 auto;
  padding: 64px ${({ theme }) => theme.layout.containerPadding} 128px;
  display: flex;
  gap: 32px;
  
  @media (max-width: 1024px) {
    padding: 64px ${({ theme }) => theme.layout.containerPaddingTablet} 128px;
    gap: 24px;
  }
  
  @media (max-width: 768px) {
    padding: 64px ${({ theme }) => theme.layout.containerPaddingMobile} 100px;
    flex-direction: column;
    gap: 16px;
  }
`;

// 사이드바 스타일
const Sidebar = styled.nav`
  width: 260px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SidebarContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  
  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const SidebarItem = styled.div<{ active?: boolean }>`
  padding: 12px 16px;
  border-radius: 12px;
  background: transparent;
  color: ${props => props.active ? '#171719' : 'rgba(55, 56, 60, 0.61)'};
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.09px;
  cursor: pointer;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  &::after {
    content: '';
    width: 16px;
    height: 16px;
    background-image: ${props => props.active 
      ? `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 12L10 8L6 4' stroke='%23171719' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 12L10 8L6 4' stroke='rgba(55, 56, 60, 0.61)' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`
    };
    background-repeat: no-repeat;
    background-position: center;
    transition: background-image 0.2s ease;
  }
  
  &:hover {
    color: #171719;
    
    &::after {
      background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 12L10 8L6 4' stroke='%23171719' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    }
  }
  
  @media (max-width: 768px) {
    flex: 0 0 auto;
    padding: 8px 12px;
    font-size: 14px;
    
    &::after {
      display: none;
    }
  }
`;

// 콘텐츠 영역 스타일
const ContentArea = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 32px;
  
  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const PageTitle = styled.h1`
  color: #171719;
  font-size: 40px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 700;
  line-height: 54.01px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 32px;
    line-height: 44px;
  }
`;

// 브레드크럼 스타일
const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const BreadcrumbNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BreadcrumbItem = styled.span<{ active?: boolean }>`
  color: rgba(55, 56, 60, 0.61);
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 20.01px;
  letter-spacing: 0.20px;
  cursor: pointer;
`;

const BreadcrumbSeparator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
`;

// 검색바 스타일 (브레드크럼 내부)
const SearchContainer = styled.div`
  width: 100%;
  max-width: 400px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const SearchBox = styled.div`
  width: 100%;
  height: 48px;
  padding: 12px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  outline: 1px solid rgba(112, 115, 124, 0.22);
  outline-offset: -1px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SearchIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: #171719;
  font-size: 14px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.20px;
  
  &::placeholder {
    color: rgba(55, 56, 60, 0.28);
  }
`;

// 클래스 섹션 스타일 (기존 컴포넌트 재활용)
const ClassSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 12px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

const SectionInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SectionTitle = styled.h2`
  color: #171719;
  font-size: 28px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 700;
  line-height: 38.02px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const SectionCaption = styled.p`
  color: rgba(55, 56, 60, 0.61);
  font-size: 18px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 400;
  line-height: 26.01px;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// 새로운 그리드 스타일
const ClassGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const ClassRow = styled.div`
  display: flex;
  gap: 24px;
  
  @media (max-width: 1024px) {
    gap: 16px;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const ClassCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  cursor: pointer;
`;

const ClassThumbnail = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid rgba(112, 115, 124, 0.08);
  aspect-ratio: 3/2;
`;

const ClassImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
`;

const ClassInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ClassTitle = styled.h3`
  color: #171719;
  font-size: 16px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: 0.09px;
  margin: 0;
`;

const ClassCaption = styled.p`
  color: rgba(55, 56, 60, 0.61);
  font-size: 13px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.25px;
  margin: 0;
`;

const ClassExtraCaption = styled.p`
  color: rgba(55, 56, 60, 0.61);
  font-size: 13px;
  font-family: 'Pretendard JP', sans-serif;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.25px;
  margin: 0;
`;

export default ClassCategory;
