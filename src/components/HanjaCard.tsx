"use client";

import React, { useState, useEffect } from "react";
import { SiNaver } from "react-icons/si";
import styled, { keyframes, css } from "styled-components";
import { HanjaData } from "@/lib/api";
import { VocabularyRange } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import { LoginRequiredModal } from "@/components/LoginRequiredModal";
import {
  getConsistentCardColor,
  getCardColorInfo,
  CardColorKey,
} from "@/utils/cardColors";

interface HanjaCardProps {
  hanja: HanjaData | null;
  nextHanja?: HanjaData | null;
  vocabularyRange?: VocabularyRange;
  onFlip?: () => void;
  resetFlip?: boolean;
  disabled?: boolean;
  onHide?: (cardId: number) => void;
}

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const CardContainer = styled.div<{ $disabled?: boolean }>`
  width: 480px; /* 기존 410px에서 30px 증가 */
  height: 600px;
  perspective: 2000px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 auto;
  touch-action: manipulation;
  cursor: ${(props) => (props.$disabled ? "default" : "pointer")};
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  @media (max-width: 768px) {
    width: 360px;
    height: 470px;
  }
  @media (max-width: 480px) {
    width: 280px;
    height: 370px;
  }
`;

const CardInner = styled.div<{ $isFlipped: boolean; $noAnimation: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: ${(props) => (props.$noAnimation ? "none" : "transform 0.8s")};
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  transform: ${(props) =>
    props.$isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  box-sizing: border-box;
  will-change: transform;
  transform: translateZ(0);

  @media (max-width: 768px) {
    padding: 10px;
    border-radius: 20px;
  }
`;

const CardFront = styled(CardFace)<{ $colorKey: CardColorKey }>`
  background: ${(props) => getCardColorInfo(props.$colorKey).front};
  color: #1a2b15;
  border: 2px solid ${(props) => getCardColorInfo(props.$colorKey).border};
`;

const CardBack = styled(CardFace)<{ $colorKey: CardColorKey }>`
  background: ${(props) => getCardColorInfo(props.$colorKey).back};
  color: #1a2b15;
  transform: rotateY(180deg);
  border: 2px solid ${(props) => getCardColorInfo(props.$colorKey).border};
`;

const LevelBadgeBase = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: "Noto Sans KR", sans-serif;
  z-index: 10;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  will-change: transform;

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    font-size: 0.8rem;
    padding: 5px 10px;
  }
`;

const LevelBadgeFront = styled(LevelBadgeBase)`
  color: #2d3748;
  transform: translateZ(1px);
`;

const LevelBadgeBack = styled(LevelBadgeBase)`
  background: rgba(255, 255, 255, 0.8);
  color: #2d3748;
  transform: rotateY(180deg) translateZ(1px);
`;

const HanjaCharacter = styled.div<{
  $isFadingOut?: boolean;
  $isFadingIn?: boolean;
}>`
  font-size: 15rem;
  font-weight: 700;
  margin-bottom: 24px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-family: "Noto Sans KR", "Noto Sans CJK KR", sans-serif;
  ${(props) => {
    if (props.$isFadingOut) {
      return css`
        animation: ${fadeOut} 0.3s ease-out forwards;
      `;
    }
    if (props.$isFadingIn) {
      return css`
        animation: ${fadeIn} 0.3s ease-out forwards;
      `;
    }
    return css``;
  }}

  @media (max-width: 768px) {
    font-size: 12rem;
    margin-bottom: 16px;
  }
  @media (max-width: 480px) {
    font-size: 8rem;
  }
`;

const BackContent = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const InfoSection = styled.div<{
  $isFadingOut?: boolean;
  $isFadingIn?: boolean;
}>`
  text-align: left;
  width: 100%;
  height: 100%;
  overflow: hidden;

  ${(props) => {
    if (props.$isFadingOut) {
      return css`
        animation: ${fadeOut} 0.8s ease-out forwards;
      `;
    }
    if (props.$isFadingIn) {
      return css`
        animation: ${fadeIn} 0.8s ease-out forwards;
      `;
    }
    return css``;
  }}
`;

const InfoTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 12px;
  color: rgba(45, 55, 72, 0.9);
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: 768px) {
    font-weight: 400;
    font-size: 1rem;
    margin-bottom: 8px;
  }
`;

const InfoText = styled.p`
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  font-size: 1.4rem;
  line-height: 1.7;
  margin: 0;
  font-weight: 700;
  text-align: left;
  font-family: "Noto Sans KR", sans-serif;
  color: rgba(45, 55, 72, 0.9);
  word-break: keep-all;
  padding: 10px 20px;
  height: 100%;
  overflow: auto;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 10px;

    line-height: 1.4;
  }
`;

const FlipHint = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1rem;
  width: 90%;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px 20px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  font-family: "Noto Sans KR", sans-serif;
  pointer-events: none;

  @media (max-width: 768px) {
    bottom: 16px;
    font-size: 0.9rem;
    padding: 5px 10px;
  }
`;

const HideButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 8px 16px;
  border-radius: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 700;
  color: #666;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  z-index: 20;
  backface-visibility: hidden;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  &:not(:disabled):hover {
    background: rgba(255, 255, 255, 1);
    color: #333;
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    height: 32px;
    font-size: 14px;
  }
`;

const DictionaryButton = styled(HideButton)`
  right: 110px;
  padding: 10px;
  border-radius: 10px;
  font-weight: 500;
  color: #03c75a;
  @media (max-width: 768px) {
    right: 100px;
    height: 32px;
  }
`;

const HanjaCard: React.FC<HanjaCardProps> = ({
  hanja,
  nextHanja: nextHanjaProp,
  vocabularyRange = "기본",
  onFlip,
  resetFlip,
  disabled = false,
  onHide,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [noAnimation, setNoAnimation] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const [currentHanja, setCurrentHanja] = useState<HanjaData | null>(hanja);
  const [nextHanja, setNextHanja] = useState<HanjaData | null>(null);
  const { user } = useAuth();

  // 한자 데이터가 변경될 때 fadeIn 효과 적용
  useEffect(() => {
    if (hanja && hanja !== currentHanja && !isFadingOut) {
      setIsFadingIn(true);
      setCurrentHanja(hanja);
      setTimeout(() => {
        setIsFadingIn(false);
      }, 800);
    }
  }, [hanja, currentHanja, isFadingOut]);

  // 한자 문자를 기반으로 일관된 색상 선택
  const cardColorKey = currentHanja
    ? getConsistentCardColor(currentHanja.character)
    : "green";

  // 외부에서 resetFlip이 변경되면 카드를 애니메이션 없이 앞면으로 리셋
  useEffect(() => {
    if (resetFlip) {
      setNoAnimation(true); // 애니메이션 비활성화
      setIsFlipped(false);

      // 다음 프레임에서 애니메이션을 다시 활성화
      setTimeout(() => {
        setNoAnimation(false);
      }, 50);
    }
  }, [resetFlip]);

  const handleCardClick = () => {
    if (disabled || !currentHanja) return;
    setNoAnimation(false);
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  const handleHideClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 방지

    // 로그인 상태 확인
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (currentHanja && onHide) {
      // 텍스트 fadeOut 시작
      setIsFadingOut(true);

      // 파티클 효과 제거됨

      // 다음 한자 설정
      if (nextHanjaProp) {
        setNextHanja(nextHanjaProp);
      }

      // 0.8초 후에 fadeOut 완료 및 다음 한자로 전환
      setTimeout(() => {
        // 카드 숨기기 실행
        onHide(currentHanja.id);

        // 다음 한자가 있으면 fadeIn
        if (nextHanja) {
          // 다음 한자로 전환
          setCurrentHanja(nextHanja);
          setIsFadingIn(true);
          setNextHanja(null);

          // fadeIn 완료
          setTimeout(() => {
            setIsFadingIn(false);
          }, 300);
        }

        setIsFadingOut(false);
      }, 400);

      // 파티클 효과 제거됨
    }
  };

  const handleDictionaryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentHanja) return;
    const url =
      (currentHanja as unknown as { naverUrl?: string }).naverUrl ||
      currentHanja.naver_url ||
      `https://hanja.dict.naver.com/#/search?query=${currentHanja.character}`;
    try {
      window.open(url, "naver");
    } catch {}
  };

  // 숨기기 버튼 비활성화 조건 (파티클 효과 제거됨)
  const isHideDisabled = isFadingOut || isFadingIn;

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleLoginClick = () => {
    // 로그인 모달을 열기 위해 이벤트를 상위로 전달
    const loginEvent = new CustomEvent("openLoginModal", {
      detail: { mode: "signin" },
    });
    window.dispatchEvent(loginEvent);
  };

  // Particle effect 제거됨

  // 어휘범위에 따라 표시할 예시 텍스트 선택 (useMemo 내부로 이동하여 사용)

  const vocabularyLines = React.useMemo(() => {
    const text = (() => {
      if (!currentHanja) return "";
      switch (vocabularyRange) {
        case "중1":
          return currentHanja.m1
            ? currentHanja.m1.join(", ")
            : currentHanja.example;
        case "중2":
          return currentHanja.m2
            ? currentHanja.m2.join(", ")
            : currentHanja.example;
        case "기본":
        default:
          return currentHanja.example;
      }
    })();
    return text
      .split(",")
      .map((part) => part.trim())
      .filter((part) => part.length > 0);
  }, [currentHanja, vocabularyRange]);

  return (
    <>
      <CardContainer onClick={handleCardClick} $disabled={disabled}>
        <CardInner $isFlipped={isFlipped} $noAnimation={noAnimation}>
          <CardFront $colorKey={cardColorKey}>
            {currentHanja && (
              <LevelBadgeFront>{currentHanja.level}급</LevelBadgeFront>
            )}
            {currentHanja && !disabled && (
              <DictionaryButton
                onClick={handleDictionaryClick}
                title="네이버 한자사전"
                aria-label="사전"
              >
                <SiNaver size={18} aria-hidden="true" />
              </DictionaryButton>
            )}
            {currentHanja && !disabled && (
              <HideButton
                onClick={handleHideClick}
                title="이 카드 숨기기"
                disabled={isHideDisabled}
              >
                숨기기
              </HideButton>
            )}
            <HanjaCharacter $isFadingOut={isFadingOut} $isFadingIn={isFadingIn}>
              {currentHanja ? currentHanja.character : ""}
            </HanjaCharacter>
            {!disabled && <FlipHint>카드를 클릭해서 뒤집어보세요!</FlipHint>}
            {disabled && <FlipHint>급수를 선택해주세요!</FlipHint>}
          </CardFront>

          <CardBack $colorKey={cardColorKey}>
            {currentHanja && (
              <LevelBadgeBack>{currentHanja.level}급</LevelBadgeBack>
            )}
            <BackContent>
              {currentHanja ? (
                <>
                  <InfoSection
                    $isFadingOut={isFadingOut}
                    $isFadingIn={isFadingIn}
                  >
                    <InfoTitle>뜻(음)</InfoTitle>
                    <InfoText>
                      {currentHanja.meaning} {currentHanja.meaning_key}
                    </InfoText>
                  </InfoSection>

                  <InfoSection
                    $isFadingOut={isFadingOut}
                    $isFadingIn={isFadingIn}
                  >
                    <InfoTitle>{vocabularyRange} 활용단어</InfoTitle>
                    <InfoText>
                      {vocabularyLines.map((line, index) => (
                        <span key={`${line}-${index}`}>
                          {line}
                          {index < vocabularyLines.length - 1 && <br />}
                        </span>
                      ))}
                    </InfoText>
                  </InfoSection>
                </>
              ) : (
                <InfoSection
                  $isFadingOut={isFadingOut}
                  $isFadingIn={isFadingIn}
                >
                  <InfoTitle>급수를 선택해주세요</InfoTitle>
                  <InfoText>
                    학습할 급수를 선택하면 한자 카드가 표시됩니다.
                  </InfoText>
                </InfoSection>
              )}
            </BackContent>
          </CardBack>
        </CardInner>
      </CardContainer>

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={handleLoginModalClose}
        onLogin={handleLoginClick}
      />
    </>
  );
};

export default HanjaCard;
