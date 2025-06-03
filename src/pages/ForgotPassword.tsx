import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [formValues, setFormValues] = useState<ForgotPasswordFormValues>({
    email: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<ForgotPasswordFormValues>>({});
  const [loading, setLoading] = useState(false);
  const [accountError, setAccountError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    
    // 입력 시 에러 제거
    if (formErrors[name as keyof ForgotPasswordFormValues]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
    if (accountError) {
      setAccountError('');
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<ForgotPasswordFormValues> = {};
    let isValid = true;

    if (!formValues.email) {
      errors.email = '이메일을 입력해주세요';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = '유효한 이메일 주소를 입력해주세요';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 임시로 특정 이메일에 대해 계정 없음 에러 시뮬레이션
      if (formValues.email === 'notfound@example.com') {
        setAccountError('등록되지 않은 이메일입니다. 회원가입을 진행해주세요.');
        setLoading(false);
        return;
      }
      
      // 성공 시 인증번호 입력 페이지로 이동
      navigate('/forgot-password/verify', { 
        state: { email: formValues.email } 
      });
      
    } catch (error) {
      setAccountError('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <MainContainer>
        <SloganSection>
          <SloganTitle>비밀번호 찾기</SloganTitle>
          <SloganText>회원가입 시 등록한 이메일을 입력해주세요.</SloganText>
        </SloganSection>
        
        <FormContainer>
          {accountError && <ErrorMessage>{accountError}</ErrorMessage>}
          
          <form onSubmit={handleSubmit}>
            {/* 이메일 입력 */}
            <FormGroup>
              <FormLabel>이메일</FormLabel>
              <EmailInput
                type="email"
                name="email"
                placeholder="이메일을 입력해주세요."
                value={formValues.email}
                onChange={handleChange}
                className={formErrors.email ? 'error' : ''}
                autoComplete="email"
              />
              {formErrors.email && <InputHelp error>{formErrors.email}</InputHelp>}
            </FormGroup>
            
            {/* 다음 버튼 */}
            <NextButton 
              type="submit" 
              disabled={loading || !formValues.email || !/\S+@\S+\.\S+/.test(formValues.email)}
              data-disable={loading || !formValues.email || !/\S+@\S+\.\S+/.test(formValues.email) ? "True" : "False"}
              data-icon-only="False"
              data-leading-icon="false"
              data-loading={loading ? "true" : "false"}
              data-size="Large"
              data-trailing-icon="false"
              data-variant="Primary"
            >
              <ButtonInner>
                <ButtonContent>
                  {loading ? '처리 중...' : '다음'}
                </ButtonContent>
              </ButtonInner>
            </NextButton>
            
            {/* 링크 버튼들 */}
            <LinkButtonsRow>
              <LinkButton to="/login">로그인으로 돌아가기</LinkButton>
            </LinkButtonsRow>
          </form>
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
  max-width: 1440px;
  margin: 0 auto;
  padding: 128px 20px 160px;
`;

const SloganSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SloganText = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -1.2%;
  color: #171719;
  margin-top: 64px;
  margin-bottom: 64px;
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

const ErrorMessage = styled.div`
  background-color: rgba(255, 82, 82, 0.1);
  color: #ff5252;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 16px;
  font-size: 14px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 36px;
`;

const FormLabel = styled.label`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.429em;
  color: rgba(46, 47, 51, 0.88);
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(112, 115, 124, 0.16);
  border-radius: 12px;
  font-size: 16px;
  line-height: 1.5em;
  outline: none;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.03);
  
  &::placeholder {
    color: rgba(55, 56, 60, 0.28);
  }
  
  &.error {
    border-color: #ff5252;
  }
`;

const InputHelp = styled.p<{ error?: boolean }>`
  font-size: 12px;
  line-height: 1.334em;
  color: ${props => props.error ? '#ff5252' : 'rgba(55, 56, 60, 0.61)'};
  margin-top: 4px;
`;

const NextButton = styled.button`
  width: 100%;
  background-color: #448181;
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 24px;
  letter-spacing: 0.09px;
  cursor: pointer;
  padding: 12px 28px;
  margin-bottom: 36px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  overflow: hidden;
  word-wrap: break-word;
  box-sizing: border-box;
  
  /* Large size 버튼의 기본 스타일 */
  min-height: 48px; /* 12px + 24px + 12px */
  
  &:disabled {
    background-color: #F4F4F5;
    color: rgba(55, 56, 60, 0.28);
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #3a6f6f;
  }
  
  &:active:not(:disabled) {
    background-color: #2d5a5a;
  }
`;

const ButtonInner = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const ButtonContent = styled.div`
  justify-content: center;
  align-items: center;
  gap: 6px;
  display: inline-flex;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  word-wrap: break-word;
`;

const LinkButtonsRow = styled.div`
  display: flex;
  justify-content: center;
`;

const LinkButton = styled(Link)`
  color: rgba(55, 56, 60, 0.61);
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    color: #448181;
  }
`;

export default ForgotPassword;