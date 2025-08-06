"use client";

import React from "react";
import { IoShuffle } from "react-icons/io5";
import { MESSAGES } from "@/constants";
import { SettingContainer, ShuffleButton } from "./CardActions.styles";
import { Popover } from "@/components/Popover";
import { SettingButton } from "@/components/SettingButton";
import { LevelIcon, VocabularyIcon } from "@/components/Icons";
import { LevelFilter } from "@/components/LevelFilter";
import { VocabularyRangeFilter } from "@/components/VocabularyRangeFilter";
import { Level, VocabularyRange } from "@/constants";

interface CardActionsProps {
  onShuffle: () => void;
  onUnhideAll?: () => void;
  hiddenCardsCount?: number;
  disabled?: boolean;
  className?: string;
  // SliderBox 관련 props 추가
  selectedLevels: Level[];
  availableLevels: Level[];
  selectedVocabularyRange: VocabularyRange;
  onLevelFilter: (level: Level) => void;
  onVocabularyRangeChange: (range: VocabularyRange) => void;
  isDataLoading?: boolean;
}

export const CardActions: React.FC<CardActionsProps> = ({
  onShuffle,
  onUnhideAll,
  hiddenCardsCount = 0,
  disabled = false,
  className,
  // SliderBox 관련 props
  selectedLevels,
  availableLevels,
  selectedVocabularyRange,
  onLevelFilter,
  onVocabularyRangeChange,
  isDataLoading = false,
}) => {
  return (
    <SettingContainer className={className}>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {/* SliderBox 내용을 여기로 이동 */}
        <Popover
          trigger={
            <SettingButton disabled={isDataLoading}>
              <LevelIcon />
              급수설정
            </SettingButton>
          }
          width="350px"
          height="120px"
          placement="top"
        >
          <div
            style={{
              marginBottom: "25px",
            }}
          >
            급수를 선택해 주세요.
          </div>
          <LevelFilter
            selectedLevels={selectedLevels}
            availableLevels={availableLevels}
            onLevelFilter={onLevelFilter}
            isLoading={isDataLoading}
          />
        </Popover>
        <Popover
          trigger={
            <SettingButton disabled={isDataLoading}>
              <VocabularyIcon />
              학년설정
            </SettingButton>
          }
          width="300px"
          height="120px"
          placement="top"
        >
          <div
            style={{
              marginBottom: "25px",
            }}
          >
            활용단어 학년을 선택하세요.
          </div>
          <VocabularyRangeFilter
            selectedRange={selectedVocabularyRange}
            onRangeChange={onVocabularyRangeChange}
            isLoading={isDataLoading}
          />
        </Popover>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <ShuffleButton
          onClick={onShuffle}
          $variant="secondary"
          aria-label={MESSAGES.BUTTONS.SHUFFLE}
          title={MESSAGES.BUTTONS.SHUFFLE}
          disabled={disabled}
        >
          <IoShuffle size={18} aria-hidden="true" />
          <span>섞기</span>
        </ShuffleButton>
        {hiddenCardsCount > 0 && onUnhideAll && (
          <ShuffleButton
            onClick={onUnhideAll}
            $variant="primary"
            aria-label="숨긴 카드 모두 보이기"
            title={`숨긴 카드 ${hiddenCardsCount}개 모두 보이기`}
            disabled={disabled}
          >
            <span>숨기기취소 ({hiddenCardsCount})</span>
          </ShuffleButton>
        )}
      </div>
    </SettingContainer>
  );
};
