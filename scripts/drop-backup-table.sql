-- hanja_data_backup 테이블 삭제
-- Supabase SQL Editor에서 실행

-- 주의: 이 스크립트는 백업 테이블을 완전히 삭제합니다!

-- 1. 백업 테이블 존재 여부 확인
SELECT 
  CASE 
    WHEN EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'hanja_data_backup') 
    THEN 'hanja_data_backup 테이블이 존재합니다'
    ELSE 'hanja_data_backup 테이블이 존재하지 않습니다'
  END as table_status;

-- 2. 백업 테이블의 데이터 개수 확인
SELECT 
  CASE 
    WHEN EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'hanja_data_backup') 
    THEN (SELECT COUNT(*) FROM hanja_data_backup)
    ELSE 0
  END as backup_count;

-- 3. 백업 테이블 삭제 (실행하려면 아래 주석을 해제)
-- DROP TABLE IF EXISTS hanja_data_backup;

-- 4. 삭제 확인
SELECT 
  CASE 
    WHEN EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'hanja_data_backup') 
    THEN 'hanja_data_backup 테이블이 여전히 존재합니다'
    ELSE 'hanja_data_backup 테이블이 삭제되었습니다'
  END as deletion_status;

