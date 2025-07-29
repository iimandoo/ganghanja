import * as dotenv from "dotenv";
import { supabaseAdmin } from "../src/lib/supabase";

// .env.local 파일 로드
dotenv.config({ path: ".env.local" });

async function debugCustomerTable() {
  console.log("🔍 customer_inquiries 테이블 디버깅...");

  try {
    // 1. 테이블 존재 확인
    console.log("\n1️⃣ 테이블 존재 확인...");
    const { data: tableExists, error: existsError } = await supabaseAdmin
      .from("customer_inquiries")
      .select("count", { count: "exact", head: true });

    if (existsError) {
      console.error(
        "❌ 테이블이 존재하지 않거나 접근할 수 없음:",
        existsError.message
      );
      console.log(
        "💡 Supabase 대시보드에서 수동으로 테이블을 생성해야 합니다."
      );
      return;
    }

    console.log("✅ 테이블 존재 확인됨. 현재 레코드 수:", tableExists || 0);

    // 2. 테이블 스키마 확인 (가능한 경우)
    console.log("\n2️⃣ 테이블 스키마 확인...");
    try {
      const { data: schemaData, error: schemaError } = await supabaseAdmin.rpc(
        "get_table_schema",
        { table_name: "customer_inquiries" }
      );

      if (schemaError) {
        console.log("⚠️  스키마 확인 함수 없음 (정상):", schemaError.message);
      } else {
        console.log("📋 테이블 스키마:", schemaData);
      }
    } catch (e) {
      console.log("⚠️  스키마 확인 실패 (무시 가능)");
    }

    // 3. 간단한 INSERT 테스트
    console.log("\n3️⃣ 간단한 INSERT 테스트...");
    const testData = {
      message: "디버깅 테스트 메시지",
      inquiry_type: "chat",
    };

    console.log("📝 삽입할 데이터:", testData);

    const { data: insertData, error: insertError } = await supabaseAdmin
      .from("customer_inquiries")
      .insert([testData])
      .select("id, created_at")
      .single();

    if (insertError) {
      console.error("❌ INSERT 실패:", insertError);
      console.error("❌ 에러 세부사항:", JSON.stringify(insertError, null, 2));

      // 가능한 원인들 체크
      console.log("\n🔍 가능한 원인들:");
      console.log("1. 테이블 스키마가 올바르지 않음");
      console.log("2. 필수 필드가 누락됨");
      console.log("3. 데이터 타입 불일치");
      console.log("4. 제약조건 위반");
      console.log("5. RLS(Row Level Security) 정책 문제");
    } else {
      console.log("✅ INSERT 성공!");
      console.log("📊 삽입된 데이터:", insertData);

      // 4. 삽입된 데이터 조회
      console.log("\n4️⃣ 삽입된 데이터 조회...");
      const { data: selectData, error: selectError } = await supabaseAdmin
        .from("customer_inquiries")
        .select("*")
        .eq("id", insertData.id)
        .single();

      if (selectError) {
        console.error("❌ SELECT 실패:", selectError);
      } else {
        console.log("✅ 조회 성공!");
        console.log("📄 조회된 데이터:", selectData);
      }
    }

    // 5. 전체 데이터 개수 확인
    console.log("\n5️⃣ 전체 데이터 개수 확인...");
    const { count, error: countError } = await supabaseAdmin
      .from("customer_inquiries")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("❌ COUNT 실패:", countError);
    } else {
      console.log("📊 전체 레코드 수:", count);
    }
  } catch (error) {
    console.error("❌ 디버깅 중 예외 발생:", error);
  }
}

async function main() {
  await debugCustomerTable();
  console.log("\n🎉 디버깅 완료!");
}

main().catch(console.error);
