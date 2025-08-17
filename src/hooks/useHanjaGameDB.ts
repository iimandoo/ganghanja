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
  upsertUserPreferences,
  getUserPreferences,
} from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export interface UseHanjaGameReturn {
  currentIndex: number;
  currentHanja: HanjaData | null;
  previousHanja: HanjaData | null;
  nextHanja: HanjaData | null;
  totalCount: number;
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

interface UseHanjaGameParams {
  urlVocabularyRange?: string;
  urlId?: string;
}

export const useHanjaGameDB = (
  params?: UseHanjaGameParams,
  hiddenCardsHook?: { hiddenCards: Set<number> }
): UseHanjaGameReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLevels, setSelectedLevels] = useState<Level[]>([]);
  const [selectedType, setSelectedType] =
    useState<HanjaType>("대한검정회 급수자격검정");
  const [selectedVocabularyRange, setSelectedVocabularyRange] =
    useState<VocabularyRange>("기본");
  const [resetCardFlip, setResetCardFlip] = useState(false);

  const { user } = useAuth();

  // 기본 레벨 설정 (availableLevels가 로드되기 전까지 사용)
  const defaultLevels: Level[] = ["8", "7", "6", "준5", "5", "준4"];

  // URL 파라미터에 따른 설정 업데이트 (파라미터 변경 시마다 실행)
  useEffect(() => {
    if (params?.urlVocabularyRange) {
      const range = params.urlVocabularyRange as VocabularyRange;
      if (
        (range === "기본" || range === "중급") &&
        range !== selectedVocabularyRange
      ) {
        setSelectedVocabularyRange(range);
      }
    }

    // URL의 id 파라미터가 있으면 currentIndex 설정
    if (params?.urlId) {
      const urlIdNum = parseInt(params.urlId);
      if (!isNaN(urlIdNum) && urlIdNum > 0) {
        setCurrentIndex(urlIdNum);
      }
    }
  }, [params?.urlVocabularyRange, params?.urlId, selectedVocabularyRange]);

  // 사용자 설정 불러오기
  const {
    data: userSettings,
    isLoading: settingsLoading,
    error: settingsError,
  } = useQuery({
    queryKey: ["userSettings", user?.id],
    queryFn: () => (user?.id ? getUserPreferences(user.id) : null),
    enabled: !!user?.id,
  });

  // 사용자 설정이 로드되면 상태 업데이트
  useEffect(() => {
    if (userSettings) {
      // hanja_type을 selectedType으로 변환
      const typeMapping: { [key: string]: HanjaType } = {
        ExamA: "대한검정회 급수자격검정",
        ExamB: "어문회 검정시험",
      };
      setSelectedType(
        typeMapping[userSettings.hanja_type] || "대한검정회 급수자격검정"
      );

      // selected_levels 사용
      setSelectedLevels(userSettings.selected_levels as Level[]);

      // vocabulary_range 사용
      setSelectedVocabularyRange(
        userSettings.vocabulary_range as VocabularyRange
      );
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
      return fetchAvailableLevels(selectedType);
    },
    enabled: !!selectedType,
  });

  const availableLevels = useMemo(
    () => levelsData?.levels || [],
    [levelsData?.levels]
  );

  // 한자 데이터 조회 (현재 ID 기준으로 이전/현재/다음 데이터만)
  const {
    data: hanjaResponse,
    isLoading: hanjaLoading,
    error: hanjaError,
  } = useQuery({
    queryKey: [
      "hanja",
      selectedType,
      // selectedLevels가 안정화된 후에만 쿼리 키에 포함
      selectedLevels.length > 0
        ? selectedLevels.sort().join(",")
        : defaultLevels.sort().join(","),
      selectedVocabularyRange,
      currentIndex,
      // URL의 id 파라미터를 쿼리 키에 포함
      params?.urlId,
      // 숨겨진 카드 ID 목록을 쿼리 키에 포함하여 숨김 상태 변경 시 재요청
      hiddenCardsHook?.hiddenCards
        ? Array.from(hiddenCardsHook.hiddenCards).sort().join(",")
        : "",
    ],
    queryFn: () => {
      const levels = selectedLevels.length > 0 ? selectedLevels : defaultLevels;
      // URL의 id가 있으면 그것을 currentId로 사용, 없으면 currentIndex 사용
      const currentId = params?.urlId
        ? parseInt(params.urlId)
        : currentIndex === 0
        ? undefined
        : currentIndex;
      return fetchHanjaData(
        selectedType,
        levels,
        selectedVocabularyRange,
        currentId,
        hiddenCardsHook?.hiddenCards
      );
    },
    enabled: !!selectedType && selectedLevels.length > 0,
    // 캐시 설정으로 불필요한 재요청 방지
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태 유지
    gcTime: 10 * 60 * 1000, // 10분간 캐시 유지
    // 중복 요청 방지
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // 현재 한자 데이터
  const currentHanja = hanjaResponse?.current || null;

  // 이전 한자 데이터
  const previousHanja = hanjaResponse?.previous || null;

  // 다음 한자 데이터
  const nextHanja = hanjaResponse?.next || null;

  // 전체 개수
  const totalCount = hanjaResponse?.totalCount || 0;

  const isLoading = levelsLoading || hanjaLoading || settingsLoading;
  const isDataLoading = hanjaLoading;
  const error =
    levelsError?.message ||
    hanjaError?.message ||
    settingsError?.message ||
    null;

  // 타입이 변경되면 해당 타입의 모든 급수를 선택
  useEffect(() => {
    if (availableLevels.length > 0 && selectedLevels.length === 0) {
      setSelectedLevels(availableLevels);
    }
  }, [availableLevels, selectedLevels.length]);

  // selectedLevels가 변경될 때 currentIndex를 리셋 (새로운 레벨 선택 시)
  // API 응답의 levels를 사용하므로 URL의 id 파라미터가 없을 때만 리셋
  useEffect(() => {
    if (selectedLevels.length > 0 && !params?.urlId) {
      setCurrentIndex(0);
    }
  }, [selectedLevels, params?.urlId]);

  // 데이터가 변경되면 상태 초기화
  useEffect(() => {
    if (currentHanja) {
      setResetCardFlip(true);
      setTimeout(() => setResetCardFlip(false), ANIMATION_DELAYS.CARD_RESET);
    }
  }, [currentHanja]);

  // API 응답의 currentIndex와 로컬 상태 동기화
  useEffect(() => {
    if (hanjaResponse?.currentIndex !== undefined) {
      setCurrentIndex(hanjaResponse.currentIndex);
    }
  }, [hanjaResponse?.currentIndex]);

  // API 응답의 levels 값을 사용하여 selectedLevels 동기화
  useEffect(() => {
    if (hanjaResponse?.levels && hanjaResponse.levels.length > 0) {
      // API 응답의 levels를 Level 타입으로 변환
      const apiLevels = hanjaResponse.levels as Level[];
      if (
        JSON.stringify(apiLevels.sort()) !==
        JSON.stringify(selectedLevels.sort())
      ) {
        setSelectedLevels(apiLevels);
      }
    }
  }, [hanjaResponse?.levels, selectedLevels, hanjaResponse]);

  const resetCardFlipState = () => {
    setResetCardFlip(true);
    setTimeout(() => setResetCardFlip(false), ANIMATION_DELAYS.CARD_RESET);
  };

  // 사용자 설정 저장 함수 (디바운싱 적용)
  const saveSettings = useCallback(async () => {
    if (!user?.id || selectedLevels.length === 0) return;

    try {
      // hanja_type을 selectedType에서 변환
      const hanjaType =
        selectedType === "대한검정회 급수자격검정" ? "ExamA" : "ExamB";

      await upsertUserPreferences(user.id, {
        selected_levels: selectedLevels,
        hanja_type: hanjaType,
        vocabulary_range: selectedVocabularyRange,
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
    if (totalCount === 0) return;

    // 마지막 카드인 경우 더 이상 진행하지 않음 (순환 방지)
    if (currentIndex >= totalCount - 1) return;

    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    resetCardFlipState();
  };

  const handlePrevious = () => {
    if (totalCount === 0) return;

    const prevIndex = currentIndex === 0 ? totalCount - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    resetCardFlipState();
  };

  const handleShuffle = () => {
    if (totalCount > 0) {
      const randomIndex = Math.floor(Math.random() * totalCount);
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

  const canGoPrevious = totalCount > 0 && currentIndex > 0;
  const canGoNext = totalCount > 0 && currentIndex < totalCount - 1;
  const progress =
    selectedLevels.length === 0 || totalCount === 0
      ? 0
      : ((currentIndex + 1) / totalCount) * 100;

  return {
    currentIndex, // 로컬 상태 유지
    currentHanja,
    previousHanja,
    nextHanja,
    totalCount,
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
