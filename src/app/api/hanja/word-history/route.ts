import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const hanjaId = searchParams.get("hanjaId");
    const limit = searchParams.get("limit");

    // 사용자 ID는 필수
    if (!userId) {
      return NextResponse.json(
        { error: "사용자 ID가 필요합니다." },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    let query = supabaseAdmin
      .from("word_history")
      .select(
        `
        *,
        hanja_data!inner(
          id,
          character,
          meaning,
          meaning_key
        )
      `
      )
      .eq("user_id", userId);

    // 특정 한자 ID가 제공된 경우 필터링
    if (hanjaId) {
      query = query.eq("hanja_id", parseInt(hanjaId));
    }

    // 정렬 및 제한
    query = query.order("created_at", { ascending: false });

    if (limit) {
      query = query.limit(parseInt(limit));
    } else {
      query = query.limit(50); // 기본값
    }

    const { data, error } = await query;

    if (error) {
      console.error("히스토리 조회 오류:", error);
      return NextResponse.json(
        { error: "히스토리 조회에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      total: data?.length || 0,
    });
  } catch (error) {
    console.error("API 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
