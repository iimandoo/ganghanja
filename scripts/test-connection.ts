import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

// .env.local 파일 로드
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("🔍 환경변수 확인:");
console.log("URL:", supabaseUrl);
console.log("Key:", supabaseServiceKey?.substring(0, 20) + "...");

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ 환경변수가 설정되지 않았습니다.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
  console.log("🔌 기본 연결 테스트...");

  try {
    // 가장 간단한 쿼리로 연결 테스트
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.log("⚠️  Auth 오류 (정상일 수 있음):", error.message);
    }

    console.log("✅ 기본 연결 성공!");

    // 테이블 목록 조회 시도
    console.log("📋 테이블 목록 조회 중...");
    const { data: tables, error: tableError } = await supabase.rpc(
      "get_tables"
    ); // 커스텀 함수가 없으므로 오류 예상

    if (tableError) {
      console.log("⚠️  테이블 조회 오류 (예상됨):", tableError.message);
    }

    // hanja_data 테이블 직접 접근 시도
    console.log("🗂️  hanja_data 테이블 접근 시도...");
    const { data: testData, error: dataError } = await supabase
      .from("hanja_data")
      .select("*")
      .limit(1);

    if (dataError) {
      console.error("❌ 테이블 접근 실패:", dataError.message);
      console.log("💡 해결방법:");
      console.log("1. Supabase 대시보드에서 hanja_data 테이블을 생성해주세요");
      console.log("2. scripts/create-table.sql 파일의 SQL을 실행해주세요");
      return false;
    }

    console.log("✅ hanja_data 테이블 접근 성공!");
    console.log("📊 현재 데이터 개수:", testData?.length || 0);

    return true;
  } catch (error) {
    console.error("❌ 연결 테스트 실패:", error);
    return false;
  }
}

testConnection().then((success) => {
  if (success) {
    console.log("🎉 모든 테스트 통과! 마이그레이션을 진행할 수 있습니다.");
  } else {
    console.log("⚠️  테이블을 먼저 생성한 후 다시 시도해주세요.");
  }
  process.exit(success ? 0 : 1);
});
