import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../components/layout/Layout';

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
          <SloganTitle>비밀번호 재설정</SloganTitle>
          <SloganText>
            비밀번호 재설정이 완료되었습니다.
          </SloganText>
        </SloganSection>
        
        <FormContainer>
          <LoginButton to="/login">
            로그인으로 이동
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
  /* gap: 48px; */
  max-width: 480px;
  margin: 0 auto;
  padding: 128px 20px 80px;
  min-height: 100vh;
`;

const SloganSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 8px; */
  text-align: center;
`;

const SloganText = styled.p`
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.24px;
  color: #171719;
  margin: 64px 0 64px 0;
`;

const SloganTitle = styled.h1`
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 40px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -1.13px;
  color: #171719;
  margin: 0;
`;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const LoginButton = styled(Link)`
  width: 100%;
  background-color: #448181;
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.09px;
  cursor: pointer;
  padding: 12px 28px;
  text-decoration: none;
  text-align: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  box-sizing: border-box;
  transition: all 0.2s;
  
  &:hover {
    background-color: #3a6f6f;
  }
  
  &:active {
    background-color: #2d5a5a;
    transform: translateY(1px);
  }
`;

export default ForgotPasswordComplete;