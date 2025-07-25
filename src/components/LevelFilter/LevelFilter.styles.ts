import styled from "styled-components";
import { theme } from "@/styles/theme";
import { secondaryButton } from "@/styles/mixins";

export const Container = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: 8px;
    margin-bottom: 16px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 6px;
    padding: 0 10px;
  }
`;

export const LevelButton = styled.button<{ $active: boolean }>`
  background: ${(props) =>
    props.$active ? theme.colors.primary.main : theme.colors.white};
  color: ${(props) =>
    props.$active ? theme.colors.white : theme.colors.gray.medium};
  border: 2px solid
    ${(props) =>
      props.$active ? theme.colors.primary.main : theme.colors.gray.border};
  padding: 5px 10px;
  border-radius: ${theme.borderRadius.pill};
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  font-family: "Noto Sans KR", sans-serif;
  box-shadow: ${theme.shadows.sm};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
    background: ${(props) =>
      props.$active ? theme.colors.primary.dark : theme.colors.gray.light};
    border-color: ${(props) =>
      props.$active ? theme.colors.primary.dark : "#cbd5e1"};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 5px 10px;
    font-size: ${theme.fontSize.base};
    border-radius: 20px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 5px 10px;
    font-size: ${theme.fontSize.xs};
    border-radius: 16px;
  }
`;

export const ShuffleButton = styled.button<{
  $variant?: "primary" | "secondary";
}>`
  ${secondaryButton}
  padding: 4px 8px;
  font-size: ${theme.fontSize.md};
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 8px;
    font-size: ${theme.fontSize.sm};
    border-radius: 6px;
    gap: 0;
    min-width: 40px;

    span {
      display: none;
      width: 0;
    }
  }
`;
