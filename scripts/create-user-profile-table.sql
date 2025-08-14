-- 사용자 프로필 테이블 생성
-- Supabase SQL Editor에서 실행

-- 1. 기존 테이블이 있다면 삭제
DROP TABLE IF EXISTS user_profile;

-- 2. 사용자 프로필 테이블 생성
CREATE TABLE user_profile (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_level VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (user_level IN ('user', 'admin', 'moderator')),
  nickname VARCHAR(100),
  profile_image TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 3. 인덱스 생성
CREATE INDEX idx_user_profile_user_id ON user_profile(user_id);
CREATE INDEX idx_user_profile_user_level ON user_profile(user_level);

-- 4. Row Level Security (RLS) 활성화
ALTER TABLE user_profile ENABLE ROW LEVEL SECURITY;

-- 5. RLS 정책 생성
-- 사용자는 자신의 프로필만 볼 수 있음
CREATE POLICY "Users can view own profile" ON user_profile
  FOR SELECT USING (auth.uid() = user_id);

-- 사용자는 자신의 프로필만 수정할 수 있음
CREATE POLICY "Users can update own profile" ON user_profile
  FOR UPDATE USING (auth.uid() = user_id);

-- 사용자는 자신의 프로필만 삽입할 수 있음
CREATE POLICY "Users can insert own profile" ON user_profile
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. 테이블 구조 확인
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'user_profile'
ORDER BY ordinal_position;

-- 7. 샘플 데이터 확인 (테이블이 비어있음)
SELECT COUNT(*) as total_records FROM user_profile;
