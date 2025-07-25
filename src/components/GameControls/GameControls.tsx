import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { MESSAGES } from "@/constants";
import { Container, SideButton } from "./GameControls.styles";

interface GameControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}) => {
  1;
  return (
    <>
      <SideButton
        className="previous"
        $variant="secondary"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        aria-label={MESSAGES.BUTTONS.PREVIOUS}
        title={MESSAGES.BUTTONS.PREVIOUS}
      >
        <IoChevronBack />
      </SideButton>

      <SideButton
        className="next"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label={MESSAGES.BUTTONS.NEXT}
        title={MESSAGES.BUTTONS.NEXT}
      >
        <IoChevronForward />
      </SideButton>
    </>
  );
};
