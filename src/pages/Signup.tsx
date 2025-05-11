import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register, resetAuthError } from '../store/slices/authSlice';
import { RootState } from '../store';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { useAppDispatch } from '../hooks/useAppDispatch';

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

enum UserType {
  DOCTOR = 'doctor',
  STUDENT = 'student'
}

const Signup: React.FC = () => {
  const [formValues, setFormValues] = useState<SignupFormValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<SignupFormValues>>({});
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [licenseVerified, setLicenseVerified] = useState(false);
  const [userType, setUserType] = useState<UserType>(UserType.DOCTOR);
  const [agreeAll, setAgreeAll] = useState(false);
  const [agreeAge, setAgreeAge] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  // 리다이렉트 처리
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    dispatch(resetAuthError());
  }, [isAuthenticated, navigate, dispatch]);

  // 전체 동의 처리
  useEffect(() => {
    if (agreeAge && agreeTerms && agreePrivacy && agreeMarketing) {
      setAgreeAll(true);
    } else {
      setAgreeAll(false);
    }
  }, [agreeAge, agreeTerms, agreePrivacy, agreeMarketing]);

  const handleChangeUserType = (type: UserType) => {
    setUserType(type);
    setLicenseVerified(false); // 회원 유형 변경 시 인증 상태 초기화
  };

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

  const verifyEmail = () => {
    if (!formValues.email) {
      setFormErrors({
        ...formErrors,
        email: '이메일을 입력해주세요'
      });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      setFormErrors({
        ...formErrors,
        email: '유효한 이메일 주소를 입력해주세요'
      });
      return;
    }
    
    // 이메일 중복 확인 요청 (실제로는 API 호출)
    // 데모 목적으로 성공으로 처리
    setEmailVerified(true);
    alert('이메일 확인이 완료되었습니다.');
  };

  const verifyPhone = () => {
    // 실제로는 휴대폰 본인인증 API 호출
    // 데모 목적으로 성공으로 처리
    setPhoneVerified(true);
    alert('휴대폰 본인인증이 완료되었습니다.');
  };

  const verifyLicense = () => {
    // 실제로는 면허 인증 API 호출 또는 파일 업로드 처리
    // 데모 목적으로 성공으로 처리
    setLicenseVerified(true);
    alert(userType === UserType.DOCTOR ? '면허 인증이 완료되었습니다.' : '학생증 이미지가 업로드되었습니다.');
  };

  const handleAllAgreementChange = () => {
    const newState = !agreeAll;
    setAgreeAll(newState);
    setAgreeAge(newState);
    setAgreeTerms(newState);
    setAgreePrivacy(newState);
    setAgreeMarketing(newState);
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

    if (!emailVerified) {
      errors.email = '이메일 중복 확인이 필요합니다';
      isValid = false;
    }

    if (!phoneVerified) {
      isValid = false;
      alert('휴대폰 본인인증이 필요합니다.');
    }

    if (!licenseVerified) {
      isValid = false;
      alert(userType === UserType.DOCTOR ? '면허 인증이 필요합니다.' : '학생증 이미지 업로드가 필요합니다.');
    }

    if (!formValues.password) {
      errors.password = '비밀번호를 입력해주세요';
      isValid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/.test(formValues.password)) {
      errors.password = '비밀번호는 영문 대소문자, 숫자를 조합하여 8자 이상 16자 이하로 입력해주세요';
      isValid = false;
    }

    if (!formValues.confirmPassword) {
      errors.confirmPassword = '비밀번호 확인을 입력해주세요';
      isValid = false;
    } else if (formValues.password !== formValues.confirmPassword) {
      errors.confirmPassword = '비밀번호가 일치하지 않습니다';
      isValid = false;
    }

    if (!agreeAge || !agreeTerms || !agreePrivacy) {
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
      <MainContainer>
        <Title>회원 가입</Title>
        
        <FormContainer>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <form onSubmit={handleSubmit}>
            {/* 이메일 입력 */}
            <FormGroup>
              <FormLabel>이메일</FormLabel>
              <InputWrapper>
                <InputContainer className={emailVerified ? 'verified' : (formErrors.email ? 'error' : '')}>
                  <Input
                    type="email"
                    name="email"
                    placeholder="이메일을 입력해주세요."
                    value={formValues.email}
                    onChange={handleChange}
                    disabled={emailVerified}
                  />
                </InputContainer>
                <InputButton 
                  type="button" 
                  onClick={verifyEmail}
                  disabled={emailVerified}
                >
                  {emailVerified ? '확인 완료' : '중복 확인'}
                </InputButton>
              </InputWrapper>
              {formErrors.email && <InputHelp error>{formErrors.email}</InputHelp>}
            </FormGroup>
            
            {/* 이름 입력 */}
            <FormGroup>
              <FormLabel>이름</FormLabel>
              <InputWrapper>
                <InputContainer className={formErrors.name ? 'error' : ''}>
                  <Input
                    type="text"
                    name="name"
                    placeholder="이름을 입력해주세요."
                    value={formValues.name}
                    onChange={handleChange}
                  />
                </InputContainer>
              </InputWrapper>
              {formErrors.name && <InputHelp error>{formErrors.name}</InputHelp>}
            </FormGroup>
            
            {/* 휴대폰 본인인증 */}
            <FormGroup>
              <SectionTitle>휴대폰 본인인증</SectionTitle>
              <SectionDescription>본인 명의의 휴대폰으로 실명 인증을 하실 수 있습니다.</SectionDescription>
              <ActionButton 
                type="button" 
                onClick={verifyPhone} 
                disabled={phoneVerified}
              >
                {phoneVerified ? '인증 완료' : '휴대폰 인증'}
              </ActionButton>
            </FormGroup>
            
            {/* 비밀번호 입력 */}
            <FormGroup>
              <FormLabel>비밀번호</FormLabel>
              <InputWrapper>
                <InputContainer className={formErrors.password ? 'error' : ''}>
                  <Input
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={formValues.password}
                    onChange={handleChange}
                  />
                </InputContainer>
              </InputWrapper>
              
              <InputWrapper>
                <InputContainer className={formErrors.confirmPassword ? 'error' : ''}>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="비밀번호를 다시 입력해주세요."
                    value={formValues.confirmPassword}
                    onChange={handleChange}
                  />
                </InputContainer>
              </InputWrapper>
              <InputHelp>영문 대소문자, 숫자를 조합하여 8자 이상 16자 이하로 입력해주세요.</InputHelp>
              {formErrors.password && <InputHelp error>{formErrors.password}</InputHelp>}
              {formErrors.confirmPassword && <InputHelp error>{formErrors.confirmPassword}</InputHelp>}
            </FormGroup>
            
            {/* 회원 자격 확인 */}
            <FormGroup>
              <FormLabel>회원 자격 확인</FormLabel>
              <SegmentedControl>
                <SegmentButton
                  type="button"
                  className={userType === UserType.STUDENT ? 'active' : ''}
                  onClick={() => handleChangeUserType(UserType.STUDENT)}
                >
                  의대생
                </SegmentButton>
                <SegmentButton
                  type="button"
                  className={userType === UserType.DOCTOR ? 'active' : ''}
                  onClick={() => handleChangeUserType(UserType.DOCTOR)}
                >
                  의사
                </SegmentButton>
              </SegmentedControl>
              
              {userType === UserType.STUDENT ? (
                <div>
                  <SectionDescription>
                    이름, 소속 대학, 학번이 식별 가능한 학생증 혹은 재학증명서 이미지를 업로드해주세요.
                  </SectionDescription>
                  <ActionButton 
                    type="button" 
                    onClick={verifyLicense}
                    disabled={licenseVerified}
                  >
                    {licenseVerified ? '업로드 완료' : '이미지 업로드'}
                  </ActionButton>
                </div>
              ) : (
                <div>
                  <SectionDescription>
                    면허 정보 인증 후 가입하실 수 있습니다.
                  </SectionDescription>
                  <ActionButton 
                    type="button" 
                    onClick={verifyLicense}
                    disabled={licenseVerified}
                  >
                    {licenseVerified ? '인증 완료' : '면허 인증하기'}
                  </ActionButton>
                </div>
              )}
            </FormGroup>
            
            {/* 약관 동의 */}
            <CheckboxGroup>
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  id="check-all"
                  checked={agreeAll}
                  onChange={handleAllAgreementChange}
                />
                <CheckboxLabel htmlFor="check-all" className="bold">전체 동의</CheckboxLabel>
              </CheckboxWrapper>
              
              <Divider />
              
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  id="check-age"
                  checked={agreeAge}
                  onChange={() => setAgreeAge(!agreeAge)}
                />
                <CheckboxLabel htmlFor="check-age">[필수] 만 14세 이상입니다.</CheckboxLabel>
              </CheckboxWrapper>
              
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  id="check-terms"
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                />
                <CheckboxLabel htmlFor="check-terms">[필수] 투비닥터 캠퍼스 이용약관 동의</CheckboxLabel>
                <LinkWrapper>
                  <Link to="/terms">
                    <svg className="link-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                </LinkWrapper>
              </CheckboxWrapper>
              
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  id="check-privacy"
                  checked={agreePrivacy}
                  onChange={() => setAgreePrivacy(!agreePrivacy)}
                />
                <CheckboxLabel htmlFor="check-privacy">[필수] 투비닥터 캠퍼스 개인정보 수집 및 이용 동의</CheckboxLabel>
                <LinkWrapper>
                  <Link to="/privacy">
                    <svg className="link-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                </LinkWrapper>
              </CheckboxWrapper>
              
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  id="check-marketing"
                  checked={agreeMarketing}
                  onChange={() => setAgreeMarketing(!agreeMarketing)}
                />
                <CheckboxLabel htmlFor="check-marketing">[선택] 마케팅 목적의 개인정보 수집 및 이용 동의</CheckboxLabel>
                <LinkWrapper>
                  <Link to="/marketing-privacy">
                    <svg className="link-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                </LinkWrapper>
              </CheckboxWrapper>
            </CheckboxGroup>
            
            {/* 가입하기 버튼 */}
            <ButtonWrapper>
              <ActionButton 
                type="submit" 
                disabled={loading || !agreeAge || !agreeTerms || !agreePrivacy || !emailVerified || !phoneVerified || !licenseVerified}
              >
                {loading ? '처리 중...' : '가입하기'}
              </ActionButton>
            </ButtonWrapper>
            
            <LoginPrompt>
              이미 계정이 있으신가요? <LoginLink to="/login">로그인</LoginLink>
            </LoginPrompt>
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
  gap: 36px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 28px;
  }
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
  margin-bottom: 24px;
`;

const FormLabel = styled.label`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.429em;
  text-align: left;
`;

const SectionTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  text-align: left;
`;

const SectionDescription = styled.p`
  font-size: 14px;
  line-height: 1.429em;
  color: rgba(55, 56, 60, 0.61);
  margin-bottom: 16px;
  text-align: left;
`;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  border: 1px solid rgba(112, 115, 124, 0.16);
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.03);
  
  &.with-button {
    border-radius: 12px 0 0 12px;
    border-right: none;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
      border-radius: 12px;
      border-right: 1px solid rgba(112, 115, 124, 0.16);
      margin-bottom: 8px;
    }
  }
  
  &.verified {
    border-color: #448181;
    background-color: rgba(68, 129, 129, 0.05);
  }
  
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
  background: transparent;
  
  &::placeholder {
    color: rgba(55, 56, 60, 0.28);
  }
  
  &:disabled {
    background-color: transparent;
  }
`;

const InputButton = styled.button`
  padding: 12px 16px;
  border: 1px solid rgba(112, 115, 124, 0.08);
  border-radius: 0 12px 12px 0;
  background-color: #F4F4F5;
  font-weight: 600;
  font-size: 16px;
  color: rgba(55, 56, 60, 0.61);
  cursor: pointer;
  white-space: nowrap;
  
  &:disabled {
    background-color: #F4F4F5;
    color: rgba(55, 56, 60, 0.28);
    cursor: not-allowed;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 100%;
    border-radius: 12px;
    border: 1px solid rgba(112, 115, 124, 0.08);
  }
`;

const InputHelp = styled.p<{ error?: boolean }>`
  font-size: 12px;
  line-height: 1.334em;
  color: ${props => props.error ? '#ff5252' : 'rgba(55, 56, 60, 0.61)'};
  margin-top: 4px;
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

const SegmentedControl = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid rgba(112, 115, 124, 0.22);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  position: relative;
`;

const SegmentButton = styled.button`
  flex: 1;
  text-align: center;
  padding: 12px 9px;
  font-size: 17px;
  font-weight: 500;
  color: rgba(55, 56, 60, 0.61);
  cursor: pointer;
  position: relative;
  border: none;
  background: transparent;
  transition: all 0.3s;
  
  &.active {
    color: #448181;
    background-color: rgba(68, 129, 129, 0.05);
    border: 1px solid #448181;
    border-radius: 12px;
    opacity: 0.43;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 15px;
    padding: 10px 4px;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(112, 115, 124, 0.22);
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-wrap: wrap;
  }
`;

const CheckboxInput = styled.input`
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 15px;
  line-height: 1.467em;
  color: rgba(46, 47, 51, 0.88);
  
  &.bold {
    font-weight: 600;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: 28px;
    margin-top: 4px;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 24px;
  width: 100%;
`;

const LoginPrompt = styled.div`
  text-align: center;
  margin-top: 16px;
  font-size: 14px;
  color: rgba(55, 56, 60, 0.61);
`;

const LoginLink = styled(Link)`
  color: #448181;
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default Signup;