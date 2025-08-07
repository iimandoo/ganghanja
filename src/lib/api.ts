import { HanjaType, Level } from "@/constants";
import { getSupabaseClient } from "@/lib/supabase";

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
  m1?: string[];
  m2?: string[];
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
  const typeParam = type === "대한검정회 급수자격검정" ? "TypeA" : "TypeB";
  const levelsParam = levels.join(",");

  const response = await fetch(
    `/api/hanja/${typeParam}?levels=${encodeURIComponent(levelsParam)}`
  );

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  const apiResponse = await response.json();

  // API 응답 데이터를 프론트엔드 형식으로 변환
  const transformedData = apiResponse.data.map(
    (item: HanjaData & { meaning_key: string }) => ({
      ...item,
      meaningKey: item.meaning_key, // snake_case를 camelCase로 변환
    })
  );

  return {
    ...apiResponse,
    data: transformedData,
  };
}

// 사용 가능한 급수 목록 조회
export async function fetchAvailableLevels(
  type: HanjaType
): Promise<LevelsApiResponse> {
  const typeParam = type === "대한검정회 급수자격검정" ? "TypeA" : "TypeB";
  const response = await fetch(`/api/levels/${typeParam}`);

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  return response.json();
}

// 고객센터 문의 인터페이스
export interface CustomerInquiry {
  message: string;
  contactInfo?: string;
  rating?: number;
  inquiryType: "chat" | "request";
}

export interface CustomerInquiryResponse {
  success: boolean;
  message: string;
  inquiryId?: number;
  createdAt?: string;
  error?: string;
}

// 고객센터 문의 전송
export async function submitCustomerInquiry(
  inquiry: CustomerInquiry
): Promise<CustomerInquiryResponse> {
  const response = await fetch("/api/customer/inquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inquiry),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || `API 요청 실패: ${response.status}`);
  }

  return result;
}

export interface UserSettings {
  id?: number;
  user_id: string;
  selected_levels: string[];
  selected_type: string;
  selected_vocabulary_range: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * 사용자 설정을 저장
 */
export const saveUserSettings = async (
  settings: Omit<UserSettings, "id" | "created_at" | "updated_at">
): Promise<UserSettings> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("user_settings")
    .upsert(
      {
        user_id: settings.user_id,
        selected_levels: settings.selected_levels,
        selected_type: settings.selected_type,
        selected_vocabulary_range: settings.selected_vocabulary_range,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id",
      }
    )
    .select()
    .single();

  if (error) {
    console.error("Failed to save user settings:", error);
    throw new Error("사용자 설정 저장에 실패했습니다.");
  }

  return data;
};

/**
 * 사용자 설정을 불러오기
 */
export const loadUserSettings = async (
  userId: string
): Promise<UserSettings | null> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("user_settings")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // 데이터가 없는 경우
      return null;
    }
    console.error("Failed to load user settings:", error);
    throw new Error("사용자 설정 불러오기에 실패했습니다.");
  }

  return data;
};

/**
 * 사용자 설정을 삭제
 */
export const deleteUserSettings = async (userId: string): Promise<void> => {
  const supabase = getSupabaseClient();

  const { error } = await supabase
    .from("user_settings")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("Failed to delete user settings:", error);
    throw new Error("사용자 설정 삭제에 실패했습니다.");
  }
};
