import * as dotenv from "dotenv";
import { getSupabaseAdmin } from "../src/lib/supabase";

// .env.local 파일 로드
dotenv.config({ path: ".env.local" });

async function createCustomerTable() {
  console.log("🗄️ customer_inquiries 테이블 생성을 시작합니다...");

  const createTableSQL = `
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
  `;

  try {
    console.log("📝 SQL 실행 중...");

    const { data, error } = await supabaseAdmin.rpc("exec_sql", {
      sql: createTableSQL,
    });

    if (error) {
      console.error("❌ 테이블 생성 실패:", error);

      // RPC가 없다면 직접 쿼리 시도
      console.log("🔄 직접 쿼리 방식으로 재시도...");

      // 각 쿼리를 개별적으로 실행
      const queries = [
        "DROP TABLE IF EXISTS customer_inquiries",
        `CREATE TABLE customer_inquiries (
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
        )`,
        "CREATE INDEX idx_customer_inquiries_created_at ON customer_inquiries(created_at DESC)",
        "CREATE INDEX idx_customer_inquiries_type ON customer_inquiries(inquiry_type)",
        "CREATE INDEX idx_customer_inquiries_rating ON customer_inquiries(rating)",
        "ALTER TABLE customer_inquiries DISABLE ROW LEVEL SECURITY",
      ];

      for (const query of queries) {
        try {
          console.log(`📝 실행 중: ${query.substring(0, 50)}...`);
          const { error: queryError } = await supabaseAdmin.rpc("exec", {
            sql: query,
          });
          if (queryError) {
            console.log(
              `⚠️  쿼리 실행 중 오류 (무시 가능): ${queryError.message}`
            );
          }
        } catch (e) {
          console.log(`⚠️  쿼리 실행 중 오류 (무시 가능): ${e}`);
        }
      }
    } else {
      console.log("✅ SQL 실행 성공:", data);
    }

    // 테이블 생성 확인
    console.log("🔍 테이블 생성 확인 중...");
    const { data: tableCheck, error: checkError } = await supabaseAdmin
      .from("customer_inquiries")
      .select("count", { count: "exact", head: true });

    if (checkError) {
      console.error("❌ 테이블 확인 실패:", checkError.message);
      console.log("💡 Supabase 대시보드에서 수동으로 테이블을 생성해주세요.");
      console.log("📋 SQL 파일: scripts/create-customer-table.sql");
    } else {
      console.log("✅ customer_inquiries 테이블이 성공적으로 생성되었습니다!");
      console.log("📊 현재 레코드 수:", tableCheck || 0);
    }
  } catch (error) {
    console.error("❌ 테이블 생성 중 오류:", error);
    console.log("💡 Supabase 대시보드 SQL Editor에서 수동으로 실행해주세요:");
    console.log("📋 파일: scripts/create-customer-table.sql");
  }
}

// 테스트 데이터 삽입
async function insertTestData() {
  console.log("\n🧪 테스트 데이터 삽입...");

  try {
    const { data, error } = await supabaseAdmin
      .from("customer_inquiries")
      .insert([
        {
          message: "테스트 문의입니다.",
          contact_email: "test@example.com",
          rating: 5,
          inquiry_type: "chat",
        },
      ])
      .select();

    if (error) {
      console.error("❌ 테스트 데이터 삽입 실패:", error);
    } else {
      console.log("✅ 테스트 데이터 삽입 성공:", data);
    }
  } catch (error) {
    console.error("❌ 테스트 데이터 삽입 중 오류:", error);
  }
}

async function main() {
  await createCustomerTable();
  await insertTestData();
  console.log("\n🎉 테이블 생성 작업이 완료되었습니다!");
}

main().catch(console.error);
