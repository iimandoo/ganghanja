"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { getSupabaseClient } from "@/lib/supabase";
import {
  AuthUser,
  SignUpData,
  SignInData,
  AuthState,
  AuthContextType,
  AuthResponse,
} from "@/types/auth";
import { validateSignUpData, validateSignInData } from "@/utils/authValidation";
import { translateSupabaseError, getErrorMessage } from "@/utils/authErrors";
import { saveRememberMe, clearRememberMe } from "@/utils/localStorage";
import { AUTH_MESSAGES } from "@/constants/authMessages";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Supabase 클라이언트를 useMemo로 최적화
  const supabase = useMemo(() => getSupabaseClient(), []);

  // 인증 상태 설정 헬퍼 함수
  const setAuthLoading = useCallback((loading: boolean) => {
    setAuthState((prev) => ({ ...prev, loading }));
  }, []);

  const setAuthError = useCallback((error: string | null) => {
    setAuthState((prev) => ({ ...prev, error, loading: false }));
  }, []);

  const setAuthUser = useCallback((user: AuthUser | null) => {
    setAuthState({ user, loading: false, error: null });
  }, []);

  // 세션에서 사용자 정보 추출
  const extractUserFromSession = useCallback((session: any): AuthUser => {
    return {
      id: session.user.id,
      username: session.user.user_metadata?.username || "",
      created_at: session.user.created_at,
    };
  }, []);

  // 세션 초기화 및 상태 변경 리스너 등록
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!mounted) return;

        if (session?.user) {
          const user = extractUserFromSession(session);
          setAuthUser(user);
        } else {
          setAuthUser(null);
        }
      } catch (error) {
        console.error("Session initialization error:", error);
        if (mounted) {
          setAuthUser(null);
        }
      }
    };

    initializeAuth();

    // 인증 상태 변경 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (session?.user) {
        const user = extractUserFromSession(session);
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, extractUserFromSession, setAuthUser]);

  // 회원가입
  const signUp = useCallback(
    async (data: SignUpData): Promise<AuthResponse> => {
      setAuthLoading(true);

      // 클라이언트 측 검증
      const validation = validateSignUpData(data);
      if (!validation.isValid) {
        setAuthError(validation.error!);
        return { success: false, error: validation.error };
      }

      try {
        const { data: authData, error } = await supabase.auth.signUp({
          email: `${data.username}@gmail.com`,
          password: data.password,
          options: {
            data: {
              username: data.username,
            },
          },
        });

        if (error) {
          const koreanError = translateSupabaseError(error, "signup");
          setAuthError(koreanError);
          return { success: false, error: koreanError };
        }

        if (authData.user) {
          const user: AuthUser = {
            id: authData.user.id,
            username: data.username,
            created_at: authData.user.created_at,
          };
          setAuthUser(user);
          return { success: true };
        }

        const errorMsg = AUTH_MESSAGES.ERROR.SIGNUP_FAILED;
        setAuthError(errorMsg);
        return { success: false, error: errorMsg };
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setAuthError(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    [supabase, setAuthLoading, setAuthError, setAuthUser]
  );

  // 로그인
  const signIn = useCallback(
    async (data: SignInData): Promise<AuthResponse> => {
      setAuthLoading(true);

      // 클라이언트 측 검증
      const validation = validateSignInData(data);
      if (!validation.isValid) {
        setAuthError(validation.error!);
        return { success: false, error: validation.error };
      }

      try {
        const { data: authData, error } =
          await supabase.auth.signInWithPassword({
            email: `${data.username}@gmail.com`,
            password: data.password,
          });

        if (error) {
          const koreanError = translateSupabaseError(error, "signin");
          setAuthError(koreanError);
          return { success: false, error: koreanError };
        }

        if (authData.user) {
          const user = extractUserFromSession(authData);
          setAuthUser(user);

          // 자동 로그인 설정
          if (data.rememberMe) {
            saveRememberMe(data.username);
          } else {
            clearRememberMe();
          }

          return { success: true };
        }

        const errorMsg = AUTH_MESSAGES.ERROR.SIGNIN_FAILED;
        setAuthError(errorMsg);
        return { success: false, error: errorMsg };
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setAuthError(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    [
      supabase,
      setAuthLoading,
      setAuthError,
      setAuthUser,
      extractUserFromSession,
    ]
  );

  // 로그아웃
  const signOut = useCallback(async () => {
    setAuthLoading(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      // 자동 로그인 정보 제거
      clearRememberMe();

      setAuthUser(null);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      console.error("로그아웃 오류:", errorMessage);
      setAuthError(errorMessage);
    }
  }, [supabase, setAuthLoading, setAuthError, setAuthUser]);

  // Context 값 메모이제이션
  const value = useMemo(
    () => ({
      user: authState.user,
      loading: authState.loading,
      error: authState.error,
      signUp,
      signIn,
      signOut,
    }),
    [
      authState.user,
      authState.loading,
      authState.error,
      signUp,
      signIn,
      signOut,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
