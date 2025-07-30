import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  try {
    const { searchParams } = new URL(request.url);
    const levels = searchParams.get("levels");
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

    // 정렬 (의미 키 기준)
    query = query.order("meaning_key", { ascending: true });

    const { data, error } = await query;

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
