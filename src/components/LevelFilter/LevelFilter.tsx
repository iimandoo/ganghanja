import React from "react";
import { LEVELS } from "@/constants";
import type { Level } from "@/constants";
import {
  LevelCheckboxContainer,
  LevelCheckbox,
  LevelLabel,
  LevelContainer,
} from "./LevelFilter.styles";

interface LevelFilterProps {
  selectedLevels: Level[];
  availableLevels: Level[];
  onLevelFilter: (level: Level) => void;
  isLoading?: boolean;
}

export const LevelFilter: React.FC<LevelFilterProps> = ({
  selectedLevels,
  availableLevels,
  onLevelFilter,
  isLoading = false,
}) => {
  // availableLevels를 LEVELS 순서에 맞게 정렬
  const sortedLevels = availableLevels.sort(
    (a, b) => LEVELS.indexOf(a) - LEVELS.indexOf(b)
  );

  return (
    <LevelContainer>
      급수
      {sortedLevels.map((level) => {
        const isSelected = selectedLevels.includes(level);
        return (
          <LevelCheckboxContainer key={level} $active={isSelected}>
            <LevelCheckbox
              type="checkbox"
              $active={isSelected}
              checked={isSelected}
              onChange={() => onLevelFilter(level)}
              id={`level-${level}`}
              disabled={isLoading}
            />
            <LevelLabel $active={isSelected}>{level}</LevelLabel>
          </LevelCheckboxContainer>
        );
      })}
    </LevelContainer>
  );
};
