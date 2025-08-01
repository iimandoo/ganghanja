"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HanjaData } from "@/lib/api";
import {
  getConsistentCardColor,
  getCardColorInfo,
  CardColorKey,
} from "@/utils/cardColors";

interface HanjaCardProps {
  hanja: HanjaData | null;
  onFlip?: () => void;
  resetFlip?: boolean;
  disabled?: boolean;
}

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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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
  background: rgba(255, 255, 255, 0.7);
  color: #2d3748;
  transform: translateZ(1px);
`;

const LevelBadgeBack = styled(LevelBadgeBase)`
  background: rgba(255, 255, 255, 0.8);
  color: #2d3748;
  transform: rotateY(180deg) translateZ(1px);
`;

const HanjaCharacter = styled.div`
  font-size: 15rem;
  font-weight: 700;
  margin-bottom: 24px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  font-family: "Noto Sans KR", "Noto Sans CJK KR", sans-serif;

  @media (max-width: 768px) {
    font-size: 7.5rem;
    margin-bottom: 16px;
  }
`;

const BackContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const InfoSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  text-align: left;

  @media (max-width: 768px) {
    padding: 10px;
    border-radius: 12px;
  }
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
  font-size: 1.6rem;
  line-height: 1.5;
  margin: 0;
  font-weight: 700;
  text-align: left;
  font-family: "Noto Sans KR", sans-serif;
  color: rgba(45, 55, 72, 0.9);

  @media (max-width: 768px) {
    font-size: 1.1rem;
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
  @media (max-width: 768px) {
    bottom: 16px;
    font-size: 0.9rem;
    padding: 5px 10px;
  }
`;

const HanjaCard: React.FC<HanjaCardProps> = ({
  hanja,
  onFlip,
  resetFlip,
  disabled = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [noAnimation, setNoAnimation] = useState(false);

  // 한자 문자를 기반으로 일관된 색상 선택
  const cardColorKey = hanja
    ? getConsistentCardColor(hanja.character)
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
    if (disabled || !hanja) return;
    setNoAnimation(false);
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  return (
    <CardContainer onClick={handleCardClick} $disabled={disabled}>
      <CardInner $isFlipped={isFlipped} $noAnimation={noAnimation}>
        <CardFront $colorKey={cardColorKey}>
          {hanja && <LevelBadgeFront>{hanja.level}급</LevelBadgeFront>}
          {/* {hanja && <DoneBadge>{hanja.level}</DoneBadge>} */}
          <HanjaCharacter>{hanja ? hanja.character : ""}</HanjaCharacter>
          {!disabled && <FlipHint>카드를 클릭해서 뒤집어보세요!</FlipHint>}
          {disabled && <FlipHint>급수를 선택해주세요!</FlipHint>}
        </CardFront>

        <CardBack $colorKey={cardColorKey}>
          {hanja && <LevelBadgeBack>{hanja.level}급</LevelBadgeBack>}
          <BackContent>
            {hanja ? (
              <>
                <InfoSection>
                  <InfoTitle>뜻(음)</InfoTitle>
                  <InfoText>
                    {hanja.meaning} {hanja.meaning_key}
                  </InfoText>
                </InfoSection>

                <InfoSection>
                  <InfoTitle>단어예시</InfoTitle>
                  <InfoText>{hanja.example}</InfoText>
                </InfoSection>

                <InfoSection>
                  <InfoTitle>사자성어/예문</InfoTitle>
                  <InfoText>{hanja.idiom}</InfoText>
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
  );
};

export default HanjaCard;
