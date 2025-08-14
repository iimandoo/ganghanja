-- word_history 테이블에 hanja와 kor 필드 추가
-- Supabase SQL Editor에서 실행

-- 1. 기존 테이블 구조 확인
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'word_history' 
ORDER BY ordinal_position;

-- 2. hanja와 kor 필드 추가
ALTER TABLE word_history 
ADD COLUMN IF NOT EXISTS hanja VARCHAR(10),
ADD COLUMN IF NOT EXISTS kor VARCHAR(100);

-- 3. 필드 설명 추가 (선택사항)
COMMENT ON COLUMN word_history.hanja IS '추가/수정된 한자';
COMMENT ON COLUMN word_history.kor IS '추가/수정된 한글 음';

-- 4. 업데이트된 테이블 구조 확인
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'word_history' 
ORDER BY ordinal_position;

-- 5. 샘플 데이터 확인
SELECT COUNT(*) as total_records FROM word_history;
