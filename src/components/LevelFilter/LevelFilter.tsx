import React, { useState, useRef, useCallback, useEffect } from "react";
import { LEVELS } from "@/constants";
import type { Level } from "@/constants";
import {
  LevelContainer,
  SliderContainer,
  RangeTrack,
  SliderTrack,
  SliderThumb,
  LevelMarks,
  LevelMark,
  LevelMarkLabel,
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<"min" | "max" | null>(null);

  // 현재 선택된 레벨들로부터 범위 계산
  const getSliderRange = (): [number, number] => {
    if (selectedLevels.length === 0) return [0, 5];

    const selectedIndices = selectedLevels
      .map((level) => LEVELS.indexOf(level))
      .filter((index) => index !== -1)
      .sort((a, b) => a - b);

    return [selectedIndices[0], selectedIndices[selectedIndices.length - 1]];
  };

  // State로 슬라이더 범위 관리
  const [sliderRange, setSliderRange] = useState<[number, number]>(() =>
    getSliderRange()
  );
  const [minValue, maxValue] = sliderRange;

  // selectedLevels가 변경될 때 슬라이더 범위 업데이트
  useEffect(() => {
    const newRange = getSliderRange();
    setSliderRange(newRange);
  }, [selectedLevels]);

  // 범위 슬라이더 값 변경 처리
  const handleRangeChange = useCallback(
    (newMin: number, newMax: number) => {
      // 슬라이더 상태 즉시 업데이트 (드래그 중 시각적 피드백)
      setSliderRange([newMin, newMax]);

      // 새로운 범위에 포함되는 available 레벨들
      const levelsInNewRange = LEVELS.slice(newMin, newMax + 1).filter(
        (level) => availableLevels.includes(level)
      );

      // 현재 선택된 레벨들 중 새 범위에 포함되지 않는 것들을 해제
      selectedLevels.forEach((level) => {
        if (!levelsInNewRange.includes(level)) {
          onLevelFilter(level);
        }
      });

      // 새 범위에 포함되지만 아직 선택되지 않은 레벨들을 선택
      levelsInNewRange.forEach((level) => {
        if (!selectedLevels.includes(level)) {
          onLevelFilter(level);
        }
      });
    },
    [selectedLevels, availableLevels, onLevelFilter]
  );

  // 마우스 위치를 슬라이더 값으로 변환
  const getValueFromPosition = (clientX: number): number => {
    if (!sliderRef.current) return 0;

    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(
      0,
      Math.min(1, (clientX - rect.left) / rect.width)
    );
    return Math.round(percentage * 5);
  };

  // 마우스 이벤트 핸들러
  const handleMouseDown =
    (thumbType: "min" | "max") => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(thumbType);
    };

  // 슬라이더 트랙 클릭 핸들러
  const handleTrackClick = (e: React.MouseEvent) => {
    if (isDragging) return;

    const newValue = getValueFromPosition(e.clientX);
    const minDistance = Math.abs(newValue - minValue);
    const maxDistance = Math.abs(newValue - maxValue);

    // 더 가까운 thumb를 이동시킴
    if (minDistance <= maxDistance) {
      handleRangeChange(newValue, Math.max(newValue, maxValue));
    } else {
      handleRangeChange(Math.min(minValue, newValue), newValue);
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      const newValue = getValueFromPosition(e.clientX);

      if (isDragging === "min") {
        const newMax = Math.max(newValue, maxValue);
        handleRangeChange(newValue, newMax);
      } else {
        const newMin = Math.min(minValue, newValue);
        handleRangeChange(newMin, newValue);
      }
    },
    [isDragging, minValue, maxValue, handleRangeChange]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
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
    <LevelContainer>
      <SliderContainer ref={sliderRef} onClick={handleTrackClick}>
        <SliderTrack />
        <RangeTrack $start={minValue} $end={maxValue} />
        <SliderThumb
          $position={(minValue / 5) * 100}
          $isMin={true}
          onMouseDown={handleMouseDown("min")}
          disabled={isLoading}
        />
        <SliderThumb
          $position={(maxValue / 5) * 100}
          $isMin={false}
          onMouseDown={handleMouseDown("max")}
          disabled={isLoading}
        />
        <LevelMarks>
          {LEVELS.map((level, index) => {
            const isAvailable = availableLevels.includes(level);
            const isSelected = selectedLevels.includes(level);
            const isInRange = index >= minValue && index <= maxValue;
            return (
              <LevelMark
                key={level}
                $position={(index / 5) * 100}
                $isAvailable={isAvailable}
                $isSelected={isSelected}
                $isInRange={isInRange}
              >
                <LevelMarkLabel
                  $isAvailable={isAvailable}
                  $isSelected={isSelected}
                  $isInRange={isInRange}
                >
                  {level}
                </LevelMarkLabel>
              </LevelMark>
            );
          })}
        </LevelMarks>
      </SliderContainer>
    </LevelContainer>
  );
};
