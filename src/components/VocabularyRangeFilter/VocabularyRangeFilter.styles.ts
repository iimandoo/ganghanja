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

export const VocabularySliderContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 80%;
  padding: 3px 0px;
  margin: 0 10px;
  user-select: none;
`;

export const VocabularySliderTrack = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 2px;
  background: #000000;
  border-radius: 1px;
  z-index: 1;
`;

export const VocabularySliderThumb = styled.div<{
  $position: number;
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

export const VocabularyMarks = styled.div`
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

export const VocabularyMark = styled.div<{
  $position: number;
  $isSelected: boolean;
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

export const VocabularyMarkLabel = styled.span<{
  $isSelected: boolean;
}>`
  font-size: 0.9rem;
  font-weight: ${(props) =>
    props.$isSelected ? theme.fontWeight.bold : theme.fontWeight.semibold};
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
