"use client";

import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Image from "next/image";
import Script from "next/script";
import { useSearchParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import HanjaCard from "@/components/HanjaCard";
import EmptyCard from "@/components/EmptyCard";
import { SkeletonCard } from "@/components/SkeletonCard";
import { Snackbar } from "@/components/Snackbar/Snackbar";
import { CardActions } from "@/components/CardActions";
import { ProgressBar } from "@/components/ProgressBar";
import { TypeSelect } from "@/components/TypeSelect";
import { GameControls } from "@/components/GameControls";
import { ContactModal } from "@/components/ContactModal";
import { ChatModal } from "@/components/ChatModal";
import { AuthModal } from "@/components/AuthModal";
import { UserInfo } from "@/components/UserInfo";

import { useHanjaGameDB } from "@/hooks/useHanjaGameDB";
import { useModal } from "@/hooks/useModal";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/contexts/AuthContext";
import { useHiddenCards } from "@/hooks/useHiddenCards";
import { useSnackbar } from "@/hooks/useSnackbar";
import { updateDocumentMetadata } from "@/utils/metadata";
import { VocabularyRange, Level, HanjaType } from "@/constants";
import { theme } from "@/styles/theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ShareIcon } from "@/components/Icons";
import type { HanjaData as ApiHanjaData } from "@/lib/api";

const Container = styled.main`
  height: 100dvh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #f8fdf8 0%, #f0fdf4 50%, #ecfdf5 100%);
  font-family: "Noto Sans KR", sans-serif;
  gap: 10px;
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 16px;
  }

  /* 태블릿 가로 모드 (landscape) */
  @media (min-width: 481px) and (max-width: 1180px) and (orientation: landscape) {
    flex-direction: row;
    gap: 0px;
    padding: 16px;
  }
`;

const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 10px;
  text-align: center;
  padding: 30px 0px 20px 0px;
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 30px 0px 10px 0px;
  }

  /* landscape 모드에서만 표시 */
  @media (min-width: 481px) and (max-width: 1180px) and (orientation: landscape) {
    padding: 40px 0px 80px 0px;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-bottom: 50px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 8px;
  }
`;

const Logo = styled(Image)`
  height: auto;
  max-height: 70px;
  width: auto;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-height: 60px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: 50px;
  }
`;

const HeaderBox = styled.div`
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

const AuthSection = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    top: 0px;
    right: 0px;
    gap: 8px;
  }
`;

const AuthButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.secondary.main};
  font-size: ${theme.fontSize.sm};
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  margin: 0;
  transition: ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.secondary.dark};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSize.xs};
  }
`;

const ShareButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.secondary.main};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: ${theme.transitions.fast};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${theme.colors.secondary.dark};
    background-color: rgba(193, 255, 114, 0.1);
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 2px;
  }
`;

const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  backdrop-filter: blur(10px);
  border-radius: ${theme.borderRadius.xl};
  box-shadow: 0 8px 32px rgba(193, 255, 114, 0.1);
  border: 1px solid rgba(193, 255, 114, 0.2);

  @media (max-width: ${theme.breakpoints.tablet}) {
  }
`;

const CardSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px ${theme.spacing.xxxxxl};
  width: 100%;
  height: 100%;
  position: relative;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0px ${theme.spacing.xxxl};
  }
`;

const LandscapeCardActions = styled(CardActions)`
  /* 기본적으로 숨김 */
  && {
    display: none;
  }

  /* landscape 모드에서만 표시 */
  @media (min-width: 481px) and (max-width: 1180px) and (orientation: landscape) {
    && {
      display: flex;
      margin-top: 26px;
      margin-bottom: 0;
    }
  }
`;

const PortraitCardActions = styled(CardActions)`
  && {
    display: flex;
    margin-top: 10px;
    margin-bottom: 0;
  }

  /* landscape 모드에서는 숨김 */
  @media (min-width: 481px) and (max-width: 1180px) and (orientation: landscape) {
    && {
      display: none;
    }
  }
`;

// MUI 테마 생성
const muiTheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.primary.main,
    },
    secondary: {
      main: theme.colors.secondary.main,
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", sans-serif',
  },
  components: {
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  // URL 파라미터 처리
  const urlLevel = searchParams.get("level") || undefined;
  const urlWord = searchParams.get("word") || undefined;
  const urlId = searchParams.get("id") || undefined;
  const urlSearch = searchParams.get("search") || undefined;

  const modalHook = useModal();
  const chatHook = useChat();
  const { user, loading: authLoading } = useAuth();
  const hiddenCardsHook = useHiddenCards();
  const snackbarHook = useSnackbar();

  const gameHook = useHanjaGameDB(
    {
      urlLevels: urlLevel,
      urlVocabularyRange: urlWord,
      urlId: urlId,
    },
    hiddenCardsHook
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">(
    "signin"
  );
  const [showProgressTooltip, setShowProgressTooltip] = useState(false);

  // allHanjaData 상태 추가
  const [allHanjaData, setAllHanjaData] = useState<ApiHanjaData[]>([]);
  const [isLoadingAllData, setIsLoadingAllData] = useState(false);

  // allHanjaData를 가져오는 useEffect
  useEffect(() => {
    const fetchAllData = async () => {
      if (gameHook.selectedLevels.length > 0 && gameHook.selectedType) {
        setIsLoadingAllData(true);
        try {
          const data = await hiddenCardsHook.getAllHanjaData(
            gameHook.selectedType,
            gameHook.selectedLevels,
            gameHook.selectedVocabularyRange
          );
          setAllHanjaData(data);
        } catch (error) {
          console.error("Failed to fetch all hanja data:", error);
          setAllHanjaData([]);
        } finally {
          setIsLoadingAllData(false);
        }
      }
    };
    fetchAllData();
  }, [
    gameHook.selectedLevels,
    gameHook.selectedType,
    gameHook.selectedVocabularyRange,
    hiddenCardsHook,
  ]);

  // React Query 캐시 무효화 함수
  const handleRefreshData = async () => {
    try {
      await queryClient.invalidateQueries({
        queryKey: [
          "hanja",
          selectedType,
          selectedLevels,
          selectedVocabularyRange,
        ],
      });
      console.log("한자 데이터가 새로고침되었습니다.");
    } catch (error) {
      console.error("데이터 새로고침 실패:", error);
    }
  };

  const {
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
    handleNext,
    handlePrevious,
    handleShuffle,
    handleLevelFilter,
    handleTypeChange,
    handleVocabularyRangeChange,
  } = gameHook;

  // 데이터 로딩 상태
  const isDataLoading = gameHook.isDataLoading;

  const {
    isModalOpen,
    requestText,
    contactInfo,
    setRequestText,
    setContactInfo,
    handleModalClose,
    handleSubmitRequest,
  } = modalHook;

  const {
    isChatOpen,
    chatMessage,
    contactInfo: chatContactInfo,
    rating,
    showSuccessMessage,
    setChatMessage,
    setContactInfo: setChatContactInfo,
    handleChatOpen,
    handleChatClose,
    handleRatingClick,
    handleChatSubmit,
  } = chatHook;

  const handleAuthModalOpen = (mode: "signin" | "signup") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  // URL 업데이트 함수
  const updateURL = (cardId?: number, cardCharacter?: string) => {
    const params = new URLSearchParams();

    if (urlLevel) params.set("level", urlLevel);
    if (urlWord) params.set("word", urlWord);

    if (cardId) {
      params.set("id", cardId.toString());
    } else if (cardCharacter) {
      params.set("search", encodeURIComponent(cardCharacter));
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  // 다음 카드로 이동
  const handleNextWithURL = () => {
    if (nextHanja) {
      updateURL(nextHanja.id, nextHanja.character);
      handleNext();
      setShowProgressTooltip(true);
    }
  };

  // 이전 카드로 이동
  const handlePreviousWithURL = () => {
    if (previousHanja) {
      updateURL(previousHanja.id, previousHanja.character);
      handlePrevious();
    }
  };

  // 공유하기 핸들러
  const handleShare = async () => {
    const shareData = {
      title: "쿨한자 - 급수시험 같이 합격해요! 대한검정회도 어문회도!",
      text: "대한검정회와 어문회 한자능력검정시험 대비 학습 카드게임입니다. 8급부터 준4급까지 급수별 한자를 체계적으로 학습하고 시험에 완벽 대비하세요.",
      url: "https://www.coolhanja.site",
    };

    try {
      // Web Share API 지원 여부 확인
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Web Share API를 지원하지 않는 경우 클립보드에 복사
        await navigator.clipboard.writeText(shareData.url);
        snackbarHook.showSnackbar("링크가 클립보드에 복사되었어요!");
      }
    } catch (error) {
      console.error("공유하기 실패:", error);
      // 폴백: 클립보드 복사
      try {
        await navigator.clipboard.writeText(shareData.url);
        snackbarHook.showSnackbar("링크가 클립보드에 복사되었어요!");
      } catch (clipboardError) {
        console.error("클립보드 복사 실패:", clipboardError);
        snackbarHook.showSnackbar("공유하기에 실패했어요.");
      }
    }
  };

  // URL 파라미터가 변경될 때마다 데이터를 다시 불러오도록 useEffect 추가
  // (useHanjaGameDB에서 이미 처리하므로 별도 로직 불필요)

  // 동적 메타데이터 업데이트
  useEffect(() => {
    updateDocumentMetadata();
  }, []);

  // totalCount가 0일 때 progress tooltip 숨기기
  useEffect(() => {
    if (totalCount === 0) {
      setShowProgressTooltip(false);
    }
  }, [totalCount]);

  // 로그인 모달 이벤트 리스너
  useEffect(() => {
    const handleOpenLoginModal = (event: CustomEvent) => {
      const mode = event.detail?.mode || "signin";
      handleAuthModalOpen(mode as "signin" | "signup");
    };

    window.addEventListener(
      "openLoginModal",
      handleOpenLoginModal as EventListener
    );

    return () => {
      window.removeEventListener(
        "openLoginModal",
        handleOpenLoginModal as EventListener
      );
    };
  }, []);

  // 현재 한자 카드 (숨김 상태 확인)
  const currentCard =
    currentHanja && !hiddenCardsHook.isCardHidden(currentHanja.id)
      ? currentHanja
      : null;

  // 다음 카드 (숨기기 시 fadeIn용)
  const nextCard =
    nextHanja && !hiddenCardsHook.isCardHidden(nextHanja.id) ? nextHanja : null;

  // 진행률 계산
  const progress = gameHook.progress;

  // 카드 숨기기 핸들러 (스낵바 표시 포함)
  const handleHideCard = useCallback(() => {
    if (!currentHanja) return;

    // 현재 카드를 ID 기반으로 숨기기
    hiddenCardsHook.hideCard(currentHanja.id);

    // 스낵바 표시
    snackbarHook.showSnackbar("카드가 숨겨졌습니다.");

    // 다음 카드로 이동 (다음 카드가 있으면)
    if (nextHanja && !hiddenCardsHook.isCardHidden(nextHanja.id)) {
      // 다음 카드가 숨겨지지 않았다면 다음으로 이동
      handleNext();
    } else if (
      previousHanja &&
      !hiddenCardsHook.isCardHidden(previousHanja.id)
    ) {
      // 다음 카드가 숨겨졌다면 이전 카드로 이동
      handlePrevious();
    }
    // 둘 다 숨겨졌다면 현재 상태 유지 (API가 자동으로 다음 유효한 카드를 찾음)
  }, [
    currentHanja,
    nextHanja,
    previousHanja,
    hiddenCardsHook,
    handleNext,
    handlePrevious,
    snackbarHook,
  ]);

  // 학년설정 변경 핸들러 (URL 업데이트 포함)
  const handleVocabularyRangeChangeWithNotification = (
    range: VocabularyRange
  ) => {
    // URL 파라미터 업데이트
    const params = new URLSearchParams(searchParams);
    params.set("word", range);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);

    handleVocabularyRangeChange(range, () => {
      // 로그인된 사용자의 경우 저장 완료 메시지 표시
      if (user) {
        snackbarHook.showSnackbar(`학년설정이 저장되었어요! (${range})`);
      }
    });
  };

  // 급수설정 변경 핸들러 (URL 업데이트 포함)
  const handleLevelFilterWithNotification = (level: Level) => {
    // 새로운 급수 리스트 계산
    const newLevels = selectedLevels.includes(level)
      ? selectedLevels.filter((l) => l !== level)
      : [...selectedLevels, level];

    // URL 파라미터 업데이트
    if (newLevels.length > 0) {
      const params = new URLSearchParams(searchParams);
      params.set("level", newLevels.join(","));
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.push(newUrl);
    }

    handleLevelFilter(level);

    // 로그인된 사용자의 경우 저장 완료 메시지 표시
    if (user) {
      const isSelected = selectedLevels.includes(level);
      if (isSelected) {
        snackbarHook.showSnackbar(`급수가 저장되었어요!`);
      }
    }
  };

  // 타입 변경 핸들러 (스낵바 표시 포함)
  const handleTypeChangeWithNotification = (type: HanjaType) => {
    handleTypeChange(type);

    // 로그인된 사용자의 경우 저장 완료 메시지 표시
    if (user) {
      snackbarHook.showSnackbar(`타입이 ${type}로 변경되었어요!`);
    }
  };

  // 선택된 급수가 없어도 카드는 보여주되, 내용은 숨김

  return (
    <ThemeProvider theme={muiTheme}>
      <Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "대한검정회 & 어문회 한자능력검정시험 학습카드",
              alternateName: ["한자카드", "한자능력검정시험", "한자학습게임"],
              description:
                "대한검정회와 어문회 한자능력검정시험 대비 학습 카드게임입니다. 8급부터 준4급까지 급수별 한자를 체계적으로 학습하고 시험에 완벽 대비하세요.",
              url: "https://www.coolhanja.site",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              softwareVersion: "2.0",
              author: {
                "@type": "Organization",
                name: "한자능력검정시험 학습카드",
              },
              about: [
                {
                  "@type": "Thing",
                  name: "대한검정회 한자능력검정시험",
                  description:
                    "대한검정회에서 주관하는 한자능력검정시험 대비 학습",
                  sameAs: "https://www.coolhanja.site",
                },
                {
                  "@type": "Thing",
                  name: "어문회 한자시험",
                  description: "어문회에서 주관하는 한자시험 대비 학습",
                },
              ],
              educationalUse:
                "한자능력검정시험 대비, 한자 학습, 급수 시험 준비",
              audience: [
                {
                  "@type": "EducationalAudience",
                  educationalRole: "student",
                  audienceType: "한자능력검정시험 응시자",
                },
                {
                  "@type": "EducationalAudience",
                  educationalRole: "learner",
                  audienceType: "한자 학습자",
                },
              ],
              educationalLevel: ["8급", "7급", "6급", "준5급", "5급", "준4급"],
              teaches: [
                "한자 읽기",
                "한자 뜻",
                "한자 예문",
                "사자성어",
                "한자능력검정시험",
              ],
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "KRW",
                availability: "https://schema.org/InStock",
              },
              featureList: [
                "대한검정회 TypeA 한자 학습",
                "어문회 TypeB 한자 학습",
                "급수별 한자 필터링",
                "한자 카드 게임",
                "진도율 표시",
                "랜덤 셔플 기능",
              ],
            }),
          }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-7M78VLX327" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7M78VLX327');
          `}
        </Script>
        <HeaderBox>
          <AuthSection>
            {!authLoading && (
              <>
                {user ? (
                  <UserInfo />
                ) : (
                  <>
                    <AuthButton onClick={() => handleAuthModalOpen("signin")}>
                      로그인
                    </AuthButton>
                    <AuthButton onClick={() => handleAuthModalOpen("signup")}>
                      회원가입
                    </AuthButton>
                  </>
                )}
                <ShareButton onClick={handleShare} title="공유하기">
                  <ShareIcon size={20} />
                </ShareButton>
              </>
            )}
          </AuthSection>
          <Header>
            <TitleContainer>
              <Logo
                src="/logo_cool.png"
                alt="COOL한자 로고"
                width={170}
                height={70}
                priority
              />
              <TypeSelect
                selectedType={selectedType}
                onTypeChange={handleTypeChangeWithNotification}
                isLoading={isDataLoading}
              />
            </TitleContainer>
          </Header>

          <ChatModal
            isOpen={isChatOpen}
            message={chatMessage}
            contactInfo={chatContactInfo}
            rating={rating}
            showSuccessMessage={showSuccessMessage}
            onMessageChange={setChatMessage}
            onContactInfoChange={setChatContactInfo}
            onRatingClick={handleRatingClick}
            onOpen={handleChatOpen}
            onClose={handleChatClose}
            onSubmit={handleChatSubmit}
          />
          <ProgressBar
            progress={progress}
            currentIndex={currentIndex}
            totalCount={totalCount}
            showTooltip={showProgressTooltip}
            onTooltipHide={() => setShowProgressTooltip(false)}
          />
          {/* landscape 모드에서 ProgressBar 아래에 CardActions 표시 */}
          <LandscapeCardActions
            onShuffle={handleShuffle}
            onUnhideByLevels={(levels) =>
              hiddenCardsHook.unhideCardsByLevels(levels, allHanjaData)
            }
            hiddenCardsCount={hiddenCardsHook.hiddenCardsCount}
            hiddenCards={hiddenCardsHook.hiddenCards}
            allHanjaData={allHanjaData}
            disabled={selectedLevels.length === 0}
            selectedLevels={selectedLevels}
            availableLevels={availableLevels}
            selectedVocabularyRange={selectedVocabularyRange}
            onLevelFilter={handleLevelFilterWithNotification}
            onVocabularyRangeChange={
              handleVocabularyRangeChangeWithNotification
            }
            isDataLoading={isDataLoading}
          />
        </HeaderBox>
        <GameArea>
          <CardSection>
            <GameControls
              onPrevious={handlePreviousWithURL}
              onNext={handleNextWithURL}
              canGoPrevious={gameHook.canGoPrevious}
              canGoNext={gameHook.canGoNext}
            />
            {isDataLoading ? (
              <SkeletonCard />
            ) : selectedLevels.length === 0 ? (
              <EmptyCard reason="no-level-selected" />
            ) : !currentCard ? (
              <EmptyCard reason="no-visible-cards" />
            ) : (
              <HanjaCard
                hanja={currentCard}
                nextHanja={nextCard}
                vocabularyRange={gameHook.selectedVocabularyRange}
                resetFlip={gameHook.resetCardFlip}
                disabled={gameHook.isDataLoading}
                onHide={handleHideCard}
                onSuccess={handleRefreshData}
              />
            )}
          </CardSection>
        </GameArea>
        <PortraitCardActions
          onShuffle={handleShuffle}
          onUnhideByLevels={(levels) =>
            hiddenCardsHook.unhideCardsByLevels(levels, allHanjaData)
          }
          hiddenCardsCount={hiddenCardsHook.hiddenCardsCount}
          hiddenCards={hiddenCardsHook.hiddenCards}
          allHanjaData={allHanjaData}
          disabled={selectedLevels.length === 0}
          selectedLevels={selectedLevels}
          availableLevels={availableLevels}
          selectedVocabularyRange={selectedVocabularyRange}
          onLevelFilter={handleLevelFilterWithNotification}
          onVocabularyRangeChange={handleVocabularyRangeChangeWithNotification}
          isDataLoading={isDataLoading}
        />
        <ContactModal
          isOpen={isModalOpen}
          requestText={requestText}
          contactInfo={contactInfo}
          onRequestTextChange={setRequestText}
          onContactInfoChange={setContactInfo}
          onClose={handleModalClose}
          onSubmit={handleSubmitRequest}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={handleAuthModalClose}
          initialMode={authModalMode}
        />
        <Snackbar
          message={snackbarHook.snackbar.message}
          isVisible={snackbarHook.snackbar.isVisible}
          onClose={snackbarHook.hideSnackbar}
        />
      </Container>
    </ThemeProvider>
  );
}
