import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { 
  requestCampusMobileAuth, 
  processCampusMobileAuthResult,
  type CampusMobileAuthRequestData 
} from '../services/campusMobileAuthApi';

// 본인확인 결과 타입
interface VerificationResult {
  success: boolean;
  message: string;
  userData?: {
    id: number;
    name: string;
    phone: string;
    birth: string;
  };
}

interface CampusPhoneVerificationProps {
  name: string;          // 회원가입 시 입력한 이름
  birthYear: string;     // 연도
  birthMonth: string;    // 월
  birthDay: string;      // 일
  onVerificationComplete: (result: VerificationResult) => void;
  disabled?: boolean;
}

const CampusPhoneVerification: React.FC<CampusPhoneVerificationProps> = ({ 
  name,
  birthYear,
  birthMonth,
  birthDay,
  onVerificationComplete, 
  disabled = false 
}) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [personId, setPersonId] = useState<number | null>(null);

  // 디바이스 타입 감지
  const getDeviceType = useCallback(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    return isMobile ? 'MB' : 'WB';
  }, []);

  // 생년월일 포맷팅 (YYYY-MM-DD)
  const formatBirthDate = useCallback(() => {
    if (!birthYear || !birthMonth || !birthDay) {
      return '';
    }
    
    const formattedMonth = birthMonth.padStart(2, '0');
    const formattedDay = birthDay.padStart(2, '0');
    
    return `${birthYear}-${formattedMonth}-${formattedDay}`;
  }, [birthYear, birthMonth, birthDay]);

  // 드림시큐리티 스크립트 로드
  useEffect(() => {
    const scriptUrl = process.env.REACT_APP_MOBILE_AUTH_SCRIPT_URL || 'https://dev-mobile-ok.com/js/mobileOK-1.0.js';
    
    // 이미 로드된 스크립트가 있는지 확인
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript || window.MOBILEOK) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    
    script.onload = () => {
      console.log('드림시큐리티 스크립트 로드 완료');
      setIsScriptLoaded(true);
    };
    
    script.onerror = () => {
      console.error('드림시큐리티 스크립트 로드 실패');
      setErrorMessage('본인확인 서비스를 불러올 수 없습니다.');
      setStatus('error');
    };

    document.head.appendChild(script);
  }, []);

  // 인증 결과 콜백 함수 (드림시큐리티에서 호출)
  const handleMobileOKCallback = useCallback(async (result: any) => {
    console.log('드림시큐리티 인증 결과:', result);
    
    try {
      if (result && result.encryptMOKKeyToken) {
        // 2. 인증결과 처리 API 호출
        const authResult = await processCampusMobileAuthResult({
          encryptMOKKeyToken: result.encryptMOKKeyToken
        });

        if (authResult.code === 200) {
          // 입력한 정보와 인증된 정보 검증
          const authData = authResult.data;
          const inputBirth = formatBirthDate();
          
          if (name.trim() !== authData.name.trim()) {
            setErrorMessage(`입력한 이름(${name})과 인증된 이름(${authData.name})이 일치하지 않습니다.`);
            setStatus('error');
            onVerificationComplete({
              success: false,
              message: '입력한 정보와 인증된 정보가 일치하지 않습니다.'
            });
            return;
          }

          if (inputBirth !== authData.birth) {
            setErrorMessage(`입력한 생년월일(${inputBirth})과 인증된 생년월일(${authData.birth})이 일치하지 않습니다.`);
            setStatus('error');
            onVerificationComplete({
              success: false,
              message: '입력한 정보와 인증된 정보가 일치하지 않습니다.'
            });
            return;
          }

          // 성공 - Person 생성되고 id 반환됨
          setPersonId(authData.id);
          setStatus('success');
          
          const verificationResult: VerificationResult = {
            success: true,
            message: '본인확인이 완료되었습니다.',
            userData: authData
          };
          
          onVerificationComplete(verificationResult);
        } else {
          // 실패
          setErrorMessage(authResult.message || '본인확인에 실패했습니다.');
          setStatus('error');
          
          onVerificationComplete({
            success: false,
            message: authResult.message || '본인확인에 실패했습니다.'
          });
        }
      } else {
        // 토큰이 없는 경우 (사용자 취소 등)
        setErrorMessage('본인확인이 취소되었습니다.');
        setStatus('error');
        
        onVerificationComplete({
          success: false,
          message: '본인확인이 취소되었습니다.'
        });
      }
    } catch (error: any) {
      console.error('인증 결과 처리 중 오류:', error);
      
      let errorMsg = '본인확인 처리 중 오류가 발생했습니다.';
      
      if (error.response?.status === 400) {
        errorMsg = '입력한 정보가 올바르지 않습니다.';
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      
      setErrorMessage(errorMsg);
      setStatus('error');
      
      onVerificationComplete({
        success: false,
        message: errorMsg
      });
    }
  }, [onVerificationComplete, name, formatBirthDate]);

  // 본인확인 시작
  const startVerification = useCallback(async () => {
    // 입력값 검증
    if (!name.trim()) {
      setErrorMessage('이름을 입력해주세요.');
      setStatus('error');
      return;
    }

    const birthDate = formatBirthDate();
    if (!birthDate) {
      setErrorMessage('생년월일을 선택해주세요.');
      setStatus('error');
      return;
    }

    if (!isScriptLoaded || !window.MOBILEOK) {
      setErrorMessage('본인확인 서비스를 불러올 수 없습니다. 페이지를 새로고침해주세요.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // 1. 거래정보 생성 API 호출
      const requestData: CampusMobileAuthRequestData = {
        name: name.trim(),
        birth: birthDate
      };

      console.log('🔄 캠퍼스 모바일 인증 요청:', requestData);
      
      const authRequestResult = await requestCampusMobileAuth(requestData);
      
      if (authRequestResult.code === 200) {
        const deviceType = getDeviceType();
        
        console.log('📱 드림시큐리티 본인확인 창을 호출합니다...', {
          deviceType,
          authData: authRequestResult.data
        });
        
        // 드림시큐리티 본인확인 창 호출
        window.MOBILEOK.process(
          authRequestResult.data.returnUrl,
          deviceType,
          handleMobileOKCallback
        );
        
      } else {
        setErrorMessage(authRequestResult.message || '본인확인 요청에 실패했습니다.');
        setStatus('error');
      }
      
    } catch (error: any) {
      console.error('본인확인 시작 중 오류:', error);
      
      let errorMsg = '본인확인 요청 중 오류가 발생했습니다.';
      
      if (error.response?.status === 400) {
        errorMsg = '입력한 정보가 올바르지 않습니다.';
      } else if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.code === 'ECONNABORTED') {
        errorMsg = '요청 시간이 초과되었습니다. 다시 시도해주세요.';
      } else if (error.message?.includes('Network Error')) {
        errorMsg = '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
      }
      
      setErrorMessage(errorMsg);
      setStatus('error');
    }
  }, [name, formatBirthDate, isScriptLoaded, getDeviceType, handleMobileOKCallback]);

  // 다시 시도
  const handleRetry = useCallback(() => {
    setStatus('idle');
    setErrorMessage('');
    setPersonId(null);
  }, []);

  // 버튼 렌더링
  const renderButton = () => {
    if (status === 'success') {
      return (
        <VerificationButton disabled className="success">
          ✓ 인증 완료
        </VerificationButton>
      );
    }

    return (
      <VerificationButton
        onClick={startVerification}
        disabled={disabled || status === 'loading' || !isScriptLoaded || !name.trim() || !formatBirthDate()}
      >
        {status === 'loading' ? '인증 진행중...' : '휴대폰 인증'}
      </VerificationButton>
    );
  };

  // 입력값 변경 시 에러 상태 초기화
  useEffect(() => {
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  }, [name, birthYear, birthMonth, birthDay]);

  return (
    <Container>
      {renderButton()}
      
      {status === 'loading' && (
        <StatusMessage className="loading">
          본인확인 창에서 인증을 진행해주세요.
        </StatusMessage>
      )}
      
      {status === 'error' && (
        <ErrorContainer>
          <StatusMessage className="error">{errorMessage}</StatusMessage>
          <RetryButton onClick={handleRetry}>다시 시도</RetryButton>
        </ErrorContainer>
      )}
      
      {status === 'success' && (
        <StatusMessage className="success">
          인증되었습니다. {personId && `(Person ID: ${personId})`}
        </StatusMessage>
      )}
      
      {!isScriptLoaded && status === 'idle' && (
        <StatusMessage className="loading">본인확인 서비스 로딩중...</StatusMessage>
      )}
      
      {/* 입력값 안내 */}
      {(!name.trim() || !formatBirthDate()) && status === 'idle' && (
        <StatusMessage className="info">
          {!name.trim() && !formatBirthDate() 
            ? '이름과 생년월일을 입력한 후 인증을 진행해주세요.'
            : !name.trim() 
            ? '이름을 입력해주세요.'
            : '생년월일을 선택해주세요.'
          }
        </StatusMessage>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const VerificationButton = styled.button`
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
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background-color: #3a6e6e;
  }
  
  &:disabled {
    background-color: #F4F4F5;
    color: rgba(55, 56, 60, 0.28);
    cursor: not-allowed;
  }
  
  &.success {
    background-color: #00BF40;
    color: white;
  }
`;

const StatusMessage = styled.div`
  font-size: 12px;
  line-height: 1.334em;
  margin-top: 8px;
  
  &.loading {
    color: #448181;
  }
  
  &.success {
    color: #00BF40;
  }
  
  &.error {
    color: #FF4242;
  }
  
  &.info {
    color: rgba(55, 56, 60, 0.61);
  }
`;

const ErrorContainer = styled.div`
  margin-top: 8px;
`;

const RetryButton = styled.button`
  background: none;
  border: none;
  color: #448181;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 4px;
  padding: 0;
  
  &:hover {
    color: #3a6e6e;
  }
`;

export default CampusPhoneVerification;
