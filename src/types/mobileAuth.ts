// 드림시큐리티 본인확인 관련 타입 정의

// 본인확인 API 응답 타입
export interface MobileAuthResponse {
  resultCode: string;
  resultMsg: string;
  userName?: string;
  userPhone?: string;
  userBirthday?: string;
  userGender?: string; // "1": 남자, "2": 여자
  userNation?: string; // "0": 내국인, "1": 외국인
  ci?: string;         // 주민등록번호 대체 개인 식별 연동정보
  di?: string;         // 이용기관 중복 확인 정보
  siteId?: string;     // 이용기관 사이트 ID
  clientTxId?: string; // 이용기관 거래 ID
  txId?: string;       // 휴대폰본인확인서버 거래 ID
  providerId?: string; // 통신사 구분 ID (SKT, KT, LGU, SKTMVNO, KTMVNO, LGUMVNO)
  serviceType?: string;// 본인확인 요청 서비스 타입
  reqAuthType?: string;// 본인확인 인증 종류
  reqDate?: string;    // 본인확인 요청 시간
  issuer?: string;     // 본인확인 인증 서버
  issueDate?: string;  // 발급일 (yyyy-mm-dd hh:mm:ss.mis)
  // 추가: 캠퍼스 API용
  encryptMOKKeyToken?: string; // 드림시큐리티에서 전달받는 토큰
}

// 전역 Window 객체에 MOBILEOK 추가
declare global {
  interface Window {
    MOBILEOK?: {
      process: (
        requestUrl: string, 
        deviceType: string, 
        callback: (result: MobileAuthResponse) => void
      ) => void;
    };
  }
}

// 본인확인 요청 데이터 타입
export interface MobileAuthRequest {
  serviceId: string;
  usageCode: string;           // 서비스 용도 (01001: 회원가입, 01002: 정보변경, etc.)
  serviceType: string;         // 이용상품 코드 (telcoAuth, telcoAuth-LMS)
  encryptReqClientInfo: string;// 암호화된 본인확인 거래 요청 정보
  retTransferType: string;     // 결과 수신 타입 (MOKToken)
  returnUrl: string;           // 본인확인 결과를 전달할 이용기관 URL
}

// 프론트엔드에서 사용하는 인증 결과 타입
export interface VerificationResult {
  success: boolean;
  message: string;
  userData?: {
    id?: number;    // 캠퍼스 API용 Person ID
    name: string;
    phone: string;
    birthday?: string; // 기존 형식
    birth?: string;    // 캠퍼스 API 형식 (YYYY-MM-DD)
    gender?: string;
    ci?: string;
    di?: string;
  };
}

// 디바이스 타입
export type DeviceType = 'WB' | 'MB' | 'MWV' | 'HY' | 'NA';

// 서비스 용도 코드
export type UsageCode = 
  | '01001' // 회원가입
  | '01002' // 정보변경
  | '01003' // ID찾기
  | '01004' // 비밀번호찾기
  | '01005' // 본인확인용
  | '01006' // 성인인증
  | '01007' // 상품구매/결제
  | '01999'; // 기타

// 이용상품 코드
export type ServiceType = 
  | 'telcoAuth'     // 휴대폰본인확인 (SMS)
  | 'telcoAuth-LMS'; // 휴대폰본인확인 (LMS)

export {};
