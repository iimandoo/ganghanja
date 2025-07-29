import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  width: 480px;
  height: 8px;
  background: ${theme.colors.gray.border};
  border-radius: ${theme.borderRadius.sm};
  overflow: hidden;
  margin: 0px auto 20px auto;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 360px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 280px;
  }
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: linear-gradient(
    135deg,
    ${theme.colors.secondary.main} 0%,
    ${theme.colors.secondary.dark} 100%
  );
  border-radius: ${theme.borderRadius.sm};
  transition: width 0.3s ease;
  width: ${(props) => Math.max(0, Math.min(100, props.$progress))}%;
  box-shadow: 0 2px 4px rgba(45, 74, 34, 0.3);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    border-radius: ${theme.borderRadius.sm} ${theme.borderRadius.sm} 0 0;
  }
`;
