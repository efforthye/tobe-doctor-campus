import axios from 'axios';
import { MobileAuthResponse, MobileAuthRequest } from '../types/mobileAuth';

// 에러 응답 타입 정의
export interface MobileAuthError {
  resultCode: string;
  resultMsg: string;
}

// API 베이스 URL
const API_BASE_URL = process.env.REACT_APP_MOBILE_AUTH_API_BASE_URL || '/api/mobile-auth';

// axios 인스턴스 생성
const mobileAuthApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30초 타임아웃
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터 - 에러 처리
mobileAuthApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Mobile Auth API Error:', error);
    
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }
    
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        resultCode: 'TIMEOUT',
        resultMsg: '요청 시간이 초과되었습니다. 다시 시도해주세요.'
      });
    }
    
    return Promise.reject({
      resultCode: 'NETWORK_ERROR',
      resultMsg: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.'
    });
  }
);

/**
 * 본인확인 요청 API
 * - 드림시큐리티 본인확인 창에서 호출되는 API
 * - 백엔드에서 본인확인 요청 정보를 생성하여 반환
 */
export const requestMobileAuth = async (): Promise<MobileAuthRequest> => {
  try {
    const response = await mobileAuthApi.post('/request', {
      usageCode: '01001', // 회원가입
      serviceType: 'telcoAuth', // 휴대폰본인확인
    });
    
    return response.data;
  } catch (error) {
    console.error('본인확인 요청 API 호출 실패:', error);
    throw error;
  }
};

/**
 * 본인확인 결과 조회 API
 * - 본인확인 완료 후 결과를 조회하는 API (선택사항)
 * - 일반적으로는 드림시큐리티에서 callback으로 결과를 전달받음
 */
export const getMobileAuthResult = async (token: string): Promise<MobileAuthResponse> => {
  try {
    const response = await mobileAuthApi.get(`/result/${token}`);
    return response.data;
  } catch (error) {
    console.error('본인확인 결과 조회 API 호출 실패:', error);
    throw error;
  }
};

/**
 * 에러 메시지 매핑 함수
 * - 드림시큐리티 에러 코드를 사용자 친화적인 메시지로 변환
 */
export const getMobileAuthErrorMessage = (errorCode: string): string => {
  const errorMessages: { [key: string]: string } = {
    // 성공
    '2000': '성공',
    
    // 인증 실패
    '2910': '입력하신 정보가 올바르지 않습니다. 확인 후 다시 시도해주세요.',
    '3001': '필수 입력값이 누락되었습니다. 처음부터 다시 시도해주세요.',
    
    // 세션/토큰 관련
    '4000': '이미 완료되었거나 허용시간을 초과한 인증 요청입니다.',
    '4001': '인증 진행사항을 확인할 수 없습니다. 처음부터 다시 시도해주세요.',
    '4150': '이미 처리 완료된 인증 요청입니다.',
    '5033': '유효시간이 만료되었습니다. 처음부터 다시 시도해주세요.',
    
    // 제한 횟수 초과
    '4301': '검증요청 제한 횟수를 초과하였습니다. 처음부터 다시 시도해주세요.',
    '4302': '인증요청 제한 횟수를 초과하였습니다. 처음부터 다시 시도해주세요.',
    
    // 설정 오류
    '5028': '등록되지 않은 사이트입니다. 관리자에게 문의해주세요.',
    '8006': '등록되지 않은 도메인입니다. 관리자에게 문의해주세요.',
    '8007': '등록되지 않은 결과 수신 도메인입니다. 관리자에게 문의해주세요.',
    
    // PASS 관련 오류
    '6701': 'PASS 서비스 미가입자입니다. 가입 후 다시 시도해주세요.',
    '6702': 'PASS 인증이 완료되지 않았습니다. 인증 후 다시 시도해주세요.',
    '6703': 'PASS 인증이 완료되지 않았습니다. 인증 후 다시 시도해주세요.',
    '6704': 'PASS 앱이 설치되지 않았습니다. 앱 설치 후 다시 시도해주세요.',
    '6705': 'PASS 인증 요청이 취소되었습니다. 처음부터 다시 시도해주세요.',
    '6706': '유효시간이 만료되었습니다. 처음부터 다시 시도해주세요.',
    '6707': 'PASS 인증을 사용할 수 없습니다. 문자(SMS) 인증으로 다시 시도해주세요.',
    '6751': 'PASS 인증은 만 15세 이상부터 이용가능합니다. 문자(SMS) 인증으로 다시 시도해주세요.',
    
    // 네트워크/시스템 오류
    'TIMEOUT': '요청 시간이 초과되었습니다. 다시 시도해주세요.',
    'NETWORK_ERROR': '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
    '9999': '원인을 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  };

  return errorMessages[errorCode] || `본인확인 중 오류가 발생했습니다. (오류코드: ${errorCode})`;
};

/**
 * 본인확인 서비스 상태 확인
 * - 드림시큐리티 스크립트 로드 및 서비스 가용성 확인
 */
export const checkMobileAuthService = (): boolean => {
  return !!(window as any).MOBILEOK;
};

export default {
  requestMobileAuth,
  getMobileAuthResult,
  getMobileAuthErrorMessage,
  checkMobileAuthService,
};
