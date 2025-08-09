import { createClient } from "@supabase/supabase-js";
import { hanjaGroupData } from "../src/data/hanjaData";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

// fetch polyfill for Node.js
if (!globalThis.fetch) {
  (globalThis as any).fetch = fetch;
}

// .env.local 파일 로드
dotenv.config({ path: ".env.local" });

// 환경변수 확인
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("🔍 환경변수 확인:");
console.log(
  "NEXT_PUBLIC_SUPABASE_URL:",
  !!supabaseUrl ? "✅ 설정됨" : "❌ 없음"
);
console.log(
  "SUPABASE_SERVICE_ROLE_KEY:",
  !!supabaseServiceKey ? "✅ 설정됨" : "❌ 없음"
);

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ 환경변수가 설정되지 않았습니다.");
  console.error("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl);
  console.error(
    "SUPABASE_SERVICE_ROLE_KEY:",
    supabaseServiceKey?.substring(0, 20) + "..."
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
  console.log("🔌 Supabase 연결을 테스트합니다...");
  try {
    const { data, error } = await supabase
      .from("hanja_data")
      .select("count", { count: "exact", head: true });

    if (error) {
      console.error("❌ 연결 테스트 실패:", error.message);
      return false;
    }

    console.log("✅ Supabase 연결 성공!");
    return true;
  } catch (error) {
    console.error("❌ 연결 테스트 중 오류:", error);
    return false;
  }
}

async function migrateData() {
  console.log("🚀 데이터 마이그레이션을 시작합니다...");

  // 연결 테스트
  const isConnected = await testConnection();
  if (!isConnected) {
    console.error(
      "❌ Supabase 연결에 실패했습니다. 환경변수와 네트워크를 확인해주세요."
    );
    process.exit(1);
  }

  try {
    // 기존 데이터 삭제 (선택사항)
    console.log("📝 기존 데이터를 정리합니다...");
    await supabase.from("hanja_data").delete().neq("id", 0);

    // TypeA 데이터 준비
    const typeAData = hanjaGroupData.TypeA.map((item) => ({
      character: item.character,
      meaning: item.meaning,
      meaning_key: item.meaningKey,
      example: item.example,
      idiom: item.idiom,
      level: item.level,
      type: "TypeA",
      naver_url: `https://hanja.dict.naver.com/#/search?query=${item.character}`,
    }));

    // TypeB 데이터 준비
    const typeBData = hanjaGroupData.TypeB.map((item) => ({
      character: item.character,
      meaning: item.meaning,
      meaning_key: item.meaningKey,
      example: item.example,
      idiom: item.idiom,
      level: item.level,
      type: "TypeB",
      naver_url: `https://hanja.dict.naver.com/#/search?query=${item.character}`,
    }));

    const allData = [...typeAData, ...typeBData];

    console.log(`📊 총 ${allData.length}개의 데이터를 마이그레이션합니다...`);
    console.log(`   - TypeA: ${typeAData.length}개`);
    console.log(`   - TypeB: ${typeBData.length}개`);

    // 배치 단위로 데이터 삽입 (Supabase는 한 번에 1000개까지 가능)
    const batchSize = 1000;
    for (let i = 0; i < allData.length; i += batchSize) {
      const batch = allData.slice(i, i + batchSize);

      console.log(
        `📥 배치 ${Math.floor(i / batchSize) + 1} 삽입 중... (${
          batch.length
        }개)`
      );

      const { error } = await supabase.from("hanja_data").insert(batch);

      if (error) {
        console.error("❌ 배치 삽입 실패:", error);
        throw error;
      }
    }

    // 마이그레이션 결과 확인
    const { count, error: countError } = await supabase
      .from("hanja_data")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("❌ 데이터 확인 실패:", countError);
    } else {
      console.log(
        `✅ 마이그레이션 완료! 총 ${count}개의 데이터가 저장되었습니다.`
      );
    }

    // 타입별 데이터 개수 확인
    const { data: typeACount } = await supabase
      .from("hanja_data")
      .select("*", { count: "exact", head: true })
      .eq("type", "TypeA");

    const { data: typeBCount } = await supabase
      .from("hanja_data")
      .select("*", { count: "exact", head: true })
      .eq("type", "TypeB");

    console.log("📈 타입별 데이터 현황:");
    console.log(`   - TypeA: ${typeACount?.length || 0}개`);
    console.log(`   - TypeB: ${typeBCount?.length || 0}개`);
  } catch (error) {
    console.error("❌ 마이그레이션 실패:", error);
    process.exit(1);
  }
}

// 스크립트 실행
migrateData().then(() => {
  console.log("🎉 마이그레이션이 성공적으로 완료되었습니다!");
  process.exit(0);
});
