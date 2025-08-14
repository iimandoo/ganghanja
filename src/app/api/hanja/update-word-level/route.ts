import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { hanjaId, wordData } = await request.json();

    // 데이터 검증
    if (!hanjaId || !wordData || !wordData.kor || !wordData.hanja) {
      return NextResponse.json(
        { error: "필수 데이터가 누락되었습니다." },
        { status: 400 }
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    // 현재 한자 데이터 조회

    const { data: currentData, error: fetchError } = await supabaseAdmin
      .from("hanja_data")
      .select("*")
      .eq("id", hanjaId)
      .single();

    if (fetchError) {
      console.error("한자 데이터 조회 오류:", fetchError);
      return NextResponse.json(
        {
          error: `한자 데이터를 찾을 수 없습니다. ID: ${hanjaId}, Error: ${fetchError.message}`,
        },
        { status: 404 }
      );
    }

    // 기존 wordlevel_mid 데이터 가져오기 (없으면 빈 배열)
    let existingWords = [];
    if (
      currentData &&
      currentData.wordlevel_mid &&
      Array.isArray(currentData.wordlevel_mid)
    ) {
      existingWords = currentData.wordlevel_mid;
    }

    // 새 데이터 추가
    const updatedWords = [...existingWords, wordData];

    // 데이터베이스 업데이트
    const { error: updateError, data: updateResult } = await supabaseAdmin
      .from("hanja_data")
      .update({ wordlevel_mid: updatedWords })
      .eq("id", hanjaId)
      .select();

    if (updateError) {
      console.error("데이터베이스 업데이트 오류:", updateError);
      return NextResponse.json(
        { error: "데이터 업데이트에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "단어가 성공적으로 추가되었습니다.",
      updatedWords,
    });
  } catch (error) {
    console.error("API 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
