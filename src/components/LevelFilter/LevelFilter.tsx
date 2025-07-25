import React from 'react';
import { IoShuffle } from 'react-icons/io5';
import { LEVELS, MESSAGES, Level } from '@/constants';
import { Container, LevelButton, ShuffleButton } from './LevelFilter.styles';

interface LevelFilterProps {
  selectedLevels: Level[];
  onLevelFilter: (level: Level) => void;
  onShuffle: () => void;
}

export const LevelFilter: React.FC<LevelFilterProps> = ({
  selectedLevels,
  onLevelFilter,
  onShuffle,
}) => {
  return (
    <Container>
      {LEVELS.map((level) => (
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
      >
        <IoShuffle size={18} aria-hidden="true" />
        <span>랜덤 섞기</span>
      </ShuffleButton>
    </Container>
  );
};