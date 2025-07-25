import React from 'react';
import { Container, ProgressFill } from './ProgressBar.styles';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <Container>
      <ProgressFill $progress={progress} />
    </Container>
  );
};