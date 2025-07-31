import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// 환경변수 로드
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("🔧 환경변수 확인:");
console.log("SUPABASE_URL:", !!supabaseUrl ? "✅ 설정됨" : "❌ 없음");
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

async function checkCurrentLevels() {
  console.log("🔍 현재 level 값들을 확인합니다...");

  try {
    const { data, error } = await supabase
      .from("hanja_data")
      .select("level")
      .limit(10);

    if (error) {
      console.error("❌ level 값 확인 실패:", error.message);
      return false;
    }

    console.log("📊 현재 level 값 샘플:");
    data?.forEach((item, index) => {
      console.log(`   ${index + 1}. "${item.level}"`);
    });

    // 고유한 level 값들 확인
    const { data: uniqueLevels, error: uniqueError } = await supabase
      .from("hanja_data")
      .select("level")
      .order("level");

    if (uniqueError) {
      console.error("❌ 고유 level 값 확인 실패:", uniqueError.message);
      return false;
    }

    const uniqueSet = new Set(uniqueLevels?.map((item) => item.level));
    console.log("🎯 고유한 level 값들:", Array.from(uniqueSet));

    return true;
  } catch (error) {
    console.error("❌ level 값 확인 중 오류:", error);
    return false;
  }
}

async function updateLevelFormat() {
  console.log("🚀 level 컬럼에서 '급' 자 제거를 시작합니다...");

  try {
    // 현재 상태 확인
    const currentCheck = await checkCurrentLevels();
    if (!currentCheck) {
      console.error("❌ 현재 상태 확인에 실패했습니다.");
      return false;
    }

    // UPDATE 쿼리 실행: '급' 자를 제거
    console.log("📝 개별 레코드 업데이트를 시작합니다...");

    // '급'이 포함된 레코드들을 찾아서 개별 업데이트
    const { data: recordsToUpdate, error: selectError } = await supabase
      .from("hanja_data")
      .select("id, level")
      .like("level", "%급%");

    if (selectError) {
      console.error("❌ 업데이트 대상 조회 실패:", selectError.message);
      return false;
    }

    if (!recordsToUpdate || recordsToUpdate.length === 0) {
      console.log("ℹ️  '급' 자가 포함된 레코드가 없습니다.");
      return true;
    }

    console.log(
      `📊 ${recordsToUpdate.length}개의 레코드를 개별 업데이트합니다...`
    );

    // 배치 단위로 업데이트
    const batchSize = 100;
    let updatedCount = 0;

    for (let i = 0; i < recordsToUpdate.length; i += batchSize) {
      const batch = recordsToUpdate.slice(i, i + batchSize);

      for (const record of batch) {
        const newLevel = record.level.replace(/급/g, "");
        const { error: updateError } = await supabase
          .from("hanja_data")
          .update({ level: newLevel })
          .eq("id", record.id);

        if (updateError) {
          console.error(
            `❌ ID ${record.id} 업데이트 실패:`,
            updateError.message
          );
        } else {
          updatedCount++;
        }
      }

      console.log(
        `✅ 배치 ${Math.floor(i / batchSize) + 1} 완료 (${batch.length}개)`
      );
    }

    console.log(`✅ 총 ${updatedCount}개 레코드 업데이트 완료`);

    // 결과 확인
    console.log("🔍 업데이트 결과를 확인합니다...");
    await checkCurrentLevels();

    // 변경된 레코드 수 확인
    const { count, error: countError } = await supabase
      .from("hanja_data")
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("❌ 레코드 수 확인 실패:", countError.message);
    } else {
      console.log(`📊 총 ${count}개의 레코드가 처리되었습니다.`);
    }

    return true;
  } catch (error) {
    console.error("❌ level 업데이트 중 오류:", error);
    return false;
  }
}

async function main() {
  console.log("🎯 hanja_data 테이블의 level 컬럼 형식 변경");
  console.log("   변경 내용: '8급' → '8', '7급' → '7' 등");
  console.log("");

  // 연결 테스트
  const isConnected = await testConnection();
  if (!isConnected) {
    console.error("❌ Supabase 연결에 실패했습니다.");
    process.exit(1);
  }

  // level 형식 업데이트
  const success = await updateLevelFormat();

  if (success) {
    console.log("");
    console.log("🎉 level 컬럼 형식 변경이 완료되었습니다!");
    console.log("   모든 '급' 자가 제거되었습니다.");
  } else {
    console.error("");
    console.error("❌ level 컬럼 형식 변경에 실패했습니다.");
    process.exit(1);
  }
}

// 스크립트 실행
main().catch((error) => {
  console.error("❌ 스크립트 실행 중 오류:", error);
  process.exit(1);
});
