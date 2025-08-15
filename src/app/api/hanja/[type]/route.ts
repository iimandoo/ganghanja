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
    const currentId = searchParams.get("currentId");
    const hiddenCardIds = searchParams.get("hiddenCardIds"); // 숨겨진 카드 ID 목록
    const resolvedParams = await params;

    // 필수 파라미터 검증 (currentId는 선택사항)
    if (!levels || !vocabularyRange) {
      return NextResponse.json(
        { error: "필수 파라미터가 누락되었습니다." },
        { status: 400 }
      );
    }

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
    const levelArray = levels.split(",").filter(Boolean);

    // 숨겨진 카드 ID 목록 파싱
    const hiddenIds = hiddenCardIds
      ? hiddenCardIds
          .split(",")
          .map((id) => parseInt(id.trim()))
          .filter((id) => !isNaN(id))
      : [];

    // 1. 해당 타입과 레벨의 모든 ID 목록 조회 (정렬된 순서)
    const { data: allIds, error: idsError } = await supabaseAdmin
      .from("hanja_data")
      .select("id")
      .eq("type", resolvedParams.type)
      .in("level", levelArray)
      .order("meaning_key", { ascending: true });

    if (idsError) {
      console.error("Failed to fetch IDs:", idsError);
      return NextResponse.json(
        { error: "ID 목록을 가져오는 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    if (!allIds || allIds.length === 0) {
      return NextResponse.json(
        { error: "해당 타입과 레벨에 한자 데이터가 없습니다." },
        { status: 404 }
      );
    }

    // 숨겨진 카드를 제외한 ID 목록 생성
    const visibleIds = allIds
      .map((item) => item.id)
      .filter((id) => !hiddenIds.includes(id));

    if (visibleIds.length === 0) {
      return NextResponse.json(
        { error: "모든 한자가 숨겨져 있습니다." },
        { status: 404 }
      );
    }

    // 2. currentId가 없으면 첫 번째 보이는 ID 사용, 있으면 해당 ID 검증
    let targetId: number;
    let currentIndex: number;

    if (currentId === null || currentId === undefined) {
      // currentId가 없으면 첫 번째 보이는 ID 사용
      targetId = visibleIds[0];
      currentIndex = 0;
    } else {
      // currentId가 있으면 해당 ID 검증
      const currentIdNum = parseInt(currentId);
      currentIndex = visibleIds.indexOf(currentIdNum);

      if (currentIndex === -1) {
        // 현재 ID가 숨겨져 있거나 존재하지 않는 경우, 첫 번째 보이는 ID 사용
        targetId = visibleIds[0];
        currentIndex = 0;
      } else {
        targetId = currentIdNum;
      }
    }

    // 3. 현재 한자 데이터 조회
    const { data: currentData, error: currentError } = await supabaseAdmin
      .from("hanja_data")
      .select(
        "id, character, meaning, meaning_key, level, type, naver_url, wordlevel_mid, wordlevel_es"
      )
      .eq("id", targetId)
      .eq("type", resolvedParams.type)
      .single();

    if (currentError || !currentData) {
      console.error("Current hanja not found:", currentError);
      return NextResponse.json(
        { error: "해당 한자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 4. 이전/다음 한자 ID 찾기 (숨겨진 카드 제외)
    const previousId = currentIndex > 0 ? visibleIds[currentIndex - 1] : null;
    const nextId =
      currentIndex < visibleIds.length - 1
        ? visibleIds[currentIndex + 1]
        : null;

    // 5. 이전/다음 한자 데이터 조회
    // let previousData = null;
    // let nextData = null;

    // if (previousId) {
    //   const { data: prevData } = await supabaseAdmin
    //     .from("hanja_data")
    //     .select("id")
    //     .eq("id", previousId)
    //     .single();
    //   previousData = prevData;
    // }

    // if (nextId) {
    //   const { data: nextDataResult } = await supabaseAdmin
    //     .from("hanja_data")
    //     .select("id")
    //     .eq("id", nextId)
    //     .single();
    //   nextData = nextDataResult;
    // }

    // 6. 응답 데이터 구성
    const response = NextResponse.json({
      data: {
        previous: { id: previousId },
        current: currentData,
        next: { id: nextId },
        totalCount: visibleIds.length, // 보이는 카드 개수
        currentIndex: currentIndex,
      },
      type: resolvedParams.type,
      levels: levelArray,
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
