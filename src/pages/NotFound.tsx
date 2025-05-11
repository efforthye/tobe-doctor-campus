import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <NotFoundContainer>
        <NotFoundContent>
          <NotFoundCode>404</NotFoundCode>
          <NotFoundTitle>페이지를 찾을 수 없습니다</NotFoundTitle>
          <NotFoundDescription>
            요청하신 페이지가 존재하지 않거나, 삭제되었거나, 주소가 변경되었을 수 있습니다.
          </NotFoundDescription>
          <NotFoundActions>
            <Button size="large" onClick={() => navigate('/')}>
              홈으로 돌아가기
            </Button>
            <Button size="large" variant="outline" onClick={() => navigate(-1)}>
              이전 페이지로 돌아가기
            </Button>
          </NotFoundActions>
        </NotFoundContent>

        <NotFoundImageContainer>
          <NotFoundImage src="/404-illustration.svg" alt="페이지를 찾을 수 없음" />
        </NotFoundImageContainer>
      </NotFoundContainer>
    </Layout>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xxl};
  min-height: calc(100vh - 200px);
  padding: 0 20px;
  box-sizing: border-box;
  overflow-x: hidden;
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column-reverse;
    text-align: center;
  }
`;

const NotFoundContent = styled.div`
  max-width: 500px;
`;

const NotFoundCode = styled.h1`
  font-size: 8rem;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const NotFoundTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const NotFoundDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

const NotFoundActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const NotFoundImageContainer = styled.div`
  max-width: 400px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 300px;
  }
`;

const NotFoundImage = styled.img`
  width: 100%;
  height: auto;
`;

export default NotFound;