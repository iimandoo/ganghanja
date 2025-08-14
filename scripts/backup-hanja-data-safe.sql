-- hanja_data 테이블을 hanja_data_backup으로 안전하게 백업
-- Supabase SQL Editor에서 실행

-- 1. 백업 테이블이 이미 존재하는지 확인
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'hanja_data_backup') THEN
    RAISE NOTICE 'hanja_data_backup 테이블이 이미 존재합니다. 백업을 건너뜁니다.';
    RETURN;
  END IF;
END $$;

-- 2. 백업 테이블이 존재하지 않는 경우에만 생성
CREATE TABLE IF NOT EXISTS hanja_data_backup AS 
SELECT * FROM hanja_data;

-- 3. 백업 테이블에 기본키 추가 (없는 경우에만)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'hanja_data_backup' 
    AND constraint_name = 'hanja_data_backup_pkey'
  ) THEN
    ALTER TABLE hanja_data_backup 
    ADD CONSTRAINT hanja_data_backup_pkey PRIMARY KEY (id);
  END IF;
END $$;

-- 4. 인덱스 추가 (없는 경우에만)
CREATE INDEX IF NOT EXISTS idx_hanja_backup_type_level ON hanja_data_backup(type, level);
CREATE INDEX IF NOT EXISTS idx_hanja_backup_meaning_key ON hanja_data_backup(meaning_key);

-- 5. RLS 비활성화
ALTER TABLE hanja_data_backup DISABLE ROW LEVEL SECURITY;

-- 6. 백업 완료 확인
SELECT 
  'hanja_data_backup 테이블이 성공적으로 생성되었습니다!' as message,
  (SELECT COUNT(*) FROM hanja_data) as original_count,
  (SELECT COUNT(*) FROM hanja_data_backup) as backup_count;

-- 7. 백업 데이터 무결성 확인
SELECT 
  CASE 
    WHEN (SELECT COUNT(*) FROM hanja_data) = (SELECT COUNT(*) FROM hanja_data_backup) 
    THEN '백업 데이터 개수가 일치합니다'
    ELSE '백업 데이터 개수가 일치하지 않습니다!'
  END as integrity_check;

