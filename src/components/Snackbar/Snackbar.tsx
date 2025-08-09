import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

interface SnackbarProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  isVisible,
  onClose,
  duration = 3000,
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      // 애니메이션이 끝난 후 렌더링 제거
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 330);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!shouldRender) return null;

  return (
    <SnackbarContainer $isVisible={isVisible}>
      <SnackbarContent>
        <Message>{message}</Message>
        <CloseButton onClick={onClose}>✕</CloseButton>
      </SnackbarContent>
    </SnackbarContainer>
  );
};

const SnackbarContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  transition: all 0.33s ease;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: translateX(-50%)
    translateY(${(props) => (props.$isVisible ? "0" : "20px")});

  @media (max-width: ${theme.breakpoints.tablet}) {
    bottom: 20px;
    left: 20px;
    right: 20px;
    transform: translateY(${(props) => (props.$isVisible ? "0" : "20px")});
  }
`;

const SnackbarContent = styled.div`
  background: ${theme.colors.secondary.main};
  color: ${theme.colors.white};
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 280px;
  max-width: 400px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    min-width: auto;
    width: 100%;
    padding: 14px 16px;
  }
`;

const Message = styled.span`
  font-family: "Noto Sans KR", sans-serif;
  font-size: calc(${theme.fontSize.lg});
  font-weight: ${theme.fontWeight.medium};
  flex: 1;
  line-height: 1.4;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: calc(${theme.fontSize.md});
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.white};
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  flex-shrink: 0;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
  }
`;
