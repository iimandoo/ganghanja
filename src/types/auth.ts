/**
 * 인증 관련 타입 정의
 */

export interface AuthUser {
  id: string;
  username: string;
  created_at: string;
}

export interface SignUpData {
  username: string;
  password: string;
}

export interface SignInData {
  username: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

/**
 * 인증 API 응답 타입
 */
export interface AuthResponse {
  success: boolean;
  error?: string;
}

/**
 * 인증 컨텍스트 타입
 */
export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signUp: (data: SignUpData) => Promise<AuthResponse>;
  signIn: (data: SignInData) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
}

/**
 * 인증 모달 모드 타입
 */
export type AuthModalMode = "signin" | "signup";

/**
 * 인증 작업 타입
 */
export type AuthAction = "signup" | "signin" | "signout";

export type LocalStorageKey = "rememberMe" | "username";
