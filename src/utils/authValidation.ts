/**
 * 인증 관련 검증 유틸리티 함수들
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * 아이디 검증
 * - 4자 이상
 * - 이메일 형식 금지 (@ 포함 금지)
 */
export const validateUsername = (username: string): ValidationResult => {
  if (username.length < 4) {
    return {
      isValid: false,
      error: "아이디는 4자 이상이어야 합니다.",
    };
  }

  if (username.includes("@")) {
    return {
      isValid: false,
      error: "아이디에 이메일 주소를 입력하지 마세요.",
    };
  }

  return { isValid: true };
};

/**
 * 비밀번호 검증
 * - 6자 이상
 */
export const validatePassword = (password: string): ValidationResult => {
  if (password.length < 6) {
    return {
      isValid: false,
      error: "비밀번호는 6자 이상이어야 합니다.",
    };
  }

  return { isValid: true };
};

/**
 * 회원가입 데이터 전체 검증
 */
export const validateSignUpData = (data: {
  username: string;
  password: string;
}): ValidationResult => {
  const usernameValidation = validateUsername(data.username);
  if (!usernameValidation.isValid) {
    return usernameValidation;
  }

  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }

  return { isValid: true };
};

/**
 * 로그인 데이터 검증
 */
export const validateSignInData = (data: {
  username: string;
  password: string;
}): ValidationResult => {
  if (!data.username.trim()) {
    return {
      isValid: false,
      error: "아이디를 입력해주세요.",
    };
  }

  if (!data.password.trim()) {
    return {
      isValid: false,
      error: "비밀번호를 입력해주세요.",
    };
  }

  return { isValid: true };
};
