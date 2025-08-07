"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Script from "next/script";
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
import { theme } from "@/styles/theme";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
  const gameHook = useHanjaGameDB();
  const modalHook = useModal();
  const chatHook = useChat();
  const { user, loading: authLoading } = useAuth();
  const hiddenCardsHook = useHiddenCards();
  const snackbarHook = useSnackbar();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">(
    "signin"
  );

  const {
    currentIndex,
    filteredData,
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

  // 현재 카드 인덱스가 숨겨진 카드 개수로 인해 범위를 벗어나는 경우 조정
  const adjustedCurrentIndex = Math.min(
    currentIndex,
    Math.max(0, visibleCards.length - 1)
  );
  const currentCard =
    visibleCards.length > 0 && adjustedCurrentIndex >= 0
      ? visibleCards[adjustedCurrentIndex]
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
      snackbarHook.showSnackbar(`${cardToHide.character}한자를 숨겼어요!`);
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
                onTypeChange={handleTypeChange}
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
          <ProgressBar progress={adjustedProgress} />
          {/* landscape 모드에서 ProgressBar 아래에 CardActions 표시 */}
          <LandscapeCardActions
            onShuffle={handleShuffle}
            onUnhideAll={hiddenCardsHook.clearHiddenCards}
            hiddenCardsCount={hiddenCardsHook.hiddenCardsCount}
            disabled={selectedLevels.length === 0}
            selectedLevels={selectedLevels}
            availableLevels={availableLevels}
            selectedVocabularyRange={selectedVocabularyRange}
            onLevelFilter={handleLevelFilter}
            onVocabularyRangeChange={handleVocabularyRangeChange}
            isDataLoading={isDataLoading}
          />
        </HeaderBox>
        <GameArea>
          <CardSection>
            <GameControls
              onPrevious={handlePrevious}
              onNext={handleNext}
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
                vocabularyRange={selectedVocabularyRange}
                resetFlip={resetCardFlip}
                disabled={false}
                onHide={handleHideCard}
              />
            )}
          </CardSection>
        </GameArea>
        <PortraitCardActions
          onShuffle={handleShuffle}
          onUnhideAll={hiddenCardsHook.clearHiddenCards}
          hiddenCardsCount={hiddenCardsHook.hiddenCardsCount}
          disabled={selectedLevels.length === 0}
          selectedLevels={selectedLevels}
          availableLevels={availableLevels}
          selectedVocabularyRange={selectedVocabularyRange}
          onLevelFilter={handleLevelFilter}
          onVocabularyRangeChange={handleVocabularyRangeChange}
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
