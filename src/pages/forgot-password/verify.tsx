import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../components/layout/Layout';
import { ReactComponent as NegativeIcon } from '../../assets/negative.svg';

interface VerifyFormValues {
  verificationCode: string;
}

const ForgotPasswordVerify: React.FC = () => {
  const [formValues, setFormValues] = useState<VerifyFormValues>({
    verificationCode: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<VerifyFormValues>>({});
  const [loading, setLoading] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  // 이메일이 없으면 첫 페이지로 리다이렉트
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // 숫자만 입력 가능, 6자리 제한
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 6);
    
    setFormValues({
      ...formValues,
      [name]: numericValue,
    });
    
    // 입력 시 에러 제거
    if (formErrors[name as keyof VerifyFormValues]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
    if (verificationError) {
      setVerificationError('');
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<VerifyFormValues> = {};
    let isValid = true;

    if (!formValues.verificationCode) {
      errors.verificationCode = '인증번호를 입력해주세요';
      isValid = false;
    } else if (formValues.verificationCode.length !== 6) {
      errors.verificationCode = '인증번호는 6자리입니다';
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
      
      // 더미 검증 - 실제로는 서버에서 검증
      if (formValues.verificationCode !== '123456') {
        setVerificationError('잘못된 인증번호입니다. 다시 입력해주세요.');
        setLoading(false);
        return;
      }
      
      // 성공 시 비밀번호 재설정 페이지로 이동
      navigate('/forgot-password/reset', { 
        state: { email, verified: true } 
      });
      
    } catch (error) {
      setVerificationError('인증에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return null; // 리다이렉트 중이므로 아무것도 렌더링하지 않음
  }

  return (
    <Layout>
      <MainContainer>
        <SloganSection>
          <SloganTitle>비밀번호 찾기</SloganTitle>
          <SloganText>
            이메일로 발송된 인증번호를 입력해주세요.
          </SloganText>
        </SloganSection>
        
        <FormContainer>
          <form onSubmit={handleSubmit}>
            {/* 인증번호 입력 */}
            <FormGroup>
              <FormLabel>인증번호</FormLabel>
              <EmailInputWrapper>
                <EmailInput
                  type="text"
                  name="verificationCode"
                  placeholder="인증번호 6자리를 입력해주세요"
                  value={formValues.verificationCode}
                  onChange={handleChange}
                  hasError={!!(formErrors.verificationCode || verificationError)}
                  maxLength={6}
                  pattern="[0-9]*"
                  inputMode="numeric"
                  autoComplete="off"
                />
                {(formErrors.verificationCode || verificationError) && (
                  <ErrorIconWrapper>
                    <NegativeIcon width={22} height={22} />
                  </ErrorIconWrapper>
                )}
              </EmailInputWrapper>
              {formErrors.verificationCode && <InputHelp error>{formErrors.verificationCode}</InputHelp>}
              {verificationError && <InputHelp error>인증번호가 일치하지 않습니다.</InputHelp>}
            </FormGroup>
            
            {/* 다음 버튼 */}
            <NextButton 
              type="submit" 
              disabled={loading || formValues.verificationCode.length !== 6}
            >
              {loading ? '인증 중...' : '다음'}
            </NextButton>
            
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
  text-align: center;
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


export default ForgotPasswordVerify;