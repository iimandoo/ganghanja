import React from "react";
import { VOCABULARY_RANGES } from "@/constants";
import type { VocabularyRange } from "@/constants";
import { CheckIcon } from "@/components/Icons";
import {
  VocabularyContainer,
  VocabularyRadioGroup,
  VocabularyRadioButton,
  VocabularyRadioLabel,
  CheckboxIcon,
} from "./VocabularyRangeFilter.styles";

interface VocabularyRangeFilterProps {
  selectedRange: VocabularyRange;
  onRangeChange: (range: VocabularyRange) => void;
  isLoading?: boolean;
}

export const VocabularyRangeFilter: React.FC<VocabularyRangeFilterProps> = ({
  selectedRange,
  onRangeChange,
  isLoading = false,
}) => {
  return (
    <VocabularyContainer>
      <VocabularyRadioGroup>
        {VOCABULARY_RANGES.map((range) => {
          const isSelected = range === selectedRange;
          return (
            <VocabularyRadioButton
              key={range}
              $isSelected={isSelected}
              onClick={() => !isLoading && onRangeChange(range)}
              disabled={isLoading}
            >
              <CheckboxIcon $isSelected={isSelected}>
                <CheckIcon size={10} />
              </CheckboxIcon>
              <VocabularyRadioLabel $isSelected={isSelected}>
                {range}
              </VocabularyRadioLabel>
            </VocabularyRadioButton>
          );
        })}
      </VocabularyRadioGroup>
    </VocabularyContainer>
  );
};
