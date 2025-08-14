import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { hanjaId, wordData, vocabularyRange, userId } = await request.json();

    // 데이터 검증
    if (
      !hanjaId ||
      !wordData ||
      !wordData.kor ||
      !wordData.hanja ||
      !vocabularyRange ||
      !userId
    ) {
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

    // 학년 선택에 따라 다른 컬럼 사용
    const columnName =
      vocabularyRange === "기본" ? "wordlevel_es" : "wordlevel_mid";

    // 기존 데이터 가져오기 (없으면 빈 배열)
    let existingWords = [];
    if (
      currentData &&
      currentData[columnName] &&
      Array.isArray(currentData[columnName])
    ) {
      existingWords = currentData[columnName];
    }

    // 새 데이터 추가
    const updatedWords = [...existingWords, wordData];

    // 데이터베이스 업데이트
    const { error: updateError, data: updateResult } = await supabaseAdmin
      .from("hanja_data")
      .update({ [columnName]: updatedWords })
      .eq("id", hanjaId)
      .select();

    if (updateError) {
      console.error("데이터베이스 업데이트 오류:", updateError);
      return NextResponse.json(
        { error: "데이터 업데이트에 실패했습니다." },
        { status: 500 }
      );
    }

    // 히스토리 테이블에 기록 추가
    try {
      // 수정 전 데이터 (현재 데이터)
      const beforeData = {
        wordlevel_es: currentData.wordlevel_es || null,
        wordlevel_mid: currentData.wordlevel_mid || null,
      };

      // 수정 후 데이터 (새로 추가된 단어 포함)
      const afterData = {
        wordlevel_es:
          columnName === "wordlevel_es"
            ? updatedWords
            : beforeData.wordlevel_es,
        wordlevel_mid:
          columnName === "wordlevel_mid"
            ? updatedWords
            : beforeData.wordlevel_mid,
      };

      const { error: historyError } = await supabaseAdmin
        .from("word_history")
        .insert({
          user_id: userId,
          hanja_id: hanjaId,
          wordlevel: vocabularyRange,
          type: "add",
          hanja: wordData.hanja, // 추가된 한자
          kor: wordData.kor, // 추가된 한글 음
          before_wordlevel_es: beforeData.wordlevel_es,
          before_wordlevel_mid: beforeData.wordlevel_mid,
          after_wordlevel_es: afterData.wordlevel_es,
          after_wordlevel_mid: afterData.wordlevel_mid,
        });

      if (historyError) {
        console.error("히스토리 기록 추가 오류:", historyError);
        // 히스토리 기록 실패는 전체 요청을 실패시키지 않음
      }
    } catch (historyError) {
      console.error("히스토리 기록 추가 중 예외 발생:", historyError);
      // 히스토리 기록 실패는 전체 요청을 실패시키지 않음
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
