import * as dotenv from "dotenv";

// .env.local 파일 로드
dotenv.config({ path: ".env.local" });

async function testCustomerAPI() {
  console.log("🧪 고객센터 API 테스트를 시작합니다...");

  const baseURL = "http://localhost:3000";

  // 테스트 데이터
  const testInquiry = {
    message:
      "테스트 문의입니다. API가 정상적으로 작동하는지 확인하고 있습니다.",
    contactInfo: "test@example.com | 010-1234-5678 | KakaoTalk: testkakao",
    rating: 5,
    inquiryType: "chat" as const,
  };

  try {
    console.log("📤 문의 전송 중...");

    const response = await fetch(`${baseURL}/api/customer/inquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testInquiry),
    });

    const result = await response.json();

    if (response.ok) {
      console.log("✅ 문의 전송 성공!");
      console.log("📊 응답 데이터:", result);
      console.log("🆔 문의 ID:", result.inquiryId);
      console.log("📅 생성 시간:", result.createdAt);
    } else {
      console.error("❌ 문의 전송 실패:");
      console.error("상태 코드:", response.status);
      console.error("오류 메시지:", result.error);
    }
  } catch (error) {
    console.error("❌ API 테스트 중 오류 발생:", error);
  }
}

// 유효성 검증 테스트
async function testValidation() {
  console.log("\n🔍 유효성 검증 테스트...");

  const baseURL = "http://localhost:3000";

  // 빈 메시지 테스트
  try {
    const response = await fetch(`${baseURL}/api/customer/inquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "",
        inquiryType: "chat",
      }),
    });

    const result = await response.json();

    if (response.status === 400) {
      console.log("✅ 빈 메시지 검증 통과:", result.error);
    } else {
      console.log("❌ 빈 메시지 검증 실패");
    }
  } catch (error) {
    console.error("❌ 검증 테스트 오류:", error);
  }

  // 연락처 길이 제한 테스트
  try {
    const longContactInfo = "a".repeat(201); // 201자
    const response = await fetch(`${baseURL}/api/customer/inquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "테스트 메시지",
        contactInfo: longContactInfo,
        inquiryType: "chat",
      }),
    });

    const result = await response.json();

    if (response.status === 400) {
      console.log("✅ 연락처 길이 제한 검증 통과:", result.error);
    } else {
      console.log("❌ 연락처 길이 제한 검증 실패");
    }
  } catch (error) {
    console.error("❌ 연락처 길이 검증 테스트 오류:", error);
  }
}

// 테스트 실행
async function runTests() {
  await testCustomerAPI();
  await testValidation();
  console.log("\n🎉 모든 테스트가 완료되었습니다!");
}

runTests().catch(console.error);
