"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { HanjaData } from "@/data/hanjaData";

interface HanjaCardProps {
  hanja: HanjaData;
  onFlip?: () => void;
  resetFlip?: boolean;
}

const CardContainer = styled.div`
  width: 480px; /* 기존 410px에서 30px 증가 */
  height: 600px;
  perspective: 2000px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0 auto;
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

const CardFront = styled(CardFace)`
  background: linear-gradient(135deg, #b7e1ea 0%, #a8d5e2 100%);
  color: #2d3748;
`;

const CardBack = styled(CardFace)`
  background: linear-gradient(135deg, #f4d4a7 0%, #e8b563 100%);
  color: #2d3748;
  transform: rotateY(180deg);
`;

const LevelBadgeBase = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
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
    right: 10px;
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
  font-size: 14rem;
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
  font-size: 2rem;
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

const HanjaCard: React.FC<HanjaCardProps> = ({ hanja, onFlip, resetFlip }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [noAnimation, setNoAnimation] = useState(false);

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
    setNoAnimation(false);
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <CardInner $isFlipped={isFlipped} $noAnimation={noAnimation}>
        <CardFront>
          <LevelBadgeFront>{hanja.level}</LevelBadgeFront>
          <HanjaCharacter>{hanja.character}</HanjaCharacter>
          <FlipHint>카드를 클릭해서 뒤집어보세요!</FlipHint>
        </CardFront>

        <CardBack>
          <LevelBadgeBack>{hanja.level}</LevelBadgeBack>
          <BackContent>
            <InfoSection>
              <InfoTitle>뜻(음)</InfoTitle>
              <InfoText>
                {hanja.meaning} {hanja.meaningKey}
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
          </BackContent>
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

export default HanjaCard;
