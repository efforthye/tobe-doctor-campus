import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';

const SignupComplete: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <Layout>
      <Container>
        <Header>
          <Title>회원가입</Title>
        </Header>
        
        <Content>
          <CompletionMessage>회원가입이 완료되었습니다.</CompletionMessage>
        </Content>

        <ButtonContainer>
          <LoginButton onClick={handleGoToLogin}>
            로그인으로 이동
          </LoginButton>
        </ButtonContainer>
      </Container>
    </Layout>
  );
};

// 기존 스타일 유지하면서 피그마 디자인 적용
const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 128px 20px 160px;
  gap: 64px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 100px 16px 120px;
    gap: 40px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 80px 16px 100px;
    gap: 32px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 40px;
  line-height: 1.3em;
  text-align: center;
  color: #171719;
  margin: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 36px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 32px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const CompletionMessage = styled.div`
  color: #171719;
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const LoginButton = styled.button`
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: #448181;
  border: none;
  border-radius: 12px;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  padding: 16px 28px;
  transition: background-color 0.2s;
  
  &:hover {
    background: #296768;
  }
  
  &:active {
    background: #296768;
  }
`;

export default SignupComplete;