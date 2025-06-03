import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';

const ForgotPasswordComplete: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  // 정상적인 플로우가 아닌 경우 첫 페이지로 리다이렉트
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  if (!email) {
    return null;
  }

  return (
    <Layout>
      <MainContainer>
        <SloganSection>
          <SuccessIcon>✓</SuccessIcon>
          <SloganTitle>비밀번호 재설정 완료</SloganTitle>
          <SloganText>
            비밀번호가 성공적으로 변경되었습니다.<br />
            새로운 비밀번호로 로그인해주세요.
          </SloganText>
        </SloganSection>
        
        <FormContainer>
          <LoginButton to="/login">
            로그인하기
          </LoginButton>
        </FormContainer>
      </MainContainer>
    </Layout>
  );
};

// 로그인 페이지와 동일한 스타일 컴포넌트
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 128px 20px 160px;
`;

const SloganSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const SuccessIcon = styled.div`
  width: 120px;
  height: 120px;
  background-color: #4CAF50;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  color: white;
  font-weight: bold;
`;

const SloganText = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -1.2%;
  color: #171719;
  text-align: center;
`;

const SloganTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -2.82%;
  color: #171719;
  margin-top: 0;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const LoginButton = styled(Link)`
  width: 100%;
  background-color: #448181;
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  padding: 12px 28px;
  text-decoration: none;
  text-align: center;
  display: block;
  
  &:hover {
    background-color: rgba(68, 129, 129, 0.8);
  }
  
  &:active {
    background-color: rgba(68, 129, 129, 0.9);
    transform: translateY(1px);
  }
`;

export default ForgotPasswordComplete;