"use client";

import React, { useEffect } from "react";
import styled from "styled-components";
import HanjaCard from "@/components/HanjaCard";
import { LevelFilter } from "@/components/LevelFilter";
import { ProgressBar } from "@/components/ProgressBar";
import { GameControls } from "@/components/GameControls";
import { ContactModal } from "@/components/ContactModal";
import { ChatModal } from "@/components/ChatModal";
import { useHanjaGame } from "@/hooks/useHanjaGame";
import { useModal } from "@/hooks/useModal";
import { useChat } from "@/hooks/useChat";
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

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 16px;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  font-size: ${theme.fontSize.xxxl};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.gray.dark};
  text-shadow: ${theme.shadows.sm};
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSize.xxl};
    margin-bottom: 12px;
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSize.xl};
    margin-bottom: 8px;
  }
`;
const SubTitle = styled.h2`
  font-size: ${theme.fontSize.xxl};
  font-weight: ${theme.fontWeight.normal};
  color: ${theme.colors.gray.dark};
  text-shadow: ${theme.shadows.sm};
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.fontSize.xxl};
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.fontSize.xl};
  }
`;

const Subtitle = styled.p`
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.gray.medium};
  margin: 0;
  font-weight: ${theme.fontWeight.medium};
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 1.2rem;
  }
`;

const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xxxl};
  width: 100%;
  max-width: 600px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: 55px;
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
  const gameHook = useHanjaGame();
  const modalHook = useModal();
  const chatHook = useChat();

  const {
    currentIndex,
    filteredData,
    selectedLevels,
    resetCardFlip,
    history,
    historyPosition,
    progress,
    handleNext,
    handlePrevious,
    handleShuffle,
    handleLevelFilter,
  } = gameHook;

  const {
    isModalOpen,
    requestText,
    contactPhone,
    contactEmail,
    contactKakao,
    setRequestText,
    setContactPhone,
    setContactEmail,
    setContactKakao,
    handleModalOpen,
    handleModalClose,
    handleSubmitRequest,
  } = modalHook;

  const {
    isChatOpen,
    chatMessage,
    rating,
    showSuccessMessage,
    setChatMessage,
    setRating,
    handleChatOpen,
    handleChatClose,
    handleRatingClick,
    handleChatSubmit,
  } = chatHook;

  // 동적 메타데이터 업데이트
  useEffect(() => {
    updateDocumentMetadata(selectedLevels);
  }, [selectedLevels]);

  if (filteredData.length === 0) {
    return <></>;
  }

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "대한검정회 한자카드",
            description:
              "대한검정회 한자 급수별 학습 카드게임입니다. 8급, 7급, 6급, 준5급, 5급 한자를 재미있게 학습하세요.",
            url:
              typeof window !== "undefined"
                ? window.location.href
                : "https://hanjacard.com",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Any",
            browserRequirements: "Requires JavaScript. Requires HTML5.",
            softwareVersion: "1.0",
            author: {
              "@type": "Organization",
              name: "대한검정회 한자카드",
            },
            about: {
              "@type": "Thing",
              name: "한자 학습",
              description: "한국 한자 급수 시험 대비 학습",
            },
            educationalUse: "한자 학습, 급수 시험 대비",
            audience: {
              "@type": "EducationalAudience",
              educationalRole: "student",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "KRW",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
      <Header>
        <SubTitle as="h2">[대한검정회]</SubTitle>
        <Title as="h1">급수시험 한자 카드</Title>
      </Header>

      <LevelFilter
        selectedLevels={selectedLevels}
        onLevelFilter={handleLevelFilter}
        onShuffle={handleShuffle}
      />

      <ProgressBar progress={progress} />
      <GameArea>
        <CardSection>
          <GameControls
            onPrevious={handlePrevious}
            onNext={handleNext}
            canGoPrevious={historyPosition > 0}
            canGoNext={
              !(
                currentIndex >= filteredData.length - 1 &&
                historyPosition >= history.length - 1
              )
            }
          />
          <HanjaCard
            hanja={filteredData[currentIndex]}
            resetFlip={resetCardFlip}
          />
        </CardSection>
      </GameArea>

      <ContactModal
        isOpen={isModalOpen}
        requestText={requestText}
        contactPhone={contactPhone}
        contactEmail={contactEmail}
        contactKakao={contactKakao}
        onRequestTextChange={setRequestText}
        onContactPhoneChange={setContactPhone}
        onContactEmailChange={setContactEmail}
        onContactKakaoChange={setContactKakao}
        onClose={handleModalClose}
        onSubmit={handleSubmitRequest}
      />

      <ChatModal
        isOpen={isChatOpen}
        message={chatMessage}
        rating={rating}
        showSuccessMessage={showSuccessMessage}
        onMessageChange={setChatMessage}
        onRatingClick={handleRatingClick}
        onOpen={handleChatOpen}
        onClose={handleChatClose}
        onSubmit={handleChatSubmit}
      />
    </Container>
  );
}
