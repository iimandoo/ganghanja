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
  onProgressTooltipShow?: () => void; // ProgressBar 툴팁 표시 콜백 추가
}

interface UseHanjaGameParams {
  urlLevels?: string;
  urlVocabularyRange?: string;
}

export const useHanjaGameDB = (
  params?: UseHanjaGameParams,
  hiddenCardsHook?: { hiddenCards: Set<number> },
  onProgressTooltipShow?: () => void
): UseHanjaGameReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null); // 다음/이전 인덱스 추적
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
    let shouldUpdate = false;

    if (params?.urlLevels) {
      const levels = params.urlLevels
        .split(",")
        .filter((level) =>
          ["8", "7", "6", "준5", "5", "준4"].includes(level)
        ) as Level[];
      if (
        levels.length > 0 &&
        JSON.stringify(levels.sort()) !== JSON.stringify(selectedLevels.sort())
      ) {
        setSelectedLevels(levels);
        shouldUpdate = true;
      }
    }

    if (params?.urlVocabularyRange) {
      const range = params.urlVocabularyRange as VocabularyRange;
      if (
        (range === "기본" || range === "중급") &&
        range !== selectedVocabularyRange
      ) {
        setSelectedVocabularyRange(range);
        shouldUpdate = true;
      }
    }
  }, [params?.urlLevels, params?.urlVocabularyRange]);

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
      pendingIndex !== null ? pendingIndex : currentIndex, // pendingIndex 우선 사용
      // 숨겨진 카드 ID 목록을 쿼리 키에 포함하여 숨김 상태 변경 시 재요청
      hiddenCardsHook?.hiddenCards
        ? Array.from(hiddenCardsHook.hiddenCards).sort().join(",")
        : "",
    ],
    queryFn: () => {
      const levels = selectedLevels.length > 0 ? selectedLevels : defaultLevels;
      // pendingIndex가 있으면 해당 인덱스 사용, 없으면 currentIndex 사용
      const targetIndex = pendingIndex !== null ? pendingIndex : currentIndex;
      // 초기 로딩 시(targetIndex === 0) currentId를 전송하지 않음
      // API가 자동으로 첫 번째 한자를 반환
      const currentId = targetIndex === 0 ? undefined : targetIndex;
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
  const currentHanja = useMemo(
    () => hanjaResponse?.current || null,
    [hanjaResponse?.current]
  );

  // 이전 한자 데이터
  const previousHanja = useMemo(
    () => hanjaResponse?.previous || null,
    [hanjaResponse?.previous]
  );

  // 다음 한자 데이터
  const nextHanja = useMemo(
    () => hanjaResponse?.next || null,
    [hanjaResponse?.next]
  );

  // 전체 개수
  const totalCount = useMemo(
    () => hanjaResponse?.totalCount || 0,
    [hanjaResponse?.totalCount]
  );

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

  // selectedLevels가 변경될 때 currentIndex를 0으로 리셋 (새로운 레벨 선택 시)
  useEffect(() => {
    if (selectedLevels.length > 0) {
      setCurrentIndex(0);
      setPendingIndex(null); // pendingIndex도 리셋
    }
  }, [selectedLevels.join(",")]); // 문자열로 변환하여 실제 값 변경 시에만 실행

  // currentIndex가 변경될 때 ProgressBar 툴팁 표시
  useEffect(() => {
    if (onProgressTooltipShow && currentIndex > 0) {
      // API 응답 완료 후 툴팁 표시
      onProgressTooltipShow();
    }
  }, [currentIndex, onProgressTooltipShow]);

  // API 응답이 완료된 후 pendingIndex를 currentIndex로 설정
  useEffect(() => {
    if (pendingIndex !== null && hanjaResponse && !hanjaLoading) {
      // API 응답이 완료되고 pendingIndex가 설정된 경우
      setCurrentIndex(pendingIndex);
      setPendingIndex(null); // pendingIndex 리셋
    }
  }, [hanjaResponse, hanjaLoading, pendingIndex]);

  // 데이터가 변경되면 상태 초기화
  useEffect(() => {
    if (currentHanja) {
      setResetCardFlip(true);
      setTimeout(() => setResetCardFlip(false), ANIMATION_DELAYS.CARD_RESET);
    }
  }, [currentHanja]);

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
    if (totalCount === 0) return;

    // 마지막 카드인 경우 더 이상 진행하지 않음 (순환 방지)
    if (currentIndex >= totalCount - 1) return;

    // API 호출 중에는 currentIndex를 즉시 변경하지 않음
    // pendingIndex를 설정하여 다음 인덱스를 추적
    const nextIndex = currentIndex + 1;
    setPendingIndex(nextIndex);
    resetCardFlipState();
  };

  const handlePrevious = () => {
    if (totalCount === 0) return;

    const prevIndex = currentIndex === 0 ? totalCount - 1 : currentIndex - 1;

    // API 호출 중에는 currentIndex를 즉시 변경하지 않음
    // pendingIndex를 설정하여 이전 인덱스를 추적
    setPendingIndex(prevIndex);
    resetCardFlipState();
  };

  const handleShuffle = () => {
    if (totalCount > 0) {
      const randomIndex = Math.floor(Math.random() * totalCount);
      setPendingIndex(randomIndex);
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
      : ((currentIndex + 1) / totalCount) * 100; // pendingIndex가 있어도 currentIndex 기반으로 진행률 계산

  return {
    currentIndex,
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
    onProgressTooltipShow,
  };
};
