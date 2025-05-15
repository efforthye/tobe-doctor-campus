import React from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const ClassCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  
  // 카테고리 이름 및 설명
  const categoryInfo = {
    'ai': {
      name: 'AI',
      description: '인공지능과 관련된 다양한 의학 분야 강의를 만나보세요.',
      icon: '🤖'
    },
    'digital-healthcare': {
      name: '디지털 헬스케어',
      description: '디지털 기술을 활용한 헬스케어 솔루션 강의를 제공합니다.',
      icon: '💻'
    },
    'primary-care': {
      name: '일차 의료',
      description: '일차 의료 관련 실무 및 임상 강의를 찾아보세요.',
      icon: '🏥'
    },
    'business': {
      name: '비즈니스',
      description: '의료 분야 비즈니스 및 경영 관련 강의를 제공합니다.',
      icon: '💼'
    },
    'pharmaceutical': {
      name: '제약',
      description: '제약 분야의 최신 트렌드와 지식을 배워보세요.',
      icon: '💊'
    },
    'all': {
      name: '전체 클래스',
      description: '투비닥터 캠퍼스의 모든 강의를 확인하세요.',
      icon: '📚'
    },
    'new': {
      name: '신규 클래스',
      description: '새롭게 오픈한 강의를 만나보세요.',
      icon: '🆕'
    },
    'popular': {
      name: '인기 클래스',
      description: '많은 분들이 수강중인 인기 강의를 확인하세요.',
      icon: '🔥'
    }
  }[category || 'all'];

  return (
    <Layout>
      <Container>
        <PageHeader>
          <HeaderContent>
            <CategoryBadge>{categoryInfo?.icon || '📚'}</CategoryBadge>
            <PageTitle>{categoryInfo?.name || '전체 클래스'}</PageTitle>
            <PageDescription>
              {categoryInfo?.description || '투비닥터 캠퍼스의 다양한 강의들을 만나보세요.'}
            </PageDescription>
          </HeaderContent>
        </PageHeader>

        <ContentSection>
          <FilterSection>
            <FilterGroup>
              <FilterLabel>카테고리</FilterLabel>
              <CategoryLinks>
                <CategoryLink to="/classes/all" $active={category === 'all'}>전체</CategoryLink>
                <CategoryLink to="/classes/ai" $active={category === 'ai'}>AI</CategoryLink>
                <CategoryLink to="/classes/digital-healthcare" $active={category === 'digital-healthcare'}>디지털 헬스케어</CategoryLink>
                <CategoryLink to="/classes/primary-care" $active={category === 'primary-care'}>일차 의료</CategoryLink>
                <CategoryLink to="/classes/business" $active={category === 'business'}>비즈니스</CategoryLink>
                <CategoryLink to="/classes/pharmaceutical" $active={category === 'pharmaceutical'}>제약</CategoryLink>
              </CategoryLinks>
            </FilterGroup>
            
            <FilterGroup>
              <FilterLabel>정렬</FilterLabel>
              <SortOptions>
                <SortOption>최신순</SortOption>
                <SortOption>인기순</SortOption>
                <SortOption>제목순</SortOption>
              </SortOptions>
            </FilterGroup>
          </FilterSection>
          
          <ClassGrid>
            {Array.from({ length: 8 }).map((_, index) => (
              <ClassCard key={index} to={`/classes/detail/${index + 1}`}>
                <ClassThumbnail />
                <ClassInfo>
                  <ClassTags>
                    <ClassTag>{categoryInfo?.name || 'AI'}</ClassTag>
                    <ClassTag>의학 연구</ClassTag>
                  </ClassTags>
                  <ClassTitle>ChatGPT를 활용한 의학 연구 방법론 {index + 1}</ClassTitle>
                  <ClassInstructor>이준서 교수</ClassInstructor>
                </ClassInfo>
              </ClassCard>
            ))}
          </ClassGrid>
          
          <Pagination>
            <PageButton $active={true}>1</PageButton>
            <PageButton>2</PageButton>
            <PageButton>3</PageButton>
            <PageEllipsis>...</PageEllipsis>
            <PageButton>10</PageButton>
          </Pagination>
        </ContentSection>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  width: 100%;
  padding-bottom: 100px;
`;

const PageHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  padding: 60px 0;
  margin-bottom: 40px;
`;

const HeaderContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px;
  
  @media (max-width: 1024px) {
    padding: 0 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const CategoryBadge = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 40px;
  }
`;

const PageTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const PageDescription = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  max-width: 600px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContentSection = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px;
  
  @media (max-width: 1024px) {
    padding: 0 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FilterLabel = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const CategoryLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const CategoryLink = styled(Link)<{ $active: boolean }>`
  background-color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.backgroundGray};
  color: ${({ $active }) => $active ? 'white' : 'rgba(0, 0, 0, 0.6)'};
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 20px;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.border};
  }
`;

const SortOptions = styled.div`
  display: flex;
  gap: 16px;
`;

const SortOption = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &:first-child {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
  }
`;

const ClassGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 40px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ClassCard = styled(Link)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ClassThumbnail = styled.div`
  height: 180px;
  background-color: #E5E5E5;
`;

const ClassInfo = styled.div`
  padding: 20px;
  background-color: white;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ClassTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const ClassTag = styled.span`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
`;

const ClassTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 12px 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.4;
`;

const ClassInstructor = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  margin-top: auto;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 60px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.border};
  background-color: ${({ $active, theme }) => $active ? theme.colors.primary : 'white'};
  color: ${({ $active }) => $active ? 'white' : 'inherit'};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ $active }) => $active ? 'white' : theme.colors.primary};
  }
`;

const PageEllipsis = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
`;

export default ClassCategory;