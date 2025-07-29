import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Level, HanjaType, ANIMATION_DELAYS } from "@/constants";
import { fetchHanjaData, fetchAvailableLevels, HanjaData } from "@/lib/api";

export interface UseHanjaGameReturn {
  currentIndex: number;
  filteredData: HanjaData[];
  selectedLevels: Level[];
  selectedType: HanjaType;
  availableLevels: Level[];
  usedIndices: Set<number>;
  resetCardFlip: boolean;
  history: number[];
  historyPosition: number;
  progress: number;
  isLoading: boolean;
  error: string | null;
  handleNext: () => void;
  handlePrevious: () => void;
  handleShuffle: () => void;
  handleLevelFilter: (level: Level) => void;
  handleTypeChange: (type: HanjaType) => void;
}

export const useHanjaGameDB = (): UseHanjaGameReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLevels, setSelectedLevels] = useState<Level[]>([]);
  const [selectedType, setSelectedType] = useState<HanjaType>("대한검정회");
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());
  const [resetCardFlip, setResetCardFlip] = useState(false);
  const [history, setHistory] = useState<number[]>([0]);
  const [historyPosition, setHistoryPosition] = useState(0);

  // 사용 가능한 급수 목록 조회
  const {
    data: levelsData,
    isLoading: levelsLoading,
    error: levelsError,
  } = useQuery({
    queryKey: ["levels", selectedType],
    queryFn: () => fetchAvailableLevels(selectedType),
    enabled: !!selectedType,
  });

  // 한자 데이터 조회
  const {
    data: hanjaResponse,
    isLoading: hanjaLoading,
    error: hanjaError,
    refetch: refetchHanja,
  } = useQuery({
    queryKey: ["hanja", selectedType, selectedLevels],
    queryFn: () => fetchHanjaData(selectedType, selectedLevels),
    enabled: !!selectedType && selectedLevels.length > 0,
  });

  const availableLevels = levelsData?.levels || [];
  const filteredData = hanjaResponse?.data || [];
  const isLoading = levelsLoading || hanjaLoading;
  const error = levelsError?.message || hanjaError?.message || null;

  // 타입이 변경되면 해당 타입의 모든 급수를 선택
  useEffect(() => {
    if (availableLevels.length > 0 && selectedLevels.length === 0) {
      setSelectedLevels(availableLevels);
    }
  }, [availableLevels, selectedLevels.length]);

  // 데이터가 변경되면 상태 초기화
  useEffect(() => {
    if (filteredData.length > 0) {
      setCurrentIndex(0);
      setUsedIndices(new Set([0]));
      setHistory([0]);
      setHistoryPosition(0);
      setResetCardFlip(true);
      setTimeout(() => setResetCardFlip(false), ANIMATION_DELAYS.CARD_RESET);
    }
  }, [filteredData]);

  const resetCardFlipState = () => {
    setResetCardFlip(true);
    setTimeout(() => setResetCardFlip(false), ANIMATION_DELAYS.CARD_RESET);
  };

  const handleNext = () => {
    if (filteredData.length === 0) return;

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
    if (filteredData.length > 0) {
      // 셔플은 클라이언트에서 처리
      const shuffledIndices = Array.from(
        { length: filteredData.length },
        (_, i) => i
      ).sort(() => Math.random() - 0.5);

      const randomIndex = shuffledIndices[0];
      setCurrentIndex(randomIndex);
      setUsedIndices(new Set([randomIndex]));
      setHistory([randomIndex]);
      setHistoryPosition(0);
      resetCardFlipState();
    }
  };

  const handleLevelFilter = (level: Level) => {
    const newSelectedLevels = selectedLevels.includes(level)
      ? selectedLevels.filter((l) => l !== level)
      : [...selectedLevels, level];

    setSelectedLevels(newSelectedLevels);
  };

  const handleTypeChange = (type: HanjaType) => {
    setSelectedType(type);
    setSelectedLevels([]); // 새로운 타입의 급수로 리셋될 예정
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
    availableLevels,
    usedIndices,
    resetCardFlip,
    history,
    historyPosition,
    progress,
    isLoading,
    error,
    handleNext,
    handlePrevious,
    handleShuffle,
    handleLevelFilter,
    handleTypeChange,
  };
};
