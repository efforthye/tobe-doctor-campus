import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../../components/layout/Layout';
import { ReactComponent as NegativeIcon } from '../../assets/negative.svg';

interface ResetFormValues {
  newPassword: string;
  confirmPassword: string;
}

const ForgotPasswordReset: React.FC = () => {
  const [formValues, setFormValues] = useState<ResetFormValues>({
    newPassword: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<ResetFormValues>>({});
  const [loading, setLoading] = useState(false);
  const [hasStartedTyping, setHasStartedTyping] = useState({newPassword: false, confirmPassword: false});

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const verified = location.state?.verified;

  // 인증되지 않은 접근 차단
  useEffect(() => {
    if (!email || !verified) {
      navigate('/forgot-password');
    }
  }, [email, verified, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // 처음 타이핑 시작 플래그 설정
    if (!hasStartedTyping[name as keyof typeof hasStartedTyping]) {
      setHasStartedTyping({
        ...hasStartedTyping,
        [name]: true
      });
    }
    
    setFormValues({
      ...formValues,
      [name]: value,
    });
    
    // 실시간 유효성 검사 (타이핑 시작 후부터)
    if (hasStartedTyping[name as keyof typeof hasStartedTyping] || value.length > 0) {
      const errors: Partial<ResetFormValues> = { ...formErrors };
      
      if (name === 'newPassword') {
        if (!value) {
          errors.newPassword = '비밀번호를 입력해주세요';
        } else if (value.length < 8 || value.length > 16 || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&~#^_+=<>{}[\]|\\:";',./`-]{8,16}$/.test(value)) {
          errors.newPassword = '비밀번호 양식이 올바르지 않습니다.';
        } else {
          errors.newPassword = '';
        }
      }
      
      if (name === 'confirmPassword') {
        if (!value) {
          errors.confirmPassword = '비밀번호 확인을 입력해주세요';
        } else if (formValues.newPassword !== value) {
          errors.confirmPassword = '비밀번호가 서로 일치하지 않습니다.';
        } else {
          errors.confirmPassword = '';
        }
      }
      
      setFormErrors(errors);
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<ResetFormValues> = {};
    let isValid = true;

    // 새 비밀번호 검증
    if (!formValues.newPassword) {
      errors.newPassword = '비밀번호를 입력해주세요';
      isValid = false;
    } else if (formValues.newPassword.length < 8 || formValues.newPassword.length > 16) {
      errors.newPassword = '비밀번호 양식이 올바르지 않습니다.';
      isValid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&~#^_+=<>{}[\]|\\:";',./`-]{8,16}$/.test(formValues.newPassword)) {
      errors.newPassword = '비밀번호 양식이 올바르지 않습니다.';
      isValid = false;
    }

    // 비밀번호 확인 검증
    if (!formValues.confirmPassword) {
      errors.confirmPassword = '비밀번호 확인을 입력해주세요';
      isValid = false;
    } else if (formValues.newPassword !== formValues.confirmPassword) {
      errors.confirmPassword = '비밀번호가 서로 일치하지 않습니다.';
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 성공 시 완료 페이지로 이동
      navigate('/forgot-password/complete', { 
        state: { email } 
      });
      
    } catch (error) {
      alert('비밀번호 재설정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = 
    formValues.newPassword && 
    formValues.confirmPassword && 
    formValues.newPassword.length >= 8 &&
    formValues.newPassword.length <= 16 &&
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&~#^_+=<>{}[\]|\\:";',./`-]{8,16}$/.test(formValues.newPassword) &&
    formValues.newPassword === formValues.confirmPassword &&
    !formErrors.newPassword &&
    !formErrors.confirmPassword;

  if (!email || !verified) {
    return null;
  }

  return (
    <Layout>
      <MainContainer>
        <SloganSection>
          <SloganTitle>비밀번호 재설정</SloganTitle>
        </SloganSection>
        
        <FormContainer>
          <form onSubmit={handleSubmit}>
            {/* 비밀번호 입력 */}
            <FormGroup>
              <FormLabel>새 비밀번호</FormLabel>
              <EmailInputWrapper>
                <EmailInput
                  type="password"
                  name="newPassword"
                  placeholder="비밀번호를 입력해주세요"
                  value={formValues.newPassword}
                  onChange={handleChange}
                  hasError={!!formErrors.newPassword}
                />
                {formErrors.newPassword && (
                  <ErrorIconWrapper>
                    <NegativeIcon width={22} height={22} />
                  </ErrorIconWrapper>
                )}
              </EmailInputWrapper>
              {formErrors.newPassword && <InputHelp error>{formErrors.newPassword}</InputHelp>}
              
              <EmailInputWrapper style={{ marginTop: '8px' }}>
                <EmailInput
                  type="password"
                  name="confirmPassword"
                  placeholder="비밀번호를 다시 입력해주세요"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                  hasError={!!formErrors.confirmPassword}
                />
                {formErrors.confirmPassword && (
                  <ErrorIconWrapper>
                    <NegativeIcon width={22} height={22} />
                  </ErrorIconWrapper>
                )}
              </EmailInputWrapper>
              {formValues.confirmPassword && formValues.newPassword && 
               formValues.newPassword === formValues.confirmPassword && 
               !formErrors.newPassword && !formErrors.confirmPassword &&
               formValues.newPassword.length >= 8 && formValues.newPassword.length <= 16 &&
               /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&~#^_+=<>{}[\]|\\:";',./`-]{8,16}$/.test(formValues.newPassword) && (
                <InputHelp success>사용 가능한 비밀번호입니다.</InputHelp>
              )}
              {formErrors.confirmPassword && <InputHelp error>{formErrors.confirmPassword}</InputHelp>}
              
              <InputHelp>영문 대소문자, 숫자를 조합하여 8자 이상 16자 이하로 입력해주세요.</InputHelp>
            </FormGroup>
            
            {/* 재설정 버튼 */}
            <NextButton 
              type="submit" 
              disabled={loading || !isFormValid}
            >
              {loading ? '재설정 중...' : '비밀번호 재설정'}
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
  gap: 48px;
  max-width: 480px;
  margin: 0 auto;
  padding: 128px 20px 80px;
  min-height: 100vh;
`;

const SloganSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
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
  margin-bottom: 24px;
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

const InputHelp = styled.p<{ error?: boolean; success?: boolean }>`
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.33;
  letter-spacing: 0.06px;
  color: ${props => props.error ? '#FF4242' : props.success ? '#00BF40' : 'rgba(55, 56, 60, 0.61)'};
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
  margin: 24px 0;
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

export default ForgotPasswordReset;