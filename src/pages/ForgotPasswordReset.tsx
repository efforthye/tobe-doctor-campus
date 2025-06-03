import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';

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
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

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

  // 비밀번호 강도 검사
  useEffect(() => {
    const password = formValues.newPassword;
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [formValues.newPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    
    // 입력 시 해당 필드 에러 제거
    if (formErrors[name as keyof ResetFormValues]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<ResetFormValues> = {};
    let isValid = true;

    // 새 비밀번호 검증
    if (!formValues.newPassword) {
      errors.newPassword = '새 비밀번호를 입력해주세요';
      isValid = false;
    } else if (formValues.newPassword.length < 8) {
      errors.newPassword = '비밀번호는 최소 8자 이상이어야 합니다';
      isValid = false;
    } else if (!Object.values(passwordStrength).every(Boolean)) {
      errors.newPassword = '비밀번호 조건을 모두 만족해야 합니다';
      isValid = false;
    }

    // 비밀번호 확인 검증
    if (!formValues.confirmPassword) {
      errors.confirmPassword = '비밀번호 확인을 입력해주세요';
      isValid = false;
    } else if (formValues.newPassword !== formValues.confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다';
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
    Object.values(passwordStrength).every(Boolean) &&
    formValues.newPassword === formValues.confirmPassword;

  if (!email || !verified) {
    return null;
  }

  return (
    <Layout>
      <MainContainer>
        <SloganSection>
          <SloganTitle>새 비밀번호 설정</SloganTitle>
          <SloganText>새로운 비밀번호를 입력해주세요.</SloganText>
        </SloganSection>
        
        <FormContainer>
          <form onSubmit={handleSubmit}>
            {/* 새 비밀번호 입력 */}
            <FormGroup>
              <FormLabel>새 비밀번호</FormLabel>
              <EmailInput
                type="password"
                name="newPassword"
                placeholder="새 비밀번호를 입력해주세요"
                value={formValues.newPassword}
                onChange={handleChange}
                className={formErrors.newPassword ? 'error' : ''}
              />
              {formErrors.newPassword && <InputHelp error>{formErrors.newPassword}</InputHelp>}
              
              {/* 비밀번호 강도 표시 */}
              <PasswordStrengthSection>
                <StrengthTitle>비밀번호 조건</StrengthTitle>
                <StrengthGrid>
                  <StrengthItem $satisfied={passwordStrength.hasMinLength}>
                    ✓ 8자 이상
                  </StrengthItem>
                  <StrengthItem $satisfied={passwordStrength.hasUpperCase}>
                    ✓ 영문 대문자
                  </StrengthItem>
                  <StrengthItem $satisfied={passwordStrength.hasLowerCase}>
                    ✓ 영문 소문자
                  </StrengthItem>
                  <StrengthItem $satisfied={passwordStrength.hasNumber}>
                    ✓ 숫자
                  </StrengthItem>
                  <StrengthItem $satisfied={passwordStrength.hasSpecialChar}>
                    ✓ 특수문자
                  </StrengthItem>
                </StrengthGrid>
              </PasswordStrengthSection>
            </FormGroup>
            
            {/* 비밀번호 확인 입력 */}
            <FormGroup>
              <FormLabel>비밀번호 확인</FormLabel>
              <EmailInput
                type="password"
                name="confirmPassword"
                placeholder="비밀번호를 다시 입력해주세요"
                value={formValues.confirmPassword}
                onChange={handleChange}
                className={formErrors.confirmPassword ? 'error' : ''}
              />
              {formErrors.confirmPassword && <InputHelp error>{formErrors.confirmPassword}</InputHelp>}
            </FormGroup>
            
            {/* 재설정 버튼 */}
            <NextButton 
              type="submit" 
              disabled={loading || !isFormValid}
            >
              {loading ? '재설정 중...' : '비밀번호 재설정'}
            </NextButton>
            
            {/* 링크 버튼들 */}
            <LinkButtonsRow>
              <LinkButton to="/forgot-password/verify">이전으로</LinkButton>
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

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: 16px;
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
  border-radius: 8px;
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

const PasswordStrengthSection = styled.div`
  margin-top: 12px;
  padding: 16px;
  background-color: rgba(68, 129, 129, 0.05);
  border-radius: 8px;
`;

const StrengthTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: #171719;
  margin: 0 0 8px 0;
`;

const StrengthGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
`;

const StrengthItem = styled.div<{ $satisfied: boolean }>`
  font-size: 12px;
  color: ${props => props.$satisfied ? '#4CAF50' : 'rgba(55, 56, 60, 0.61)'};
  font-weight: ${props => props.$satisfied ? '600' : '400'};
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

export default ForgotPasswordReset;