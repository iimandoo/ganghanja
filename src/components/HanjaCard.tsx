"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { HanjaData } from "@/data/hanjaData";

interface HanjaCardProps {
  hanja: HanjaData;
  onFlip?: () => void;
  resetFlip?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
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
  transform: ${(props) =>
    props.$isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  box-sizing: border-box;

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

const LevelBadge = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.95);
  color: #2d3748;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: "Noto Sans KR", sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  z-index: 10;

  @media (max-width: 768px) {
    top: 16px;
    right: 16px;
    font-size: 0.8rem;
    padding: 5px 10px;
  }
`;

const HanjaCharacter = styled.div`
  font-size: 12rem;
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

  @media (max-width: 768px) {
    padding: 10px;
    border-radius: 12px;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 12px;
  color: rgba(45, 55, 72, 0.9);
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }
`;

const InfoText = styled.p`
  font-size: 2rem;
  line-height: 1.5;
  margin: 0;
  font-weight: 700;

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

const HanjaCard: React.FC<HanjaCardProps> = ({ hanja, onFlip, resetFlip, onSwipeLeft, onSwipeRight }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [noAnimation, setNoAnimation] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);
  const touchHandled = useRef<boolean>(false);

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
    // 터치 이벤트가 처리된 경우 클릭 이벤트 무시
    if (touchHandled.current) {
      touchHandled.current = false;
      return;
    }
    
    // 클릭 시에는 애니메이션 활성화
    setNoAnimation(false);
    setIsFlipped(!isFlipped);
    onFlip?.();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartTime.current = Date.now();
    touchHandled.current = false;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartTime.current === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchDuration = Date.now() - touchStartTime.current;
    const deltaX = touchEndX - touchStartX.current;
    const absDeltaX = Math.abs(deltaX);

    // 스와이프 감지 조건: 최소 50px 이동, 최대 500ms 시간
    if (absDeltaX > 50 && touchDuration < 500) {
      e.preventDefault(); // 기본 클릭 이벤트 방지
      touchHandled.current = true;
      
      if (deltaX > 0) {
        // 오른쪽 스와이프 (이전 카드)
        onSwipeRight?.();
      } else {
        // 왼쪽 스와이프 (다음 카드)
        onSwipeLeft?.();
      }
    } else {
      // 스와이프가 아닌 경우 - 터치로 카드 뒤집기
      touchHandled.current = true;
      setNoAnimation(false);
      setIsFlipped(!isFlipped);
      onFlip?.();
    }

    touchStartX.current = null;
    touchStartTime.current = null;
  };

  return (
    <CardContainer 
      onClick={handleCardClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <CardInner $isFlipped={isFlipped} $noAnimation={noAnimation}>
        <CardFront>
          <LevelBadge>{hanja.level}</LevelBadge>
          <HanjaCharacter>{hanja.character}</HanjaCharacter>
          <FlipHint>카드를 클릭해서 뒤집어보세요!</FlipHint>
        </CardFront>

        <CardBack>
          <LevelBadge>{hanja.level}</LevelBadge>
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
