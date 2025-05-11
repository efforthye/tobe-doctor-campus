import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login, resetAuthError } from '../store/slices/authSlice';
import { RootState } from '../store';
import Layout from '../components/layout/Layout';
import { useAppDispatch } from '../hooks/useAppDispatch';

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

  return (
    <Layout>
      <MainContainer>
        <Title>로그인</Title>
        
        <FormContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <form onSubmit={handleSubmit}>
            {/* 이메일 입력 */}
            <FormGroup>
              <FormLabel>이메일</FormLabel>
              <InputContainer className={formErrors.email ? 'error' : ''}>
                <Input
                  type="email"
                  name="email"
                  placeholder="이메일을 입력해주세요."
                  value={formValues.email}
                  onChange={handleChange}
                />
              </InputContainer>
              {formErrors.email && <InputHelp error>{formErrors.email}</InputHelp>}
            </FormGroup>
            
            {/* 비밀번호 입력 */}
            <FormGroup>
              <FormLabel>비밀번호</FormLabel>
              <InputContainer className={formErrors.password ? 'error' : ''}>
                <Input
                  type="password"
                  name="password"
                  placeholder="비밀번호를 입력해주세요."
                  value={formValues.password}
                  onChange={handleChange}
                />
              </InputContainer>
              {formErrors.password && <InputHelp error>{formErrors.password}</InputHelp>}
            </FormGroup>
            
            {/* 로그인 버튼 */}
            <ButtonWrapper>
              <ActionButton 
                type="submit" 
                disabled={loading}
              >
                {loading ? '처리 중...' : '로그인'}
              </ActionButton>
            </ButtonWrapper>
            
            <SignupPrompt>
              아직 계정이 없으신가요? <SignupLink to="/signup">회원가입</SignupLink>
            </SignupPrompt>
          </form>
        </FormContainer>
      </MainContainer>
    </Layout>
  );
};

// 스타일 컴포넌트
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  padding: 128px 20px 160px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 100px 16px 120px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 80px 16px 100px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 40px;
  line-height: 1.3em;
  margin-bottom: 64px;
  text-align: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 36px;
    margin-bottom: 40px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 32px;
    margin-bottom: 32px;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.429em;
  text-align: left;
`;

const InputContainer = styled.div`
  display: flex;
  border: 1px solid rgba(112, 115, 124, 0.16);
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.03);
  
  &.error {
    border-color: #ff5252;
  }
`;

const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  line-height: 1.5em;
  color: rgba(46, 47, 51, 0.88);
  
  &::placeholder {
    color: rgba(55, 56, 60, 0.28);
  }
`;

const InputHelp = styled.p<{ error?: boolean }>`
  font-size: 12px;
  line-height: 1.334em;
  color: ${props => props.error ? '#ff5252' : 'rgba(55, 56, 60, 0.61)'};
  margin-top: 4px;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;

const ActionButton = styled.button`
  height: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #448181;
  color: #FFFFFF;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  padding: 16px 28px;
  transition: background-color 0.2s;
  
  &:disabled {
    background-color: #F4F4F5;
    color: rgba(55, 56, 60, 0.28);
    cursor: not-allowed;
  }
`;

const SignupPrompt = styled.div`
  text-align: center;
  font-size: 14px;
  color: rgba(55, 56, 60, 0.61);
`;

const SignupLink = styled(Link)`
  color: #448181;
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default Login;