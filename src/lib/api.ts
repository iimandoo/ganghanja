import { HanjaType, Level } from "@/constants";

export interface HanjaData {
  id: number;
  character: string;
  meaning: string;
  meaning_key: string;
  example: string;
  idiom: string;
  level: string;
  type: string;
  created_at: string;
}

export interface HanjaApiResponse {
  data: HanjaData[];
  count: number;
  type: string;
  levels: string[];
}

export interface LevelsApiResponse {
  levels: Level[];
  count: number;
  type: string;
}

// 한자 데이터 조회
export async function fetchHanjaData(
  type: HanjaType,
  levels: Level[]
): Promise<HanjaApiResponse> {
  const typeParam = type === "대한검정회" ? "TypeA" : "TypeB";
  const levelsParam = levels.join(",");

  const response = await fetch(
    `/api/hanja/${typeParam}?levels=${encodeURIComponent(levelsParam)}`
  );

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  const apiResponse = await response.json();

  // API 응답 데이터를 프론트엔드 형식으로 변환
  const transformedData = apiResponse.data.map((item: any) => ({
    ...item,
    meaningKey: item.meaning_key, // snake_case를 camelCase로 변환
  }));

  return {
    ...apiResponse,
    data: transformedData,
  };
}

// 사용 가능한 급수 목록 조회
export async function fetchAvailableLevels(
  type: HanjaType
): Promise<LevelsApiResponse> {
  const typeParam = type === "대한검정회" ? "TypeA" : "TypeB";

  const response = await fetch(`/api/levels/${typeParam}`);

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  return response.json();
}
