import { HanjaType, Level } from "@/constants";
import { getSupabaseClient } from "@/lib/supabase";

export interface HanjaData {
  id: number;
  character: string;
  meaning: string;
  meaning_key: string;
  meaningKey?: string;
  idiom: string;
  level: string;
  type: string;
  created_at: string;
  naver_url?: string;
  wordlevel_es?: Array<{ kor: string; hanja: string; url: string }>;
  wordlevel_mid?: Array<{ kor: string; hanja: string; url: string }>;
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

// 한자 데이터 조회 (현재 ID 기준으로 이전/현재/다음 데이터만)
export async function fetchHanjaData(
  type: HanjaType,
  levels: Level[],
  vocabularyRange?: string,
  currentId?: number,
  hiddenCardIds?: Set<number>
): Promise<{
  previous: HanjaData | null;
  current: HanjaData | null;
  next: HanjaData | null;
  totalCount: number;
  currentIndex: number;
}> {
  const typeParam = type === "대한검정회 급수자격검정" ? "TypeA" : "TypeB";
  const levelsParam = levels.join(",");

  const params = new URLSearchParams({
    levels: levelsParam,
    vocabularyRange: vocabularyRange || "기본",
  });

  // currentId가 undefined가 아닐 때만 파라미터에 추가
  if (currentId !== undefined && currentId !== null) {
    params.append("currentId", currentId.toString());
  }

  // 숨겨진 카드 ID 목록 추가
  if (hiddenCardIds && hiddenCardIds.size > 0) {
    const hiddenIdsArray = Array.from(hiddenCardIds);
    params.append("hiddenCardIds", hiddenIdsArray.join(","));
  }

  const response = await fetch(`/api/hanja/${typeParam}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`API 요청 실패: ${response.status}`);
  }

  const apiResponse = await response.json();

  // API 응답 데이터를 프론트엔드 형식으로 변환
  const transformItem = (
    item: (HanjaData & { meaning_key: string }) | null
  ) => {
    if (!item) return null;
    return {
      ...item,
      meaningKey: item.meaning_key, // snake_case를 camelCase로 변환
    };
  };

  return {
    previous: transformItem(apiResponse.data.previous),
    current: transformItem(apiResponse.data.current),
    next: transformItem(apiResponse.data.next),
    totalCount: apiResponse.data.totalCount,
    currentIndex: apiResponse.data.currentIndex,
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
export const saveUserSettings = async (settings: {
  user_id: string;
  selected_levels: string[];
  selected_type: string;
  selected_vocabulary_range: string;
}): Promise<UserSettings> => {
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

  return data as unknown as UserSettings;
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

  return data as unknown as UserSettings;
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

/**
 * 한자의 wordlevel_mid에 새로운 단어 추가
 */
export interface WordLevelData {
  kor: string;
  hanja: string;
}

export const addWordToHanja = async (
  hanjaId: number,
  wordData: WordLevelData,
  vocabularyRange: "기본" | "중급",
  userId: string
): Promise<{
  success: boolean;
  message: string;
  updatedWords: WordLevelData[];
}> => {
  const response = await fetch("/api/hanja/update-word-level", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hanjaId,
      wordData,
      vocabularyRange,
      userId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "단어 추가에 실패했습니다.");
  }

  return await response.json();
};

/**
 * 한자의 활용단어 수정
 */
export const updateWordInHanja = async (
  hanjaId: number,
  oldWord: WordLevelData,
  newWord: WordLevelData,
  vocabularyRange: "기본" | "중급",
  userId: string
): Promise<{
  success: boolean;
  message: string;
  updatedWords: WordLevelData[];
}> => {
  const response = await fetch("/api/hanja/update-word-level", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hanjaId,
      oldWord,
      newWord,
      vocabularyRange,
      userId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "단어 수정에 실패했습니다.");
  }

  return await response.json();
};

/**
 * 한자의 활용단어 삭제
 */
export const deleteWordFromHanja = async (
  hanjaId: number,
  wordToDelete: WordLevelData,
  vocabularyRange: "기본" | "중급",
  userId: string
): Promise<{
  success: boolean;
  message: string;
  updatedWords: WordLevelData[];
}> => {
  const response = await fetch("/api/hanja/update-word-level", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hanjaId,
      wordToDelete,
      vocabularyRange,
      userId,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "단어 삭제에 실패했습니다.");
  }

  return await response.json();
};

/**
 * 단어 추가 히스토리 조회
 */
export interface WordHistoryItem {
  id: number;
  user_id: string;
  hanja_id: number;
  wordlevel: "기본" | "중급";
  type: "add" | "modify" | "delete";
  hanja: string; // 추가된 한자
  kor: string; // 추가된 한글 음
  before_wordlevel_es: Array<{
    kor: string;
    hanja: string;
    url: string;
  }> | null;
  before_wordlevel_mid: Array<{
    kor: string;
    hanja: string;
    url: string;
  }> | null;
  after_wordlevel_es: Array<{ kor: string; hanja: string; url: string }> | null;
  after_wordlevel_mid: Array<{
    kor: string;
    hanja: string;
    url: string;
  }> | null;
  created_at: string;
  updated_at: string;
  hanja_data?: {
    id: number;
    character: string;
    meaning: string;
    meaning_key: string;
  };
}

export const getUserWordHistory = async (
  userId: string,
  limit: number = 50
): Promise<WordHistoryItem[]> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("word_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Failed to load word history:", error);
    throw new Error("단어 히스토리 불러오기에 실패했습니다.");
  }

  return (data as unknown as WordHistoryItem[]) || [];
};

/**
 * 사용자의 단어 추가 히스토리를 날짜별로 그룹화하여 조회
 */
export const getUserWordHistoryGroupedByDate = async (
  userId: string,
  limit: number = 50
): Promise<{
  [date: string]: WordHistoryItem[];
}> => {
  const history = await getUserWordHistory(userId, limit);

  return history.reduce((grouped, item) => {
    const date = new Date(item.created_at).toLocaleDateString("ko-KR");
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
    return grouped;
  }, {} as { [date: string]: WordHistoryItem[] });
};

/**
 * 특정 한자에 대한 사용자의 단어 추가 히스토리 조회
 */
export const getHanjaWordHistory = async (
  userId: string,
  hanjaId: number
): Promise<WordHistoryItem[]> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("word_history")
    .select("*")
    .eq("user_id", userId)
    .eq("hanja_id", hanjaId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load hanja word history:", error);
    throw new Error("한자별 단어 히스토리 불러오기에 실패했습니다.");
  }

  return (data as unknown as WordHistoryItem[]) || [];
};

/**
 * 사용자 설정 정보 조회
 */
export interface UserPreferences {
  id: string;
  user_id: string;
  user_level: string;
  vocabulary_range: "기본" | "중급";
  level_filter: string[];
  type_filter: string;
  created_at: string;
  updated_at: string;
}

export const getUserPreferences = async (
  userId: string
): Promise<UserPreferences | null> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // 데이터가 없는 경우
      return null;
    }
    console.error("Failed to load user preferences:", error);
    throw new Error("사용자 설정 불러오기에 실패했습니다.");
  }

  return data as unknown as UserPreferences;
};

/**
 * 사용자가 admin인지 확인
 */
export const isUserAdmin = async (userId: string): Promise<boolean> => {
  try {
    const preferences = await getUserPreferences(userId);
    return preferences?.user_level === "admin";
  } catch (error) {
    console.error("Admin 권한 확인 실패:", error);
    return false;
  }
};

/**
 * 사용자 설정 생성 또는 업데이트
 */
export const upsertUserPreferences = async (
  userId: string,
  preferences: Partial<UserPreferences>
): Promise<UserPreferences> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from("user_preferences")
    .upsert(
      {
        user_id: userId,
        ...preferences,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    )
    .select()
    .single();

  if (error) {
    console.error("Failed to upsert user preferences:", error);
    throw new Error("사용자 설정 저장에 실패했습니다.");
  }

  return data as unknown as UserPreferences;
};
