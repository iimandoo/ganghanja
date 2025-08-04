# Supabase 인증 설정 가이드

## 1. Supabase 프로젝트 설정

### 1.1 Authentication 설정

1. Supabase 대시보드에서 프로젝트 선택
2. Authentication > Settings로 이동
3. 다음 설정을 변경:

#### 이메일 확인 비활성화 (선택사항)

- "Enable email confirmations" 체크 해제
- 이렇게 하면 회원가입 후 바로 로그인 가능

#### 이메일 템플릿 설정

- "Email Templates" 섹션에서 이메일 템플릿 커스터마이징 가능

### 1.2 환경 변수 설정

`.env.local` 파일에 다음 환경 변수를 추가:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 2. 현재 구현 방식

### 2.1 사용자명 기반 인증

- 회원가입, 로그인 텍스트버튼을 제공
- 회원가입 클릭시 아이디와 비밀번호 입력, 회원가입 버튼 제공
- 로그인 클릭시 아이디와 비밀번호, 자동로그인체크박스, 로그인 버튼 제공
- 자동로그인 체크시 로그인정보나 세션을 쿠키나 로컬스토리지에 저장하여 재방문시에도 로그인 상태 유지

### 2.2 보안 고려사항

- 사용자 아이디 중복 검사 로직 추가 필요
- 비밀번호 4자이상 입력

### 2.3 구현된 기능

- ✅ 회원가입 (아이디 + 비밀번호)
- ✅ 로그인 (아이디 + 비밀번호)
- ✅ 자동 로그인 (체크박스)
- ✅ 로그아웃
- ✅ 세션 관리
- ✅ 비밀번호 길이 검증 (4자 이상)
- ✅ 로컬스토리지를 통한 자동 로그인 정보 저장

## 3. 추가 개선 사항

### 3.1 사용자명 중복 검사

```sql
-- 사용자명 중복 검사를 위한 함수
CREATE OR REPLACE FUNCTION check_username_unique(username TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM auth.users
    WHERE raw_user_meta_data->>'username' = username
  );
END;
$$ LANGUAGE plpgsql;
```

### 3.2 실제 이메일 사용 시

만약 실제 이메일 주소를 사용하려면:

1. AuthModal 컴포넌트에서 이메일 필드 추가
2. SignUpData, SignInData 타입에 email 필드 추가
3. useAuth 훅에서 실제 이메일 주소 사용

## 4. 문제 해결

### 4.1 이메일 확인 오류

- Supabase 대시보드에서 "Enable email confirmations" 비활성화
- 또는 실제 이메일 주소 사용

### 4.2 인증 오류

- 환경 변수가 올바르게 설정되었는지 확인
- Supabase 프로젝트 URL과 키가 정확한지 확인

### 4.3 CORS 오류

- Supabase 대시보드에서 Authentication > URL Configuration 확인
- 로컬 개발 URL이 허용 목록에 포함되어 있는지 확인
