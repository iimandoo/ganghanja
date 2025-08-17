"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { useAuth } from "@/contexts/AuthContext";

interface EditWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  vocabularyRange: "기본" | "중급";
  currentWord: {
    kor: string;
    hanja: string;
    url: string;
  };
  hanjaId: number;
  onWordUpdated?: (response: {
    success: boolean;
    updatedWords?: Array<{ kor: string; hanja: string }>;
  }) => void; // 단어 수정 후 응답 데이터 전달
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
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

export const EditWordModal: React.FC<EditWordModalProps> = ({
  isOpen,
  onClose,
  vocabularyRange,
  currentWord,
  hanjaId,
  onWordUpdated,
}) => {
  const [hanja, setHanja] = useState(currentWord.hanja);
  const [kor, setKor] = useState(currentWord.kor);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // currentWord가 변경될 때 상태 업데이트
  useEffect(() => {
    setHanja(currentWord.hanja);
    setKor(currentWord.kor);
  }, [currentWord]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hanja.trim() && kor.trim()) {
      try {
        setIsSubmitting(true);

        // 단어 수정 API 호출
        const { updateWordInHanja } = await import("@/lib/api");
        if (!user?.id) {
          throw new Error("사용자 정보를 찾을 수 없습니다.");
        }

        const response = await updateWordInHanja(
          hanjaId,
          currentWord,
          {
            kor: kor.trim(),
            hanja: hanja.trim(),
          },
          vocabularyRange,
          user.id
        );

        // 응답 데이터 확인
        if (!response.success) {
          throw new Error(response.message || "단어 수정에 실패했습니다.");
        }

        // 응답 데이터를 부모 컴포넌트로 전달
        console.log("EditWordModal 응답 데이터:", response);

        // 모달 닫기
        onClose();

        // 응답 데이터를 부모 컴포넌트로 전달하여 로컬 상태 업데이트
        if (onWordUpdated) {
          onWordUpdated(response);
        }
      } catch (error) {
        console.error("단어 수정 실패:", error);
        alert("단어 수정에 실패했습니다. 다시 시도해주세요.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // dim 클릭 시 모달이 닫히지 않도록 처리
  const handleOverlayClick = (e: React.MouseEvent) => {
    // dim 클릭 시에도 모달을 닫지 않음
    e.stopPropagation();
  };

  if (!isOpen || !mounted) return null;

  // Portal을 사용하여 body에 직접 렌더링
  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Header>
          <Title>단어 수정하기</Title>
          <Description>{vocabularyRange} 활용단어를 수정합니다.</Description>
        </Header>
        <Content>
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
                disabled={!hanja.trim() || !kor.trim() || isSubmitting}
              >
                {isSubmitting ? "수정 중..." : "수정하기"}
              </Button>
            </ButtonGroup>
          </form>
        </Content>
      </Modal>
    </Overlay>,
    document.body
  );
};
