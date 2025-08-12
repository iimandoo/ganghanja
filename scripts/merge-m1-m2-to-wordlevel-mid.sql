-- hanja_data 테이블에 wordLevel_mid 컬럼을 추가하고 m1, m2를 합치는 스크립트

-- 1. wordLevel_mid 컬럼 추가 (JSONB 타입으로)
ALTER TABLE hanja_data 
ADD COLUMN IF NOT EXISTS wordLevel_mid JSONB DEFAULT '[]';

-- 2. 기존 m1, m2 컬럼이 존재한다면 데이터를 wordLevel_mid로 합치기
-- 주의: 실제 테이블에 m1, m2 컬럼이 있는 경우에만 실행
UPDATE hanja_data 
SET wordLevel_mid = COALESCE(to_jsonb(m1), '[]'::jsonb) || COALESCE(to_jsonb(m2), '[]'::jsonb)
WHERE wordLevel_mid IS NULL OR wordLevel_mid = '[]'::jsonb;

-- 3. 인덱스 추가 (성능 향상을 위해)
CREATE INDEX IF NOT EXISTS idx_hanja_wordlevel_mid ON hanja_data USING GIN (wordLevel_mid);

-- 4. 변경사항 확인
SELECT 'wordLevel_mid 컬럼이 추가되었습니다!' as message;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'hanja_data' 
AND column_name = 'wordlevel_mid';