import * as dotenv from "dotenv";

// .env.local 파일 로드
dotenv.config({ path: ".env.local" });

async function manualCreateTable() {
  console.log("🛠️ 수동으로 테이블 생성을 시도합니다...");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ 환경변수가 설정되지 않았습니다.");
    return;
  }

  console.log("🔗 Supabase URL:", supabaseUrl);
  console.log("🔑 Service Role Key:", supabaseKey ? "설정됨" : "미설정");

  // SQL 명령어들
  const sqlCommands = [
    // 1. 기존 테이블 삭제
    `DROP TABLE IF EXISTS customer_inquiries CASCADE;`,

    // 2. 테이블 생성
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
    );`,

    // 3. 인덱스 생성
    `CREATE INDEX idx_customer_inquiries_created_at ON customer_inquiries(created_at DESC);`,
    `CREATE INDEX idx_customer_inquiries_type ON customer_inquiries(inquiry_type);`,
    `CREATE INDEX idx_customer_inquiries_rating ON customer_inquiries(rating);`,

    // 4. RLS 비활성화
    `ALTER TABLE customer_inquiries DISABLE ROW LEVEL SECURITY;`,
  ];

  for (let i = 0; i < sqlCommands.length; i++) {
    const sql = sqlCommands[i];
    console.log(`\n${i + 1}️⃣ 실행 중: ${sql.substring(0, 50)}...`);

    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
          apikey: supabaseKey,
        },
        body: JSON.stringify({ sql }),
      });

      if (response.ok) {
        console.log("✅ 성공");
      } else {
        const error = await response.text();
        console.log(`⚠️  응답: ${response.status} - ${error}`);
      }
    } catch (error) {
      console.log(`⚠️  오류: ${error}`);
    }
  }

  // 최종 테스트
  console.log("\n🧪 최종 테스트...");
  try {
    const testResponse = await fetch(
      `${supabaseUrl}/rest/v1/customer_inquiries`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
          apikey: supabaseKey,
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          message: "수동 생성 테스트",
          inquiry_type: "chat",
        }),
      }
    );

    if (testResponse.ok) {
      const result = await testResponse.json();
      console.log("✅ 테스트 삽입 성공:", result);
    } else {
      const error = await testResponse.text();
      console.log("❌ 테스트 삽입 실패:", error);
    }
  } catch (error) {
    console.log("❌ 테스트 중 오류:", error);
  }
}

async function main() {
  await manualCreateTable();
  console.log(
    "\n💡 만약 여전히 문제가 있다면 Supabase 대시보드에서 수동으로 생성해주세요:"
  );
  console.log("1. https://supabase.com/dashboard 접속");
  console.log("2. 프로젝트 선택 → SQL Editor");
  console.log("3. scripts/create-customer-table.sql 파일 내용 복사하여 실행");
}

main().catch(console.error);
