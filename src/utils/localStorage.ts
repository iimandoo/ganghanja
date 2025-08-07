// 로컬 스토리지 키 상수
export const LOCAL_STORAGE_KEYS = {
  REMEMBER_ME: "rememberMe",
} as const;

export type LocalStorageKey =
  (typeof LOCAL_STORAGE_KEYS)[keyof typeof LOCAL_STORAGE_KEYS];

// 자동 로그인 관련 함수들
export const saveRememberMe = (username: string): void => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEYS.REMEMBER_ME, username);
  } catch (error) {
    console.error("Failed to save remember me:", error);
  }
};

export const loadRememberMe = (): string | null => {
  try {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.REMEMBER_ME);
  } catch (error) {
    console.error("Failed to load remember me:", error);
    return null;
  }
};

export const clearRememberMe = (): void => {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REMEMBER_ME);
  } catch (error) {
    console.error("Failed to clear remember me:", error);
  }
};
