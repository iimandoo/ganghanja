-- hanja_data 테이블을 hanja_data_backup으로 백업
-- Supabase SQL Editor에서 실행

-- 1. 기존 백업 테이블이 있다면 삭제
DROP TABLE IF EXISTS hanja_data_backup;

-- 2. hanja_data와 동일한 구조로 백업 테이블 생성
CREATE TABLE hanja_data_backup AS 
SELECT * FROM hanja_data;

-- 3. 백업 테이블에 기본키와 인덱스 추가
ALTER TABLE hanja_data_backup 
ADD CONSTRAINT hanja_data_backup_pkey PRIMARY KEY (id);

-- 4. 성능을 위한 인덱스 추가
CREATE INDEX idx_hanja_backup_type_level ON hanja_data_backup(type, level);
CREATE INDEX idx_hanja_backup_meaning_key ON hanja_data_backup(meaning_key);

-- 5. Row Level Security (RLS) 비활성화
ALTER TABLE hanja_data_backup DISABLE ROW LEVEL SECURITY;

-- 6. 백업 완료 확인
SELECT 
  'hanja_data_backup 테이블이 성공적으로 생성되었습니다!' as message,
  (SELECT COUNT(*) FROM hanja_data) as original_count,
  (SELECT COUNT(*) FROM hanja_data_backup) as backup_count;

-- 7. 백업 테이블 구조 확인
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'hanja_data_backup' 
ORDER BY ordinal_position;

-- 8. 백업 데이터 샘플 확인 (상위 5건)
SELECT 
  id,
  character,
  meaning,
  level,
  type,
  created_at
FROM hanja_data_backup 
ORDER BY id 
LIMIT 5;

