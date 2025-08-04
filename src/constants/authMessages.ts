/**
 * 인증 관련 메시지 상수
 */

export const AUTH_MESSAGES = {
  // 성공 메시지
  SUCCESS: {
    SIGNUP: "회원가입이 완료되었습니다.",
    SIGNIN: "로그인되었습니다.",
    SIGNOUT: "로그아웃되었습니다.",
  },

  // 검증 에러 메시지
  VALIDATION: {
    USERNAME_TOO_SHORT: "아이디는 4자 이상이어야 합니다.",
    USERNAME_EMAIL_FORMAT: "아이디에 이메일 주소를 입력하지 마세요.",
    USERNAME_REQUIRED: "아이디를 입력해주세요.",
    PASSWORD_TOO_SHORT: "비밀번호는 6자 이상이어야 합니다.",
    PASSWORD_REQUIRED: "비밀번호를 입력해주세요.",
  },

  // 일반 에러 메시지
  ERROR: {
    SIGNUP_FAILED: "회원가입에 실패했습니다.",
    SIGNIN_FAILED: "로그인에 실패했습니다.",
    SIGNOUT_FAILED: "로그아웃에 실패했습니다.",
    UNKNOWN: "알 수 없는 오류가 발생했습니다.",
  },

  // Supabase 에러 매핑
  SUPABASE_ERRORS: {
    ALREADY_REGISTERED: "이미 등록된 아이디입니다.",
    INVALID_EMAIL: "유효하지 않은 아이디입니다.",
    PASSWORD_TOO_SHORT: "비밀번호가 너무 짧습니다.",
    INVALID_CREDENTIALS: "아이디 또는 비밀번호가 올바르지 않습니다.",
    EMAIL_NOT_CONFIRMED: "이메일 인증이 필요합니다.",
    TOO_MANY_REQUESTS:
      "너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.",
  },

  // UI 메시지
  UI: {
    LOADING: "처리중...",
    LOADING_AUTH: "로딩중...",
    SIGNIN_BUTTON: "로그인",
    SIGNUP_BUTTON: "회원가입",
    SIGNOUT_BUTTON: "로그아웃",
    SIGNIN_TITLE: "로그인",
    SIGNUP_TITLE: "회원가입",
    SWITCH_TO_SIGNUP: "계정이 없으신가요?",
    SWITCH_TO_SIGNIN: "이미 계정이 있으신가요?",
    AUTO_LOGIN: "자동 로그인",
  },

  // Placeholder 텍스트
  PLACEHOLDER: {
    USERNAME: "아이디를 입력하세요 (4자 이상)",
    PASSWORD_SIGNUP: "비밀번호를 입력하세요 (6자 이상)",
    PASSWORD_SIGNIN: "비밀번호를 입력하세요(6자이상)",
  },
} as const;
