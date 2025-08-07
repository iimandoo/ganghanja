import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  width: 400px;
  height: 8px;
  background: ${theme.colors.gray.border};
  border-radius: ${theme.borderRadius.sm};
  overflow: visible;
  margin: 20px auto 10px auto;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 768px) {
    width: 360px;
  }

  @media (max-width: 480px) {
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

export const TooltipContainer = styled.div<{ $progress: number }>`
  position: absolute;
  top: -45px;
  left: ${(props) => {
    // 양끝에서 잘리지 않도록 보정
    if (props.$progress < 15) return "15%";
    if (props.$progress > 85) return "85%";
    return `${props.$progress}%`;
  }};
  transform: translateX(-50%);
  z-index: 1000;
`;

export const Tooltip = styled.div`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: "Noto Sans KR", sans-serif;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  animation: fadeInUp 0.3s ease-out;
  
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: rgba(0, 0, 0, 0.8);
  }
  
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px 10px;
  }
`;
