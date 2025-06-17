import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../components/layout/Layout';
import { ReactComponent as NegativeIcon } from '../../assets/negative.svg';

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
  const [hasStartedTyping, setHasStartedTyping] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // 처음 타이핑 시작 플래그 설정
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
    }
    
    setFormValues({
      ...formValues,
      [name]: value,
    });
    
    // 실시간 유효성 검사 (타이핑 시작 후부터)
    if (hasStartedTyping || value.length > 0) {
      const errors: Partial<ForgotPasswordFormValues> = {};
      
      if (!value) {
        errors.email = '이메일을 입력해주세요';
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        errors.email = '올바른 이메일을 입력해주세요.';
      }
      
      setFormErrors(errors);
    }
    
    // 계정 오류 제거
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
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formValues.email)) {
      errors.email = '올바른 이메일을 입력해주세요.';
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
      
      // TODO: 실제 API 호출로 대체
      // if (response.error) {
      //   setAccountError('존재하지 않는 계정입니다.');
      //   setLoading(false);
      //   return;
      // }
      
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
          <form onSubmit={handleSubmit}>
            {/* 이메일 입력 */}
            <FormGroup>
              <FormLabel>이메일</FormLabel>
              <EmailInputWrapper>
                <EmailInput
                  type="email"
                  name="email"
                  placeholder="이메일을 입력해주세요."
                  value={formValues.email}
                  onChange={handleChange}
                  hasError={!!(formErrors.email || accountError)}
                  autoComplete="email"
                />
                {(formErrors.email || accountError) && (
                  <ErrorIconWrapper>
                    <NegativeIcon width={22} height={22} />
                  </ErrorIconWrapper>
                )}
              </EmailInputWrapper>
              {formErrors.email && <InputHelp error>{formErrors.email}</InputHelp>}
              {accountError && <InputHelp error>{accountError}</InputHelp>}
            </FormGroup>
            
            {/* 다음 버튼 */}
            <NextButton 
              type="submit" 
              disabled={loading || !formValues.email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formValues.email) || !!(formErrors.email)}
            >
              {loading ? '처리 중...' : '다음'}
            </NextButton>
            
            {/* 링크 버튼들 */}
            {/* <LinkButtonsRow>
              <LinkButton to="/login">로그인으로 돌아가기</LinkButton>
            </LinkButtonsRow> */}
          </form>
        </FormContainer>
      </MainContainer>
    </Layout>
  );
};

// 스타일 컴포넌트들
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 36px;
`;

const FormLabel = styled.label`
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.08px;
  color: rgba(46, 47, 51, 0.88);
`;

const EmailInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const EmailInput = styled.input<{ hasError: boolean }>`
  width: 100%;
  padding: 12px 16px;
  padding-right: ${props => props.hasError ? '48px' : '16px'};
  border: 1px solid ${props => props.hasError ? '#FF4242' : 'rgba(112, 115, 124, 0.16)'};
  border-radius: 12px;
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  outline: none;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  transition: border-color 0.2s;
  
  &::placeholder {
    color: rgba(55, 56, 60, 0.28);
  }
  
  &:focus {
    border-color: ${props => props.hasError ? '#FF4242' : '#448181'};
  }
`;

const ErrorIconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const InputHelp = styled.p<{ error?: boolean }>`
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.33;
  letter-spacing: 0.06px;
  color: ${props => props.error ? '#FF4242' : 'rgba(55, 56, 60, 0.61)'};
  margin: 0;
`;

const NextButton = styled.button`
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
  margin-bottom: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  transition: all 0.2s;
  
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

const LinkButtonsRow = styled.div`
  display: flex;
  justify-content: center;
`;

const LinkButton = styled(Link)`
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: rgba(55, 56, 60, 0.61);
  text-decoration: none;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.43;
  transition: color 0.2s;
  
  &:hover {
    color: #448181;
  }
`;

export default ForgotPassword;