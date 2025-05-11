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
        <SloganSection>
          <SloganText>젊은 의사의 학습 러닝메이트,</SloganText>
          <SloganTitle>투비닥터 캠퍼스</SloganTitle>
        </SloganSection>
        
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
            <LoginButton 
              type="submit" 
              disabled={loading}
            >
              {loading ? '처리 중...' : '로그인'}
            </LoginButton>
            
            {/* 링크 버튼들 */}
            <LinkButtonsRow>
              <LinkButton to="/forgot-password">비밀번호 찾기</LinkButton>
              <LinkButton to="/signup">회원가입</LinkButton>
            </LinkButtonsRow>
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
  font-size: 28px;
  font-weight: 400;
  line-height: 1.36;
  letter-spacing: -2.36%;
  color: #171719;
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
  margin-bottom: 16px;
`;

const FormLabel = styled.label`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.429em;
  color: rgba(46, 47, 51, 0.88);
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

const LoginButton = styled.button`
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
  gap: 96px;
`;

const LinkButton = styled(Link)`
  color: rgba(55, 56, 60, 0.61);
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    color: #448181;
  }
`;

export default Login;