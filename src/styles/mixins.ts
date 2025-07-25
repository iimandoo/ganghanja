import { css } from 'styled-components';
import { theme } from './theme';

export const buttonBase = css`
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-family: "Noto Sans KR", sans-serif;
  font-weight: ${theme.fontWeight.medium};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const primaryButton = css`
  ${buttonBase}
  background: ${theme.colors.secondary.gradient};
  color: ${theme.colors.white};
  padding: 12px 24px;
  font-size: ${theme.fontSize.base};
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, ${theme.colors.secondary.light} 0%, ${theme.colors.secondary.main} 100%);
  }
  
  &:active:not(:disabled) {
    background: linear-gradient(135deg, ${theme.colors.secondary.dark} 0%, #171923 100%);
  }
`;

export const secondaryButton = css`
  ${buttonBase}
  background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
  color: ${theme.colors.white};
  padding: 12px 24px;
  font-size: ${theme.fontSize.base};
  
  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
  }
  
  &:active:not(:disabled) {
    background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
  }
`;

export const mobileStyles = css`
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 16px;
  }
`;

export const tabletStyles = css`
  @media (max-width: ${theme.breakpoints.tablet}) {
    /* tablet styles */
  }
`;

export const inputBase = css`
  border: 2px solid ${theme.colors.gray.border};
  border-radius: ${theme.borderRadius.md};
  padding: 10px 12px;
  font-size: ${theme.fontSize.base};
  font-family: "Noto Sans KR", sans-serif;
  outline: none;
  transition: ${theme.transitions.fast};
  
  &:focus {
    border-color: ${theme.colors.blue.main};
    box-shadow: 0 0 0 3px ${theme.colors.blue.light};
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`;

export const modalBase = css`
  background: ${theme.colors.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.xl};
  position: relative;
`;

export const overlayBase = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const gradientText = css`
  background: ${theme.colors.blue.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;