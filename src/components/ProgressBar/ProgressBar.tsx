import React from "react";
import { Container, ProgressFill } from "./ProgressBar.styles";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = React.memo(
  ({ progress }) => {
    return (
      <Container>
        <ProgressFill
          $progress={progress}
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        />
      </Container>
    );
  }
);

ProgressBar.displayName = "ProgressBar";
