import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useAuth } from "@/contexts/AuthContext";
import { SignUpData, SignInData, AuthModalMode } from "@/types/auth";
import { theme } from "@/styles/theme";
import { AUTH_MESSAGES } from "@/constants/authMessages";
import { getRememberMeData } from "@/utils/localStorage";

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
      const { username, rememberMe } = getRememberMeData();
      setSignInData({
        username,
        password: "",
        rememberMe,
      });
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

  // 모달 외부 클릭 시 닫기
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  const isSignupMode = mode === "signup";
  const currentData = isSignupMode ? signUpData : signInData;

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>
            {isSignupMode
              ? AUTH_MESSAGES.UI.SIGNUP_TITLE
              : AUTH_MESSAGES.UI.SIGNIN_TITLE}
          </h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>

        <Form
          onSubmit={(e) => handleSubmit(e, isSignupMode ? "signup" : "signin")}
        >
          {/* 아이디 입력 필드 */}
          <FormGroup>
            <Label htmlFor={`${mode}-username`}>아이디</Label>
            <Input
              type="text"
              id={`${mode}-username`}
              name="username"
              value={currentData.username}
              onChange={(e) =>
                handleInputChange(e, isSignupMode ? "signup" : "signin")
              }
              placeholder={AUTH_MESSAGES.PLACEHOLDER.USERNAME}
              required
              minLength={4}
            />
          </FormGroup>

          {/* 비밀번호 입력 필드 */}
          <FormGroup>
            <Label htmlFor={`${mode}-password`}>비밀번호</Label>
            <Input
              type="password"
              id={`${mode}-password`}
              name="password"
              value={currentData.password}
              onChange={(e) =>
                handleInputChange(e, isSignupMode ? "signup" : "signin")
              }
              placeholder={
                isSignupMode
                  ? AUTH_MESSAGES.PLACEHOLDER.PASSWORD_SIGNUP
                  : AUTH_MESSAGES.PLACEHOLDER.PASSWORD_SIGNIN
              }
              required
              minLength={6}
            />
          </FormGroup>

          {/* 자동 로그인 체크박스 (로그인 모드에서만) */}
          {!isSignupMode && (
            <CheckboxGroup>
              <Checkbox
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={(signInData as SignInData).rememberMe}
                onChange={(e) => handleInputChange(e, "signin")}
              />
              <CheckboxLabel htmlFor="rememberMe">
                {AUTH_MESSAGES.UI.AUTO_LOGIN}
              </CheckboxLabel>
            </CheckboxGroup>
          )}

          {/* 에러 메시지 */}
          {error && <ErrorMessage>{error}</ErrorMessage>}

          {/* 제출 버튼 */}
          <SubmitButton type="submit" disabled={loading}>
            {loading
              ? AUTH_MESSAGES.UI.LOADING
              : isSignupMode
              ? AUTH_MESSAGES.UI.SIGNUP_BUTTON
              : AUTH_MESSAGES.UI.SIGNIN_BUTTON}
          </SubmitButton>
        </Form>

        {/* 모드 전환 */}
        <ModeSwitch>
          <span>
            {isSignupMode
              ? AUTH_MESSAGES.UI.SWITCH_TO_SIGNIN
              : AUTH_MESSAGES.UI.SWITCH_TO_SIGNUP}
          </span>
          <SwitchButton type="button" onClick={switchMode}>
            {isSignupMode
              ? AUTH_MESSAGES.UI.SIGNIN_BUTTON
              : AUTH_MESSAGES.UI.SIGNUP_BUTTON}
          </SwitchButton>
        </ModeSwitch>
      </ModalContent>
    </ModalOverlay>
  );
};

// 스타일 컴포넌트들
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
