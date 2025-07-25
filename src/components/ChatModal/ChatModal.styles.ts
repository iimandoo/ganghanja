import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { overlayBase, modalBase, inputBase } from '@/styles/mixins';

export const FloatingChatButton = styled.button`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  background: ${theme.colors.black};
  border: none;
  border-radius: ${theme.borderRadius.round};
  color: ${theme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(244, 162, 97, 0.4);
  transition: ${theme.transitions.smooth};
  z-index: ${theme.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(244, 162, 97, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 40px;
    height: 40px;
    bottom: 15px;
    right: 15px;
    font-size: 1.4rem;
  }
`;

export const ChatOverlay = styled.div`
  ${overlayBase}
  z-index: ${theme.zIndex.chat};
  padding: 20px;
`;

export const ChatContainer = styled.div`
  ${modalBase}
  width: 100%;
  max-width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 350px;
    height: 450px;
  }
`;

export const ChatHeader = styled.div`
  background: ${theme.colors.blue.gradient};
  color: ${theme.colors.white};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 16px;
  }
`;

export const ChatTitle = styled.h3`
  margin: 0;
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSize.md};
  }
`;

export const ChatCloseButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.md};
  transition: ${theme.transitions.fast};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.3rem;
    width: 28px;
    height: 28px;
  }
`;

export const ChatBody = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 16px;
    gap: 12px;
  }
`;

export const ChatMessage = styled.div`
  background: ${theme.colors.gray.bg};
  padding: 12px 16px;
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSize.base};
  line-height: 1.5;
  color: #475569;
  font-family: "Noto Sans KR", sans-serif;
`;

export const SuccessMessage = styled.div`
  background: ${theme.colors.success.gradient};
  color: ${theme.colors.white};
  padding: 12px 16px;
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSize.base};
  text-align: center;
  font-weight: ${theme.fontWeight.medium};
  font-family: "Noto Sans KR", sans-serif;
`;

export const ChatInputArea = styled.div`
  padding: 20px;
  border-top: 1px solid ${theme.colors.gray.border};
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 16px;
  }
`;

export const ChatTextArea = styled.textarea`
  ${inputBase}
  resize: none;
  height: 80px;
  
  &:focus {
    border-color: #b7e1ea;
    box-shadow: 0 0 0 3px rgba(244, 162, 97, 0.1);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    height: 70px;
    padding: 10px;
    font-size: ${theme.fontSize.sm};
  }
`;

export const StarContainer = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
`;

export const StarButton = styled.button<{ $filled: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.$filled ? theme.colors.warning.main : '#d1d5db'};
  font-size: 1.5rem;
  transition: ${theme.transitions.fast};
  padding: 2px;
  border-radius: ${theme.borderRadius.md};

  &:hover {
    color: ${theme.colors.warning.main};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.3rem;
  }
`;

export const ChatSendButton = styled.button`
  width: 100%;
  background: ${theme.colors.blue.gradient};
  color: ${theme.colors.white};
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  align-self: flex-end;

  &:hover:not(:disabled) {
    background: ${theme.colors.blue.gradient};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 10px 18px;
    font-size: ${theme.fontSize.sm};
  }
`;