import styled from 'styled-components';
import { theme } from '@/styles/theme';

export const Container = styled.div`
  width: 480px;
  height: 6px;
  background: ${theme.colors.gray.border};
  border-radius: 3px;
  overflow: hidden;
  margin: 0px auto 20px auto;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 360px;
  }
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 280px;
  }
`;

export const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: ${theme.colors.primary.main};
  border-radius: 3px;
  transition: width ${theme.transitions.smooth};
  width: ${props => props.$progress}%;
`;