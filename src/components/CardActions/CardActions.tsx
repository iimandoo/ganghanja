"use client";

import React from "react";
import { IoShuffle } from "react-icons/io5";
import { MESSAGES } from "@/constants";
import { SettingContainer, ShuffleButton } from "./CardActions.styles";

interface CardActionsProps {
  onShuffle: () => void;
  onUnhideAll?: () => void;
  hiddenCardsCount?: number;
  disabled?: boolean;
  className?: string;
}

export const CardActions: React.FC<CardActionsProps> = ({
  onShuffle,
  onUnhideAll,
  hiddenCardsCount = 0,
  disabled = false,
  className,
}) => {
  return (
    <SettingContainer className={className}>
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
  );
};
