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

export const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

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
    box-shadow: 0 2px 8px rgba(38, 166, 154, 0.12);
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 3px rgba(38, 166, 154, 0.1),
      0 2px 8px rgba(38, 166, 154, 0.15);
  }

  &:active {
    transform: translateY(0.5px);
  }

  option {
    padding: 12px 16px;
    font-weight: 500;
    color: #191f28;
    background: ${theme.colors.white};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 14px;
    padding: 12px 36px 12px 14px;
    min-width: 160px;
  }
`;

export const SelectIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #8b95a1;
  transition: all 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  ${Select}:focus + & {
    color: ${theme.colors.primary.main};
    transform: translateY(-50%) rotate(180deg);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    right: 10px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;
