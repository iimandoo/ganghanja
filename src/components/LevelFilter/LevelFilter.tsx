import React from "react";
import { IoShuffle } from "react-icons/io5";
import { MESSAGES } from "@/constants";
import type { Level } from "@/constants";
import { Container, LevelButton, ShuffleButton } from "./LevelFilter.styles";

interface LevelFilterProps {
  selectedLevels: Level[];
  availableLevels: Level[];
  onLevelFilter: (level: Level) => void;
  onShuffle: () => void;
  disabled?: boolean;
}

export const LevelFilter: React.FC<LevelFilterProps> = ({
  selectedLevels,
  availableLevels,
  onLevelFilter,
  onShuffle,
  disabled = false,
}) => {
  return (
    <Container>
      {availableLevels.map((level) => (
        <LevelButton
          key={level}
          $active={selectedLevels.includes(level)}
          onClick={() => onLevelFilter(level)}
        >
          {level}
        </LevelButton>
      ))}
      <ShuffleButton
        onClick={onShuffle}
        $variant="secondary"
        aria-label={MESSAGES.BUTTONS.SHUFFLE}
        title={MESSAGES.BUTTONS.SHUFFLE}
        disabled={disabled}
      >
        <IoShuffle size={18} aria-hidden="true" />
        <span>랜덤 섞기</span>
      </ShuffleButton>
    </Container>
  );
};
