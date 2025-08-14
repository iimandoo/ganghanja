    -- 단어 히스토리 관리 테이블 생성
    -- Supabase SQL Editor에서 실행

    -- 1. 기존 테이블이 있다면 삭제
    DROP TABLE IF EXISTS word_history;

    -- 2. 히스토리 테이블 생성
CREATE TABLE word_history (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  hanja_id INTEGER NOT NULL REFERENCES hanja_data(id) ON DELETE CASCADE,
  wordlevel VARCHAR(10) NOT NULL CHECK (wordlevel IN ('기본', '중급')),
  type VARCHAR(10) NOT NULL CHECK (type IN ('add', 'modify', 'delete')),
  hanja VARCHAR(10) NOT NULL,
  kor VARCHAR(100) NOT NULL,
  before_wordlevel_es JSONB,
  before_wordlevel_mid JSONB,
  after_wordlevel_es JSONB,
  after_wordlevel_mid JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

    -- 3. 인덱스 생성
    CREATE INDEX idx_word_history_user_id ON word_history(user_id);
    CREATE INDEX idx_word_history_hanja_id ON word_history(hanja_id);
    CREATE INDEX idx_word_history_created_at ON word_history(created_at);
    CREATE INDEX idx_word_history_wordlevel ON word_history(wordlevel);
    CREATE INDEX idx_word_history_type ON word_history(type);

    -- 4. Row Level Security (RLS) 활성화
    ALTER TABLE word_history ENABLE ROW LEVEL SECURITY;

    -- 5. RLS 정책 생성
    -- 사용자는 자신이 추가한 히스토리만 볼 수 있음
    CREATE POLICY "Users can view their own word history" ON word_history
    FOR SELECT USING (auth.uid() = user_id);

    -- 사용자는 자신의 히스토리만 삽입할 수 있음
    CREATE POLICY "Users can insert their own word history" ON word_history
    FOR INSERT WITH CHECK (auth.uid() = auth.uid());

    -- 6. 테이블 구조 확인
    SELECT column_name, data_type, is_nullable, column_default
    FROM information_schema.columns 
    WHERE table_name = 'word_history' 
    ORDER BY ordinal_position;

    -- 7. 샘플 데이터 확인 (테이블이 비어있음)
    SELECT COUNT(*) as total_records FROM word_history;
