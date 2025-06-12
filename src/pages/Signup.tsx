import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import PhoneVerification from '../components/PhoneVerification';

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

interface ValidationErrors {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ValidationSuccess {
  email: string;
  password: string;
  confirmPassword: string;
  phoneVerification: string;
}

// 본인확인 결과 타입
interface VerificationResult {
  success: boolean;
  message: string;
  userData?: {
    name: string;
    phone: string;
    birthday: string;
    gender: string;
    ci: string;
    di: string;
  };
}

// 의대생 대학교 목록
const UNIVERSITIES = [
  '가천대학교', '가톨릭대학교', '강원대학교', '건국대학교', '건양대학교', '경북대학교',
  '경상대학교', '경희대학교', '계명대학교', '고려대학교', '고신대학교', '가톨릭관동대학교',
  '단국대학교', '대구가톨릭대학교', '동국대학교', '동아대학교', '부산대학교', '서울대학교',
  '성균관대학교', '순천향대학교', '아주대학교', '연세대학교', '연세대학교 미래캠퍼스',
  '영남대학교', '울산대학교', '원광대학교', '을지대학교', '이화여자대학교', '인제대학교',
  '인하대학교', '전남대학교', '전북대학교', '제주대학교', '조선대학교', '차의과학대학교',
  '중앙대학교', '충남대학교', '충북대학교', '한림대학교', '한양대학교', '기타'
];

// 의사 진료과 목록
const DEPARTMENTS = [
  '일반진료', '가정의학과', '기초의학', '내과', '마취통증의학과', '방사선종양학과',
  '병리과', '비뇨의학과', '소아청소년과', '산부인과', '성형외과', '신경과', '신경외과',
  '심장혈관흉부외과', '안과', '영상의학과', '예방의학과', '응급의학과', '이비인후과',
  '임상약리학과', '외과', '재활의학과', '정신건강의학과', '정형외과', '직업환경의학과',
  '진단검사의학과', '피부과', '핵의학과', '기타'
];

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
  const [uploadedFileName, setUploadedFileName] = useState('');

  // 유효성 검사 에러 상태
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // 유효성 검사 성공 메시지 상태
  const [validationSuccess, setValidationSuccess] = useState<ValidationSuccess>({
    email: '',
    password: '',
    confirmPassword: '',
    phoneVerification: ''
  });

  // 약관 페이지에서 돌아왔을 때 또는 페이지 로드 시 폼 상태 복원
  useEffect(() => {
    // 먼저 React Router state에서 확인
    if (location.state?.formData) {
      const { 
        formValues: savedFormValues, 
        agreements: savedAgreements, 
        dropdownStates: savedDropdownStates,
        isEmailVerified: savedIsEmailVerified,
        isPhoneVerified: savedIsPhoneVerified,
        isImageUploaded: savedIsImageUploaded,
        uploadedFileName: savedUploadedFileName,
        validationErrors: savedValidationErrors,
        validationSuccess: savedValidationSuccess
      } = location.state.formData;
      
      if (savedFormValues) setFormValues(savedFormValues);
      if (savedAgreements) setAgreements(savedAgreements);
      if (savedDropdownStates) setDropdownStates(savedDropdownStates);
      if (savedIsEmailVerified !== undefined) setIsEmailVerified(savedIsEmailVerified);
      if (savedIsPhoneVerified !== undefined) setIsPhoneVerified(savedIsPhoneVerified);
      if (savedIsImageUploaded !== undefined) setIsImageUploaded(savedIsImageUploaded);
      if (savedUploadedFileName) setUploadedFileName(savedUploadedFileName);
      if (savedValidationErrors) setValidationErrors(savedValidationErrors);
      if (savedValidationSuccess) setValidationSuccess(savedValidationSuccess);
      
      // 복원 후 localStorage 삭제
      localStorage.removeItem('signupFormData');
    } 
    // React Router state가 없으면 localStorage에서 확인
    else {
      const savedData = localStorage.getItem('signupFormData');
      if (savedData) {
        try {
          const formData = JSON.parse(savedData);
          const { 
            formValues: savedFormValues, 
            agreements: savedAgreements, 
            dropdownStates: savedDropdownStates,
            isEmailVerified: savedIsEmailVerified,
            isPhoneVerified: savedIsPhoneVerified,
            isImageUploaded: savedIsImageUploaded,
            uploadedFileName: savedUploadedFileName,
            validationErrors: savedValidationErrors,
            validationSuccess: savedValidationSuccess
          } = formData;
          
          if (savedFormValues) setFormValues(savedFormValues);
          if (savedAgreements) setAgreements(savedAgreements);
          if (savedDropdownStates) setDropdownStates(savedDropdownStates);
          if (savedIsEmailVerified !== undefined) setIsEmailVerified(savedIsEmailVerified);
          if (savedIsPhoneVerified !== undefined) setIsPhoneVerified(savedIsPhoneVerified);
          if (savedIsImageUploaded !== undefined) setIsImageUploaded(savedIsImageUploaded);
          if (savedUploadedFileName) setUploadedFileName(savedUploadedFileName);
          if (savedValidationErrors) setValidationErrors(savedValidationErrors);
          if (savedValidationSuccess) setValidationSuccess(savedValidationSuccess);
          
          // 복원 후 localStorage 삭제
          localStorage.removeItem('signupFormData');
        } catch (error) {
          console.error('폼 데이터 복원 중 오류:', error);
          localStorage.removeItem('signupFormData');
        }
      }
    }
  }, [location.state]);

  // 이메일 유효성 검사 함수
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 비밀번호 유효성 검사 함수
  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
    return passwordRegex.test(password);
  };

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

  // 실시간 유효성 검사
  useEffect(() => {
    // 이메일 유효성 검사
    if (formValues.email) {
      if (!validateEmail(formValues.email)) {
        setValidationErrors(prev => ({ ...prev, email: '올바른 이메일을 입력해주세요.' }));
        setValidationSuccess(prev => ({ ...prev, email: '' }));
      } else if (isEmailVerified) {
        setValidationErrors(prev => ({ ...prev, email: '' }));
        setValidationSuccess(prev => ({ ...prev, email: '사용 가능한 이메일입니다.' }));
      } else {
        setValidationErrors(prev => ({ ...prev, email: '' }));
        setValidationSuccess(prev => ({ ...prev, email: '' }));
      }
    } else {
      setValidationErrors(prev => ({ ...prev, email: '' }));
      setValidationSuccess(prev => ({ ...prev, email: '' }));
    }

    // 비밀번호 유효성 검사
    if (formValues.password) {
      if (!validatePassword(formValues.password)) {
        setValidationErrors(prev => ({ ...prev, password: '비밀번호 양식이 올바르지 않습니다.' }));
        setValidationSuccess(prev => ({ ...prev, password: '' }));
      } else {
        setValidationErrors(prev => ({ ...prev, password: '' }));
        setValidationSuccess(prev => ({ ...prev, password: '사용 가능한 비밀번호입니다.' }));
      }
    } else {
      setValidationErrors(prev => ({ ...prev, password: '' }));
      setValidationSuccess(prev => ({ ...prev, password: '' }));
    }

    // 비밀번호 확인 검사
    if (formValues.confirmPassword) {
      if (formValues.password !== formValues.confirmPassword) {
        setValidationErrors(prev => ({ ...prev, confirmPassword: '비밀번호가 서로 일치하지 않습니다.' }));
        setValidationSuccess(prev => ({ ...prev, confirmPassword: '' }));
      } else if (validatePassword(formValues.password)) {
        setValidationErrors(prev => ({ ...prev, confirmPassword: '' }));
        setValidationSuccess(prev => ({ ...prev, confirmPassword: '사용 가능한 비밀번호입니다.' }));
      } else {
        setValidationErrors(prev => ({ ...prev, confirmPassword: '' }));
        setValidationSuccess(prev => ({ ...prev, confirmPassword: '' }));
      }
    } else {
      setValidationErrors(prev => ({ ...prev, confirmPassword: '' }));
      setValidationSuccess(prev => ({ ...prev, confirmPassword: '' }));
    }
  }, [formValues.email, formValues.password, formValues.confirmPassword, isEmailVerified]);

  // 휴대폰 인증 완료 메시지
  useEffect(() => {
    if (isPhoneVerified) {
      setValidationSuccess(prev => ({ ...prev, phoneVerification: '인증되었습니다.' }));
    } else {
      setValidationSuccess(prev => ({ ...prev, phoneVerification: '' }));
    }
  }, [isPhoneVerified]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (type: 'student' | 'doctor') => {
    setFormValues(prev => ({ 
      ...prev, 
      userType: type,
      university: '',
      department: '',
      licenseNumber: ''
    }));
    setIsImageUploaded(false);
    setUploadedFileName('');
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
    } else if (dropdown === 'university') {
      setFormValues(prev => ({ ...prev, university: value }));
    } else if (dropdown === 'department') {
      setFormValues(prev => ({ ...prev, department: value }));
    }
    
    setDropdownStates(prev => ({ ...prev, [dropdown]: false }));
  };

  const handleEmailVerification = () => {
    if (validateEmail(formValues.email)) {
      setIsEmailVerified(true);
    }
  };

  // 휴대폰 본인확인 완료 처리
  const handlePhoneVerificationComplete = (result: VerificationResult) => {
    console.log('휴대폰 인증 결과:', result);
    
    if (result.success) {
      setIsPhoneVerified(true);
      
      // 인증된 이름으로 자동 입력 (선택사항)
      if (result.userData?.name && !formValues.name) {
        setFormValues(prev => ({ ...prev, name: result.userData!.name }));
      }
    } else {
      setIsPhoneVerified(false);
      
      // 에러 메시지는 PhoneVerification 컴포넌트에서 처리
      console.error('휴대폰 인증 실패:', result.message);
    }
  };

  const handleImageUpload = () => {
    setIsImageUploaded(true);
    setUploadedFileName('파일명'); // 실제로는 파일 선택 다이얼로그에서 가져온 파일명
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

  const handleTermsClick = (type: 'terms' | 'privacy' | 'marketing') => {
    const urls = {
      terms: '/terms-of-service',
      privacy: '/privacy-policy',
      marketing: '/marketing-consent'
    };
    
    // localStorage에 폼 데이터 저장
    const formData = {
      formValues,
      agreements,
      dropdownStates,
      isEmailVerified,
      isPhoneVerified,
      isImageUploaded,
      uploadedFileName,
      validationErrors,
      validationSuccess
    };
    
    localStorage.setItem('signupFormData', JSON.stringify(formData));
    
    navigate(urls[type], { 
      state: { 
        returnTo: '/signup',
        formData
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 완료 시 localStorage 정리
    localStorage.removeItem('signupFormData');
    navigate('/signup-complete');
  };

  const isFormValid = () => {
    const basicValidation = agreements.age && agreements.terms && agreements.privacy &&
                           validateEmail(formValues.email) && isEmailVerified && 
                           formValues.name && validatePassword(formValues.password) && 
                           formValues.password === formValues.confirmPassword &&
                           formValues.birthYear && formValues.birthMonth && formValues.birthDay &&
                           isPhoneVerified;

    if (formValues.userType === 'student') {
      return basicValidation && formValues.university && isImageUploaded;
    } else {
      return basicValidation && formValues.department && formValues.licenseNumber;
    }
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
                  className={`${isEmailVerified ? 'verified' : ''} ${validationErrors.email ? 'error' : ''}`}
                />
                <EmailButton 
                  type="button"
                  onClick={handleEmailVerification}
                  disabled={isEmailVerified || !validateEmail(formValues.email)}
                >
                  {isEmailVerified ? '확인 완료' : '중복 확인'}
                </EmailButton>
              </EmailInputGroup>
              {validationErrors.email && (
                <ErrorMessage>{validationErrors.email}</ErrorMessage>
              )}
              {validationSuccess.email && (
                <SuccessMessage>{validationSuccess.email}</SuccessMessage>
              )}
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
                    hasValue={!!formValues.birthYear}
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
                    hasValue={!!formValues.birthMonth}
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
                    hasValue={!!formValues.birthDay}
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
              <PhoneVerification 
                onVerificationComplete={handlePhoneVerificationComplete}
                disabled={isPhoneVerified}
              />
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
                className={validationErrors.password ? 'error' : ''}
              />
              {validationErrors.password && (
                <ErrorMessage>{validationErrors.password}</ErrorMessage>
              )}
              {validationSuccess.password && (
                <SuccessMessage>{validationSuccess.password}</SuccessMessage>
              )}
              
              <Input
                type="password"
                name="confirmPassword"
                placeholder="비밀번호를 다시 입력해주세요."
                value={formValues.confirmPassword}
                onChange={handleInputChange}
                className={validationErrors.confirmPassword ? 'error' : ''}
              />
              {validationErrors.confirmPassword && (
                <ErrorMessage>{validationErrors.confirmPassword}</ErrorMessage>
              )}
              {validationSuccess.confirmPassword && (
                <SuccessMessage>{validationSuccess.confirmPassword}</SuccessMessage>
              )}
              
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
                  <DropdownContainer>
                    <DropdownButton 
                      type="button"
                      onClick={() => handleDropdownToggle('university')}
                      isOpen={dropdownStates.university}
                      hasValue={!!formValues.university}
                    >
                      <span>{formValues.university || '소속 대학을 선택해주세요.'}</span>
                      <ChevronIcon isOpen={dropdownStates.university}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M11.07 6.40L8 9.47L4.93 6.40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </ChevronIcon>
                    </DropdownButton>
                    {dropdownStates.university && (
                      <DropdownMenu>
                        {UNIVERSITIES.map(university => (
                          <DropdownItem
                            key={university}
                            onClick={() => handleDropdownSelect('university', university)}
                          >
                            {university}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    )}
                  </DropdownContainer>
                  
                  <UploadSection>
                    <UploadDescription>
                      {isImageUploaded ? uploadedFileName : '이름, 소속 대학, 학번이 식별 가능한 학생증 혹은 재학증명서 이미지를 업로드해주세요.'}
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
                  
                  <DropdownContainer>
                    <DropdownButton 
                      type="button"
                      onClick={() => handleDropdownToggle('department')}
                      isOpen={dropdownStates.department}
                      hasValue={!!formValues.department}
                    >
                      <span>{formValues.department || '진료과를 선택해주세요.'}</span>
                      <ChevronIcon isOpen={dropdownStates.department}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M11.07 6.40L8 9.47L4.93 6.40" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </ChevronIcon>
                    </DropdownButton>
                    {dropdownStates.department && (
                      <DropdownMenu>
                        {DEPARTMENTS.map(department => (
                          <DropdownItem
                            key={department}
                            onClick={() => handleDropdownSelect('department', department)}
                          >
                            {department}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    )}
                  </DropdownContainer>
                  <Temp8Div></Temp8Div>
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
                <CheckboxCustom checked={agreements.all} onClick={handleAllAgreementChange} />
                <CheckboxLabel className="bold" onClick={handleAllAgreementChange}>전체 동의</CheckboxLabel>
              </CheckboxWrapper>
              
              <Divider />
              
              <CheckboxWrapper>
                <CheckboxCustom checked={agreements.age} onClick={() => handleAgreementChange('age')} />
                <CheckboxLabel onClick={() => handleAgreementChange('age')}>[필수] 만 14세 이상입니다.</CheckboxLabel>
              </CheckboxWrapper>
              
              <CheckboxWrapper>
                <CheckboxCustom checked={agreements.terms} onClick={() => handleAgreementChange('terms')} />
                <CheckboxLabel onClick={() => handleAgreementChange('terms')}>[필수] 투비닥터 캠퍼스 이용약관 동의</CheckboxLabel>
                <ChevronRight onClick={() => handleTermsClick('terms')}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </ChevronRight>
              </CheckboxWrapper>
              
              <CheckboxWrapper>
                <CheckboxCustom checked={agreements.privacy} onClick={() => handleAgreementChange('privacy')} />
                <CheckboxLabel onClick={() => handleAgreementChange('privacy')}>[필수] 투비닥터 캠퍼스 개인정보 수집 및 이용 동의</CheckboxLabel>
                <ChevronRight onClick={() => handleTermsClick('privacy')}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </ChevronRight>
              </CheckboxWrapper>
              
              <CheckboxWrapper>
                <CheckboxCustom checked={agreements.marketing} onClick={() => handleAgreementChange('marketing')} />
                <CheckboxLabel onClick={() => handleAgreementChange('marketing')}>[선택] 마케팅 목적의 개인정보 수집 및 이용 동의</CheckboxLabel>
                <ChevronRight onClick={() => handleTermsClick('marketing')}>
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

const Temp8Div = styled.div`
  height: 8px;
`;

// 기존 스타일 유지하면서 피그마 디자인 적용
const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1360px;
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
  margin-bottom: 28px;
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
    gap: 32px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 28px;
  }
`;

const FormGroup = styled.div`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const FormLabel = styled.label`
  font-weight: 600;
  font-size: 14px;
  line-height: 1.429em;
  color: rgba(46, 47, 51, 0.88);
  margin-bottom: 8px;
`;

const SectionTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: rgba(46, 47, 51, 0.88);
  margin-bottom: 8px;
`;

const SectionDescription = styled.p`
  font-size: 14px;
  line-height: 1.429em;
  color: rgba(55, 56, 60, 0.61);
  margin-bottom: 16px;
`;

const MedicalDescription = styled.div`
  font-size: 13px;
  line-height: 18px;
  color: rgba(55, 56, 60, 0.61);
  margin-bottom: 10px;
  text-align: center;
`;

// 에러 및 성공 메시지
const ErrorMessage = styled.div`
  font-size: 12px;
  line-height: 1.334em;
  color: #FF4242;
  margin-top: 4px;
`;

const SuccessMessage = styled.div`
  font-size: 12px;
  line-height: 1.334em;
  color: #00BF40;
  margin-top: 4px;
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
  
  &.error {
    border-color: rgba(255, 66, 66, 0.28);
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
  
  &.error {
    border-color: rgba(255, 66, 66, 0.28);
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

const DropdownButton = styled.button<{ isOpen: boolean; hasValue: boolean }>`
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
    color: ${props => props.hasValue ? '#171719' : 'rgba(55, 56, 60, 0.28)'};
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
  
  &:disabled, &.disabled {
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
  color: ${props => props.children?.toString().startsWith('파일명') ? '#171719' : 'rgba(55, 56, 60, 0.61)'};
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
  display: none;
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
  cursor: pointer;
  
  ${props => props.checked && `
    border-color: #448181;
  `}
  
  /* 체크 표시 */
  &::after {
    content: '';
    display: ${props => props.checked ? 'block' : 'none'};
    width: 4px;
    height: 8px;
    border: 2px solid white;
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
    margin-top: -2px;
  }
`;

const CheckboxLabel = styled.label`
  font-size: 15px;
  line-height: 1.467em;
  color: rgba(46, 47, 51, 0.88);
  flex: 1;
  cursor: pointer;
  
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