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
  onAddWord?: () => void;
}

interface WordLevelItem {
  kor: string;
  hanja: string;
  url: string;
}

interface BasicWordItem {
  text: string;
  isBasic: boolean;
}

type VocabularyItem = WordLevelItem | BasicWordItem;

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
  width: 480px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 auto;
  touch-action: manipulation;
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
  transform-style: preserve-3d;
  perspective: 1000px;
`;

const CardFace = styled.div<{
  $clickable?: boolean;
  $isVisible: boolean;
  $noAnimation?: boolean;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  box-sizing: border-box;
  cursor: ${(props) => (props.$clickable ? "pointer" : "default")};
  backface-visibility: hidden;

  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.$isVisible ? "auto" : "none")};
  z-index: ${(props) => (props.$isVisible ? 2 : 1)};

  transform: ${(props) => {
    if (props.$noAnimation) return "none";
    return props.$isVisible
      ? "scale(1) rotateY(0deg)"
      : "scale(0.95) rotateY(15deg)";
  }};

  transition: ${(props) =>
    props.$noAnimation ? "none" : "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)"};

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
  border: 2px solid ${(props) => getCardColorInfo(props.$colorKey).border};
`;

const LevelBadge = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: "Noto Sans KR", sans-serif;
  z-index: 10;
  color: #2d3748;
  background: rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    font-size: 0.8rem;
    padding: 5px 10px;
  }
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
  gap: 36px;
  pointer-events: auto;

  @media (max-width: 768px) {
  }
`;

const InfoSection = styled.div<{
  $isFadingOut?: boolean;
  $isFadingIn?: boolean;
}>`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 10px;
  text-align: left;
  width: 100%;
  pointer-events: none;
  * {
    pointer-events: auto;
  }

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

const InfoTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  position: relative;
  z-index: 25;
  min-height: 24px;

  @media (max-width: 768px) {
    margin-bottom: 8px;
    min-height: 20px;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1rem;
  margin: 0;
  color: rgba(45, 55, 72, 0.9);
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: 768px) {
    font-weight: 400;
    font-size: 1rem;
  }
`;

const SmallAddButton = styled.button`
  background: #1f2937;
  color: white;
  border: 3px solid #1f2937;
  padding: 5px 10px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
  min-width: 80px;
  min-height: 36px;
  opacity: 1;
  box-shadow: 0 4px 12px rgba(31, 41, 55, 0.3);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #111827;
    border-color: #111827;
    box-shadow: 0 6px 16px rgba(31, 41, 55, 0.4);
    transform: translateY(-2px) scale(1.05);
  }

  &:active {
    transform: translateY(0) scale(0.98);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 16px;
    min-width: 70px;
    min-height: 44px;
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
  onAddWord,
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

  const handleCardClick = (e: React.MouseEvent) => {
    // 버튼 클릭인 경우 카드 뒤집기 방지
    const target = e.target as HTMLElement;
    if (target.tagName === "BUTTON" || target.closest("button")) {
      e.stopPropagation();
      return;
    }

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

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (onAddWord) {
      onAddWord();
    }
  };

  // Particle effect 제거됨

  // 어휘범위에 따라 표시할 예시 텍스트 선택 (useMemo 내부로 이동하여 사용)

  const vocabularyLines = React.useMemo((): VocabularyItem[] => {
    if (!currentHanja) return [];

    switch (vocabularyRange) {
      case "중급":
        if (
          currentHanja.wordlevel_mid &&
          Array.isArray(currentHanja.wordlevel_mid)
        ) {
          return currentHanja.wordlevel_mid
            .map((word: Record<string, string>) => ({
              kor: word.kor || "",
              hanja: word.hanja || "",
              url: word.url || "",
            }))
            .filter((word: Record<string, string>) => word.kor && word.hanja);
        }
        return []; // 중급 데이터가 없으면 빈 배열 반환
      case "기본":
      default:
        // 기본은 wordlevel_es를 사용
        if (
          !currentHanja.wordlevel_es ||
          currentHanja.wordlevel_es.length === 0
        ) {
          return [];
        }

        return currentHanja.wordlevel_es
          .map((word: Record<string, string>) => ({
            text: word.kor || "",
            isBasic: true,
          }))
          .filter((word) => word.text);
    }
  }, [currentHanja, vocabularyRange]);

  return (
    <>
      <CardContainer $disabled={disabled}>
        <CardInner $isFlipped={isFlipped} $noAnimation={noAnimation}>
          <CardFront
            onClick={handleCardClick}
            $colorKey={cardColorKey}
            $clickable={!disabled}
            $isVisible={!isFlipped}
            $noAnimation={noAnimation}
          >
            {currentHanja && <LevelBadge>{currentHanja.level}급</LevelBadge>}
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

          <CardBack
            onClick={handleCardClick}
            $colorKey={cardColorKey}
            $clickable={!disabled}
            $isVisible={isFlipped}
            $noAnimation={noAnimation}
          >
            <BackContent>
              {currentHanja ? (
                <>
                  <InfoSection
                    $isFadingOut={isFadingOut}
                    $isFadingIn={isFadingIn}
                  >
                    <InfoTitle>뜻(음)</InfoTitle>
                    <InfoText>
                      {currentHanja.meaning} {currentHanja.meaningKey}
                    </InfoText>
                  </InfoSection>

                  <InfoSection>
                    <InfoTitleContainer>
                      <InfoTitle>{vocabularyRange} 활용단어</InfoTitle>
                      {onAddWord && (
                        <SmallAddButton
                          onClick={handleAddClick}
                          title="활용단어 추가하기"
                        >
                          추가
                        </SmallAddButton>
                      )}
                    </InfoTitleContainer>
                    <InfoText>
                      {vocabularyLines.length > 0 ? (
                        vocabularyLines.map(
                          (item: VocabularyItem, index: number) => {
                            if ("isBasic" in item) {
                              // 기본 단어 (기존 example)
                              return (
                                <span key={`basic-${index}`}>
                                  {item.text}
                                  {index < vocabularyLines.length - 1 && <br />}
                                </span>
                              );
                            } else {
                              // 중급 단어 (kor(hanja) 형태로 표시, 클릭 시 새창으로 URL 열기)
                              return (
                                <span key={`word-${index}`}>
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      color: "inherit",
                                      textDecoration: "none",
                                      cursor: "pointer",
                                      borderBottom:
                                        "1px dotted rgba(45, 55, 72, 0.3)",
                                      transition:
                                        "border-bottom-color 0.2s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.borderBottomColor =
                                        "rgba(45, 55, 72, 0.8)";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.borderBottomColor =
                                        "rgba(45, 55, 72, 0.3)";
                                    }}
                                  >
                                    {item.kor}({item.hanja})
                                  </a>
                                  {index < vocabularyLines.length - 1 && <br />}
                                </span>
                              );
                            }
                          }
                        )
                      ) : vocabularyRange === "중급" ? (
                        <span style={{ opacity: 0.6, fontStyle: "italic" }}>
                          중급 활용단어 데이터가 없습니다
                        </span>
                      ) : (
                        <span style={{ opacity: 0.6, fontStyle: "italic" }}>
                          활용단어 데이터가 없습니다
                        </span>
                      )}
                    </InfoText>
                  </InfoSection>
                </>
              ) : (
                <InfoSection>
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
