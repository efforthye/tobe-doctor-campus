# 휴대폰 본인확인 연동 가이드 (백엔드)

## 📋 개요
투비닥터 캠퍼스 회원가입 시 휴대폰 본인확인 기능을 위한 백엔드 API 구현 가이드입니다.

## 🔑 드림시큐리티 정보
- **회원사 ID**: `tbdcampus`
- **키파일 패스워드**: `tobedoctorcampus2025`
- **웹관리도구**: https://manager.mobile-ok.com/
- **개발가이드**: https://manager.mobile-ok.com/guide/mok_std_guide/#4

## 🛠️ 필요한 백엔드 API

### 1. 본인확인 요청 API
```
POST /api/mobile-auth/request
```

**요청 본문**: 없음 (또는 사용자 세션 정보)

**응답 형식**:
```json
{
  "serviceId": "본인확인 서비스 ID",
  "usageCode": "01001",
  "serviceType": "telcoAuth", 
  "encryptReqClientInfo": "암호화된 요청 정보",
  "retTransferType": "MOKToken",
  "returnUrl": "https://yourdomain.com/api/mobile-auth/result"
}
```

### 2. 본인확인 결과 수신 API
```
POST /api/mobile-auth/result
```

**요청 본문**:
```
data=urlencoded_json_data
```

**처리 과정**:
1. `data` 파라미터를 URL 디코딩
2. JSON 파싱하여 `encryptMOKKeyToken` 추출
3. 드림시큐리티 서버에 MOKResult 요청
4. 암호화된 결과 복호화
5. 개인정보 반환

**최종 응답**:
```json
{
  "resultCode": "2000",
  "resultMsg": "성공", 
  "userName": "홍길동"
}
```

## 🔧 구현 시 주의사항

### 1. 보안
- 키파일(`mok_keyInfo.dat`)은 웹에서 접근 불가능한 안전한 경로에 저장
- 개인정보는 브라우저로 전송하지 말고 세션/DB에 저장
- HTTPS 필수 (TLS 1.2 이상)

### 2. 도메인 등록
- 프론트엔드 도메인이 드림시큐리티에 등록되어야 함
- `returnUrl`도 등록된 도메인이어야 함

### 3. 세션 관리
- 거래 ID 검증 필수 구현
- 토큰 유효시간 10분 제한

## 📚 참고 라이브러리
드림시큐리티에서 제공하는 언어별 라이브러리 사용:
- Java: `mobileOKManager-jdk1.8_1.0.1.jar`
- Node.js: `mobileokManager-Nodejs_1.0.3.zip`
- PHP: `mobileokManager-phpseclib3.0_1.0.2.zip`
- .NET: `mobileOKManager-x64-dotnet_1.0.1.zip`

## 🚀 테스트
1. 웹관리도구에서 개발용 키파일 다운로드
2. 샘플 코드로 기본 연동 테스트
3. 프론트엔드와 연동 테스트

## ❗ 문의사항
- 기술 문의: mobileok-op@dreamsecurity.com
- 회원사 ID와 담당자 연락처 필수 기재
