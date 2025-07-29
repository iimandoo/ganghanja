import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  try {
    // 타입 검증
    if (!params.type || !["TypeA", "TypeB"].includes(params.type)) {
      return NextResponse.json(
        { error: "유효하지 않은 타입입니다." },
        { status: 400 }
      );
    }

    // 해당 타입의 고유한 급수 목록 조회
    const { data, error } = await supabaseAdmin
      .from("hanja_data")
      .select("level")
      .eq("type", params.type)
      .order("level");

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "급수 목록을 가져오는 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    // 중복 제거 및 정렬
    const levelOrder = [
      "8급",
      "7급",
      "6급",
      "준5급",
      "5급",
      "준4급",
      "4급",
      "준3급",
      "3급",
      "준2급",
      "2급",
      "준1급",
      "1급",
    ];
    const uniqueLevels = [...new Set(data?.map((item) => item.level) || [])];
    const sortedLevels = uniqueLevels.sort(
      (a, b) => levelOrder.indexOf(a) - levelOrder.indexOf(b)
    );

    const response = NextResponse.json({
      levels: sortedLevels,
      count: sortedLevels.length,
      type: params.type,
    });

    // 10분간 캐시 (급수는 자주 변경되지 않음)
    response.headers.set(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=1200"
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
