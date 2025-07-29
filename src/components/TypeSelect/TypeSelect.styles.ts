import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.secondary.main};
  white-space: nowrap;
`;

export const SelectWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const SelectButton = styled.button<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 10px 12px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.4;

  border: 1.5px solid #e5e8eb;
  border-radius: 12px;
  background: ${theme.colors.white};
  color: #191f28;

  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  min-width: 150px;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  &:hover {
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 2px 8px rgba(193, 255, 114, 0.12);
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(193, 255, 114, 0.1),
      0 2px 8px rgba(193, 255, 114, 0.15);
  }

  &:active {
    transform: translateY(0.5px);
  }

  ${({ $isOpen }) =>
    $isOpen &&
    `
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(193, 255, 114, 0.1), 0 2px 8px rgba(193, 255, 114, 0.15);
  `}

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 14px;
    min-width: 140px;
  }
`;

export const SelectIcon = styled.div<{ $isOpen: boolean }>`
  color: #8b95a1;
  transition: all 0.2s ease;
  margin-left: 8px;

  svg {
    width: 20px;
    height: 20px;
  }

  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};

  ${SelectButton}:hover & {
    color: ${theme.colors.primary.main};
  }

  ${SelectButton}:focus & {
    color: ${theme.colors.primary.main};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const DropdownList = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 1000;

  background: ${theme.colors.white};
  border: 1.5px solid #e5e8eb;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);

  max-height: 240px;
  overflow-y: auto;

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transform: ${({ $isOpen }) =>
    $isOpen ? "translateY(0) scale(1)" : "translateY(-8px) scale(0.95)"};

  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  margin: 0;
  padding: 8px 0;
  list-style: none;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #e5e8eb;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #d1d5db;
  }
`;

export const DropdownItem = styled.li<{ $isSelected: boolean }>`
  padding: 10px 12px;
  font-size: 18px;
  font-weight: 500;
  color: #191f28;
  cursor: pointer;
  text-align: left;

  transition: all 0.15s ease;

  background: ${({ $isSelected }) =>
    $isSelected ? "rgba(38, 166, 154, 0.08)" : "transparent"};

  &:hover {
    background: rgba(38, 166, 154, 0.06);
  }

  &:active {
    background: rgba(38, 166, 154, 0.12);
  }

  ${({ $isSelected }) =>
    $isSelected &&
    `
    color: ${theme.colors.primary.main};
    font-weight: 600;
    
    &::after {
      content: "✓";
      float: right;
      color: ${theme.colors.primary.main};
      font-weight: 600;
    }
  `}

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 10px 14px;
    font-size: 14px;
  }
`;

export const HiddenSelect = styled.select`
  position: absolute;
  opacity: 0;
  pointer-events: none;
  z-index: -1;
`;
