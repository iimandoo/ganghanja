import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "@/contexts/AuthContext";
import { SignUpData, SignInData } from "@/types/auth";
import { theme } from "@/styles/theme";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "signin" | "signup";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "signin",
}) => {
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
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
      const rememberedUsername = localStorage.getItem("username") || "";
      const rememberMe = localStorage.getItem("rememberMe") === "true";

      setSignInData({
        username: rememberedUsername,
        password: "",
        rememberMe: rememberMe,
      });
    }
  }, [mode]);

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signUp(signUpData);
    if (result?.success) {
      onClose();
    }
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn(signInData);
    if (result?.success) {
      onClose();
    }
  };

  const handleSignUpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignInInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignInData({
      ...signInData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const switchMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
    setSignUpData({ username: "", password: "" });
    setSignInData({ username: "", password: "", rememberMe: false });
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>{mode === "signin" ? "로그인" : "회원가입"}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        {mode === "signup" ? (
          <Form onSubmit={handleSignUpSubmit}>
            <FormGroup>
              <Label htmlFor="signup-username">아이디</Label>
              <Input
                type="text"
                id="signup-username"
                name="username"
                value={signUpData.username}
                onChange={handleSignUpInputChange}
                placeholder="아이디를 입력하세요 (4자 이상)"
                required
                minLength={4}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="signup-password">비밀번호</Label>
              <Input
                type="password"
                id="signup-password"
                name="password"
                value={signUpData.password}
                onChange={handleSignUpInputChange}
                placeholder="비밀번호를 입력하세요 (6자 이상)"
                required
                minLength={6}
              />
            </FormGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SubmitButton type="submit" disabled={loading}>
              {loading ? "처리중..." : "회원가입"}
            </SubmitButton>
          </Form>
        ) : (
          <Form onSubmit={handleSignInSubmit}>
            <FormGroup>
              <Label htmlFor="signin-username">아이디</Label>
              <Input
                type="text"
                id="signin-username"
                name="username"
                value={signInData.username}
                onChange={handleSignInInputChange}
                placeholder="아이디를 입력하세요 (4자 이상)"
                required
                minLength={4}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="signin-password">비밀번호</Label>
              <Input
                type="password"
                id="signin-password"
                name="password"
                value={signInData.password}
                onChange={handleSignInInputChange}
                placeholder="비밀번호를 입력하세요(6자이상)"
                required
              />
            </FormGroup>

            <CheckboxGroup>
              <Checkbox
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={signInData.rememberMe}
                onChange={handleSignInInputChange}
              />
              <CheckboxLabel htmlFor="rememberMe">자동 로그인</CheckboxLabel>
            </CheckboxGroup>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <SubmitButton type="submit" disabled={loading}>
              {loading ? "처리중..." : "로그인"}
            </SubmitButton>
          </Form>
        )}

        <ModeSwitch>
          <span>
            {mode === "signin"
              ? "계정이 없으신가요?"
              : "이미 계정이 있으신가요?"}
          </span>
          <SwitchButton type="button" onClick={switchMode}>
            {mode === "signin" ? "회원가입" : "로그인"}
          </SwitchButton>
        </ModeSwitch>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${theme.zIndex.modal};
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

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: ${theme.colors.primary.main};
`;

const CheckboxLabel = styled.label`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.gray.medium};
  cursor: pointer;
`;

const SubmitButton = styled.button`
  background: ${theme.colors.primary.gradient};
  color: ${theme.colors.secondary.main};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xxl};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.md};
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  margin-top: ${theme.spacing.sm};

  &:hover:not(:disabled) {
    background: ${theme.colors.primary.dark};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }

  &:disabled {
    background: ${theme.colors.gray.medium};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: ${theme.fontSize.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: ${theme.borderRadius.sm};
`;

const ModeSwitch = styled.div`
  margin-top: ${theme.spacing.xxl};
  text-align: center;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.gray.medium};

  span {
    margin-right: ${theme.spacing.sm};
  }
`;

const SwitchButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.gray.medium};
  cursor: pointer;
  font-weight: ${theme.fontWeight.medium};
  text-decoration: underline;
  transition: ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.gray.dark};
  }
`;
