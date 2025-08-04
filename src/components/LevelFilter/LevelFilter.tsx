import React from "react";
import { IoShuffle } from "react-icons/io5";
import { MESSAGES, LEVELS } from "@/constants";
import type { Level } from "@/constants";
import {
  Container,
  LevelButton,
  ShuffleButton,
  LevelContainer,
  SettingContainer,
} from "./LevelFilter.styles";

interface LevelFilterProps {
  selectedLevels: Level[];
  availableLevels: Level[];
  onLevelFilter: (level: Level) => void;
  onShuffle: () => void;
  onUnhideAll?: () => void;
  hiddenCardsCount?: number;
  disabled?: boolean;
}

export const LevelFilter: React.FC<LevelFilterProps> = ({
  selectedLevels,
  availableLevels,
  onLevelFilter,
  onShuffle,
  onUnhideAll,
  hiddenCardsCount = 0,
  disabled = false,
}) => {
  // availableLevels를 LEVELS 순서에 맞게 정렬
  const sortedLevels = availableLevels.sort(
    (a, b) => LEVELS.indexOf(a) - LEVELS.indexOf(b)
  );

  return (
    <Container>
      <LevelContainer>
        급수
        {sortedLevels.map((level) => (
          <LevelButton
            key={level}
            $active={selectedLevels.includes(level)}
            onClick={() => onLevelFilter(level)}
          >
            {level}
          </LevelButton>
        ))}
      </LevelContainer>
      <SettingContainer>
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
        {hiddenCardsCount > 0 && onUnhideAll && (
          <ShuffleButton
            onClick={onUnhideAll}
            $variant="primary"
            aria-label="숨긴 카드 모두 보이기"
            title={`숨긴 카드 ${hiddenCardsCount}개 모두 보이기`}
            disabled={disabled}
          >
            <span>숨김 취소하기 ({hiddenCardsCount})</span>
          </ShuffleButton>
        )}
      </SettingContainer>
    </Container>
  );
};
