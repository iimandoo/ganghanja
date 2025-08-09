-- hanja_data 테이블에 naver_url 컬럼 추가 및 값 일괄 업데이트

-- 1) 컬럼 추가 (이미 있으면 생략)
ALTER TABLE hanja_data
  ADD COLUMN IF NOT EXISTS naver_url TEXT;

-- 2) 값 업데이트: 'https://hanja.dict.naver.com/#/search?query=' || character
UPDATE hanja_data
SET naver_url = 'https://hanja.dict.naver.com/#/search?query=' || character;

-- 3) 확인용 샘플 조회 (상위 10건)
SELECT id, character, naver_url
FROM hanja_data
ORDER BY id
LIMIT 10;

