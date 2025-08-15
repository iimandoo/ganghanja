-- user_preferences 테이블 완전 생성
-- 기존 테이블이 있다면 삭제하고 새로 생성합니다

-- 1. 기존 테이블이 있다면 삭제
DROP TABLE IF EXISTS user_preferences CASCADE;

-- 2. 사용자 설정 테이블 생성 (모든 필드 포함)
CREATE TABLE user_preferences (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_level VARCHAR(20) NOT NULL DEFAULT 'user' CHECK (user_level IN ('user', 'admin', 'moderator')),
  
  -- 기존 필드들
  vocabulary_range VARCHAR(10) DEFAULT '기본' CHECK (vocabulary_range IN ('기본', '중급')),
  level_filter TEXT[] DEFAULT '{}', -- 선택된 급수들
  type_filter VARCHAR(20) DEFAULT 'TypeA',
  
  -- 새로운 필드들 (user_settings 테이블과 통합)
  selected_type VARCHAR(50) DEFAULT '대한검정회 급수자격검정',
  selected_vocabulary_range VARCHAR(10) DEFAULT '기본' CHECK (selected_vocabulary_range IN ('기본', '중급')),
  selected_levels TEXT[] DEFAULT '{}',
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 3. 인덱스 생성
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX idx_user_preferences_user_level ON user_preferences(user_level);

-- 4. Row Level Security (RLS) 활성화
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- 5. RLS 정책 생성
-- 사용자는 자신의 설정만 볼 수 있음
CREATE POLICY "Users can view own preferences" ON user_preferences
  FOR SELECT USING (auth.uid() = user_id);

-- 사용자는 자신의 설정만 수정할 수 있음
CREATE POLICY "Users can update own preferences" ON user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

-- 사용자는 자신의 설정만 삽입할 수 있음
CREATE POLICY "Users can insert own preferences" ON user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. 테이블 구조 확인
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'user_preferences'
ORDER BY ordinal_position;

-- 7. 샘플 데이터 확인 (테이블이 비어있음)
SELECT COUNT(*) as total_records FROM user_preferences;
