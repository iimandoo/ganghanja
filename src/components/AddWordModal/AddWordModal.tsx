"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { useAuth } from "@/contexts/AuthContext";

interface AddWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  vocabularyRange: "기본" | "중급";
  currentHanja?: {
    id: number;
    character: string;
    meaning: string;
    meaning_key: string;
  };
  onSuccess?: () => void; // 성공 후 콜백 추가
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease, visibility 0.3s ease;
  padding: 20px;
`;

const Modal = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const Header = styled.div`
  padding: 24px 24px 0 24px;
  border-bottom: 1px solid ${theme.colors.neutral.light};
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  margin: 0 0 8px 0;
  font-family: "Noto Sans KR", sans-serif;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin: 0 0 16px 0;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${theme.colors.text.secondary};
  padding: 8px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${theme.colors.neutral.light};
  }
`;

const Content = styled.div`
  padding: 0 24px 24px 24px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 8px;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${theme.colors.neutral.light};
  border-radius: 8px;
  font-size: 1rem;
  font-family: "Noto Sans KR", sans-serif;
  transition: border-color 0.2s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
  }

  &::placeholder {
    color: ${theme.colors.text.placeholder};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
`;

const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  flex: 1;
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Noto Sans KR", sans-serif;
  min-height: 48px;

  ${(props) =>
    props.$variant === "primary"
      ? `
    background: ${theme.colors.primary.gradient};
    color: ${theme.colors.secondary.main};
    border: none;
    box-shadow: ${theme.shadows.md};

    &:hover:not(:disabled) {
      background: ${theme.colors.primary.dark};
      transform: translateY(-1px);
      box-shadow: ${theme.shadows.md};
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      background: ${theme.colors.gray.medium};
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
  `
      : `
    background: white;
    color: ${theme.colors.gray.medium};
    border: 1px solid ${theme.colors.gray.border};

    &:hover {
      background: ${theme.colors.gray.light};
      color: ${theme.colors.gray.dark};
    }
  `}
`;

export const AddWordModal: React.FC<AddWordModalProps> = ({
  isOpen,
  onClose,
  vocabularyRange,
  currentHanja,
  onSuccess,
}) => {
  const { user } = useAuth();
  const [hanja, setHanja] = useState("");
  const [kor, setKor] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hanja.trim() && kor.trim() && currentHanja) {
      try {
        const { addWordToHanja } = await import("@/lib/api");
        if (!user?.id) {
          throw new Error("사용자 정보를 찾을 수 없습니다.");
        }

        await addWordToHanja(
          currentHanja.id,
          {
            kor: kor.trim(),
            hanja: hanja.trim(),
          },
          vocabularyRange,
          user.id
        );

        // 폼 초기화
        setHanja("");
        setKor("");
        onClose();

        // 성공 콜백 호출 (화면 갱신용)
        if (onSuccess) {
          onSuccess();
        }

        // 성공 메시지 (선택사항)
        console.log(`${hanja.trim()} (${kor.trim()}) 단어가 추가되었습니다!`);
      } catch (error) {
        console.error("단어 추가 실패:", error);
      }
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <Modal>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Header>
          <Title>단어 추가하기</Title>
          <Description>
            {vocabularyRange === "기본"
              ? "기본 활용단어에 새로운 한자와 음을 추가합니다."
              : "중급 활용단어에 새로운 한자와 음을 추가합니다."}
          </Description>
        </Header>
        <Content>
          {currentHanja && (
            <div
              style={{
                marginBottom: "24px",
                padding: "16px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                border: "1px solid #e9ecef",
              }}
            >
              <div
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  marginBottom: "8px",
                  color: theme.colors.text.primary,
                }}
              >
                {currentHanja.character}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: theme.colors.text.secondary,
                  marginBottom: "4px",
                }}
              >
                뜻: {currentHanja.meaning}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: theme.colors.text.secondary,
                }}
              >
                음: {currentHanja.meaning_key}
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="hanja">한자</Label>
              <Input
                id="hanja"
                type="text"
                value={hanja}
                onChange={(e) => setHanja(e.target.value)}
                placeholder="한자를 입력하세요"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="kor">한글 음</Label>
              <Input
                id="kor"
                type="text"
                value={kor}
                onChange={(e) => setKor(e.target.value)}
                placeholder="한글 음을 입력하세요 (예: 사람)"
                required
              />
            </FormGroup>

            <ButtonGroup>
              <Button type="button" $variant="secondary" onClick={onClose}>
                취소
              </Button>
              <Button
                type="submit"
                $variant="primary"
                disabled={!hanja.trim() || !kor.trim()}
              >
                추가하기
              </Button>
            </ButtonGroup>
          </form>
        </Content>
      </Modal>
    </Overlay>
  );
};
