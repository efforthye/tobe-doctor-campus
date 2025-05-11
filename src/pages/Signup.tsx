import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register, resetAuthError } from '../store/slices/authSlice';
import { RootState } from '../store';
import Layout from '../components/layout/Layout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { useAppDispatch } from '../hooks/useAppDispatch';

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [formValues, setFormValues] = useState<SignupFormValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<SignupFormValues>>({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // 이미 로그인된 경우 홈페이지로 리다이렉트
    if (isAuthenticated) {
      navigate('/');
    }
    
    // 컴포넌트 마운트 시 에러 초기화
    dispatch(resetAuthError());
  }, [isAuthenticated, navigate, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    
    // 입력 시 해당 필드 에러 제거
    if (formErrors[name as keyof SignupFormValues]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<SignupFormValues> = {};
    let isValid = true;

    if (!formValues.name) {
      errors.name = '이름을 입력해주세요';
      isValid = false;
    }

    if (!formValues.email) {
      errors.email = '이메일을 입력해주세요';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = '유효한 이메일 주소를 입력해주세요';
      isValid = false;
    }

    if (!formValues.password) {
      errors.password = '비밀번호를 입력해주세요';
      isValid = false;
    } else if (formValues.password.length < 6) {
      errors.password = '비밀번호는 최소 6자리 이상이어야 합니다';
      isValid = false;
    }

    if (!formValues.confirmPassword) {
      errors.confirmPassword = '비밀번호 확인을 입력해주세요';
      isValid = false;
    } else if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다';
      isValid = false;
    }

    if (!agreeTerms || !agreePrivacy) {
      isValid = false;
      alert('필수 약관에 동의해주세요.');
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(
        register({
          name: formValues.name,
          email: formValues.email,
          password: formValues.password,
        })
      );
    }
  };

  return (
    <Layout>
      <SignupContainer>
        <SignupCard variant="elevated">
          <SignupHeader>
            <h1>회원가입</h1>
            <p>투비닥터 캠퍼스의 일원이 되어보세요!</p>
          </SignupHeader>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SignupForm onSubmit={handleSubmit}>
            <Input
              label="이름"
              type="text"
              name="name"
              placeholder="이름을 입력하세요"
              value={formValues.name}
              onChange={handleChange}
              error={formErrors.name}
              fullWidth
              variant="outlined"
            />

            <Input
              label="이메일"
              type="email"
              name="email"
              placeholder="이메일을 입력하세요"
              value={formValues.email}
              onChange={handleChange}
              error={formErrors.email}
              fullWidth
              variant="outlined"
            />

            <Input
              label="비밀번호"
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={formValues.password}
              onChange={handleChange}
              error={formErrors.password}
              fullWidth
              variant="outlined"
            />

            <Input
              label="비밀번호 확인"
              type="password"
              name="confirmPassword"
              placeholder="비밀번호를 다시 입력하세요"
              value={formValues.confirmPassword}
              onChange={handleChange}
              error={formErrors.confirmPassword}
              fullWidth
              variant="outlined"
            />

            <AgreementSection>
              <AgreementItem>
                <AgreementLabel>
                  <AgreementCheckbox
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={() => setAgreeTerms(!agreeTerms)}
                    required
                  />
                  <span>이용약관 동의 (필수)</span>
                </AgreementLabel>
                <AgreementLink to="/terms" target="_blank">
                  보기
                </AgreementLink>
              </AgreementItem>

              <AgreementItem>
                <AgreementLabel>
                  <AgreementCheckbox
                    type="checkbox"
                    checked={agreePrivacy}
                    onChange={() => setAgreePrivacy(!agreePrivacy)}
                    required
                  />
                  <span>개인정보처리방침 동의 (필수)</span>
                </AgreementLabel>
                <AgreementLink to="/privacy" target="_blank">
                  보기
                </AgreementLink>
              </AgreementItem>

              <AgreementItem>
                <AgreementLabel>
                  <AgreementCheckbox
                    type="checkbox"
                    checked={agreeMarketing}
                    onChange={() => setAgreeMarketing(!agreeMarketing)}
                  />
                  <span>마케팅 정보 수신 동의 (선택)</span>
                </AgreementLabel>
              </AgreementItem>
            </AgreementSection>

            <SignupButton type="submit" fullWidth isLoading={loading}>
              회원가입
            </SignupButton>

            <LoginPrompt>
              이미 계정이 있으신가요?{' '}
              <LoginLink to="/login">로그인</LoginLink>
            </LoginPrompt>
          </SignupForm>

          <Divider>또는</Divider>

          <SocialSignupButtons>
            <SocialButton type="button" variant="outline" fullWidth>
              Google로 계속하기
            </SocialButton>
            <SocialButton type="button" variant="outline" fullWidth>
              Facebook으로 계속하기
            </SocialButton>
          </SocialSignupButtons>
        </SignupCard>
      </SignupContainer>
    </Layout>
  );
};

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: ${({ theme }) => theme.spacing.md};
`;

const SignupCard = styled(Card)`
  width: 100%;
  max-width: 480px;
  padding: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const SignupHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  h1 {
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.text};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ErrorMessage = styled.div`
  background-color: rgba(255, 82, 82, 0.1);
  color: ${({ theme }) => theme.colors.error};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const AgreementSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const AgreementItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AgreementLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
`;

const AgreementCheckbox = styled.input`
  cursor: pointer;
`;

const AgreementLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const SignupButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LoginLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  
  &::before {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
  
  &::after {
    margin-left: ${({ theme }) => theme.spacing.sm};
  }
`;

const SocialSignupButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SocialButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Signup;