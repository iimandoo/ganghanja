import React, { useState, useRef, useCallback } from "react";
import { VOCABULARY_RANGES } from "@/constants";
import type { VocabularyRange } from "@/constants";
import {
  VocabularyContainer,
  VocabularySliderContainer,
  VocabularySliderTrack,
  VocabularySliderThumb,
  VocabularyMarks,
  VocabularyMark,
  VocabularyMarkLabel,
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // 현재 선택된 range의 인덱스
  const currentIndex = VOCABULARY_RANGES.indexOf(selectedRange);

  // 마우스 위치를 슬라이더 값으로 변환
  const getValueFromPosition = (clientX: number): number => {
    if (!sliderRef.current) return 0;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width)
    );
    return Math.round(percentage * (VOCABULARY_RANGES.length - 1));
  };

  // 마우스 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    // 즉시 위치 업데이트
    const newIndex = getValueFromPosition(e.clientX);
    const newRange = VOCABULARY_RANGES[newIndex];
    if (newRange && newRange !== selectedRange) {
      onRangeChange(newRange);
    }
  };

  // 슬라이더 트랙 클릭 핸들러
  const handleTrackClick = (e: React.MouseEvent) => {
    if (isDragging) return;

    const newIndex = getValueFromPosition(e.clientX);
    const newRange = VOCABULARY_RANGES[newIndex];
    if (newRange) {
      onRangeChange(newRange);
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newIndex = getValueFromPosition(e.clientX);
      const newRange = VOCABULARY_RANGES[newIndex];
      if (newRange && newRange !== selectedRange) {
        onRangeChange(newRange);
      }
    },
    [isDragging, selectedRange, onRangeChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // 이벤트 리스너 등록/제거
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <VocabularyContainer>
      <VocabularySliderContainer ref={sliderRef} onClick={handleTrackClick}>
        <VocabularySliderTrack />
        <VocabularySliderThumb
          $position={(currentIndex / (VOCABULARY_RANGES.length - 1)) * 100}
          onMouseDown={handleMouseDown}
          disabled={isLoading}
        />
        <VocabularyMarks>
          {VOCABULARY_RANGES.map((range, index) => {
            const isSelected = range === selectedRange;
            return (
              <VocabularyMark
                key={range}
                $position={(index / (VOCABULARY_RANGES.length - 1)) * 100}
                $isSelected={isSelected}
              >
                <VocabularyMarkLabel $isSelected={isSelected}>
                  {range}
                </VocabularyMarkLabel>
              </VocabularyMark>
            );
          })}
        </VocabularyMarks>
      </VocabularySliderContainer>
    </VocabularyContainer>
  );
};
