import React, { useState, useEffect } from "react";
import {
  Container,
  ProgressFill,
  TooltipContainer,
  Tooltip,
} from "./ProgressBar.styles";

interface ProgressBarProps {
  progress: number;
  currentIndex?: number;
  totalCount?: number;
  showTooltip?: boolean;
  onTooltipHide?: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = React.memo(
  ({
    progress,
    currentIndex,
    totalCount,
    showTooltip = false,
    onTooltipHide,
  }) => {
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    useEffect(() => {
      if (showTooltip) {
        setIsTooltipVisible(true);

        // 2초 후에 툴팁 숨김
        const timer = setTimeout(() => {
          setIsTooltipVisible(false);
          onTooltipHide?.();
        }, 2000);

        return () => clearTimeout(timer);
      } else {
        setIsTooltipVisible(false);
      }
    }, [showTooltip, onTooltipHide]);

    return (
      <Container>
        <ProgressFill
          $progress={progress}
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        />
        {isTooltipVisible &&
          currentIndex !== undefined &&
          totalCount !== undefined &&
          totalCount > 0 && (
            <TooltipContainer $progress={Math.max(0, Math.min(100, progress))}>
              <Tooltip>
                {currentIndex + 1} / {totalCount}
              </Tooltip>
            </TooltipContainer>
          )}
      </Container>
    );
  }
);

ProgressBar.displayName = "ProgressBar";
