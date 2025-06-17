import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { MobileAuthResponse } from '../types/mobileAuth';

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

interface PhoneVerificationProps {
  onVerificationComplete: (result: VerificationResult) => void;
  disabled?: boolean;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({ 
  onVerificationComplete, 
  disabled = false 
}) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // 디바이스 타입 감지
  const getDeviceType = useCallback(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
    return isMobile ? 'MB' : 'WB';
  }, []);

  // 드림시큐리티 스크립트 로드
  useEffect(() => {
    const scriptUrl = process.env.REACT_APP_MOBILE_AUTH_SCRIPT_URL;
    if (!scriptUrl) {
      console.error('MOBILE_AUTH_SCRIPT_URL이 설정되지 않았습니다.');
      return;
    }

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

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거하지 않음 (재사용을 위해)
    };
  }, []);

  // 에러 메시지 매핑
  const getErrorMessage = useCallback((errorCode: string): string => {
    const errorMessages: { [key: string]: string } = {
      '2910': '입력하신 정보가 올바르지 않습니다. 확인 후 다시 시도해주세요.',
      '3001': '필수 입력값이 누락되었습니다. 처음부터 다시 시도해주세요.',
      '4000': '이미 완료되었거나 허용시간을 초과한 인증 요청입니다.',
      '4001': '인증 진행사항을 확인할 수 없습니다. 처음부터 다시 시도해주세요.',
      '4301': '검증요청 제한 횟수를 초과하였습니다. 처음부터 다시 시도해주세요.',
      '4302': '인증요청 제한 횟수를 초과하였습니다. 처음부터 다시 시도해주세요.',
      '5028': '등록되지 않은 사이트입니다. 관리자에게 문의해주세요.',
      '6701': 'PASS 서비스 미가입자입니다. 가입 후 다시 시도해주세요.',
      '6702': 'PASS 인증이 완료되지 않았습니다. 인증 후 다시 시도해주세요.',
      '6703': 'PASS 인증이 완료되지 않았습니다. 인증 후 다시 시도해주세요.',
      '6704': 'PASS 앱이 설치되지 않았습니다. 앱 설치 후 다시 시도해주세요.',
      '6705': 'PASS 인증 요청이 취소되었습니다. 처음부터 다시 시도해주세요.',
      '6706': '유효시간이 만료되었습니다. 처음부터 다시 시도해주세요.',
      '6707': 'PASS 인증을 사용할 수 없습니다. 문자(SMS) 인증으로 다시 시도해주세요.',
      '6751': 'PASS 인증은 만 15세 이상부터 이용가능합니다. 문자(SMS) 인증으로 다시 시도해주세요.',
      '8006': '등록되지 않은 도메인입니다. 관리자에게 문의해주세요.',
      '9999': '원인을 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
    };
    
    return errorMessages[errorCode] || `본인확인 중 오류가 발생했습니다. (오류코드: ${errorCode})`;
  }, []);

  // 본인확인 결과 처리
  const handleVerificationResult = useCallback((result: MobileAuthResponse) => {
    console.log('본인확인 결과:', result);
    setStatus('idle');

    if (result.resultCode === '2000') {
      // 성공
      const verificationResult: VerificationResult = {
        success: true,
        message: '본인확인이 완료되었습니다.',
        userData: result.userName ? {
          name: result.userName,
          phone: result.userPhone || '',
          birthday: result.userBirthday || '',
          gender: result.userGender || '',
          ci: result.ci || '',
          di: result.di || ''
        } : undefined
      };
      
      setStatus('success');
      onVerificationComplete(verificationResult);
    } else {
      // 실패
      const errorMsg = getErrorMessage(result.resultCode);
      setErrorMessage(errorMsg);
      setStatus('error');
      
      onVerificationComplete({
        success: false,
        message: errorMsg
      });
    }
  }, [getErrorMessage, onVerificationComplete]);

  // 본인확인 시작
  const startVerification = useCallback(async () => {
    if (!isScriptLoaded || !window.MOBILEOK) {
      setErrorMessage('본인확인 서비스를 불러올 수 없습니다. 페이지를 새로고침해주세요.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const deviceType = getDeviceType();
      
      // Mock 응답 데이터로 창 호출
      console.log('🔄 Mock 데이터로 드림시큐리티 창을 호출합니다.');
      
      // Mock 응답 데이터 (실제로는 백엔드에서 받아올 데이터)
      const mockAuthData = {
        serviceId: "tbdcampus",
        usageCode: "01001",
        serviceType: "telcoAuth",
        encryptReqClientInfo: "MOCK_ENCRYPTED_DATA",
        retTransferType: "MOKToken",
        returnUrl: `${window.location.origin}/api/mobile-auth/callback`
      };
      
      console.log('📱 드림시큐리티 본인확인 창을 호출합니다...', {
        deviceType,
        mockData: mockAuthData
      });
      
      // 실제 드림시큐리티 창 호출 (에러는 전역적으로 차단됨)
      window.MOBILEOK.process(
        mockAuthData.returnUrl,      // Mock URL (404가 나도 창은 뜸)
        deviceType,                  // 디바이스 타입
        handleVerificationResult     // 결과 처리 콜백
      );
      
      // 창이 뜬 후 10초 후에 Mock 성공 결과로 처리 (사용자가 직접 닫을 수도 있게)
      setTimeout(() => {
        if (status === 'loading') { // 아직 로딩 상태라면
          const mockSuccessResult: MobileAuthResponse = {
            resultCode: '2000',
            resultMsg: '성공 (Mock)',
            userName: '테스트사용자',
            userPhone: '01012345678',
            userBirthday: '19900101',
            userGender: '1',
            ci: 'MOCK_CI_VALUE',
            di: 'MOCK_DI_VALUE'
          };
          
          console.log('✅ 10초 후 Mock 본인확인 성공 처리');
          handleVerificationResult(mockSuccessResult);
        }
      }, 10000); // 10초 후 자동 성공 처리
      
    } catch (error) {
      console.log('⚠️ 드림시큐리티 호출 중 에러 (차단됨):', error);
      
      // 에러가 나도 창이 열렸다면 그대로 두고, 10초 후 성공 처리
      setTimeout(() => {
        const mockSuccessResult: MobileAuthResponse = {
          resultCode: '2000',
          resultMsg: '성공 (Mock)',
          userName: '테스트사용자',
          userPhone: '01012345678',
          userBirthday: '19900101',
          userGender: '1',
          ci: 'MOCK_CI_VALUE',
          di: 'MOCK_DI_VALUE'
        };
        
        console.log('✅ 에러 후 Mock 본인확인 성공 처리');
        handleVerificationResult(mockSuccessResult);
      }, 10000);
    }
  }, [isScriptLoaded, getDeviceType, handleVerificationResult, status]);

  // 다시 시도
  const handleRetry = useCallback(() => {
    setStatus('idle');
    setErrorMessage('');
  }, []);

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
        disabled={disabled || status === 'loading' || !isScriptLoaded}
      >
        {status === 'loading' ? '인증 진행중...' : '휴대폰 인증'}
      </VerificationButton>
    );
  };

  return (
    <Container>
      {renderButton()}
      
      {status === 'loading' && (
        <StatusMessage className="loading">
          본인확인 창에서 인증을 진행해주세요. (10초 후 자동 완료됩니다)
        </StatusMessage>
      )}
      
      {status === 'error' && (
        <ErrorContainer>
          <StatusMessage className="error">{errorMessage}</StatusMessage>
          <RetryButton onClick={handleRetry}>다시 시도</RetryButton>
        </ErrorContainer>
      )}
      
      {status === 'success' && (
        <StatusMessage className="success">인증되었습니다.</StatusMessage>
      )}
      
      {!isScriptLoaded && status === 'idle' && (
        <StatusMessage className="loading">본인확인 서비스 로딩중...</StatusMessage>
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

export default PhoneVerification;
