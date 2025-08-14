-- user_preferences 테이블에 admin 사용자 추가
-- Supabase SQL Editor에서 실행

-- 1. 현재 auth.users 테이블의 사용자 목록 확인
SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC LIMIT 10;

-- 2. 특정 사용자를 admin으로 설정 (아래 쿼리에서 '사용자_이메일'을 실제 이메일로 변경)
-- 예시: admin@example.com 사용자를 admin으로 설정
INSERT INTO user_preferences (user_id, user_level, vocabulary_range, level_filter, type_filter)
SELECT 
  id,
  'admin',
  '기본',
  ARRAY['8'],
  'TypeA'
FROM auth.users 
WHERE email = 'admin@example.com' -- 여기에 실제 admin으로 설정할 사용자의 이메일 입력
ON CONFLICT (user_id) 
DO UPDATE SET 
  user_level = 'admin',
  updated_at = NOW();

-- 3. admin 사용자 확인
SELECT 
  up.user_level,
  up.vocabulary_range,
  up.level_filter,
  up.type_filter,
  u.email
FROM user_preferences up
JOIN auth.users u ON up.user_id = u.id
WHERE up.user_level = 'admin';

-- 4. 전체 사용자 설정 확인
SELECT 
  up.user_level,
  up.vocabulary_range,
  up.level_filter,
  up.type_filter,
  u.email,
  up.created_at,
  up.updated_at
FROM user_preferences up
JOIN auth.users u ON up.user_id = u.id
ORDER BY up.user_level DESC, up.created_at DESC;
