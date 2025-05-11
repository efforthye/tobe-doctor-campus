# 투비닥터 캠퍼스 - 프론트엔드

투비닥터 캠퍼스는 온라인 교육 플랫폼을 위한 프론트엔드 프로젝트입니다. React, TypeScript, Styled-Components를 사용하여 구현되었습니다.

## 📋 기능

- 사용자 인증 (회원가입, 로그인)
- 과정 목록 및 상세 보기
- 개인화된 대시보드
- 반응형 디자인

## 🚀 시작하기

### 필수 조건

- Node.js (v14 이상)
- npm 또는 yarn

### 설치 및 실행

1. 저장소 클론:
```bash
git clone https://github.com/efforthye/tobi-doctor-campus.git
cd tobi-doctor-campus
```

2. 종속성 설치:
```bash
npm install
# 또는
yarn install
```

3. macOS에서 HOST 환경 변수 문제가 있을 경우:
```bash
# macOS의 HOST 환경 변수 초기화
unset HOST
# 또는 다음 명령으로 시작
HOST=localhost npm start
# 또는
HOST=localhost yarn start
```

4. 개발 서버 시작:
```bash
npm start
# 또는
yarn start
```

5. 브라우저에서 `http://localhost:3000` 열기

## 🏗️ 프로젝트 구조

```
src/
├── components/         # 재사용 가능한 컴포넌트 
│   ├── common/         # 버튼, 입력 필드 등 기본 UI 요소
│   └── layout/         # 헤더, 푸터, 레이아웃 등
├── pages/              # 애플리케이션 페이지
├── store/              # Redux 저장소 설정
│   └── slices/         # Redux 슬라이스
├── styles/             # 전역 스타일 및 테마 설정
├── utils/              # 유틸리티 및 헬퍼 함수
├── types/              # TypeScript 타입 정의
├── App.tsx             # 주요 애플리케이션 컴포넌트
└── index.tsx           # 애플리케이션 진입점
```

## 🛠️ 기술 스택

- [React](https://reactjs.org/) - UI 라이브러리
- [TypeScript](https://www.typescriptlang.org/) - 정적 타입 지원
- [Redux Toolkit](https://redux-toolkit.js.org/) - 상태 관리
- [React Router](https://reactrouter.com/) - 라우팅
- [Styled Components](https://styled-components.com/) - 스타일링
- [Axios](https://axios-http.com/) - API 통신

## 📱 디자인 시스템

이 프로젝트는 피그마로 디자인된 컴포넌트를 기반으로 구현되었습니다. 일관된 디자인을 유지하기 위해 다음 규칙을 따릅니다:

- 색상, 폰트 및 간격에 테마 시스템 사용
- 모든 컴포넌트는 반응형 디자인 지원
- 접근성 표준 준수

## 🔄 코드 컨벤션

이 프로젝트는 다음과 같은 커밋 컨벤션을 사용합니다:

- `feat:` - 새로운 기능 추가
- `fix:` - 버그 수정
- `docs:` - 문서 변경
- `style:` - 코드 스타일 변경(포맷팅 등)
- `refactor:` - 리팩토링
- `test:` - 테스트 추가 또는 수정
- `chore:` - 기타 변경 사항

## 🔧 문제 해결

### macOS에서 HOST 환경 변수 문제

macOS에서 `arm64-apple-darwin20.0.0`와 같은 HOST 환경 변수로 인한 문제가 발생할 수 있습니다. 이를 해결하기 위한 방법:

1. 현재 HOST 환경 변수 확인:
```bash
echo $HOST
```

2. HOST 변수 제거 또는 변경:
```bash
# HOST 변수 제거
unset HOST
# 또는 localhost로 설정
export HOST=localhost
```

3. 또는 .env.local 파일에 설정 추가:
```
HOST=localhost
```

## 📝 라이센스

이 프로젝트는 비공개 프로젝트입니다.