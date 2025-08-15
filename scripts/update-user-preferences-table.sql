-- user_preferences 테이블 업데이트
-- user_settings 테이블의 필드들을 통합하기 위한 스크립트

-- 1. 필요한 필드 추가 (이미 존재하지 않는 경우)
DO $$ 
BEGIN
    -- selected_type 필드 추가 (기본값: '대한검정회 급수자격검정')
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'user_preferences' AND column_name = 'selected_type') THEN
        ALTER TABLE user_preferences ADD COLUMN selected_type VARCHAR(50) DEFAULT '대한검정회 급수자격검정';
    END IF;
    
    -- selected_vocabulary_range 필드 추가 (기본값: '기본')
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'user_preferences' AND column_name = 'selected_vocabulary_range') THEN
        ALTER TABLE user_preferences ADD COLUMN selected_vocabulary_range VARCHAR(10) DEFAULT '기본' CHECK (selected_vocabulary_range IN ('기본', '중급'));
    END IF;
    
    -- selected_levels 필드 추가 (기본값: 빈 배열)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'user_preferences' AND column_name = 'selected_levels') THEN
        ALTER TABLE user_preferences ADD COLUMN selected_levels TEXT[] DEFAULT '{}';
    END IF;
END $$;

-- 2. 기존 데이터 마이그레이션 (기존 컬럼이 있는 경우에만)
DO $$
BEGIN
    -- type_filter 컬럼이 있는 경우에만 마이그레이션
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'user_preferences' AND column_name = 'type_filter') THEN
        
        UPDATE user_preferences 
        SET 
            selected_type = CASE 
                WHEN type_filter = 'TypeA' THEN '대한검정회 급수자격검정'
                WHEN type_filter = 'TypeB' THEN '어문회 검정시험'
                ELSE '대한검정회 급수자격검정'
            END
        WHERE selected_type IS NULL;
    ELSE
        -- type_filter 컬럼이 없는 경우 기본값으로 설정
        UPDATE user_preferences 
        SET selected_type = '대한검정회 급수자격검정'
        WHERE selected_type IS NULL;
    END IF;
    
    -- vocabulary_range 컬럼이 있는 경우에만 마이그레이션
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'user_preferences' AND column_name = 'vocabulary_range') THEN
        
        UPDATE user_preferences 
        SET selected_vocabulary_range = vocabulary_range
        WHERE selected_vocabulary_range IS NULL;
    ELSE
        -- vocabulary_range 컬럼이 없는 경우 기본값으로 설정
        UPDATE user_preferences 
        SET selected_vocabulary_range = '기본'
        WHERE selected_vocabulary_range IS NULL;
    END IF;
    
    -- level_filter 컬럼이 있는 경우에만 마이그레이션
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'user_preferences' AND column_name = 'level_filter') THEN
        
        UPDATE user_preferences 
        SET selected_levels = level_filter
        WHERE selected_levels IS NULL;
    ELSE
        -- level_filter 컬럼이 없는 경우 기본값으로 설정
        UPDATE user_preferences 
        SET selected_levels = '{}'
        WHERE selected_levels IS NULL;
    END IF;
END $$;

-- 3. 테이블 구조 확인
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'user_preferences'
ORDER BY ordinal_position;
