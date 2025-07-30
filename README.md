# COOL한자 🀄

한자를 재미있게 학습할 수 있는 인터랙티브 카드 게임입니다. 대한검정회와 어문회 두 기관의 한자능력검정시험을 지원합니다.

## 주요 기능

- 📚 **대한검정회 TypeA & 어문회 TypeB** 한자 학습 지원
- 🎯 **급수별 학습**: 8급~5급 한자 학습
- 🎨 **다양한 카드 색상**: 6가지 아름다운 그라데이션 색상
- 🔀 **랜덤 섞기 기능**: 효과적인 학습을 위한 카드 섞기
- 📊 **실시간 진도 표시**: 학습 진행도 시각화
- 💬 **고객 문의 시스템**: 기능 요청 및 건의사항 전송 (DB 저장)
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- ⚡ **빠른 성능**: React Query 기반 데이터 캐싱

## 시작하기

### 필수 요구사항

- Node.js 18+
- PostgreSQL 데이터베이스 (Supabase 권장)

### 설치

```bash
npm install
```

### 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 데이터베이스 설정

1. [Supabase](https://supabase.com/)에서 새 프로젝트를 생성합니다.
2. 환경변수를 설정합니다.
3. 데이터 마이그레이션을 실행합니다:

```bash
# 한자 데이터 마이그레이션
npm run migrate

# 고객 문의 테이블 생성
npm run create-customer-table
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 기술 스택

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Styled Components, CSS-in-JS
- **State Management**: React Query (TanStack Query)
- **Database**: PostgreSQL (Supabase)
- **Icons**: React Icons
- **Deployment**: Vercel (권장)

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx              # 메인 페이지
│   ├── layout.tsx            # 앱 레이아웃
│   ├── globals.css           # 글로벌 스타일
│   ├── sitemap.ts            # SEO 사이트맵
│   └── api/                  # API Routes
│       ├── hanja/[type]/     # 한자 데이터 API
│       ├── levels/[type]/    # 급수 목록 API
│       └── customer/inquiry/ # 고객 문의 API
├── components/
│   ├── HanjaCard.tsx         # 한자 카드 컴포넌트
│   ├── TypeSelect/           # 한자 타입 선택
│   ├── LevelFilter/          # 급수 필터
│   ├── ProgressBar/          # 진도 표시바
│   ├── GameControls/         # 게임 컨트롤
│   ├── ChatModal/            # 채팅 모달
│   ├── ContactModal/         # 문의 모달
│   └── QueryProvider.tsx     # React Query 프로바이더
├── hooks/
│   ├── useHanjaGameDB.ts     # 메인 게임 로직
│   ├── useChat.ts            # 채팅 관리
│   └── useModal.ts           # 모달 관리
├── lib/
│   ├── supabase.ts           # Supabase 클라이언트
│   └── api.ts                # API 유틸리티
├── styles/
│   └── theme.ts              # 디자인 시스템
├── utils/
│   ├── cardColors.ts         # 카드 색상 관리
│   └── metadata.ts           # SEO 메타데이터
└── constants/
    └── index.ts              # 앱 상수
```

## 배포

### Vercel 배포

```bash
npm install -g vercel
vercel --prod
```

환경변수를 Vercel 프로젝트 설정에서 추가해야 합니다:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 개발자 정보

- **개발**: 한자 학습 최적화를 위한 인터랙티브 웹 애플리케이션
- **목표**: 한자능력검정시험 대비 효과적인 학습 도구 제공
- **특징**: 대한검정회와 어문회 양쪽 시험 대응

## 라이선스

MIT License
