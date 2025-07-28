import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 12px;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.colors.secondary.main};
  white-space: nowrap;
`;

export const Select = styled.select`
  padding: 8px 12px;
  font-size: 14px;
  border: 2px solid ${theme.colors.gray.border};
  border-radius: 8px;
  background: ${theme.colors.white};
  color: ${theme.colors.secondary.main};
  cursor: pointer;
  transition: border-color 0.2s ease;
  min-width: 160px;

  &:hover {
    border-color: ${theme.colors.primary.main};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary.main};
    box-shadow: 0 0 0 3px ${theme.colors.blue.light};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 13px;
    padding: 6px 10px;
    min-width: 140px;
  }
`;
