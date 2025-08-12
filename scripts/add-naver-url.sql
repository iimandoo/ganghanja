-- hanja_data 테이블에 wordLevel_mid 컬럼 추가 및 m1, m2 데이터 통합

-- 1) wordLevel_mid 컬럼 추가 (JSONB 타입으로 배열 데이터 저장)
ALTER TABLE hanja_data
  ADD COLUMN IF NOT EXISTS wordLevel_mid JSONB;

-- 2) 기존 m1, m2 데이터가 있다면 wordLevel_mid로 통합
-- (현재 테이블에는 m1, m2 컬럼이 없으므로 주석 처리)
-- UPDATE hanja_data
-- SET wordLevel_mid = jsonb_build_object(
--   'm1', COALESCE(m1, '[]'::jsonb),
--   'm2', COALESCE(m2, '[]'::jsonb)
-- );

-- 3) 확인용 샘플 조회 (상위 10건)
SELECT id, character, wordLevel_mid
FROM hanja_data
ORDER BY id
LIMIT 10;

