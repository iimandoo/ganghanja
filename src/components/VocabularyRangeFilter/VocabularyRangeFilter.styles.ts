import styled from "styled-components";
import { theme } from "@/styles/theme";

export const VocabularyContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;

  @media (min-width: 481px) and (max-width: 1180px) and (orientation: landscape) {
    && {
      justify-content: center;
    }
  }
`;

export const VocabularyRadioGroup = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 230px;
`;

export const VocabularyRadioButton = styled.button<{
  $isSelected: boolean;
  disabled?: boolean;
}>`
  padding: 3px 8px;
  border: 1px solid
    ${(props) => {
      return props.$isSelected
        ? theme.colors.secondary.dark
        : theme.colors.gray.border;
    }};
  border-radius: 12px;
  background: ${(props) => {
    return props.$isSelected
      ? `linear-gradient(135deg, ${theme.colors.secondary.main} 0%, ${theme.colors.secondary.dark} 100%)`
      : theme.colors.white;
  }};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all ${theme.transitions.smooth};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: fit-content;
  box-shadow: ${(props) =>
    props.$isSelected
      ? `0 4px 12px ${theme.colors.secondary.dark}40`
      : `0 2px 8px ${theme.colors.gray.border}20`};

  &:hover {
    border-color: ${(props) => {
      if (props.disabled) return theme.colors.gray.light;
      return props.$isSelected
        ? theme.colors.secondary.dark
        : theme.colors.secondary.main;
    }};
    background: ${(props) => {
      if (props.disabled) {
        return props.$isSelected
          ? `linear-gradient(135deg, ${theme.colors.secondary.main} 0%, ${theme.colors.secondary.dark} 100%)`
          : theme.colors.white;
      }
      return props.$isSelected
        ? `linear-gradient(135deg, ${theme.colors.secondary.dark} 0%, ${theme.colors.secondary.main} 100%)`
        : `linear-gradient(135deg, ${theme.colors.secondary.light}20 0%, ${theme.colors.secondary.main}10 100%)`;
    }};
    transform: ${(props) =>
      props.$isSelected ? "translateY(-1px)" : "translateY(-1px)"};
    box-shadow: ${(props) =>
      props.$isSelected
        ? `0 6px 16px ${theme.colors.secondary.dark}50`
        : `0 4px 12px ${theme.colors.secondary.main}30`};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${theme.colors.secondary.light}40;
  }
`;

export const CheckboxIcon = styled.div<{
  $isSelected: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border: 1px solid
    ${(props) => {
      return props.$isSelected ? theme.colors.white : theme.colors.gray.border;
    }};
  border-radius: 4px;
  background: ${(props) => {
    return props.$isSelected ? theme.colors.white : theme.colors.white;
  }};
  transition: all ${theme.transitions.fast};
  flex-shrink: 0;
  box-shadow: ${(props) =>
    props.$isSelected ? `0 2px 4px ${theme.colors.secondary.dark}40` : "none"};

  svg {
    color: ${(props) => {
      return props.$isSelected
        ? theme.colors.secondary.dark
        : theme.colors.gray.light;
    }};
    opacity: ${(props) => (props.$isSelected ? 1 : 0)};
    transition: all ${theme.transitions.fast};
    filter: ${(props) =>
      props.$isSelected ? "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" : "none"};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 12px;
    height: 12px;
  }
`;

export const VocabularyRadioLabel = styled.span<{ $isSelected: boolean }>`
  font-size: 0.8rem;
  color: ${(props) => {
    return props.$isSelected ? theme.colors.white : theme.colors.gray.medium;
  }};
  transition: color ${theme.transitions.fast};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.75rem;
  }
`;
