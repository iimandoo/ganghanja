import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const levels = searchParams.get("levels");
    const vocabularyRange = searchParams.get("vocabularyRange");
    const resolvedParams = await params;

    // 타입 검증
    if (
      !resolvedParams.type ||
      !["TypeA", "TypeB"].includes(resolvedParams.type)
    ) {
      return NextResponse.json(
        { error: "유효하지 않은 타입입니다." },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();
    let query = supabaseAdmin
      .from("hanja_data")
      .select("*")
      .eq("type", resolvedParams.type);

    // 급수 필터링
    if (levels) {
      const levelArray = levels.split(",").filter(Boolean);
      if (levelArray.length > 0) {
        query = query.in("level", levelArray);
      }
    }

    // 어휘 범위 필터링 - 중급의 경우 wordLevel_mid가 존재하는 데이터만
    if (vocabularyRange === "중급") {
      // wordLevel_mid 컬럼이 존재하고 null이 아닌 경우만 필터링
      // 데이터베이스에 해당 컬럼이 없거나 오류가 발생할 수 있으므로 try-catch로 처리
    }

    // 정렬 (의미 키 기준)
    query = query.order("meaning_key", { ascending: true });

    let data, error;

    // 모든 데이터를 가져옴 (중급 모드여도 필터링하지 않음)
    const result = await query;
    data = result.data;
    error = result.error;

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "데이터를 가져오는 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    // 응답 헤더에 캐시 설정
    const response = NextResponse.json({
      data: data || [],
      count: data?.length || 0,
      type: resolvedParams.type,
      levels: levels?.split(",") || [],
    });

    // 5분간 캐시
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=600"
    );

    return response;
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
