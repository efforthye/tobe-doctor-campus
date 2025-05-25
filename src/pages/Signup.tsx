import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';

interface SignupFormValues {
  email: string;
  name: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  password: string;
  confirmPassword: string;
  userType: 'student' | 'doctor';
  university?: string;
  department?: string;
  licenseNumber?: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<SignupFormValues>({
    email: '',
    name: '',
    birthYear: '',
    birthMonth: '',
    birthDay: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    university: '',
    department: '',
    licenseNumber: ''
  });

  const [dropdownStates, setDropdownStates] = useState({
    year: false,
    month: false,
    day: false,
    university: false,
    department: false
  });

  const [agreements, setAgreements] = useState({
    all: false,
    age: false,
    terms: false,
    privacy: false,
    marketing: false
  });

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  // 생년월일 옵션 생성
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // 전체 동의 처리
  useEffect(() => {
    if (agreements.age && agreements.terms && agreements.privacy && agreements.marketing) {
      setAgreements(prev => ({ ...prev, all: true }));
    } else {
      setAgreements(prev => ({ ...prev, all: false }));
    }
  }, [agreements.age, agreements.terms, agreements.privacy, agreements.marketing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (type: 'student' | 'doctor') => {
    setFormValues(prev => ({ ...prev, userType: type }));
  };

  const handleDropdownToggle = (dropdown: keyof typeof dropdownStates) => {
    setDropdownStates(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleDropdownSelect = (dropdown: keyof typeof dropdownStates, value: string) => {
    if (dropdown === 'year') {
      setFormValues(prev => ({ ...prev, birthYear: value }));
    } else if (dropdown === 'month') {
      setFormValues(prev => ({ ...prev, birthMonth: value }));
    } else if (dropdown === 'day') {
      setFormValues(prev => ({ ...prev, birthDay: value }));
    }
    
    setDropdownStates(prev => ({ ...prev, [dropdown]: false }));
  };

  const handleEmailVerification = () => {
    setIsEmailVerified(true);
  };

  const handlePhoneVerification = () => {
    setIsPhoneVerified(true);
  };

  const handleImageUpload = () => {
    setIsImageUploaded(true);
  };

  const handleAllAgreementChange = () => {
    const newState = !agreements.all;
    setAgreements({
      all: newState,
      age: newState,
      terms: newState,
      privacy: newState,
      marketing: newState
    });
  };

  const handleAgreementChange = (key: keyof typeof agreements) => {
    setAgreements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/signup-complete');
  };

  const isFormValid = () => {
    return agreements.age && agreements.terms && agreements.privacy && 
           isEmailVerified && isPhoneVerified && isImageUploaded &&
           formValues.email && formValues.name && formValues.password && 
           formValues.confirmPassword && formValues.birthYear && 
           formValues.birthMonth && formValues.birthDay;
  };

  return (
    <Layout>
      <MainContainer>
        <Title>회원가입</Title>
        
        <FormContainer>
          <form onSubmit={handleSubmit}>
            {/* 이메일 */}
            <FormGroup>
              <FormLabel>이메일</FormLabel>
              <EmailInputGroup>
                <EmailInput
                  type="email"
                  name="email"
                  placeholder="이메일을 입력해주세요."
                  value={formValues.email}
                  onChange={handleInputChange}
                  disabled={isEmailVerified}
                  className={isEmailVerified ? 'verified' : ''}
                />
                <EmailButton 
                  type="button"
                  onClick={handleEmailVerification}
                  disabled={isEmailVerified}
                >
                  {isEmailVerified ? '확인 완료' : '중복 확인'}
                </EmailButton>
              </EmailInputGroup>
            </FormGroup>

            {/* 이름 */}
            <FormGroup>
              <FormLabel>이름</FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="이름을 입력해주세요."
                value={formValues.name}
                onChange={handleInputChange}
              />
            </FormGroup>

            {/* 생년월일 */}
            <FormGroup>
              <FormLabel>생년월일</FormLabel>
              <BirthContainer>
                <DropdownContainer>
                  <DropdownButton 
                    type="button"
                    onClick={() => handleDropdownToggle('year')}
                    isOpen={dropdownStates.year}
                  >
                    <span>{formValues.birthYear || '연'}</span>
                    <ChevronIcon isOpen={dropdownStates.year}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M11.07 6.40L8 9.47L4.93 6.40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </ChevronIcon>
                  </DropdownButton>
                  {dropdownStates.year && (
                    <DropdownMenu>
                      {years.map(year => (
                        <DropdownItem
                          key={year}
                          onClick={() => handleDropdownSelect('year', year.toString())}
                        >
                          {year}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </DropdownContainer>

                <DropdownContainer>
                  <DropdownButton 
                    type="button"
                    onClick={() => handleDropdownToggle('month')}
                    isOpen={dropdownStates.month}
                  >
                    <span>{formValues.birthMonth || '월'}</span>
                    <ChevronIcon isOpen={dropdownStates.month}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M11.07 6.40L8 9.47L4.93 6.40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </ChevronIcon>
                  </DropdownButton>
                  {dropdownStates.month && (
                    <DropdownMenu>
                      {months.map(month => (
                        <DropdownItem
                          key={month}
                          onClick={() => handleDropdownSelect('month', month.toString())}
                        >
                          {month}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </DropdownContainer>

                <DropdownContainer>
                  <DropdownButton 
                    type="button"
                    onClick={() => handleDropdownToggle('day')}
                    isOpen={dropdownStates.day}
                  >
                    <span>{formValues.birthDay || '일'}</span>
                    <ChevronIcon isOpen={dropdownStates.day}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M11.07 6.40L8 9.47L4.93 6.40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </ChevronIcon>
                  </DropdownButton>
                  {dropdownStates.day && (
                    <DropdownMenu>
                      {days.map(day => (
                        <DropdownItem
                          key={day}
                          onClick={() => handleDropdownSelect('day', day.toString())}
                        >
                          {day}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </DropdownContainer>
              </BirthContainer>
            </FormGroup>

            {/* 휴대폰 본인인증 */}
            <FormGroup>
              <SectionTitle>휴대폰 본인인증</SectionTitle>
              <SectionDescription>본인 명의의 휴대폰으로 실명 인증을 하실 수 있습니다.</SectionDescription>
              <ActionButton 
                type="button"
                onClick={handlePhoneVerification}
                disabled={isPhoneVerified}
              >
                {isPhoneVerified ? '인증 완료' : '휴대폰 인증'}
              </ActionButton>
            </FormGroup>

            {/* 비밀번호 */}
            <FormGroup>
              <FormLabel>비밀번호</FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요."
                value={formValues.password}
                onChange={handleInputChange}
              />
              <Input
                type="password"
                name="confirmPassword"
                placeholder="비밀번호를 다시 입력해주세요."
                value={formValues.confirmPassword}
                onChange={handleInputChange}
              />
              <InputHelp>영문 대소문자, 숫자를 조합하여 8자 이상 16자 이하로 입력해주세요.</InputHelp>
            </FormGroup>

            {/* 회원 자격 확인 */}
            <FormGroup>
              <FormLabel>회원 자격 확인</FormLabel>
              <SectionDescription>
                회원 자격 확인을 위해 제출해주신 정보를 바탕으로 관리자 확인을 거쳐 회원가입이 최종 승인됩니다. 
                제출해주신 정보가 허위로 판명될 시 회원가입이 취소될 수 있습니다.
              </SectionDescription>
              
              <ToggleGroup>
                <ToggleButton
                  type="button"
                  className={formValues.userType === 'student' ? 'active' : ''}
                  onClick={() => handleUserTypeChange('student')}
                >
                  의대생
                </ToggleButton>
                <ToggleButton
                  type="button"
                  className={formValues.userType === 'doctor' ? 'active' : ''}
                  onClick={() => handleUserTypeChange('doctor')}
                >
                  의사
                </ToggleButton>
              </ToggleGroup>

              {formValues.userType === 'student' ? (
                <div>
                  <Input
                    type="text"
                    placeholder="소속 대학을 선택해주세요."
                    value={formValues.university || ''}
                    readOnly
                  />
                  <UploadSection>
                    <UploadDescription>
                      이름, 소속 대학, 학번이 식별 가능한 학생증 혹은 재학증명서 이미지를 업로드해주세요.
                    </UploadDescription>
                    <UploadButton 
                      type="button"
                      onClick={handleImageUpload}
                      disabled={isImageUploaded}
                    >
                      {isImageUploaded ? '업로드 완료' : '이미지 업로드'}
                    </UploadButton>
                  </UploadSection>
                </div>
              ) : (
                <div>
                  <MedicalDescription>
                    투비닥터 캠퍼스는 보건복지부 면허민원 서비스를 통해 면허번호 인증 절차를 진행하고 있습니다.
                  </MedicalDescription>
                  <Input
                    type="text"
                    placeholder="진료과를 선택해주세요."
                    value={formValues.department || ''}
                    readOnly
                  />
                  <Input
                    type="text"
                    name="licenseNumber"
                    placeholder="면허번호를 입력해주세요."
                    value={formValues.licenseNumber || ''}
                    onChange={handleInputChange}
                  />
                </div>
              )}
            </FormGroup>

            {/* 약관 동의 */}
            <CheckboxGroup>
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  id="check-all"
                  checked={agreements.all}
                  onChange={handleAllAgreementChange}
                />
                <CheckboxLabel htmlFor="check-all" className="bold">전체 동의</CheckboxLabel>
              </CheckboxWrapper>
              
              <Divider />
              
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  id="check-age"
                  checked={agreements.age}
                  onChange={() => handleAgreementChange('age')}
                />
                <CheckboxLabel htmlFor="check-age">[필수] 만 14세 이상입니다.</CheckboxLabel>
              </CheckboxWrapper>
              
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  id="check-terms"
                  checked={agreements.terms}
                  onChange={() => handleAgreementChange('terms')}
                />
                <CheckboxLabel htmlFor="check-terms">[필수] 투비닥터 캠퍼스 이용약관 동의</CheckboxLabel>
                <ChevronRight>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </ChevronRight>
              </CheckboxWrapper>
              
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  id="check-privacy"
                  checked={agreements.privacy}
                  onChange={() => handleAgreementChange('privacy')}
                />
                <CheckboxLabel htmlFor="check-privacy">[필수] 투비닥터 캠퍼스 개인정보 수집 및 이용 동의</CheckboxLabel>
                <ChevronRight>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </ChevronRight>
              </CheckboxWrapper>
              
              <CheckboxWrapper>
                <CheckboxInput
                  type="checkbox"
                  id="check-marketing"
                  checked={agreements.marketing}
                  onChange={() => handleAgreementChange('marketing')}
                />
                <CheckboxLabel htmlFor="check-marketing">[선택] 마케팅 목적의 개인정보 수집 및 이용 동의</CheckboxLabel>
                <ChevronRight>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </ChevronRight>
              </CheckboxWrapper>
            </CheckboxGroup>

            {/* 가입하기 버튼 */}
            <ButtonWrapper>
              <ActionButton
                type="submit"
                disabled={!isFormValid()}
              >
                가입하기
              </ActionButton>
            </ButtonWrapper>
          </form>
        </FormContainer>
      </MainContainer>
    </Layout>
  );
};

// 기존 스타일 유지하면서 피그마 디자인 적용
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
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 28px;
  }
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

const SectionTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: rgba(46, 47, 51, 0.88);
`;

const SectionDescription = styled.p`
  font-size: 14px;
  line-height: 1.429em;
  color: rgba(55, 56, 60, 0.61);
  margin-bottom: 16px;
`;

const MedicalDescription = styled.div`
  font-size: 13px;
  color: rgba(55, 56, 60, 0.61);
  margin-bottom: 16px;
`;

// 이메일 입력 그룹
const EmailInputGroup = styled.div`
  display: flex;
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid rgba(112, 115, 124, 0.16);
  border-radius: 12px 0 0 12px;
  font-size: 16px;
  line-height: 1.5em;
  outline: none;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.03);
  
  &::placeholder {
    color: rgba(55, 56, 60, 0.28);
  }
  
  &:focus {
    border-color: #448181;
    border-width: 2px;
  }
  
  &:disabled {
    background-color: rgba(68, 129, 129, 0.05);
  }
  
  &.verified {
    border-color: #448181;
    background-color: rgba(68, 129, 129, 0.05);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    border-radius: 12px;
    margin-bottom: 8px;
  }
`;

const EmailButton = styled.button`
  padding: 12px 16px;
  border: 1px solid rgba(112, 115, 124, 0.16);
  border-left: none;
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
    border-left: 1px solid rgba(112, 115, 124, 0.16);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(112, 115, 124, 0.16);
  border-radius: 12px;
  font-size: 16px;
  line-height: 1.5em;
  outline: none;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.03);
  
  &::placeholder {
    color: rgba(55, 56, 60, 0.28);
  }
  
  &:focus {
    border-color: #448181;
    border-width: 2px;
  }
  
  & + & {
    margin-top: 8px;
  }
`;

const InputHelp = styled.p`
  font-size: 12px;
  line-height: 1.334em;
  color: rgba(55, 56, 60, 0.61);
  margin-top: 4px;
`;

// 생년월일 드롭다운
const BirthContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
`;

const DropdownContainer = styled.div`
  flex: 1;
  position: relative;
`;

const DropdownButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  height: 48px;
  padding: 12px;
  border: ${props => props.isOpen ? '2px solid #448181' : '1px solid rgba(112, 115, 124, 0.16)'};
  border-radius: 12px;
  background: white;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  
  span {
    color: rgba(55, 56, 60, 0.28);
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
  }
`;

const ChevronIcon = styled.div<{ isOpen: boolean }>`
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
  color: rgba(55, 56, 60, 0.61);
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  max-height: 400px;
  background: white;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.04);
  border-radius: 16px;
  border: 1px solid #EAEBEC;
  z-index: 10;
  overflow-y: auto;
  padding: 8px 20px;
`;

const DropdownItem = styled.div`
  padding: 12px 0;
  color: #171719;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  cursor: pointer;
  border-radius: 12px;
  
  &:hover {
    background: rgba(23, 23, 25, 0.04);
  }
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

// 회원 자격 확인 토글
const ToggleGroup = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  position: relative;
`;

const ToggleButton = styled.button`
  flex: 1;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;
  background-color: white;
  border: 1px solid rgba(112, 115, 124, 0.22);
  font-size: 17px;
  font-weight: 500;
  color: rgba(55, 56, 60, 0.61);
  position: relative;
  z-index: 1;
  
  &:first-child {
    border-radius: 12px 0 0 12px;
  }
  
  &:last-child {
    border-radius: 0 12px 12px 0;
    margin-left: -1px;
  }
  
  &.active {
    border-color: #448181;
    color: #448181;
    background-color: rgba(68, 129, 129, 0.05);
    z-index: 2;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`;

const UploadSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
`;

const UploadDescription = styled.div`
  flex: 1;
  color: rgba(55, 56, 60, 0.61);
  font-size: 13px;
  line-height: 18px;
`;

const UploadButton = styled.button`
  padding: 12px 28px;
  background: transparent;
  border: 1px solid #448181;
  border-radius: 12px;
  color: #448181;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  
  &:disabled {
    background: #F4F4F5;
    border-color: rgba(112, 115, 124, 0.08);
    color: rgba(55, 56, 60, 0.28);
    cursor: not-allowed;
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
  flex: 1;
  
  &.bold {
    font-weight: 600;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 14px;
  }
`;

const ChevronRight = styled.div`
  color: #171719;
  cursor: pointer;
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

export default Signup;