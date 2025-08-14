"use client";

import React, { useEffect, useState } from "react";
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
import { AddWordModal } from "@/components/AddWordModal";
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
  const urlLevel = searchParams.get("level");
  const urlWord = searchParams.get("word");
  const urlId = searchParams.get("id");
  const urlSearch = searchParams.get("search");

  const gameHook = useHanjaGameDB({
    urlLevels: urlLevel,
    urlVocabularyRange: urlWord,
  });
  const modalHook = useModal();
  const chatHook = useChat();
  const { user, loading: authLoading } = useAuth();
  const hiddenCardsHook = useHiddenCards();
  const snackbarHook = useSnackbar();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">(
    "signin"
  );
  const [showProgressTooltip, setShowProgressTooltip] = useState(false);
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);

  const {
    currentIndex,
    filteredData,
    allHanjaData,
    selectedLevels,
    selectedType,
    selectedVocabularyRange,
    availableLevels,
    resetCardFlip,
    isDataLoading,
    handleNext,
    handlePrevious,
    handleShuffle,
    handleLevelFilter,
    handleTypeChange,
    handleVocabularyRangeChange,
  } = gameHook;

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

  // AddWordModal 핸들러들
  const handleAddWordModalOpen = () => {
    setIsAddWordModalOpen(true);
  };

  const handleAddWordModalClose = () => {
    setIsAddWordModalOpen(false);
  };

  const handleAddWordSubmit = async (data: { kor: string; hanja: string }) => {
    if (!currentCard) {
      snackbarHook.showSnackbar("현재 카드 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      const { addWordToHanja } = await import("@/lib/api");
      await addWordToHanja(currentCard.id, data);

      snackbarHook.showSnackbar(
        `${data.hanja} (${data.kor}) 단어가 추가되었습니다!`
      );

      // React Query 캐시 무효화로 데이터 새로고침
      await queryClient.invalidateQueries({
        queryKey: [
          "hanja",
          selectedType,
          selectedLevels,
          selectedVocabularyRange,
        ],
      });
    } catch (error) {
      console.error("단어 추가 실패:", error);
      snackbarHook.showSnackbar(
        error instanceof Error ? error.message : "단어 추가에 실패했습니다."
      );
    }
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
    const nextIndex = adjustedCurrentIndex + 1;
    if (nextIndex < visibleCards.length) {
      const nextCard = visibleCards[nextIndex];
      updateURL(nextCard.id, nextCard.character);
      handleNext();
      setShowProgressTooltip(true);
    }
  };

  // 이전 카드로 이동
  const handlePreviousWithURL = () => {
    const prevIndex = adjustedCurrentIndex - 1;
    if (prevIndex >= 0) {
      const prevCard = visibleCards[prevIndex];
      updateURL(prevCard.id, prevCard.character);
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

  // 숨겨지지 않은 카드만 필터링
  const visibleCards = filteredData.filter(
    (card) => !hiddenCardsHook.isCardHidden(card.id)
  );

  // URL 파라미터에 따른 현재 카드 결정
  let urlBasedCurrentCard = null;
  let adjustedCurrentIndex = Math.min(
    currentIndex,
    Math.max(0, visibleCards.length - 1)
  );

  if (urlId && !isNaN(Number(urlId))) {
    // ID로 카드 찾기
    const cardById = visibleCards.find((card) => card.id === Number(urlId));
    if (cardById) {
      urlBasedCurrentCard = cardById;
      adjustedCurrentIndex = visibleCards.findIndex(
        (card) => card.id === Number(urlId)
      );
    }
  } else if (urlSearch) {
    // 한자 검색으로 카드 찾기
    const cardByHanja = visibleCards.find(
      (card) => card.character === decodeURIComponent(urlSearch)
    );
    if (cardByHanja) {
      urlBasedCurrentCard = cardByHanja;
      adjustedCurrentIndex = visibleCards.findIndex(
        (card) => card.character === decodeURIComponent(urlSearch)
      );
    }
  }

  const currentCard =
    urlBasedCurrentCard ||
    (visibleCards.length > 0 && adjustedCurrentIndex >= 0
      ? visibleCards[adjustedCurrentIndex]
      : null);

  // 다음 카드 (숨기기 시 fadeIn용)
  const nextCard =
    visibleCards.length > 0 && adjustedCurrentIndex + 1 < visibleCards.length
      ? visibleCards[adjustedCurrentIndex + 1]
      : null;

  // 숨겨진 카드를 제외한 진행률 계산
  const adjustedProgress =
    selectedLevels.length === 0 || visibleCards.length === 0
      ? 0
      : ((adjustedCurrentIndex + 1) / visibleCards.length) * 100;

  // 카드 숨기기 핸들러 (스낵바 표시 포함)
  const handleHideCard = (cardId: number) => {
    const cardToHide = filteredData.find((card) => card.id === cardId);
    if (cardToHide) {
      hiddenCardsHook.hideCard(cardId);
      snackbarHook.showSnackbar(
        `${cardToHide.character} [${cardToHide.meaning} ${cardToHide.meaning_key}] 숨기기!`
      );
    }
  };

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
            progress={adjustedProgress}
            currentIndex={adjustedCurrentIndex}
            totalCount={visibleCards.length}
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
              canGoPrevious={
                adjustedCurrentIndex > 0 && visibleCards.length > 0
              }
              canGoNext={
                adjustedCurrentIndex < visibleCards.length - 1 &&
                visibleCards.length > 0
              }
            />
            {isDataLoading ? (
              <SkeletonCard />
            ) : selectedLevels.length === 0 ? (
              <EmptyCard reason="no-level-selected" />
            ) : visibleCards.length === 0 && filteredData.length > 0 ? (
              <EmptyCard reason="no-visible-cards" />
            ) : visibleCards.length === 0 ? (
              <EmptyCard reason="all-hidden" />
            ) : currentIndex >= visibleCards.length &&
              visibleCards.length > 0 ? (
              <EmptyCard reason="completed" />
            ) : (
              <HanjaCard
                hanja={currentCard}
                nextHanja={nextCard}
                vocabularyRange={selectedVocabularyRange}
                resetFlip={resetCardFlip}
                disabled={false}
                onHide={handleHideCard}
                onAddWord={handleAddWordModalOpen}
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
        <AddWordModal
          isOpen={isAddWordModalOpen}
          onClose={handleAddWordModalClose}
          onSubmit={handleAddWordSubmit}
        />
      </Container>
    </ThemeProvider>
  );
}
