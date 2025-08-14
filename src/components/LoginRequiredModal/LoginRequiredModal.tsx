import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { MdLock, MdClose } from "react-icons/md";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const ModalOverlay = styled.div`
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
  backdrop-filter: blur(4px);
  width: 100vw;
  height: 100vh;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;
  border: 1px solid ${theme.colors.gray.border};

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 24px;
    border-radius: 16px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.gray.medium};
  transition: all 0.2s ease;

  &:hover {
    background: ${theme.colors.gray.light};
    color: ${theme.colors.gray.dark};
  }
`;

const IconContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    ${theme.colors.secondary.main} 0%,
    ${theme.colors.secondary.dark} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  box-shadow: 0 8px 20px ${theme.colors.secondary.dark}30;

  svg {
    color: white;
    font-size: 36px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 60px;
    height: 60px;
    margin-bottom: 20px;

    svg {
      font-size: 28px;
    }
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.gray.dark};
  margin-bottom: 16px;
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 1.3rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: ${theme.colors.gray.medium};
  line-height: 1.6;
  margin-bottom: 32px;
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
    margin-bottom: 24px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 8px;
  }
`;

const Button = styled.button<{ $variant: "primary" | "secondary" }>`
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  font-size: 1rem;
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Noto Sans KR", sans-serif;
  min-width: 120px;

  ${(props) =>
    props.$variant === "primary"
      ? `
    background: linear-gradient(135deg, ${theme.colors.secondary.main} 0%, ${theme.colors.secondary.dark} 100%);
    color: white;
    box-shadow: 0 4px 12px ${theme.colors.secondary.dark}30;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 16px ${theme.colors.secondary.dark}40;
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

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

export const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleLoginClick = () => {
    onLogin();
    onClose();
  };

  if (!isOpen || !mounted) return null;

  // Portal을 사용하여 body에 직접 렌더링
  return createPortal(
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <MdClose size={20} />
        </CloseButton>

        <IconContainer>
          <MdLock />
        </IconContainer>

        <Title>로그인이 필요해요</Title>

        <Description>
          카드 숨기기 기능을 사용하려면 로그인이 필요합니다.
          <br />
          로그인 후 더 많은 기능을 이용해보세요!
        </Description>

        <ButtonGroup>
          <Button $variant="secondary" onClick={onClose}>
            나중에
          </Button>
          <Button $variant="primary" onClick={handleLoginClick}>
            로그인하기
          </Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};
