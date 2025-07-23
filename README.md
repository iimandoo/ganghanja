# 대한검정회 한자카드 🀄

한자를 재미있게 학습할 수 있는 인터랙티브 카드 게임입니다. 8급부터 5급까지 다양한 급수의 한자를 학습할 수 있습니다.

## 주요 기능

- 📚 8급~5급 한자 학습
- 🔀 랜덤 섞기 기능
- 📊 학습 진도 표시
- 📧 기능 요청 및 건의사항 전송
- 📱 반응형 디자인 (모바일 지원)

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 이메일 기능 설정 (선택사항)

요청하기 기능을 사용하려면 EmailJS 설정이 필요합니다:

1. [EmailJS](https://www.emailjs.com/)에서 계정을 생성합니다.
2. 새 서비스를 생성하고 이메일 서비스를 연결합니다.
3. 이메일 템플릿을 생성합니다. 템플릿에 다음 변수들을 포함하세요:

   - `{{from_name}}` - 보내는 사람 이름
   - `{{message}}` - 요청 내용
   - `{{to_email}}` - 받는 사람 이메일 (euneundh@gmail.com)

4. 프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
```

5. EmailJS 대시보드에서 얻은 실제 키 값들로 교체하세요.

## 기술 스택

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Styled Components
- **Email**: EmailJS
- **Deployment**: Vercel (권장)

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx          # 메인 페이지
│   ├── layout.tsx        # 레이아웃
│   └── globals.css       # 글로벌 스타일
├── components/
│   └── HanjaCard.tsx     # 한자 카드 컴포넌트
└── data/
    └── hanjaData.ts      # 한자 데이터
```

## 배포

Vercel에서 쉽게 배포할 수 있습니다:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

배포 시 환경 변수 설정을 잊지 마세요!

## 기여하기

버그 리포트나 기능 요청은 Issues에 남겨주시거나, 게임 내 "요청하기" 기능을 사용해 주세요.

## 라이센스

MIT License
