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
import { Level, VocabularyRange, LEVELS } from "@/constants";
import { theme } from "@/styles/theme";
import type { HanjaData as ApiHanjaData } from "@/lib/api";
import { CheckIcon } from "@/components/Icons";

interface CardActionsProps {
  onShuffle: () => void;
  onUnhideByLevels?: (levels: Level[]) => void;
  hiddenCardsCount?: number;
  hiddenCards?: Set<number>;
  allHanjaData?: ApiHanjaData[];
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
  onUnhideByLevels,
  hiddenCardsCount = 0,
  hiddenCards = new Set(),
  allHanjaData = [],
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
  const [selectedUnhideLevels, setSelectedUnhideLevels] = React.useState<
    Level[]
  >([]);

  // 급수별 숨겨진 한자 개수 계산
  const getHiddenCountByLevel = (level: Level): number => {
    if (!allHanjaData.length || !hiddenCards.size) {
      console.log(`Level ${level}: no data or hidden cards`, {
        dataLength: allHanjaData.length,
        hiddenSize: hiddenCards.size,
      });
      return 0;
    }

    const count = Array.from(hiddenCards).reduce((count, cardId) => {
      // API 데이터는 id 필드가 있으므로 정확히 매칭
      const hanja = allHanjaData.find((h) => h.id === cardId);

      if (hanja) {
        console.log(`Found hanja for cardId ${cardId}:`, {
          character: hanja.character,
          level: hanja.level,
          targetLevel: `${level}급`,
        });

        // DB에는 '급'이 제거된 형식("8", "7" 등)이 저장되어 있으므로 두 케이스 모두 처리
        const normalizedHanjaLevel = String(hanja.level).replace(/급$/g, "");
        if (normalizedHanjaLevel === String(level)) {
          return count + 1;
        }
      } else {
        console.log(`No hanja found for cardId ${cardId}`);
      }
      return count;
    }, 0);

    console.log(`Level ${level} final count: ${count}`);
    return count;
  };

  // 전체 디버깅 정보 출력
  console.log("=== CardActions Debug Info ===");
  console.log("Hidden Cards Set:", hiddenCards);
  console.log("Hidden Cards Array:", Array.from(hiddenCards));
  console.log("All Hanja Data length:", allHanjaData.length);
  console.log("Sample Hanja Data:", allHanjaData.slice(0, 3));
  console.log("LEVELS:", LEVELS);

  // 숨겨진 카드와 한자 데이터 매칭 테스트
  if (hiddenCards.size > 0 && allHanjaData.length > 0) {
    console.log("=== Matching Test ===");
    Array.from(hiddenCards).forEach((cardId) => {
      const hanja = allHanjaData.find((h) => h.id === cardId);
      console.log(
        `CardId ${cardId}:`,
        hanja ? `Found - ${hanja.character} (${hanja.level})` : "NOT FOUND"
      );
    });
  }

  // 숨긴 카드 취소 UI: 모든 급수를 노출하고, 각 급수에 숨긴 개수를 괄호로 표시
  const levelsWithHiddenCards = LEVELS;

  console.log("Levels with hidden cards:", levelsWithHiddenCards);
  console.log("===============================");

  const handleLevelToggle = (level: Level) => {
    setSelectedUnhideLevels((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const handleUnhideSelected = () => {
    if (selectedUnhideLevels.length > 0) {
      onUnhideByLevels?.(selectedUnhideLevels);
      setSelectedUnhideLevels([]);
    }
  };
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
          placement="top"
        >
          <div
            style={{
              marginBottom: "15px",
              fontSize: "14px",
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
          placement="top"
        >
          <div
            style={{
              marginBottom: "15px",
              fontSize: "14px",
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
        {hiddenCardsCount > 0 && (
          <Popover
            trigger={
              <ShuffleButton
                $variant="primary"
                aria-label="숨긴 카드 모두 보이기"
                title={`숨긴 카드 ${hiddenCardsCount}개 모두 보이기`}
                disabled={disabled}
              >
                <span>숨기기취소 ({hiddenCardsCount})</span>
              </ShuffleButton>
            }
            placement="top"
          >
            <div
              style={{
                marginBottom: "12px",
                fontSize: "14px",
                fontWeight: 500,
                color: theme.colors.secondary.main,
              }}
            >
              급수를 선택해서 숨긴 카드를 보이게 하세요.
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                minWidth: "260px",
              }}
            >
              {LEVELS.map((level) => {
                const hiddenCount = getHiddenCountByLevel(level);
                const isDisabledLevel = hiddenCount === 0;
                const isSelected = selectedUnhideLevels.includes(level);

                return (
                  <div
                    key={level}
                    onClick={() => {
                      if (isDisabledLevel) return;
                      handleLevelToggle(level);
                    }}
                    aria-disabled={isDisabledLevel}
                    title={isDisabledLevel ? "숨긴 카드 없음" : undefined}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      backgroundColor:
                        !isDisabledLevel && isSelected
                          ? theme.colors.primary.light
                          : theme.colors.gray.bg,
                      border: `1px solid ${
                        !isDisabledLevel && isSelected
                          ? theme.colors.primary.dark
                          : theme.colors.gray.border
                      }`,
                      borderRadius: "8px",
                      cursor: isDisabledLevel ? "not-allowed" : "pointer",
                      fontSize: "14px",
                      opacity: isDisabledLevel ? 0.6 : 1,
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        border: `2px solid ${
                          !isDisabledLevel && isSelected
                            ? theme.colors.primary.dark
                            : theme.colors.gray.border
                        }`,
                        borderRadius: "2px",
                        backgroundColor:
                          !isDisabledLevel && isSelected
                            ? theme.colors.primary.main
                            : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {!isDisabledLevel && isSelected && (
                        <CheckIcon size={10} />
                      )}
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: theme.colors.secondary.dark,
                          fontWeight: 500,
                        }}
                      >
                        {level}급
                      </span>
                      <span
                        style={{
                          backgroundColor: theme.colors.gray.border,
                          color: theme.colors.secondary.main,
                          borderRadius: "9999px",
                          padding: "2px 8px",
                          fontSize: "12px",
                          lineHeight: 1.6,
                        }}
                      >
                        {hiddenCount}개
                      </span>
                    </div>
                  </div>
                );
              })}
              {selectedUnhideLevels.length > 0 && (
                <button
                  onClick={handleUnhideSelected}
                  style={{
                    padding: "10px 12px",
                    backgroundColor: theme.colors.secondary.main,
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    marginTop: "6px",
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      theme.colors.secondary.dark;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      theme.colors.secondary.main;
                  }}
                >
                  선택한 급수 모두 보기
                </button>
              )}
            </div>
          </Popover>
        )}
      </div>
    </SettingContainer>
  );
};
