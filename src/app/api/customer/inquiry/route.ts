import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export interface CustomerInquiryRequest {
  message: string;
  contactInfo?: string;
  rating?: number;
  inquiryType: "chat" | "request";
}

export async function POST(request: NextRequest) {
  try {
    const body: CustomerInquiryRequest = await request.json();

    // 필수 필드 검증
    if (!body.message || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: "문의 내용을 입력해주세요." },
        { status: 400 }
      );
    }

    // 메시지 길이 제한 (10,000자)
    if (body.message.length > 10000) {
      return NextResponse.json(
        { error: "문의 내용은 10,000자 이내로 입력해주세요." },
        { status: 400 }
      );
    }

    // 별점 검증 (1-5)
    if (body.rating && (body.rating < 1 || body.rating > 5)) {
      return NextResponse.json(
        { error: "별점은 1-5 사이의 값이어야 합니다." },
        { status: 400 }
      );
    }

    // 연락처 길이 제한 (200자)
    if (body.contactInfo && body.contactInfo.length > 200) {
      return NextResponse.json(
        { error: "연락처는 200자 이내로 입력해주세요." },
        { status: 400 }
      );
    }

    // 클라이언트 정보 수집
    const userAgent = request.headers.get("user-agent") || "";
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ipAddress =
      forwardedFor?.split(",")[0]?.trim() || realIp || "127.0.0.1";

    // DB에 저장할 데이터 준비
    const inquiryData = {
      message: body.message.trim(),
      contact_info: body.contactInfo?.trim() || null,
      rating: body.rating || null,
      inquiry_type: body.inquiryType,
      user_agent: userAgent,
      ip_address: ipAddress,
    };

    console.log("💾 저장할 데이터:", inquiryData);

    // Supabase에 데이터 저장
    console.log("🗄️ Supabase에 데이터 저장 시도...");
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from("customer_inquiries")
      .insert([inquiryData])
      .select("id, created_at")
      .single();

    if (error) {
      console.error("❌ Database insert error:", error);
      console.error("❌ Error details:", JSON.stringify(error, null, 2));
      return NextResponse.json(
        {
          error: "문의 저장 중 오류가 발생했습니다.",
          details:
            process.env.NODE_ENV === "development" ? error.message : undefined,
        },
        { status: 500 }
      );
    }

    // 성공 응답
    const response = NextResponse.json({
      success: true,
      message: "문의가 성공적으로 접수되었습니다.",
      inquiryId: data.id,
      createdAt: data.created_at,
    });

    // CORS 헤더 설정
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

// OPTIONS 요청 처리 (CORS preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// 이메일 형식 검증 함수
