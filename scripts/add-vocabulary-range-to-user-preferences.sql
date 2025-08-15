-- user_preferences 테이블에 vocabulary_range 필드 추가
-- 현재 테이블 구조에 맞춰 필요한 필드만 추가

-- 1. vocabulary_range 필드 추가 (기본값: '기본')
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'user_preferences' AND column_name = 'vocabulary_range') THEN
        ALTER TABLE user_preferences ADD COLUMN vocabulary_range VARCHAR(10) DEFAULT '기본' CHECK (vocabulary_range IN ('기본', '중급'));
    END IF;
END $$;

-- 2. 기존 데이터에 vocabulary_range 값 설정 (기본값: '기본')
UPDATE user_preferences 
SET vocabulary_range = '기본' 
WHERE vocabulary_range IS NULL;

-- 3. 컬럼 구조 확인
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'user_preferences'
ORDER BY ordinal_position;
