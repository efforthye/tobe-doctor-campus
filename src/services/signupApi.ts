import axios from 'axios';

// 회원가입 완료 API 타입 정의
export interface SignupCompletionRequest {
  email: string;
  userType: 'student' | 'doctor';
  password: string;
  university?: string;         // 의대생의 경우
  department?: string;         // 의사의 경우
  licenseNumber?: string;      // 의사의 경우
  marketingConsent: boolean;   // 마케팅 동의 여부
}

export interface SignupCompletionResponse {
  code: number;
  status: string;
  message: string;
  data?: {
    id: number;
    email: string;
    name: string;
    phone: string;
    userType: string;
    // 기타 회원 정보...
  };
}

// API 베이스 URL (개발 서버 직접 호출)
const API_BASE_URL = process.env.REACT_APP_CAMPUS_API_BASE_URL || 'https://campus-dev.duckdns.org';

// axios 인스턴스 생성
const signupApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터
signupApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Signup API Error:', error);
    throw error;
  }
);

/**
 * 회원가입 완료 API
 * POST /api/auth/sign-up/{id}
 * 
 * @param personId - 본인인증으로 생성된 Person ID
 * @param signupData - 추가 회원가입 정보
 */
export const completeSignup = async (
  personId: number,
  signupData: SignupCompletionRequest
): Promise<SignupCompletionResponse> => {
  try {
    const response = await signupApi.post(`/api/auth/sign-up/${personId}`, signupData);
    return response.data;
  } catch (error) {
    console.error('회원가입 완료 API 호출 실패:', error);
    throw error;
  }
};

/**
 * 이메일 중복 확인 API (선택사항 - 실제 API가 있다면)
 * GET /api/auth/check-email?email={email}
 */
export const checkEmailDuplication = async (email: string): Promise<{ available: boolean }> => {
  try {
    const response = await signupApi.get(`/api/auth/check-email?email=${encodeURIComponent(email)}`);
    return response.data;
  } catch (error) {
    console.error('이메일 중복 확인 API 호출 실패:', error);
    throw error;
  }
};

export default {
  completeSignup,
  checkEmailDuplication,
};
