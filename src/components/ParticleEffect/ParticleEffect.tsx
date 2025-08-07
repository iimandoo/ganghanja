import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  opacity: number;
  type: string;
}

interface ParticleEffectProps {
  isVisible: boolean;
  onComplete: () => void;
}

// 1. 꽃가루 효과 (부드럽게 떨어지는 꽃가루)
const flowerPetals = keyframes`
  0% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    opacity: 1;
  }
  30% {
    transform: translate(var(--vx), var(--vy)) scale(1.2) rotate(120deg);
    opacity: 0.9;
  }
  100% {
    transform: translate(calc(var(--vx) * 0.8), calc(var(--vy) * 2.5)) scale(0.3) rotate(360deg);
    opacity: 0;
  }
`;

// 2. 폭죽 효과 (화려한 폭죽 터짐)
const firework = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  20% {
    transform: translate(var(--vx), var(--vy)) scale(1.8);
    opacity: 0.8;
  }
  60% {
    transform: translate(calc(var(--vx) * 1.5), calc(var(--vy) * 1.5)) scale(1.2);
    opacity: 0.9;
  }
  100% {
    transform: translate(calc(var(--vx) * 2.2), calc(var(--vy) * 2.2)) scale(0.1);
    opacity: 0;
  }
`;

// 3. 찢어지기 효과 (카드가 찢어지는 듯한 효과)
const tear = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  25% {
    transform: translate(var(--vx), var(--vy)) scale(1.4);
    opacity: 0.8;
  }
  75% {
    transform: translate(calc(var(--vx) * 1.8), calc(var(--vy) * 1.8)) scale(0.6);
    opacity: 0.6;
  }
  100% {
    transform: translate(calc(var(--vx) * 2.5), calc(var(--vy) * 2.5)) scale(0.1);
    opacity: 0;
  }
`;

// 4. 팡터지기 효과 (강력한 폭발)
const bang = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  15% {
    transform: translate(var(--vx), var(--vy)) scale(2.2);
    opacity: 0.7;
  }
  50% {
    transform: translate(calc(var(--vx) * 1.6), calc(var(--vy) * 1.6)) scale(1.5);
    opacity: 0.8;
  }
  100% {
    transform: translate(calc(var(--vx) * 2.8), calc(var(--vy) * 2.8)) scale(0.05);
    opacity: 0;
  }
`;

// 5. 스파클 효과 (반짝이는 보석)
const sparkle = keyframes`
  0% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: translate(var(--vx), var(--vy)) scale(0.6) rotate(90deg);
    opacity: 0.8;
  }
  50% {
    transform: translate(calc(var(--vx) * 1.4), calc(var(--vy) * 1.4)) scale(1.8) rotate(180deg);
    opacity: 1;
  }
  75% {
    transform: translate(calc(var(--vx) * 2), calc(var(--vy) * 2)) scale(0.9) rotate(270deg);
    opacity: 0.7;
  }
  100% {
    transform: translate(calc(var(--vx) * 2.6), calc(var(--vy) * 2.6)) scale(0.1) rotate(360deg);
    opacity: 0;
  }
`;

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
`;

const ParticleElement = styled.div<{
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  type: string;
}>`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: ${(props) => props.color};
  border-radius: ${(props) => {
    switch (props.type) {
      case "flowerPetals":
        return "50% 0% 50% 0%"; // 꽃잎 모양
      case "sparkle":
        return "0%"; // 사각형 (보석 모양)
      default:
        return "50%"; // 원형
    }
  }};
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  --vx: ${(props) => props.vx}px;
  --vy: ${(props) => props.vy}px;
  animation: ${(props) => {
      switch (props.type) {
        case "flowerPetals":
          return flowerPetals;
        case "firework":
          return firework;
        case "tear":
          return tear;
        case "bang":
          return bang;
        case "sparkle":
          return sparkle;
        default:
          return flowerPetals;
      }
    }}
    1.5s ease-out forwards;
  box-shadow: 0 0 12px ${(props) => props.color};
  filter: blur(0.5px);
`;

export const ParticleEffect: React.FC<ParticleEffectProps> = ({
  isVisible,
  onComplete,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (isVisible) {
      // 화면 크기에 따른 카드 중앙 위치 계산
      const isMobile = window.innerWidth <= 480;
      const isTablet = window.innerWidth <= 768;

      let centerX = 240; // 데스크톱 기본값
      let centerY = 300;

      if (isMobile) {
        centerX = 140; // 280px / 2
        centerY = 185; // 370px / 2
      } else if (isTablet) {
        centerX = 180; // 360px / 2
        centerY = 235; // 470px / 2
      }

      // 랜덤 효과 선택
      const effects = ["flowerPetals", "firework", "tear", "bang", "sparkle"];
      const selectedEffect =
        effects[Math.floor(Math.random() * effects.length)];

      // 효과별 색상 팔레트
      const colorPalettes = {
        flowerPetals: [
          "#FFB3BA", // 연한 분홍
          "#FFC3A0", // 연한 주황
          "#FFDAC1", // 연한 살구색
          "#E2F0CB", // 연한 연두
          "#B5EAD7", // 연한 민트
          "#C7CEEA", // 연한 라벤더
          "#F7D794", // 연한 노랑
          "#F8B5D1", // 연한 핑크
        ],
        firework: [
          "#FF6B6B", // 빨강
          "#4ECDC4", // 청록
          "#45B7D1", // 파랑
          "#96CEB4", // 초록
          "#FFEAA7", // 노랑
          "#DDA0DD", // 보라
          "#FFB347", // 주황
          "#87CEEB", // 하늘색
          "#FFD93D", // 밝은 노랑
          "#6BCF7F", // 밝은 초록
        ],
        tear: [
          "#8B4513", // 갈색
          "#A0522D", // 시에나
          "#CD853F", // 페루
          "#D2691E", // 초콜릿
          "#B8860B", // 다크골든로드
          "#DAA520", // 골든로드
          "#BDB76B", // 다크카키
          "#F4A460", // 샌드브라운
        ],
        bang: [
          "#FF0000", // 빨강
          "#FF4500", // 오렌지레드
          "#FF6347", // 토마토
          "#FF7F50", // 코랄
          "#FF8C00", // 다크오렌지
          "#FFA500", // 오렌지
          "#FFD700", // 골드
          "#FFFF00", // 노랑
        ],
        sparkle: [
          "#FFD700", // 골드
          "#C0C0C0", // 실버
          "#FF69B4", // 핫핑크
          "#00CED1", // 다크터키즈
          "#9370DB", // 미디엄퍼플
          "#32CD32", // 라임그린
          "#FF1493", // 딥핑크
          "#00BFFF", // 딥스카이블루
        ],
      };

      // 파티클 생성
      const newParticles: Particle[] = [];
      const colors =
        colorPalettes[selectedEffect as keyof typeof colorPalettes];

      const particleCounts = {
        flowerPetals: 30,
        firework: 28,
        tear: 20,
        bang: 35,
        sparkle: 25,
      };

      const particleCount =
        particleCounts[selectedEffect as keyof typeof particleCounts];

      for (let i = 0; i < particleCount; i++) {
        let angle, speed, size;

        switch (selectedEffect) {
          case "flowerPetals":
            angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
            speed = 30 + Math.random() * 60;
            size = 6 + Math.random() * 10;
            break;
          case "firework":
            angle = (Math.PI * 2 * i) / particleCount;
            speed = 100 + Math.random() * 150;
            size = 4 + Math.random() * 8;
            break;
          case "tear":
            angle = (Math.PI * 2 * i) / particleCount;
            speed = 80 + Math.random() * 120;
            size = 8 + Math.random() * 15;
            break;
          case "bang":
            angle = (Math.PI * 2 * i) / particleCount;
            speed = 120 + Math.random() * 180;
            size = 5 + Math.random() * 12;
            break;
          case "sparkle":
            angle = (Math.PI * 2 * i) / particleCount;
            speed = 60 + Math.random() * 100;
            size = 3 + Math.random() * 6;
            break;
          default:
            angle = (Math.PI * 2 * i) / particleCount;
            speed = 80 + Math.random() * 120;
            size = 4 + Math.random() * 8;
        }

        newParticles.push({
          id: i,
          x: centerX,
          y: centerY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: 1,
          type: selectedEffect,
        });
      }

      setParticles(newParticles);

      // 애니메이션 완료 후 콜백
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <ParticleContainer>
      {particles.map((particle) => (
        <ParticleElement
          key={particle.id}
          x={particle.x}
          y={particle.y}
          vx={particle.vx}
          vy={particle.vy}
          size={particle.size}
          color={particle.color}
          type={particle.type}
        />
      ))}
    </ParticleContainer>
  );
};
