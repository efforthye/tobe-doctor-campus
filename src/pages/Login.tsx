import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login, resetAuthError } from '../store/slices/authSlice';
import { RootState } from '../store';
import Layout from '../components/layout/Layout';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<LoginFormValues>>({});
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
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
    if (formErrors[name as keyof LoginFormValues]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<LoginFormValues> = {};
    let isValid = true;

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

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(login({ email: formValues.email, password: formValues.password }));
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <Layout>
      <LoginContainer>
        <LoginCard variant="elevated">
          <LoginHeader>
            <h1>로그인</h1>
            <p>투비닥터 캠퍼스에 오신 것을 환영합니다!</p>
          </LoginHeader>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <LoginForm onSubmit={handleSubmit}>
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

            <RememberMeRow>
              <RememberMeLabel>
                <RememberMeCheckbox
                  type="checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                />
                <span>로그인 상태 유지</span>
              </RememberMeLabel>
              <ForgotPasswordLink to="/forgot-password">
                비밀번호를 잊으셨나요?
              </ForgotPasswordLink>
            </RememberMeRow>

            <LoginButton type="submit" fullWidth isLoading={loading}>
              로그인
            </LoginButton>

            <SignUpPrompt>
              계정이 없으신가요?{' '}
              <SignUpLink to="/signup">회원가입</SignUpLink>
            </SignUpPrompt>
          </LoginForm>

          <Divider>또는</Divider>

          <SocialLoginButtons>
            <SocialButton type="button" variant="outline" fullWidth>
              Google로 계속하기
            </SocialButton>
            <SocialButton type="button" variant="outline" fullWidth>
              Facebook으로 계속하기
            </SocialButton>
          </SocialLoginButtons>
        </LoginCard>
      </LoginContainer>
    </Layout>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: ${({ theme }) => theme.spacing.md};
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 480px;
  padding: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`;

const LoginHeader = styled.div`
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

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const RememberMeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const RememberMeLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
`;

const RememberMeCheckbox = styled.input`
  cursor: pointer;
`;

const ForgotPasswordLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const SignUpPrompt = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SignUpLink = styled(Link)`
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

const SocialLoginButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SocialButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Login;