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
    props.$active 
      ? `linear-gradient(135deg, ${theme.colors.secondary.main} 0%, ${theme.colors.secondary.dark} 100%)`
      : theme.colors.white};
  color: ${(props) =>
    props.$active ? theme.colors.white : theme.colors.secondary.main};
  border: 2px solid
    ${(props) =>
      props.$active ? theme.colors.secondary.main : theme.colors.gray.border};
  padding: 8px 16px;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.fontSize.base};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  transition: ${theme.transitions.fast};
  font-family: "Noto Sans KR", sans-serif;
  box-shadow: ${theme.shadows.sm};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
    background: ${(props) =>
      props.$active 
        ? `linear-gradient(135deg, ${theme.colors.secondary.light} 0%, ${theme.colors.secondary.main} 100%)`
        : theme.colors.gray.light};
    border-color: ${(props) =>
      props.$active ? theme.colors.secondary.light : theme.colors.secondary.main};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${theme.shadows.sm};
    background: ${(props) =>
      props.$active 
        ? `linear-gradient(135deg, ${theme.colors.secondary.dark} 0%, #171923 100%)`
        : theme.colors.gray.bg};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 6px 12px;
    font-size: ${theme.fontSize.sm};
    border-radius: ${theme.borderRadius.md};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 4px 8px;
    font-size: ${theme.fontSize.xs};
    border-radius: ${theme.borderRadius.sm};
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
