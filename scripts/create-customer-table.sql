-- 고객센터 테이블 생성 SQL (Supabase SQL Editor에서 실행)

-- 기존 테이블이 있다면 삭제 (선택사항)
DROP TABLE IF EXISTS customer_inquiries;

-- customer_inquiries 테이블 생성
CREATE TABLE customer_inquiries (
  id BIGSERIAL PRIMARY KEY,
  message TEXT NOT NULL,
  contact_phone VARCHAR(20),
  contact_email VARCHAR(100),
  contact_kakao VARCHAR(50),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  inquiry_type VARCHAR(20) DEFAULT 'chat' CHECK (inquiry_type IN ('chat', 'request')),
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 추가 (성능 최적화)
CREATE INDEX idx_customer_inquiries_created_at ON customer_inquiries(created_at DESC);
CREATE INDEX idx_customer_inquiries_type ON customer_inquiries(inquiry_type);
CREATE INDEX idx_customer_inquiries_rating ON customer_inquiries(rating);

-- Row Level Security (RLS) 비활성화 (API에서 접근하기 위해)
ALTER TABLE customer_inquiries DISABLE ROW LEVEL SECURITY;

-- 테이블 생성 확인
SELECT 'customer_inquiries 테이블이 성공적으로 생성되었습니다!' as message; 