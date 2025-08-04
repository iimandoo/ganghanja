import { LOCAL_STORAGE_KEYS } from "@/types/auth";

/**
 * 로컬 스토리지 관련 유틸리티 함수들
 */

/**
 * 자동 로그인 정보 저장
 */
export const saveRememberMe = (username: string): void => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.REMEMBER_ME, "true");
  localStorage.setItem(LOCAL_STORAGE_KEYS.USERNAME, username);
};

/**
 * 자동 로그인 정보 제거
 */
export const clearRememberMe = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.REMEMBER_ME);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.USERNAME);
};

/**
 * 저장된 사용자명 가져오기
 */
export const getRememberedUsername = (): string => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.USERNAME) || "";
};

/**
 * 자동 로그인 활성화 여부 확인
 */
export const isRememberMeEnabled = (): boolean => {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.REMEMBER_ME) === "true";
};

/**
 * 자동 로그인 데이터 가져오기
 */
export const getRememberMeData = (): {
  username: string;
  rememberMe: boolean;
} => {
  return {
    username: getRememberedUsername(),
    rememberMe: isRememberMeEnabled(),
  };
};
