import axios from 'axios';

// 캠퍼스 모바일 인증 API 타입 정의
export interface CampusMobileAuthRequestData {
  name: string;
  birth: string; // YYYY-MM-DD 형식
}

export interface CampusMobileAuthRequestResponse {
  code: number;
  status: string;
  message: string;
  data: {
    encryptReqClientInfo: string;
    serviceType: string;
    usageCode: string;
    retTransferType: string;
    serviceId: string;
    returnUrl: string;
  };
}

export interface CampusMobileAuthResultRequest {
  encryptMOKKeyToken: string;
}

export interface CampusMobileAuthResultResponse {
  code: number;
  status: string;
  message: string;
  data: {
    id: number;
    birth: string;
    name: string;
    phone: string;
  };
}

// API 베이스 URL (개발 서버 직접 호출)
const API_BASE_URL = process.env.REACT_APP_CAMPUS_API_BASE_URL || 'https://campus-dev.duckdns.org';

// axios 인스턴스 생성
const campusAuthApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터
campusAuthApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Campus Mobile Auth API Error:', error);
    throw error;
  }
);

/**
 * 1. 거래정보 생성 API
 * POST /api/mobileok/request
 */
export const requestCampusMobileAuth = async (
  requestData: CampusMobileAuthRequestData
): Promise<CampusMobileAuthRequestResponse> => {
  try {
    const response = await campusAuthApi.post('/api/mobileok/request', requestData);
    return response.data;
  } catch (error) {
    console.error('캠퍼스 모바일 인증 요청 실패:', error);
    throw error;
  }
};

/**
 * 2. 인증결과 처리 API
 * POST /api/mobileok/result
 */
export const processCampusMobileAuthResult = async (
  resultData: CampusMobileAuthResultRequest
): Promise<CampusMobileAuthResultResponse> => {
  try {
    const response = await campusAuthApi.post('/api/mobileok/result', resultData);
    return response.data;
  } catch (error) {
    console.error('캠퍼스 모바일 인증 결과 처리 실패:', error);
    throw error;
  }
};

export default {
  requestCampusMobileAuth,
  processCampusMobileAuthResult,
};
