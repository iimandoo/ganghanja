import { useState, useEffect } from "react";
import { hanjaData, HanjaData } from "@/data/hanjaData";
import { Level, HanjaType, ANIMATION_DELAYS } from "@/constants";

export interface UseHanjaGameReturn {
  currentIndex: number;
  filteredData: HanjaData[];
  selectedLevels: Level[];
  selectedType: HanjaType;
  usedIndices: Set<number>;
  resetCardFlip: boolean;
  history: number[];
  historyPosition: number;
  progress: number;
  handleNext: () => void;
  handlePrevious: () => void;
  handleShuffle: () => void;
  handleLevelFilter: (level: Level) => void;
  handleTypeChange: (type: HanjaType) => void;
}

export const useHanjaGame = (): UseHanjaGameReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredData, setFilteredData] = useState<HanjaData[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<Level[]>([
    "8급",
    "7급",
    "6급",
    "준5급",
    "5급",
    "준4급",
  ]);
  const [selectedType, setSelectedType] =
    useState<HanjaType>("대한검정회 TypeA");
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());
  const [resetCardFlip, setResetCardFlip] = useState(false);
  const [history, setHistory] = useState<number[]>([0]);
  const [historyPosition, setHistoryPosition] = useState(0);

  // 초기 데이터 설정
  useEffect(() => {
    const shuffledData = [...hanjaData].sort(() => Math.random() - 0.5);
    setFilteredData(shuffledData);
    setCurrentIndex(0);
    setHistory([0]);
    setHistoryPosition(0);
  }, []);

  // 선택된 급수가 변경될 때 데이터 필터링
  useEffect(() => {
    if (selectedLevels.length > 0) {
      const filtered = hanjaData
        .filter((hanja) => selectedLevels.includes(hanja.level as Level))
        .sort((a, b) =>
          a.meaningKey.localeCompare(b.meaningKey, "ko-KR", {
            caseFirst: "lower",
            sensitivity: "base",
          })
        );
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }

    // 상태 초기화 - selectedLevels 변경 시 항상 초기화
    setCurrentIndex(0);
    setUsedIndices(new Set());
    setHistoryPosition(0);

    if (selectedLevels.length > 0) {
      setHistory([0]);
    } else {
      setHistory([]);
    }

    // 카드 플립 상태 리셋
    setResetCardFlip(true);
    setTimeout(() => setResetCardFlip(false), ANIMATION_DELAYS.CARD_RESET);
  }, [selectedLevels]);

  const resetCardFlipState = () => {
    setResetCardFlip(true);
    setTimeout(() => setResetCardFlip(false), ANIMATION_DELAYS.CARD_RESET);
  };

  const handleNext = () => {
    if (historyPosition >= history.length - 1) {
      const nextIndex = (currentIndex + 1) % filteredData.length;
      setCurrentIndex(nextIndex);
      setUsedIndices((prev) => new Set(prev).add(nextIndex));

      const newHistory = [...history.slice(0, historyPosition + 1), nextIndex];
      setHistory(newHistory);
      setHistoryPosition(newHistory.length - 1);
    } else {
      const nextPosition = historyPosition + 1;
      setCurrentIndex(history[nextPosition]);
      setHistoryPosition(nextPosition);
    }

    resetCardFlipState();
  };

  const handlePrevious = () => {
    if (historyPosition > 0) {
      const prevPosition = historyPosition - 1;
      setCurrentIndex(history[prevPosition]);
      setHistoryPosition(prevPosition);
      resetCardFlipState();
    }
  };

  const handleShuffle = () => {
    if (selectedLevels.length > 0) {
      const filtered = hanjaData.filter((hanja) =>
        selectedLevels.includes(hanja.level as Level)
      );
      const shuffledData = [...filtered].sort(() => Math.random() - 0.5);
      setFilteredData(shuffledData);
    } else {
      setFilteredData([]);
      return;
    }

    setUsedIndices(new Set());
    const randomIndex = 0;
    setCurrentIndex(randomIndex);
    setUsedIndices(new Set([randomIndex]));
    setHistory([randomIndex]);
    setHistoryPosition(0);

    resetCardFlipState();
  };

  const handleLevelFilter = (level: Level) => {
    if (selectedLevels.includes(level)) {
      setSelectedLevels(selectedLevels.filter((l) => l !== level));
    } else {
      setSelectedLevels([...selectedLevels, level]);
    }
  };

  const handleTypeChange = (type: HanjaType) => {
    setSelectedType(type);
  };

  const progress =
    selectedLevels.length === 0 || filteredData.length === 0
      ? 0
      : ((currentIndex + 1) / filteredData.length) * 100;

  return {
    currentIndex,
    filteredData,
    selectedLevels,
    selectedType,
    usedIndices,
    resetCardFlip,
    history,
    historyPosition,
    progress,
    handleNext,
    handlePrevious,
    handleShuffle,
    handleLevelFilter,
    handleTypeChange,
  };
};
