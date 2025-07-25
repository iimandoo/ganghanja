import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { overlayBase, modalBase, inputBase, primaryButton, secondaryButton } from '@/styles/mixins';

export const ModalOverlay = styled.div`
  ${overlayBase}
  z-index: ${theme.zIndex.modal};
`;

export const Modal = styled.div`
  ${modalBase}
  padding: 40px;
  width: 90%;
  max-width: 500px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 32px;
    margin: 20px;
  }
`;

export const ModalTitle = styled.h2`
  font-size: ${theme.fontSize.xxl};
  color: ${theme.colors.gray.dark};
  margin-bottom: 24px;
  text-align: center;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: ${theme.fontWeight.bold};
`;

export const TextArea = styled.textarea`
  ${inputBase}
  width: 100%;
  height: 120px;
  resize: vertical;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

export const ContactSection = styled.div`
  margin-bottom: 20px;
`;

export const ContactLabel = styled.label`
  display: block;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  color: #374151;
  margin-bottom: 8px;
  font-family: "Noto Sans KR", sans-serif;
`;

export const ContactInput = styled.input`
  ${inputBase}
  width: 100%;
  margin-bottom: 12px;
  box-sizing: border-box;
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.md};

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

export const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  ${props => props.$variant === "secondary" ? secondaryButton : primaryButton}
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 10px 20px;
    font-size: ${theme.fontSize.sm};
    border-radius: 6px;
  }
`;