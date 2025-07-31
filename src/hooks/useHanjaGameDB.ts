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
  resetCardFlip: boolean;
  canGoPrevious: boolean;
  canGoNext: boolean;
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
  const [resetCardFlip, setResetCardFlip] = useState(false);

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

    const nextIndex = (currentIndex + 1) % filteredData.length;
    setCurrentIndex(nextIndex);
    resetCardFlipState();
  };

  const handlePrevious = () => {
    if (filteredData.length === 0) return;

    const prevIndex =
      currentIndex === 0 ? filteredData.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    resetCardFlipState();
  };

  const handleShuffle = () => {
    if (filteredData.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredData.length);
      setCurrentIndex(randomIndex);
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

  const canGoPrevious = filteredData.length > 0;
  const canGoNext = filteredData.length > 0;
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
    resetCardFlip,
    canGoPrevious,
    canGoNext,
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
