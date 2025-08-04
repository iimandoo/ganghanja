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
import { AuthUser, SignUpData, SignInData, AuthState } from "@/types/auth";

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>;
  signIn: (data: SignInData) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

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

  useEffect(() => {
    // 현재 세션 확인
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        setAuthState({
          user: {
            id: session.user.id,
            username: session.user.user_metadata?.username || "",
            created_at: session.user.created_at,
          },
          loading: false,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          loading: false,
          error: null,
        });
      }
    };

    getSession();

    // 인증 상태 변경 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setAuthState({
          user: {
            id: session.user.id,
            username: session.user.user_metadata?.username || "",
            created_at: session.user.created_at,
          },
          loading: false,
          error: null,
        });
      } else {
        setAuthState({
          user: null,
          loading: false,
          error: null,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const signUp = useCallback(
    async (data: SignUpData) => {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      // 아이디 길이 검증
      if (data.username.length < 4) {
        setAuthState((prev) => ({
          ...prev,
          loading: false,
          error: "아이디는 4자 이상이어야 합니다.",
        }));
        return { success: false, error: "아이디는 4자 이상이어야 합니다." };
      }

      // 아이디에 이메일 형식이 포함되어 있는지 검증
      const emailPattern = /@/;
      if (emailPattern.test(data.username)) {
        setAuthState((prev) => ({
          ...prev,
          loading: false,
          error: "아이디에 이메일 주소를 입력하지 마세요.",
        }));
        return {
          success: false,
          error: "아이디에 이메일 주소를 입력하지 마세요.",
        };
      }

      // 비밀번호 길이 검증
      if (data.password.length < 6) {
        setAuthState((prev) => ({
          ...prev,
          loading: false,
          error: "비밀번호는 6자 이상이어야 합니다.",
        }));
        return { success: false, error: "비밀번호는 6자 이상이어야 합니다." };
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
          // Supabase 에러 메시지를 한글로 변환
          let koreanErrorMessage = "회원가입에 실패했습니다.";

          if (error.message.includes("already registered")) {
            koreanErrorMessage = "이미 등록된 아이디입니다.";
          } else if (error.message.includes("Invalid email")) {
            koreanErrorMessage = "유효하지 않은 아이디입니다.";
          } else if (error.message.includes("Password should be at least")) {
            koreanErrorMessage = "비밀번호가 너무 짧습니다.";
          }

          throw new Error(koreanErrorMessage);
        }

        if (authData.user) {
          setAuthState({
            user: {
              id: authData.user.id,
              username: data.username,
              created_at: authData.user.created_at,
            },
            loading: false,
            error: null,
          });
          return { success: true };
        }

        return { success: false, error: "회원가입에 실패했습니다." };
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        setAuthState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        return { success: false, error: errorMessage };
      }
    },
    [supabase]
  );

  const signIn = useCallback(
    async (data: SignInData) => {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const { data: authData, error } =
          await supabase.auth.signInWithPassword({
            email: `${data.username}@gmail.com`,
            password: data.password,
          });

        if (error) {
          // Supabase 에러 메시지를 한글로 변환
          let koreanErrorMessage = "로그인에 실패했습니다.";

          if (error.message.includes("Invalid login credentials")) {
            koreanErrorMessage = "아이디 또는 비밀번호가 올바르지 않습니다.";
          } else if (error.message.includes("Email not confirmed")) {
            koreanErrorMessage = "이메일 인증이 필요합니다.";
          } else if (error.message.includes("Too many requests")) {
            koreanErrorMessage =
              "너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.";
          }

          throw new Error(koreanErrorMessage);
        }

        if (authData.user) {
          setAuthState({
            user: {
              id: authData.user.id,
              username: authData.user.user_metadata?.username || "",
              created_at: authData.user.created_at,
            },
            loading: false,
            error: null,
          });

          // 자동 로그인 설정
          if (data.rememberMe) {
            localStorage.setItem("rememberMe", "true");
            localStorage.setItem("username", data.username);
          } else {
            localStorage.removeItem("rememberMe");
            localStorage.removeItem("username");
          }

          return { success: true };
        }

        return { success: false, error: "로그인에 실패했습니다." };
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "알 수 없는 오류가 발생했습니다.";
        setAuthState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
        return { success: false, error: errorMessage };
      }
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, loading: true }));

    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      // 자동 로그인 정보 제거
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("username");

      setAuthState({
        user: null,
        loading: false,
        error: null,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.";
      console.error("로그아웃 오류:", errorMessage);
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, [supabase]);

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
