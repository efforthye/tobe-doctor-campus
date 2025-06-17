# 모바일 본인인증 연동 가이드

## 개요

투비닥터 캠퍼스 회원가입에 모바일 본인인증 API가 연동되었습니다.

## 새로운 플로우

1. **사용자 입력**: 이름, 생년월일 입력
2. **본인인증 요청**: `/api/mobileok/request` API 호출
3. **드림시큐리티 창**: 사용자가 휴대폰 본인인증 진행
4. **인증 결과 처리**: `/api/mobileok/result` API 호출
5. **정보 검증**: 입력한 이름/생년월일과 인증된 정보 비교
6. **Person 생성**: 백엔드에서 Person 엔티티 생성, ID 반환
7. **회원가입 완료**: `/api/auth/sign-up/{id}` API로 나머지 정보 저장

## 변경된 파일들

### 새로 생성된 파일
- `src/services/campusMobileAuthApi.ts` - 캠퍼스 모바일 인증 API
- `src/services/signupApi.ts` - 회원가입 완료 API
- `src/components/CampusPhoneVerification.tsx` - 새로운 휴대폰 인증 컴포넌트

### 수정된 파일
- `src/pages/Signup.tsx` - 새로운 API와 연동
- `src/types/mobileAuth.ts` - 타입 정의 업데이트
- `src/setupProxy.js` - 개발용 프록시 설정 추가
- `.env` - 환경변수 추가

## API 연동 상태

### 1. 거래정보 생성 API
```
POST /api/mobileok/request
```

**요청**:
```json
{
  "name": "홍길동",
  "birth": "2021-05-21"
}
```

**응답**:
```json
{
  "code": 200,
  "status": "OK", 
  "message": "요청 성공 [모바일 인증 요청 성공]",
  "data": {
    "encryptReqClientInfo": "...",
    "serviceType": "telcoAuth",
    "usageCode": "01001",
    "retTransferType": "MOKToken",
    "serviceId": "1b9c8940-a46e-4615-bc74-03d105ec08ed",
    "returnUrl": ""
  }
}
```

### 2. 인증결과 처리 API
```
POST /api/mobileok/result
```

**요청**:
```json
{
  "encryptMOKKeyToken": "[드림시큐리티에서 전달받은 토큰]"
}
```

**응답**:
```json
{
  "code": 200,
  "status": "OK",
  "message": "요청 성공",
  "data": {
    "id": 2,
    "birth": "2021-05-21", 
    "name": "홍길동",
    "phone": "010-2222-3333"
  }
}
```

### 3. 회원가입 완료 API
```
POST /api/auth/sign-up/{id}
```

**요청**:
```json
{
  "email": "user@example.com",
  "userType": "student",
  "password": "password123",
  "university": "서울대학교",
  "marketingConsent": true
}
```

## 환경변수 설정

```bash
# 캠퍼스 API 설정 (직접 개발 서버로 요청)
REACT_APP_CAMPUS_API_BASE_URL=https://campus-dev.duckdns.org

# 운영 환경에서는 실제 URL 설정
# REACT_APP_CAMPUS_API_BASE_URL=https://campus.duckdns.org
```

## 개발 시 주의사항

1. **CORS 이슈**: 개발 서버 `https://campus-dev.duckdns.org`로 직접 요청
2. **드림시큐리티 스크립트**: 개발용 URL 사용 중  
3. **API 도메인**: 백엔드 팀과 협의하여 도메인 변경 예정
4. **에러 핸들링**: API 응답에 따른 적절한 에러 메시지 표시

## 테스트 방법

1. 회원가입 페이지 접속
2. 이름, 생년월일 입력
3. "휴대폰 인증" 버튼 클릭
4. 드림시큐리티 본인인증 창에서 인증 진행
5. 인증 완료 후 나머지 정보 입력
6. 회원가입 완료

## 추후 개선사항

- [ ] 실제 이메일 중복 확인 API 연동
- [ ] 에러 코드에 따른 세분화된 메시지
- [ ] 본인인증 재시도 로직 개선
- [ ] 운영 환경 도메인 설정
- [ ] enum 관리 (userType, university, department 등)

## 백엔드 이슈

- 서비스 신청 시 개발 도메인과 현재 사용 중인 개발 도메인이 달라서 **FE, BE, 개발 도메인** 사용 요청 예정
