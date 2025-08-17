"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { theme } from "@/styles/theme";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
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
  color: #1f2937;
  margin: 0 0 8px 0;
  font-family: "Noto Sans KR", sans-serif;
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

const Message = styled.div`
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  color: #374151;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const Button = styled.button<{ $variant?: "danger" | "secondary" }>`
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
    props.$variant === "danger"
      ? `
    background: #1f2937;
    color: white;
    border: none;
    box-shadow: 0 4px 12px rgba(31, 41, 55, 0.3);

    &:hover:not(:disabled) {
      background: #111827;
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(31, 41, 55, 0.4);
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

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "삭제하기",
  cancelText = "취소",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // dim 클릭 시 모달이 닫히지 않도록 처리
  const handleOverlayClick = (e: React.MouseEvent) => {
    // dim 클릭 시에도 모달을 닫지 않음
    e.stopPropagation();
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (!isOpen || !mounted) return null;

  // Portal을 사용하여 body에 직접 렌더링
  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Header>
          <Title>{title}</Title>
        </Header>
        <Content>
          <Message>{message}</Message>
          <ButtonGroup>
            <Button type="button" $variant="secondary" onClick={onClose}>
              {cancelText}
            </Button>
            <Button type="button" $variant="danger" onClick={handleConfirm}>
              {confirmText}
            </Button>
          </ButtonGroup>
        </Content>
      </Modal>
    </Overlay>,
    document.body
  );
};
