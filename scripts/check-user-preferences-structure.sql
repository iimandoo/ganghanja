-- user_preferences 테이블 구조 확인
-- 이 스크립트를 먼저 실행하여 현재 테이블 구조를 파악하세요

-- 1. 테이블 존재 여부 확인
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'user_preferences'
) as table_exists;

-- 2. 테이블이 존재하는 경우 컬럼 구조 확인
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    ordinal_position
FROM information_schema.columns
WHERE table_name = 'user_preferences'
ORDER BY ordinal_position;

-- 3. 테이블이 존재하는 경우 샘플 데이터 확인
SELECT COUNT(*) as total_records 
FROM user_preferences;

-- 4. 테이블이 존재하는 경우 첫 번째 레코드 확인 (데이터가 있는 경우)
SELECT * FROM user_preferences LIMIT 1;
