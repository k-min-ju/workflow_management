## React Flow와 NextJS v14를 활용한 Workflow Managemenet 개발

이 프로젝트는 React Flow와 Next.js v14를 사용하여 Workflow Management 프로그램을 구현하고자 합니다.  
사용자는 이메일과 Google OAuth 기반으로 회원가입 및 로그인하고, 워크플로우를 자유롭게 생성하고 관리할 수 있습니다.  
또한, WebHook을 통해 데이터를 Google Sheets로 전송하는 기능도 제공합니다.

## 📌 주요 기능

<pre>
- 이메일 기반 로그인  
- 구글 OAuth 기반 회원가입 / 로그인  
- WebHook을 받아 Google Sheet에 데이터가 쓰여지도록 연동 (참고예시: https://www.make.com/en)
  > WebHook은 POST Method로 Body에 전달되는 데이터는 application/json형태
  > 전송할 데이터는 유저가 화면 내에서 자유롭게 추가할 수 있어야 하며 파일 업로드를 지원
- Workflow 특징
  > 각각 구분되어 관리 가능
  > 유저가 원하는 만큼 생성 가능
  > 유저에게 Workflow 공유 가능
  > Workflow 편집 가능
</pre>

## ⚙️ 설치 및 설정

- Node.js: v20.11.1 (권장)
- Yarn: v1.22.21 (권장)  
  <span style="color: red; font-size: 0.875rem">최소 버전은 확인되지 않았으므로, 권장 버전을 사용하는 것이 가장 안정적입니다.</span>

```bash
git clone https://github.com/k-min-ju/workflow_management.git
cd workflow_management
yarn install
yarn dev
```

## 🔑 환경 변수 설정

<pre>
NEXTAUTH_URL=your-nextauth-url
NEXTAUTH_SECRET=your-nextauth-secret
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_WEBHOOK_URL=your-webhook-url
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firbase-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
</pre>

## 📂 프로젝트 구조

<pre>
src/
│
├── app/                      # 라우팅, 페이지 관련 로직
│   └── api/                  # API 요청 및 응답 관련 파일
│   └── other directory/      # 
│
├── components/               # UI 컴포넌트
│   ├── ComponentA/           # 특정 컴포넌트 디렉토리
│   │   ├── ComponentA.tsx    # React 컴포넌트 코드
│   │   ├── ComponentA.module.scss # 스타일 파일
│   │   └── ComponentATypes.ts     # 해당 컴포넌트의 타입 정의
│   ├── ComponentB/           # 다른 컴포넌트 (ComponentB) 디렉토리
│   │   └── ...               # 동일한 방식으로 디렉토리 구조화
│   └── ...
│
├── configs/                  # 애플리케이션 설정 파일
│   └── constants.ts          # 상수 값
│
├── context/                  # Context Provider
│   └── Provider.tsx          # 전역 상태 관리 Provider
│
│
├── firebase/                 # Firebase 관련 설정 및 서비스
│   ├── config.ts             # Firebase 초기화 및 설정 파일
│   └── firebaseService.ts    # Firebase와 관련된 서비스 로직
│
├── services/                 # API 관련 서비스
├   ├── serviceA/             # 특정 API 디렉토리
│   │   ├── service.ts        # 특정 API 호출 함수
│   │   ├── serviceTypes.ts   # 특정 서비스 타입 정의
│   └── ...                   # 동일한 방식으로 디렉토리 구조화
│
├── styles/                   # 전역 스타일 파일 및 SCSS 파일
│   ├── globals.scss          # 전역적으로 적용되는 CSS
│
└── types/                    # 전역 타입 정의, 공통 타입 및 인터페이스
    ├── common.ts             # 공통으로 사용되는 타입 정의
    └── ...
</pre>