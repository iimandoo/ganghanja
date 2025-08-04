"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Script from "next/script";
import HanjaCard from "@/components/HanjaCard";
import { LevelFilter } from "@/components/LevelFilter";
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
import { updateDocumentMetadata } from "@/utils/metadata";
import { theme } from "@/styles/theme";

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
    gap: 20px;
    padding: 16px;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 10px;
  text-align: center;
  padding: 20px 0px;
  @media (max-width: ${theme.breakpoints.tablet}) {
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
  max-height: 80px;
  width: auto;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-height: 70px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-height: 60px;
  }
`;

const Title = styled.h1`
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.gray.dark};
  text-shadow: ${theme.shadows.sm};
  font-family: "Noto Sans KR", sans-serif;
  margin: 0;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSize.lg};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSize.lg};
  }
`;

const HeaderBox = styled.div`
  margin: 0 auto;
  overflow: hidden;
  position: relative;
`;

const AuthSection = styled.div`
  position: absolute;
  top: 20px;
  right: 0px;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    top: 16px;
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
//   font-size: ${theme.fontSize.xl};
//   color: ${theme.colors.gray.medium};
//   margin: 0;
//   font-weight: ${theme.fontWeight.medium};
//   font-family: "Noto Sans KR", sans-serif;

//   @media (max-width: ${theme.breakpoints.tablet}) {
//     font-size: 1.2rem;
//   }
// `;

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

export default function Home() {
  const gameHook = useHanjaGameDB();
  const modalHook = useModal();
  const chatHook = useChat();
  const { user, loading: authLoading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">(
    "signin"
  );

  const {
    currentIndex,
    filteredData,
    selectedLevels,
    selectedType,
    availableLevels,
    resetCardFlip,
    canGoPrevious,
    canGoNext,
    progress,
    handleNext,
    handlePrevious,
    handleShuffle,
    handleLevelFilter,
    handleTypeChange,
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
    updateDocumentMetadata(selectedLevels);
  }, [selectedLevels]);

  // 선택된 급수가 없어도 카드는 보여주되, 내용은 숨김

  return (
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
            educationalUse: "한자능력검정시험 대비, 한자 학습, 급수 시험 준비",
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
          <Logo
            src="/logo_cool.png"
            alt="COOL한자 로고"
            width={180}
            height={80}
            priority
          />
          <TitleContainer>
            <Title as="h1"> 한자능력검정시험 </Title>
            <TypeSelect
              selectedType={selectedType}
              onTypeChange={handleTypeChange}
            />
          </TitleContainer>
        </Header>
        <LevelFilter
          selectedLevels={selectedLevels}
          availableLevels={availableLevels}
          onLevelFilter={handleLevelFilter}
          onShuffle={handleShuffle}
          disabled={selectedLevels.length === 0}
        />
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
        <ProgressBar progress={progress} />
      </HeaderBox>

      <GameArea>
        <CardSection>
          <GameControls
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoPrevious={canGoPrevious}
            canGoNext={canGoNext}
          />
          <HanjaCard
            hanja={filteredData.length > 0 ? filteredData[currentIndex] : null}
            resetFlip={resetCardFlip}
            disabled={filteredData.length === 0}
          />
        </CardSection>
      </GameArea>

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
    </Container>
  );
}
