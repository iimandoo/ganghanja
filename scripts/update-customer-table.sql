-- customer_inquiries 테이블 스키마 변경 SQL (Supabase SQL Editor에서 실행)

-- 1. 새로운 contact_info 컬럼 추가
ALTER TABLE customer_inquiries 
ADD COLUMN contact_info VARCHAR(200);

-- 2. 기존 데이터가 있다면 contact_info로 마이그레이션 (선택사항)
UPDATE customer_inquiries 
SET contact_info = COALESCE(
  CASE 
    WHEN contact_email IS NOT NULL AND contact_phone IS NOT NULL 
    THEN contact_email || ' | ' || contact_phone
    WHEN contact_email IS NOT NULL 
    THEN contact_email
    WHEN contact_phone IS NOT NULL 
    THEN contact_phone
    WHEN contact_kakao IS NOT NULL 
    THEN 'KakaoTalk: ' || contact_kakao
    ELSE NULL
  END
);

-- 3. 기존 컬럼들 삭제
ALTER TABLE customer_inquiries 
DROP COLUMN IF EXISTS contact_phone,
DROP COLUMN IF EXISTS contact_email,
DROP COLUMN IF EXISTS contact_kakao;

-- 4. 테이블 확인
SELECT 'customer_inquiries 테이블이 성공적으로 변경되었습니다!' as message;

-- 5. 현재 스키마 확인
\d customer_inquiries; 