import React from "react";
import { LEVELS } from "@/constants";
import type { Level } from "@/constants";
import { CheckIcon } from "@/components/Icons";
import {
  LevelContainer,
  LevelCheckboxGroup,
  LevelCheckbox,
  LevelCheckboxLabel,
  CheckboxIcon,
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
  const handleLevelClick = (level: Level) => {
    if (isLoading) return;

    const isAvailable = availableLevels.includes(level);
    if (!isAvailable) return;

    // 다중선택 토글
    onLevelFilter(level);
  };

  return (
    <LevelContainer>
      <LevelCheckboxGroup>
        {LEVELS.map((level) => {
          const isAvailable = availableLevels.includes(level);
          const isSelected = selectedLevels.includes(level);

          return (
            <LevelCheckbox
              key={level}
              $isSelected={isSelected}
              $isAvailable={isAvailable}
              onClick={() => handleLevelClick(level)}
              disabled={isLoading || !isAvailable}
              title={
                isAvailable
                  ? `${level} ${isSelected ? "해제" : "선택"}`
                  : "사용 불가능한 급수"
              }
            >
              <CheckboxIcon $isSelected={isSelected} $isAvailable={isAvailable}>
                <CheckIcon size={12} />
              </CheckboxIcon>
              <LevelCheckboxLabel
                $isSelected={isSelected}
                $isAvailable={isAvailable}
              >
                {level}
              </LevelCheckboxLabel>
            </LevelCheckbox>
          );
        })}
      </LevelCheckboxGroup>
    </LevelContainer>
  );
};
