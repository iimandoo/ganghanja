import styled from "styled-components";
import { theme } from "@/styles/theme";
import { buttonBase } from "@/styles/mixins";

export const SettingContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  /* landscape 모드에서는 margin-top 제거 */
  @media (min-width: 481px) and (max-width: 1180px) and (orientation: landscape) {
    margin-top: 0;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-top: 16px;
    gap: 8px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: 12px;
    gap: 6px;
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
  }
`;
