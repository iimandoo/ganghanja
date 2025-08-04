import styled from "styled-components";
import { theme } from "@/styles/theme";
import { buttonBase } from "@/styles/mixins";

export const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-direction: column;
  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: 8px;
    margin-bottom: 16px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 6px;
    padding: 0 10px;
  }
`;

export const LevelContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

export const SettingContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding-left: 40px;
`;

export const LevelCheckboxContainer = styled.label<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 3px 6px;
  border-radius: ${theme.borderRadius.lg};
  transition: all ${theme.transitions.smooth};
  background: ${(props) =>
    props.$active
      ? `linear-gradient(135deg, ${theme.colors.secondary.dark} 0%, #2d5016 100%)`
      : theme.colors.white};
  border: 2px solid
    ${(props) =>
      props.$active ? theme.colors.secondary.dark : theme.colors.gray.border};
  box-shadow: ${(props) =>
    props.$active ? theme.shadows.md : theme.shadows.sm};
  transform: ${(props) => (props.$active ? "translateY(-1px)" : "none")};

  &:hover {
    background: ${(props) =>
      props.$active
        ? `linear-gradient(135deg, #2d5016 0%, ${theme.colors.secondary.dark} 100%)`
        : theme.colors.gray.light};
    border-color: ${theme.colors.secondary.dark};
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${theme.shadows.sm};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 8px 12px;
    gap: 8px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 6px 10px;
    gap: 6px;
  }
`;

export const LevelCheckbox = styled.input<{ $active: boolean }>`
  appearance: none;
  width: 15px;
  height: 15px;
  border: 2px solid transparent;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  transition: all ${theme.transitions.smooth};
  background: ${(props) =>
    props.$active ? theme.colors.white : theme.colors.gray.light};
  box-shadow: ${(props) =>
    props.$active
      ? "inset 0 2px 4px rgba(0,0,0,0.1)"
      : "0 2px 4px rgba(0,0,0,0.1)"};

  &:checked::after {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${theme.colors.secondary.dark};
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    animation: checkPulse 0.3s ease;
  }

  @keyframes checkPulse {
    0% {
      transform: translate(-50%, -50%) scale(0);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  &:hover {
    background: ${(props) =>
      props.$active ? theme.colors.white : theme.colors.gray.bg};
    transform: scale(1.1);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 18px;
    height: 18px;

    &:checked::after {
      font-size: 12px;
    }
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 16px;
    height: 16px;

    &:checked::after {
      font-size: 10px;
    }
  }
`;

export const LevelLabel = styled.span<{ $active: boolean }>`
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.semibold};
  color: ${(props) =>
    props.$active ? theme.colors.white : theme.colors.secondary.main};
  font-family: "Noto Sans KR", sans-serif;
  transition: all ${theme.transitions.fast};
  user-select: none;
  text-shadow: ${(props) =>
    props.$active ? "0 1px 2px rgba(0,0,0,0.1)" : "none"};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSize.sm};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSize.xs};
  }
`;

export const ShuffleButton = styled.button<{
  $variant?: "primary" | "secondary";
}>`
  ${buttonBase}
  background: ${theme.colors.white};
  color: ${theme.colors.gray.dark};
  border: 1px solid ${theme.colors.gray.border};
  padding: 6px 12px;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.normal};
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: ${theme.shadows.sm};

  &:hover:not(:disabled) {
    background: ${theme.colors.gray.light};
    border-color: ${theme.colors.gray.medium};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: ${theme.shadows.sm};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 6px 8px;
    font-size: ${theme.fontSize.xs};
    gap: 4px;
    min-width: 36px;

    span {
      display: none;
      width: 0;
    }
  }
`;
