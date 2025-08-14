-- 사용자 설정 테이블 삭제
-- Supabase SQL Editor에서 실행

-- 주의: 이 스크립트는 user_preferences 테이블을 완전히 삭제합니다!

-- 1. 테이블 존재 여부 확인
SELECT
  CASE
    WHEN EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'user_preferences')
    THEN 'user_preferences 테이블이 존재합니다'
    ELSE 'user_preferences 테이블이 존재하지 않습니다'
  END as table_status;

-- 2. 테이블의 데이터 개수 확인
SELECT
  CASE
    WHEN EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'user_preferences')
    THEN (SELECT COUNT(*) FROM user_preferences)
    ELSE 0
  END as preferences_count;

-- 3. 테이블 삭제 (실행하려면 아래 주석을 해제)
-- DROP TABLE IF EXISTS user_preferences;

-- 4. 삭제 확인
SELECT
  CASE
    WHEN EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'user_preferences')
    THEN 'user_preferences 테이블이 여전히 존재합니다'
    ELSE 'user_preferences 테이블이 삭제되었습니다'
  END as deletion_status;
