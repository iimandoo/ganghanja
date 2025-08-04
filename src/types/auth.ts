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
