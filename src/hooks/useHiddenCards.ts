import { useState, useEffect, useCallback } from "react";
import type { Level } from "@/constants";
import type { HanjaData as ApiHanjaData } from "@/lib/api";

const HIDDEN_CARDS_KEY = "hiddenHanjaCards";

export interface HiddenCardsHook {
  hiddenCards: Set<number>;
  hideCard: (cardId: number) => void;
  unhideCard: (cardId: number) => void;
  clearHiddenCards: () => void;
  unhideCardsByLevels: (levels: Level[], allHanjaData: ApiHanjaData[]) => void;
  isCardHidden: (cardId: number) => boolean;
  hiddenCardsCount: number;
  getHiddenCountByLevel: (
    allHanjaData: ApiHanjaData[]
  ) => Record<Level, number>;
  getAllHanjaData: (
    type: string,
    levels: Level[],
    vocabularyRange: string
  ) => Promise<ApiHanjaData[]>;
}

/**
 * 숨긴 한자 카드들을 관리하는 훅
 */
export const useHiddenCards = (): HiddenCardsHook => {
  const [hiddenCards, setHiddenCards] = useState<Set<number>>(new Set());

  // 로컬 스토리지에서 숨긴 카드 목록 로드
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HIDDEN_CARDS_KEY);
      if (stored) {
        const hiddenArray = JSON.parse(stored) as number[];
        setHiddenCards(new Set(hiddenArray));
      }
    } catch (error) {
      console.error("Failed to load hidden cards:", error);
    }
  }, []);

  // 로컬 스토리지에 숨긴 카드 목록 저장
  const saveToStorage = useCallback((newHiddenCards: Set<number>) => {
    try {
      const hiddenArray = Array.from(newHiddenCards);
      localStorage.setItem(HIDDEN_CARDS_KEY, JSON.stringify(hiddenArray));
    } catch (error) {
      console.error("Failed to save hidden cards:", error);
    }
  }, []);

  // 카드 숨기기
  const hideCard = useCallback(
    (cardId: number) => {
      setHiddenCards((prev) => {
        const newSet = new Set(prev);
        newSet.add(cardId);
        saveToStorage(newSet);
        return newSet;
      });
    },
    [saveToStorage]
  );

  // 카드 숨기기 해제
  const unhideCard = useCallback(
    (cardId: number) => {
      setHiddenCards((prev) => {
        const newSet = new Set(prev);
        newSet.delete(cardId);
        saveToStorage(newSet);
        return newSet;
      });
    },
    [saveToStorage]
  );

  // 모든 숨긴 카드 해제
  const clearHiddenCards = useCallback(() => {
    setHiddenCards(new Set());
    localStorage.removeItem(HIDDEN_CARDS_KEY);
  }, []);

  // 특정 급수들의 숨긴 카드들 해제
  const unhideCardsByLevels = useCallback(
    (levels: Level[], allHanjaData: ApiHanjaData[]) => {
      setHiddenCards((prev) => {
        const newSet = new Set(prev);

        // 해당 급수들에 속하는 숨겨진 카드들을 찾아서 제거
        Array.from(prev).forEach((cardId) => {
          // API 데이터는 id 필드가 있으므로 정확히 매칭
          const hanja = allHanjaData.find((h) => h.id === cardId);

          if (hanja) {
            const normalizedHanjaLevel = String(hanja.level).replace(
              /급$/g,
              ""
            );
            if (
              levels.some((level) => normalizedHanjaLevel === String(level))
            ) {
              newSet.delete(cardId);
            }
          } else {
          }
        });

        saveToStorage(newSet);
        return newSet;
      });
    },
    [saveToStorage]
  );

  // 카드가 숨겨져 있는지 확인
  const isCardHidden = useCallback(
    (cardId: number) => {
      return hiddenCards.has(cardId);
    },
    [hiddenCards]
  );

  // 숨겨진 카드 개수
  const hiddenCardsCount = hiddenCards.size;

  // 급수별 숨겨진 카드 수 계산
  const getHiddenCountByLevel = useCallback(
    (allHanjaData: ApiHanjaData[]): Record<Level, number> => {
      const counts: Record<Level, number> = {
        "8": 0,
        "7": 0,
        "6": 0,
        준5: 0,
        "5": 0,
        준4: 0,
      };

      // 숨겨진 카드들 중에서 해당 급수에 속하는 것들을 카운트
      Array.from(hiddenCards).forEach((cardId) => {
        const hanja = allHanjaData.find((h) => h.id === cardId);
        if (hanja) {
          const level = String(hanja.level) as Level;
          if (counts.hasOwnProperty(level)) {
            counts[level]++;
          }
        }
      });

      return counts;
    },
    [hiddenCards]
  );

  // 모든 한자 데이터 가져오기
  const getAllHanjaData = useCallback(
    async (
      type: string,
      levels: Level[],
      vocabularyRange: string
    ): Promise<ApiHanjaData[]> => {
      try {
        const typeParam =
          type === "대한검정회 급수자격검정" ? "TypeA" : "TypeB";
        const levelsParam = levels.join(",");

        const params = new URLSearchParams({
          levels: levelsParam,
          vocabularyRange: vocabularyRange || "기본",
        });

        const response = await fetch(
          `/api/hanja/${typeParam}/all?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error(`API 요청 실패: ${response.status}`);
        }

        const apiResponse = await response.json();

        return apiResponse.data.map(
          (item: ApiHanjaData & { meaning_key: string }) => ({
            ...item,
            meaningKey: item.meaning_key,
          })
        );
      } catch (error) {
        console.error("Failed to fetch all hanja data:", error);
        return [];
      }
    },
    []
  );

  return {
    hiddenCards,
    hideCard,
    unhideCard,
    clearHiddenCards,
    unhideCardsByLevels,
    isCardHidden,
    hiddenCardsCount,
    getHiddenCountByLevel,
    getAllHanjaData,
  };
};
