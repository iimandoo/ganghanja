import axios from "axios";
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

async function testWithAxios() {
  console.log("🔌 Axios로 연결 테스트...");

  try {
    // Supabase REST API로 직접 요청
    const response = await axios.get(
      `${supabaseUrl}/rest/v1/hanja_data?limit=1`,
      {
        headers: {
          apikey: supabaseServiceKey,
          Authorization: `Bearer ${supabaseServiceKey}`,
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10초 타임아웃
      }
    );

    console.log("✅ Axios 연결 성공!");
    console.log("📊 응답 상태:", response.status);
    console.log("📊 데이터 개수:", response.data?.length || 0);

    return true;
  } catch (error: any) {
    if (error.response) {
      // 서버가 응답했지만 오류 상태
      console.log("⚠️  서버 응답 오류:");
      console.log("상태 코드:", error.response.status);
      console.log("오류 메시지:", error.response.data);

      if (error.response.status === 404) {
        console.log(
          "💡 hanja_data 테이블이 존재하지 않습니다. 테이블을 먼저 생성해주세요."
        );
      }

      return error.response.status < 500; // 4xx는 연결은 성공
    } else if (error.request) {
      // 요청은 했지만 응답이 없음
      console.error("❌ 네트워크 연결 실패:");
      console.error("- 방화벽이나 프록시 설정을 확인해주세요");
      console.error("- 인터넷 연결을 확인해주세요");
      console.error("- Supabase URL이 올바른지 확인해주세요");
      return false;
    } else {
      // 요청 설정 중 오류
      console.error("❌ 요청 설정 오류:", error.message);
      return false;
    }
  }
}

testWithAxios().then((success) => {
  if (success) {
    console.log("🎉 연결 테스트 성공! Supabase에 접근할 수 있습니다.");
  } else {
    console.log("❌ 연결 테스트 실패. 네트워크 설정을 확인해주세요.");
  }
  process.exit(success ? 0 : 1);
});
