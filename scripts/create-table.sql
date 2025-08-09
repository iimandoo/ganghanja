-- Supabase SQL Editor에서 실행할 테이블 생성 스크립트

-- 기존 테이블이 있다면 삭제 (선택사항)
DROP TABLE IF EXISTS hanja_data;

-- hanja_data 테이블 생성
CREATE TABLE hanja_data (
  id BIGSERIAL PRIMARY KEY,
  character VARCHAR(10) NOT NULL,
  meaning VARCHAR(100) NOT NULL,
  meaning_key VARCHAR(50) NOT NULL,
  example TEXT NOT NULL,
  idiom TEXT NOT NULL,
  level VARCHAR(10) NOT NULL,
  type VARCHAR(10) NOT NULL,
  naver_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 성능을 위한 인덱스 추가
CREATE INDEX idx_hanja_type_level ON hanja_data(type, level);
CREATE INDEX idx_hanja_meaning_key ON hanja_data(meaning_key);

-- Row Level Security (RLS) 비활성화 (API에서 접근하기 위해)
ALTER TABLE hanja_data DISABLE ROW LEVEL SECURITY;

-- 테이블 생성 확인
SELECT 'hanja_data 테이블이 성공적으로 생성되었습니다!' as message; 