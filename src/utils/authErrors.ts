import { AUTH_MESSAGES } from "@/constants/authMessages";

/**
 * Supabase 에러를 한글 메시지로 변환
 */
export const translateSupabaseError = (
  error: Error,
  context: "signup" | "signin"
): string => {
  const message = error.message.toLowerCase();

  // 회원가입 관련 에러
  if (context === "signup") {
    if (message.includes("already registered")) {
      return AUTH_MESSAGES.SUPABASE_ERRORS.ALREADY_REGISTERED;
    }
    if (message.includes("invalid email")) {
      return AUTH_MESSAGES.SUPABASE_ERRORS.INVALID_EMAIL;
    }
    if (message.includes("password should be at least")) {
      return AUTH_MESSAGES.SUPABASE_ERRORS.PASSWORD_TOO_SHORT;
    }
    return AUTH_MESSAGES.ERROR.SIGNUP_FAILED;
  }

  // 로그인 관련 에러
  if (context === "signin") {
    if (message.includes("invalid login credentials")) {
      return AUTH_MESSAGES.SUPABASE_ERRORS.INVALID_CREDENTIALS;
    }
    if (message.includes("email not confirmed")) {
      return AUTH_MESSAGES.SUPABASE_ERRORS.EMAIL_NOT_CONFIRMED;
    }
    if (message.includes("too many requests")) {
      return AUTH_MESSAGES.SUPABASE_ERRORS.TOO_MANY_REQUESTS;
    }
    return AUTH_MESSAGES.ERROR.SIGNIN_FAILED;
  }

  return AUTH_MESSAGES.ERROR.UNKNOWN;
};

/**
 * 일반적인 에러를 안전하게 문자열로 변환
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return AUTH_MESSAGES.ERROR.UNKNOWN;
};
