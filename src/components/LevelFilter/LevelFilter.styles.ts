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

  @media (min-width: 481px) and (max-width: 1180px) and (orientation: landscape) {
    && {
      justify-content: center;
    }
  }
`;

export const LevelCheckboxGroup = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 230px;
`;

export const LevelCheckbox = styled.button<{
  $isSelected: boolean;
  $isAvailable: boolean;
  disabled?: boolean;
}>`
  padding: 3px 8px;
  border: 1px solid
    ${(props) => {
      if (!props.$isAvailable) return theme.colors.gray.light;
      return props.$isSelected
        ? theme.colors.secondary.dark
        : theme.colors.gray.border;
    }};
  border-radius: 12px;
  background: ${(props) => {
    if (!props.$isAvailable) return theme.colors.gray.light;
    return props.$isSelected
      ? `linear-gradient(135deg, ${theme.colors.secondary.main} 0%, ${theme.colors.secondary.dark} 100%)`
      : theme.colors.white;
  }};
  cursor: ${(props) =>
    props.disabled || !props.$isAvailable ? "not-allowed" : "pointer"};
  transition: all ${theme.transitions.smooth};
  opacity: ${(props) => {
    if (props.disabled) return 0.5;
    if (!props.$isAvailable) return 0.6;
    return 1;
  }};
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
      if (props.disabled || !props.$isAvailable) return theme.colors.gray.light;
      return props.$isSelected
        ? theme.colors.secondary.dark
        : theme.colors.secondary.main;
    }};
    background: ${(props) => {
      if (props.disabled || !props.$isAvailable) {
        return theme.colors.gray.light;
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

  @media (max-width: ${theme.breakpoints.mobile}) {
  }
`;

export const CheckboxIcon = styled.div<{
  $isSelected: boolean;
  $isAvailable: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border: 1px solid
    ${(props) => {
      if (!props.$isAvailable) return theme.colors.gray.light;
      return props.$isSelected ? theme.colors.white : theme.colors.gray.border;
    }};
  border-radius: 4px;
  background: ${(props) => {
    if (!props.$isAvailable) return theme.colors.gray.light;
    return props.$isSelected ? theme.colors.white : theme.colors.white;
  }};
  transition: all ${theme.transitions.fast};
  flex-shrink: 0;
  box-shadow: ${(props) =>
    props.$isSelected ? `0 2px 4px ${theme.colors.secondary.dark}40` : "none"};

  svg {
    color: ${(props) => {
      if (!props.$isAvailable) return theme.colors.gray.light;
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

export const LevelCheckboxLabel = styled.span<{
  $isSelected: boolean;
  $isAvailable: boolean;
}>`
  font-size: 0.8rem;
  color: ${(props) => {
    if (!props.$isAvailable) return theme.colors.gray.medium;
    return props.$isSelected ? theme.colors.white : theme.colors.gray.medium;
  }};
  transition: color ${theme.transitions.fast};

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.75rem;
  }
`;

export const SettingContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding-left: 40px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding-left: 20px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-left: 10px;
  }
`;

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 80%;
  padding: 3px 0px;
  margin: 0 10px;
  user-select: none;
`;

export const SliderTrack = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 2px;
  background: #000000;
  border-radius: 1px;
  z-index: 1;
`;

export const RangeTrack = styled.div<{ $start: number; $end: number }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${(props) => (props.$start / 5) * 100}%;
  width: ${(props) => ((props.$end - props.$start) / 5) * 100}%;
  height: 2px;
  background: ${theme.colors.gray.medium};
  border-radius: 1px;
  pointer-events: none;
  z-index: 2;
`;

export const SliderThumb = styled.div<{
  $position: number;
  $isMin: boolean;
  disabled?: boolean;
}>`
  position: absolute;
  top: 50%;
  left: ${(props) => props.$position}%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: ${theme.colors.primary.dark};
  border: 3px solid ${theme.colors.white};
  border-radius: 50%;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  box-shadow: ${theme.shadows.md};
  transition: all ${theme.transitions.smooth};
  z-index: 3;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: auto;

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow: ${theme.shadows.lg};
  }

  &:active {
    transform: translate(-50%, -50%) scale(1.2);
    box-shadow: ${theme.shadows.xl};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 22px;
    height: 22px;
  }
`;

export const LevelMarks = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  pointer-events: none;
`;

export const LevelMark = styled.div<{
  $position: number;
  $isAvailable: boolean;
  $isSelected: boolean;
  $isInRange: boolean;
}>`
  position: absolute;
  left: ${(props) => props.$position}%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  width: 40px;
  &::before {
    content: "";
    position: absolute;
    top: -10px;
    width: 2px;
    height: 8px;
    background: ${theme.colors.primary.dark};
    border-radius: 1px;
  }
`;

export const LevelMarkLabel = styled.span<{
  $isAvailable: boolean;
  $isSelected: boolean;
  $isInRange: boolean;
}>`
  font-size: 0.9rem;
  font-weight: ${(props) =>
    props.$isInRange && props.$isAvailable
      ? theme.fontWeight.bold
      : theme.fontWeight.semibold};
  color: ${theme.colors.gray.medium};
  font-family: "Noto Sans KR", sans-serif;
  transition: all ${theme.transitions.fast};
  user-select: none;
  text-align: center;
  margin-top: 7px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 0.9rem;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 0.9rem;
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

// 이전 checkbox 컴포넌트들을 제거하고 필요시 다른 파일에서 사용할 수 있도록 유지
export const LegacyLevelCheckboxContainer = styled.label<{ $active: boolean }>`
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
