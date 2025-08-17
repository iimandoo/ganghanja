import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useAuth } from "@/contexts/AuthContext";
import { SignUpData, SignInData, AuthModalMode } from "@/types/auth";
import { theme } from "@/styles/theme";
import { loadRememberMe } from "@/utils/localStorage";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthModalMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "signin",
}) => {
  const [mode, setMode] = useState<AuthModalMode>(initialMode);
  const [mounted, setMounted] = useState(false);
  const [signUpData, setSignUpData] = useState<SignUpData>({
    username: "",
    password: "",
  });
  const [signInData, setSignInData] = useState<SignInData>({
    username: "",
    password: "",
    rememberMe: false,
  });

  const { signUp, signIn, loading, error } = useAuth();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // initialMode가 변경될 때 mode 상태 업데이트
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // 모달이 열릴 때마다 폼 데이터 초기화
  useEffect(() => {
    if (isOpen) {
      setSignUpData({ username: "", password: "" });
      setSignInData({ username: "", password: "", rememberMe: false });
    }
  }, [isOpen]);

  // 자동 로그인 정보 불러오기
  useEffect(() => {
    if (mode === "signin") {
      const rememberedUsername = loadRememberMe();
      if (rememberedUsername) {
        setSignInData({
          username: rememberedUsername,
          password: "",
          rememberMe: true,
        });
      }
    }
  }, [mode]);

  // 폼 제출 핸들러
  const handleSubmit = useCallback(
    async (e: React.FormEvent, type: "signup" | "signin") => {
      e.preventDefault();

      let result;
      if (type === "signup") {
        result = await signUp(signUpData);
      } else {
        result = await signIn(signInData);
      }

      if (result?.success) {
        onClose();
      }
    },
    [signUp, signIn, signUpData, signInData, onClose]
  );

  // 입력 변경 핸들러
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: "signup" | "signin") => {
      const { name, value, type: inputType, checked } = e.target;
      const inputValue = inputType === "checkbox" ? checked : value;

      if (type === "signup") {
        setSignUpData((prev) => ({ ...prev, [name]: inputValue }));
      } else {
        setSignInData((prev) => ({ ...prev, [name]: inputValue }));
      }
    },
    []
  );

  // 모드 전환
  const switchMode = useCallback(() => {
    setMode((prevMode) => (prevMode === "signin" ? "signup" : "signin"));
    setSignUpData({ username: "", password: "" });
    setSignInData({ username: "", password: "", rememberMe: false });
  }, []);

  if (!isOpen || !mounted) return null;

  // Portal을 사용하여 body에 직접 렌더링
  return createPortal(
    <ModalOverlay onClick={(e) => e.stopPropagation()}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>{mode === "signin" ? "로그인" : "회원가입"}</h2>
          <CloseButton onClick={onClose} aria-label="닫기">
            ×
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={(e) => handleSubmit(e, mode)}>
          {mode === "signin" ? (
            <>
              <FormGroup>
                <Label htmlFor="signin-username">아이디</Label>
                <Input
                  id="signin-username"
                  name="username"
                  type="text"
                  value={signInData.username}
                  onChange={(e) => handleInputChange(e, "signin")}
                  placeholder="아이디를 입력하세요"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="signin-password">비밀번호</Label>
                <Input
                  id="signin-password"
                  name="password"
                  type="password"
                  value={signInData.password}
                  onChange={(e) => handleInputChange(e, "signin")}
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={signInData.rememberMe}
                    onChange={(e) => handleInputChange(e, "signin")}
                  />
                  아이디 기억하기
                </Label>
              </FormGroup>
            </>
          ) : (
            <>
              <FormGroup>
                <Label htmlFor="signup-username">아이디</Label>
                <Input
                  id="signup-username"
                  name="username"
                  type="text"
                  value={signUpData.username}
                  onChange={(e) => handleInputChange(e, "signup")}
                  placeholder="아이디를 입력하세요"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="signup-password">비밀번호</Label>
                <Input
                  id="signup-password"
                  name="password"
                  type="password"
                  value={signUpData.password}
                  onChange={(e) => handleInputChange(e, "signup")}
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </FormGroup>
            </>
          )}

          {error && (
            <div
              style={{ color: "red", marginBottom: "16px", fontSize: "14px" }}
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            style={{ marginBottom: "16px" }}
          >
            {loading ? "처리 중..." : mode === "signin" ? "로그인" : "회원가입"}
          </Button>

          <ModeSwitch onClick={switchMode}>
            {mode === "signin"
              ? "계정이 없으신가요? 회원가입"
              : "이미 계정이 있으신가요? 로그인"}
          </ModeSwitch>
        </Form>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

// 스타일 컴포넌트들
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
`;

const ModalContent = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xxl};
  width: 100%;
  max-width: 400px;
  box-shadow: ${theme.shadows.xl};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xxl};

  h2 {
    margin: 0;
    font-size: ${theme.fontSize.xl};
    font-weight: ${theme.fontWeight.semibold};
    color: ${theme.colors.secondary.main};
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${theme.fontSize.xl};
  cursor: pointer;
  color: ${theme.colors.gray.medium};
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.round};
  transition: ${theme.transitions.fast};

  &:hover {
    background-color: ${theme.colors.gray.bg};
    color: ${theme.colors.secondary.main};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.secondary.main};
`;

const Input = styled.input`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 2px solid ${theme.colors.gray.border};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.md};
  transition: ${theme.transitions.fast};
  background: ${theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${theme.colors.primary.light}20;
  }

  &::placeholder {
    color: ${theme.colors.gray.medium};
  }
`;

const Button = styled.button`
  background: ${theme.colors.secondary.main};
  color: ${theme.colors.white};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  transition: ${theme.transitions.fast};

  &:hover:not(:disabled) {
    background: ${theme.colors.secondary.dark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ModeSwitch = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.secondary.main};
  cursor: pointer;
  font-size: ${theme.fontSize.sm};
  text-decoration: underline;
  transition: ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.secondary.dark};
  }
`;
