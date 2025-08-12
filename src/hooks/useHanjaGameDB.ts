import { useState, useEffect, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Level,
  HanjaType,
  VocabularyRange,
  ANIMATION_DELAYS,
} from "@/constants";
import {
  fetchHanjaData,
  fetchAvailableLevels,
  HanjaData,
  saveUserSettings,
  loadUserSettings,
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export interface UseHanjaGameReturn {
  currentIndex: number;
  filteredData: HanjaData[];
  allHanjaData: HanjaData[];
  selectedLevels: Level[];
  selectedType: HanjaType;
  selectedVocabularyRange: VocabularyRange;
  availableLevels: Level[];
  resetCardFlip: boolean;
  canGoPrevious: boolean;
  canGoNext: boolean;
  progress: number;
  isLoading: boolean;
  isDataLoading: boolean;
  error: string | null;
  handleNext: () => void;
  handlePrevious: () => void;
  handleShuffle: () => void;
  handleLevelFilter: (level: Level) => void;
  handleTypeChange: (type: HanjaType) => void;
  handleVocabularyRangeChange: (
    range: VocabularyRange,
    onSave?: () => void
  ) => void;
}

export const useHanjaGameDB = (): UseHanjaGameReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLevels, setSelectedLevels] = useState<Level[]>([]);
  const [selectedType, setSelectedType] =
    useState<HanjaType>("대한검정회 급수자격검정");
  const [selectedVocabularyRange, setSelectedVocabularyRange] =
    useState<VocabularyRange>("기본");
  const [resetCardFlip, setResetCardFlip] = useState(false);

  const { user } = useAuth();

  // 사용자 설정 불러오기
  const {
    data: userSettings,
    isLoading: settingsLoading,
    error: settingsError,
  } = useQuery({
    queryKey: ["userSettings", user?.id],
    queryFn: () => (user?.id ? loadUserSettings(user.id) : null),
    enabled: !!user?.id,
  });

  // 사용자 설정이 로드되면 상태 업데이트
  useEffect(() => {
    if (userSettings) {
      setSelectedType(userSettings.selected_type as HanjaType);
      setSelectedVocabularyRange(
        userSettings.selected_vocabulary_range as VocabularyRange
      );
      setSelectedLevels(userSettings.selected_levels as Level[]);
    }
  }, [userSettings]);

  // 사용 가능한 급수 목록 조회
  const {
    data: levelsData,
    isLoading: levelsLoading,
    error: levelsError,
  } = useQuery({
    queryKey: ["levels", selectedType],
    queryFn: () => {
      console.log("Levels query executing for type:", selectedType);
      return fetchAvailableLevels(selectedType);
    },
    enabled: !!selectedType,
  });

  console.log("Levels Query Status:", {
    selectedType,
    isLoading: levelsLoading,
    hasData: !!levelsData,
    levelsData,
    error: levelsError,
  });

  const availableLevels = useMemo(
    () => levelsData?.levels || [],
    [levelsData?.levels]
  );

  // 한자 데이터 조회
  const {
    data: hanjaResponse,
    isLoading: hanjaLoading,
    error: hanjaError,
  } = useQuery({
    queryKey: ["hanja", selectedType, selectedLevels, selectedVocabularyRange],
    queryFn: () => fetchHanjaData(selectedType, selectedLevels, selectedVocabularyRange),
    enabled: !!selectedType && selectedLevels.length > 0,
  });

  // 숨기기 취소를 위한 전체 급수 데이터 조회 (하드코딩된 급수 사용)
  const allLevels: Level[] = ["8", "7", "6", "준5", "5", "준4"];
  const {
    data: allHanjaResponse,
    isLoading: allHanjaLoading,
    error: allHanjaError,
  } = useQuery({
    queryKey: ["allHanja", selectedType, "all-levels"],
    queryFn: () => {
      console.log("AllHanja query executing with hardcoded levels:", {
        selectedType,
        allLevels,
      });
      return fetchHanjaData(selectedType, allLevels);
    },
    enabled: !!selectedType,
  });

  console.log("AllHanja Query Status:", {
    selectedType,
    availableLevels,
    availableLevelsLength: availableLevels.length,
    enabled: !!selectedType && availableLevels.length > 0,
    isLoading: allHanjaLoading,
    hasData: !!allHanjaResponse,
    dataLength: allHanjaResponse?.data?.length || 0,
  });
  const filteredData = useMemo(
    () => hanjaResponse?.data || [],
    [hanjaResponse?.data]
  );
  const allHanjaData = useMemo(
    () => allHanjaResponse?.data || [],
    [allHanjaResponse?.data]
  );
  const isLoading = levelsLoading || hanjaLoading || settingsLoading;
  const isDataLoading = hanjaLoading;
  const error =
    levelsError?.message ||
    hanjaError?.message ||
    allHanjaError?.message ||
    settingsError?.message ||
    null;

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

  // 사용자 설정 저장 함수 (디바운싱 적용)
  const saveSettings = useCallback(async () => {
    if (!user?.id || selectedLevels.length === 0) return;

    try {
      await saveUserSettings({
        user_id: user.id,
        selected_levels: selectedLevels,
        selected_type: selectedType,
        selected_vocabulary_range: selectedVocabularyRange,
      });
    } catch (error) {
      console.error("Failed to save user settings:", error);
    }
  }, [user?.id, selectedLevels, selectedType, selectedVocabularyRange]);

  // 설정이 변경될 때마다 디바운싱하여 DB에 저장
  useEffect(() => {
    if (user?.id && selectedLevels.length > 0) {
      const timeoutId = setTimeout(() => {
        saveSettings();
      }, 1000); // 1초 디바운싱

      return () => clearTimeout(timeoutId);
    }
  }, [
    user?.id,
    selectedLevels,
    selectedType,
    selectedVocabularyRange,
    saveSettings,
  ]);

  const handleNext = () => {
    if (filteredData.length === 0) return;

    // 마지막 카드인 경우 더 이상 진행하지 않음 (순환 방지)
    if (currentIndex >= filteredData.length - 1) return;

    const nextIndex = currentIndex + 1;
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
    // 사용 가능한 레벨인지 확인
    if (!availableLevels.includes(level)) {
      return;
    }

    setSelectedLevels((prevSelectedLevels) => {
      // 이미 선택된 레벨인 경우 제거 (토글)
      if (prevSelectedLevels.includes(level)) {
        const newSelectedLevels = prevSelectedLevels.filter((l) => l !== level);

        // 최소 하나의 레벨은 선택되어야 함
        if (newSelectedLevels.length === 0) {
          // 모든 레벨을 선택된 상태로 유지
          return prevSelectedLevels;
        }

        return newSelectedLevels;
      } else {
        // 선택되지 않은 레벨인 경우 추가
        return [...prevSelectedLevels, level];
      }
    });
  };

  const handleTypeChange = (type: HanjaType) => {
    setSelectedType(type);
    setSelectedLevels([]); // 새로운 타입의 급수로 리셋될 예정
  };

  const handleVocabularyRangeChange = (
    range: VocabularyRange,
    onSave?: () => void
  ) => {
    setSelectedVocabularyRange(range);

    // 어휘범위가 변경되면 카드 플립 리셋
    resetCardFlipState();
    onSave?.(); // 저장 완료 시 콜백 호출
  };

  const canGoPrevious = filteredData.length > 0 && currentIndex > 0;
  const canGoNext =
    filteredData.length > 0 && currentIndex < filteredData.length - 1;
  const progress =
    selectedLevels.length === 0 || filteredData.length === 0
      ? 0
      : ((currentIndex + 1) / filteredData.length) * 100;

  return {
    currentIndex,
    filteredData,
    allHanjaData,
    selectedLevels,
    selectedType,
    selectedVocabularyRange,
    availableLevels,
    resetCardFlip,
    canGoPrevious,
    canGoNext,
    progress,
    isLoading,
    isDataLoading,
    error,
    handleNext,
    handlePrevious,
    handleShuffle,
    handleLevelFilter,
    handleTypeChange,
    handleVocabularyRangeChange,
  };
};
