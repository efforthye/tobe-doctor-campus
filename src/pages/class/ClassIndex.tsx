import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/layout/Layout';
import { Link } from 'react-router-dom';

const ClassIndex: React.FC = () => {
  return (
    <Layout>
      <Container>
        <PageHeader>
          <HeaderContent>
            <PageTitle>CLASS</PageTitle>
            <PageDescription>
              투비닥터 캠퍼스의 다양한 강의들을 만나보세요.
            </PageDescription>
          </HeaderContent>
        </PageHeader>

        <Section>
          <SectionHeader>
            <SectionTitle>카테고리별 클래스</SectionTitle>
          </SectionHeader>
          
          <CategoryGrid>
            <CategoryCard to="/classes/ai">
              <CategoryIcon>🤖</CategoryIcon>
              <CategoryName>AI</CategoryName>
            </CategoryCard>
            <CategoryCard to="/classes/digital-healthcare">
              <CategoryIcon>💻</CategoryIcon>
              <CategoryName>디지털 헬스케어</CategoryName>
            </CategoryCard>
            <CategoryCard to="/classes/primary-care">
              <CategoryIcon>🏥</CategoryIcon>
              <CategoryName>일차 의료</CategoryName>
            </CategoryCard>
            <CategoryCard to="/classes/business">
              <CategoryIcon>💼</CategoryIcon>
              <CategoryName>비즈니스</CategoryName>
            </CategoryCard>
            <CategoryCard to="/classes/pharmaceutical">
              <CategoryIcon>💊</CategoryIcon>
              <CategoryName>제약</CategoryName>
            </CategoryCard>
          </CategoryGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>새롭게 오픈한 클래스</SectionTitle>
            <ViewAllLink to="/classes/new">전체보기</ViewAllLink>
          </SectionHeader>
          
          <ClassGrid>
            {[1, 2, 3, 4].map((id) => (
              <ClassCard key={id} to={`/classes/detail/${id}`}>
                <ClassThumbnail />
                <ClassInfo>
                  <ClassTags>
                    <ClassTag>AI</ClassTag>
                    <ClassTag>의학 연구</ClassTag>
                  </ClassTags>
                  <ClassTitle>ChatGPT를 활용한 의학 연구 방법론</ClassTitle>
                  <ClassInstructor>이준서 교수</ClassInstructor>
                </ClassInfo>
              </ClassCard>
            ))}
          </ClassGrid>
        </Section>

        <Section>
          <SectionHeader>
            <SectionTitle>인기 클래스</SectionTitle>
            <ViewAllLink to="/classes/popular">전체보기</ViewAllLink>
          </SectionHeader>
          
          <ClassGrid>
            {[5, 6, 7, 8].map((id) => (
              <ClassCard key={id} to={`/classes/detail/${id}`}>
                <ClassThumbnail />
                <ClassInfo>
                  <ClassTags>
                    <ClassTag>비즈니스</ClassTag>
                    <ClassTag>병원 경영</ClassTag>
                  </ClassTags>
                  <ClassTitle>의사를 위한 병원 경영 실무</ClassTitle>
                  <ClassInstructor>김영희 원장</ClassInstructor>
                </ClassInfo>
              </ClassCard>
            ))}
          </ClassGrid>
        </Section>
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
  margin-bottom: 60px;
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

const PageTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.colors.text};
  
  @media (max-width: 768px) {
    font-size: 36px;
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

const Section = styled.section`
  max-width: 1440px;
  margin: 0 auto 80px;
  padding: 0 80px;
  
  @media (max-width: 1024px) {
    padding: 0 40px;
  }
  
  @media (max-width: 768px) {
    padding: 0 20px;
    margin-bottom: 60px;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const ViewAllLink = styled(Link)`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    text-decoration: underline;
  }
  
  &::after {
    content: '→';
    margin-left: 8px;
  }
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CategoryCard = styled(Link)`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryIcon = styled.div`
  font-size: 36px;
  margin-bottom: 16px;
`;

const CategoryName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const ClassGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  
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

export default ClassIndex;