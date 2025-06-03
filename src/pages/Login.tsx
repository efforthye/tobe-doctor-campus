import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login, resetAuthError } from '../store/slices/authSlice';
import { RootState } from '../store';
import Layout from '../components/layout/Layout';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { ReactComponent as PasswordEyeIcon } from '../assets/password_eye.svg';
import { ReactComponent as LoginCheckIcon } from '../assets/login-check.svg';

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
  const [showPassword, setShowPassword] = useState(false); // 기본값: 비밀번호 가림
  const [keepLoggedIn, setKeepLoggedIn] = useState(false); // 로그인 유지 상태

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleKeepLoggedIn = () => {
    setKeepLoggedIn(!keepLoggedIn);
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
            <FormGroup hasBottomMargin>
              <FormLabel>이메일</FormLabel>
              <EmailInput
                type="email"
                name="email"
                placeholder="이메일을 입력해주세요."
                value={formValues.email}
                onChange={handleChange}
                className={formErrors.email ? 'error' : ''}
              />
              {formErrors.email && <InputHelp error>{formErrors.email}</InputHelp>}
            </FormGroup>
            
            {/* 비밀번호 입력 */}
            <FormGroup>
              <FormLabel>비밀번호</FormLabel>
              <PasswordInputWrapper>
                <PasswordInput
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="비밀번호를 입력해주세요."
                  value={formValues.password}
                  onChange={handleChange}
                  className={formErrors.password ? 'error' : ''}
                />
                <EyeIconWrapper onClick={togglePasswordVisibility}>
                  <PasswordEyeIcon width={22} height={22} />
                </EyeIconWrapper>
              </PasswordInputWrapper>
              {formErrors.password && <InputHelp error>{formErrors.password}</InputHelp>}
            </FormGroup>
            
            {/* 로그인 유지 체크박스 */}
            <KeepLoggedInWrapper>
              <CheckboxWrapper onClick={toggleKeepLoggedIn}>
                {/* 실제 input 제거 - DOM 변화 방지 */}
                <CheckboxCustom checked={keepLoggedIn}>
                  <LoginCheckIcon style={{opacity: keepLoggedIn ? 1 : 0}} />
                </CheckboxCustom>
              </CheckboxWrapper>
              <CheckboxLabel onClick={toggleKeepLoggedIn}>
                로그인 유지
              </CheckboxLabel>
            </KeepLoggedInWrapper>
            
            {/* 로그인 버튼 */}
            <LoginButton 
              type="submit" 
              disabled={loading}
            >
              {loading ? '처리 중...' : '로그인'}
            </LoginButton>
            
            {/* 링크 버튼들 */}
            <LinkButtonsRow>
              <LinkButton to="/signup">회원가입</LinkButton>
              <LinkButton to="/forgot-password">비밀번호 찾기</LinkButton>
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

const FormGroup = styled.div<{ hasBottomMargin?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  margin-bottom: ${props => props.hasBottomMargin ? '36px' : '0'};
`;

const FormLabel = styled.label`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.429em;
  color: rgba(46, 47, 51, 0.88);
`;

// 이메일 입력 컴포넌트
const EmailInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(112, 115, 124, 0.16);
  border-radius: 12px;
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
  
  &:focus {
    border-color: rgba(112, 115, 124, 0.16); /* 포커스 시에도 기본 회색 유지 */
  }
`;

// 비밀번호 입력 관련 컴포넌트들
const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 12px;
  padding-right: 44px; /* 아이콘 공간 확보 (22px 아이콘 + 12px 여백 + 10px 추가 여백) */
  border: 1px solid rgba(112, 115, 124, 0.16);
  border-radius: 12px;
  font-size: 16px;
  line-height: 1.5em;
  outline: none;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
  
  &::placeholder {
    color: rgba(55, 56, 60, 0.28);
  }
  
  &.error {
    border-color: #ff5252;
  }
  
  &:focus {
    border-color: rgba(112, 115, 124, 0.16); /* 포커스 시에도 기본 회색 유지 */
  }
`;

const EyeIconWrapper = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
  
  &:active {
    opacity: 0.6;
  }
  
  svg {
    pointer-events: none;
  }
`;

// 로그인 유지 체크박스 스타일
const KeepLoggedInWrapper = styled.div`
  width: 335px;
  height: 20px;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
  display: inline-flex;
  margin-top: 8px;
  margin-bottom: 0; /* 하단 마진 완전 제거 */
  flex-shrink: 0;
  position: relative; /* 위치 고정 */
`;

const CheckboxWrapper = styled.div`
  width: 20px; /* 고정 너비 */
  height: 20px; /* 고정 높이 */
  padding: 2px;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  cursor: pointer;
  flex-shrink: 0;
  box-sizing: border-box;
`;

const CheckboxInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 16px;
  height: 16px;
  margin: 0;
  cursor: pointer;
`;

const CheckboxCustom = styled.div<{ checked: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 5px;
  border: 1.5px solid rgba(112, 115, 124, 0.22);
  background-color: ${props => props.checked ? '#448181' : 'transparent'};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  contain: layout style paint; /* 레이아웃 격리 */
  
  ${props => props.checked && `
    border-color: #448181;
  `}
  
  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
    transition: none; /* 모든 transition 제거 */
  }
`;

const CheckboxLabel = styled.div`
  flex: 1 1 0;
  color: #171719;
  font-size: 14px;
  font-family: 'Pretendard JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 400;
  line-height: 20.01px;
  letter-spacing: 0.20px;
  word-wrap: break-word;
  cursor: pointer;
  user-select: none;
  align-self: flex-start; /* 텍스트 위치 고정 */
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
  line-height: 1.5em;
  cursor: pointer;
  padding: 12px 28px;
  margin-top: 44px; /* 고정 마진 (8px + 36px) */
  margin-bottom: 36px;
  min-height: 48px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative; /* 위치 고정 */
  flex-shrink: 0; /* 크기 고정 */
  
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
  gap: 96px;
`;

const LinkButton = styled(Link)`
  color: #448181;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
`;

export default Login;