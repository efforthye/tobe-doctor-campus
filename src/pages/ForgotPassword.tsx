import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { ReactComponent as NegativeIcon } from '../assets/negative.svg';

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
      
      // 임시로 특정 이메일에 대해 계정 없음 에러 시뮬레이션
      if (formValues.email !== 'efforthye@gmail.com') {
        setAccountError('존재하지 않는 계정입니다.');
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
              data-disable={loading || !formValues.email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formValues.email) || !!(formErrors.email) ? "True" : "False"}
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

// 스타일 컴포넌트들
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
`;

const SloganText = styled.p`
  font-size: 20px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -1.2%;
  color: #171719;
  margin-top: 8px;
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

const EmailInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const EmailInput = styled.input<{ hasError: boolean }>`
  width: 100%;
  padding: 12px;
  padding-right: ${props => props.hasError ? '48px' : '12px'};
  border: 1px solid ${props => props.hasError ? '#FF4242' : 'rgba(112, 115, 124, 0.16)'};
  border-radius: 12px;
  font-size: 16px;
  line-height: 1.5em;
  outline: none;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  
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
  font-size: 12px;
  line-height: 1.334em;
  color: ${props => props.error ? '#FF4242' : 'rgba(55, 56, 60, 0.61)'};
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
  min-height: 48px;
  
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