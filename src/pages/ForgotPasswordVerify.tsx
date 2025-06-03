import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';

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
  const [timeLeft, setTimeLeft] = useState(300); // 5분 = 300초
  const [canResend, setCanResend] = useState(false);
  const [resending, setResending] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  // 이메일이 없으면 첫 페이지로 리다이렉트
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  // 타이머 관리
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
      
      // 임시로 특정 인증번호에 대해 실패 시뮬레이션
      if (formValues.verificationCode === '000000') {
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

  const handleResendCode = async () => {
    setResending(true);
    
    try {
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 타이머 리셋
      setTimeLeft(300);
      setCanResend(false);
      setVerificationError('');
      alert('인증번호가 재발송되었습니다.');
      
    } catch (error) {
      alert('인증번호 재발송에 실패했습니다.');
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return null; // 리다이렉트 중이므로 아무것도 렌더링하지 않음
  }

  return (
    <Layout>
      <MainContainer>
        <SloganSection>
          <SloganTitle>인증번호 입력</SloganTitle>
          <SloganText>
            <EmailText>{email}</EmailText>으로 발송된 인증번호를 입력해주세요.
          </SloganText>
        </SloganSection>
        
        <FormContainer>
          {verificationError && <ErrorMessage>{verificationError}</ErrorMessage>}
          
          <form onSubmit={handleSubmit}>
            {/* 인증번호 입력 */}
            <FormGroup>
              <FormLabelRow>
                <FormLabel>인증번호</FormLabel>
                <Timer isExpired={timeLeft === 0}>
                  {formatTime(timeLeft)}
                </Timer>
              </FormLabelRow>
              <EmailInput
                type="text"
                name="verificationCode"
                placeholder="인증번호 6자리를 입력해주세요"
                value={formValues.verificationCode}
                onChange={handleChange}
                className={formErrors.verificationCode ? 'error' : ''}
                maxLength={6}
                pattern="[0-9]*"
                inputMode="numeric"
                style={{ textAlign: 'center', fontSize: '18px', fontWeight: '600', letterSpacing: '0.5em' }}
              />
              {formErrors.verificationCode && <InputHelp error>{formErrors.verificationCode}</InputHelp>}
              
              <ResendSection>
                <ResendText>인증번호를 받지 못하셨나요?</ResendText>
                <ResendButton
                  type="button"
                  onClick={handleResendCode}
                  disabled={!canResend || resending}
                >
                  {resending ? '발송 중...' : '인증번호 재발송'}
                </ResendButton>
              </ResendSection>
            </FormGroup>
            
            {/* 다음 버튼 */}
            <NextButton 
              type="submit" 
              disabled={loading || formValues.verificationCode.length !== 6 || timeLeft === 0}
            >
              {loading ? '인증 중...' : '다음'}
            </NextButton>
            
            {/* 링크 버튼들 */}
            <LinkButtonsRow>
              <LinkButton to="/forgot-password">이전으로</LinkButton>
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

const EmailText = styled.span`
  font-weight: 600;
  color: #448181;
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
  margin-bottom: 16px;
`;

const FormLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FormLabel = styled.label`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.429em;
  color: rgba(46, 47, 51, 0.88);
`;

const Timer = styled.span<{ isExpired: boolean }>`
  font-weight: 600;
  font-size: 14px;
  color: ${props => props.isExpired ? '#ff5252' : '#448181'};
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(112, 115, 124, 0.16);
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.5em;
  outline: none;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.03);
  
  &::placeholder {
    color: rgba(55, 56, 60, 0.28);
    text-align: left;
    font-weight: 400;
    font-size: 16px;
    letter-spacing: normal;
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

const ResendSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;

const ResendText = styled.span`
  font-size: 14px;
  color: rgba(55, 56, 60, 0.61);
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  color: #448181;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;

  &:disabled {
    color: rgba(55, 56, 60, 0.28);
    cursor: not-allowed;
    text-decoration: none;
  }

  &:hover:not(:disabled) {
    color: rgba(68, 129, 129, 0.8);
  }
`;

const NextButton = styled.button`
  width: 100%;
  background-color: #448181;
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  padding: 12px 28px;
  margin-bottom: 36px;
  
  &:disabled {
    background-color: #F4F4F5;
    color: rgba(55, 56, 60, 0.28);
    cursor: not-allowed;
  }
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

export default ForgotPasswordVerify;