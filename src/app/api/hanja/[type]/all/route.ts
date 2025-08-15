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

    if (!levels || !vocabularyRange) {
      return NextResponse.json(
        { error: "필수 파라미터가 누락되었습니다." },
        { status: 400 }
      );
    }

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
    const levelArray = levels.split(",").filter(Boolean);

    const { data: allHanjaData, error: dataError } = await supabaseAdmin
      .from("hanja_data")
      .select("*")
      .eq("type", resolvedParams.type)
      .in("level", levelArray)
      .order("meaning_key", { ascending: true });

    if (dataError) {
      console.error("Failed to fetch hanja data:", dataError);
      return NextResponse.json(
        { error: "한자 데이터를 가져오는 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    if (!allHanjaData || allHanjaData.length === 0) {
      return NextResponse.json(
        { error: "해당 타입과 레벨에 한자 데이터가 없습니다." },
        { status: 404 }
      );
    }

    const response = NextResponse.json({
      data: allHanjaData,
      type: resolvedParams.type,
      levels: levelArray,
      count: allHanjaData.length,
    });

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
