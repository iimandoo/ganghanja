import { useState, useEffect, useCallback } from "react";

const HIDDEN_CARDS_KEY = "hiddenHanjaCards";

export interface HiddenCardsHook {
  hiddenCards: Set<number>;
  hideCard: (cardId: number) => void;
  unhideCard: (cardId: number) => void;
  clearHiddenCards: () => void;
  isCardHidden: (cardId: number) => boolean;
  hiddenCardsCount: number;
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

  // 카드가 숨겨져 있는지 확인
  const isCardHidden = useCallback(
    (cardId: number) => {
      return hiddenCards.has(cardId);
    },
    [hiddenCards]
  );

  // 숨겨진 카드 개수
  const hiddenCardsCount = hiddenCards.size;

  return {
    hiddenCards,
    hideCard,
    unhideCard,
    clearHiddenCards,
    isCardHidden,
    hiddenCardsCount,
  };
};
