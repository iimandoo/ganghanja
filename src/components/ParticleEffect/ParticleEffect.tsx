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
  theme?: 'dark' | 'colorful' | 'cute' | 'random';
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

// 6. 리본 효과 (리본이 날아가는 느낌)
const ribbon = keyframes`
  0% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: translate(var(--vx), var(--vy)) scale(1.3) rotate(180deg);
    opacity: 0.9;
  }
  50% {
    transform: translate(calc(var(--vx) * 1.5), calc(var(--vy) * 1.5)) scale(0.8) rotate(360deg);
    opacity: 0.8;
  }
  100% {
    transform: translate(calc(var(--vx) * 2.5), calc(var(--vy) * 2.5)) scale(0.2) rotate(720deg);
    opacity: 0;
  }
`;

// 7. 폭탄 터지는 효과 (강력한 폭발과 잔해)
const bomb = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  10% {
    transform: translate(calc(var(--vx) * 0.3), calc(var(--vy) * 0.3)) scale(2.5);
    opacity: 0.9;
  }
  30% {
    transform: translate(calc(var(--vx) * 0.8), calc(var(--vy) * 0.8)) scale(1.8);
    opacity: 0.7;
  }
  70% {
    transform: translate(calc(var(--vx) * 2), calc(var(--vy) * 2)) scale(0.8);
    opacity: 0.4;
  }
  100% {
    transform: translate(calc(var(--vx) * 3), calc(var(--vy) * 3)) scale(0.1);
    opacity: 0;
  }
`;

// 8. 기다란 꽃가루 효과 (길쭉한 형태로 날아감)
const longPollen = keyframes`
  0% {
    transform: translate(0, 0) scale(1, 3) rotate(0deg);
    opacity: 1;
  }
  40% {
    transform: translate(var(--vx), var(--vy)) scale(1.2, 4) rotate(90deg);
    opacity: 0.8;
  }
  80% {
    transform: translate(calc(var(--vx) * 2), calc(var(--vy) * 2)) scale(0.6, 2) rotate(180deg);
    opacity: 0.5;
  }
  100% {
    transform: translate(calc(var(--vx) * 2.8), calc(var(--vy) * 2.8)) scale(0.1, 0.5) rotate(270deg);
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
  overflow: hidden;
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
      case "ribbon":
        return "20px 5px"; // 길쭉한 리본 모양
      case "bomb":
        return "30% 70%"; // 불규칙한 폭발 잔해
      case "longPollen":
        return "50%"; // 원형이지만 scale로 길쭉하게
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
        case "ribbon":
          return ribbon;
        case "bomb":
          return bomb;
        case "longPollen":
          return longPollen;
        default:
          return flowerPetals;
      }
    }}
    1.5s ease-out forwards;
  box-shadow: 0 0 ${(props) => props.type === 'bomb' ? '16px' : '12px'} ${(props) => props.color};
  filter: blur(${(props) => props.type === 'longPollen' ? '1px' : '0.5px'});
`;

export const ParticleEffect: React.FC<ParticleEffectProps> = ({
  isVisible,
  onComplete,
  theme = 'random',
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

      // 테마별 효과 선택
      const effects = ["flowerPetals", "firework", "tear", "bang", "sparkle", "ribbon", "bomb", "longPollen"];
      const selectedEffect = effects[Math.floor(Math.random() * effects.length)];

      // 테마별 색상 팔레트 정의
      const themeColorPalettes = {
        dark: {
          flowerPetals: ["#2C3E50", "#34495E", "#4A4A4A", "#5D4037", "#424242", "#37474F", "#455A64"],
          firework: ["#1A1A1A", "#2C2C2C", "#3E3E3E", "#4A4A4A", "#1E3A8A", "#7C2D12", "#0F172A"],
          tear: ["#1C1C1C", "#2D2D2D", "#3A3A3A", "#4F4F4F", "#1A202C", "#2D3748"],
          bang: ["#B91C1C", "#991B1B", "#7F1D1D", "#450A0A", "#1F2937", "#111827"],
          sparkle: ["#374151", "#4B5563", "#6B7280", "#9CA3AF", "#1F2937"],
          ribbon: ["#4B5563", "#374151", "#1F2937", "#111827", "#0F172A"],
          bomb: ["#7F1D1D", "#991B1B", "#B91C1C", "#DC2626", "#1C1C1C"],
          longPollen: ["#6B7280", "#4B5563", "#374151", "#1F2937"]
        },
        colorful: {
          flowerPetals: ["#FF6B9D", "#FFA726", "#66BB6A", "#42A5F5", "#AB47BC", "#FFCA28", "#EF5350", "#26C6DA"],
          firework: ["#FF1744", "#FF9100", "#FFEA00", "#00E676", "#00BCD4", "#3F51B5", "#9C27B0", "#E91E63"],
          tear: ["#FF5722", "#FF9800", "#FFC107", "#CDDC39", "#8BC34A", "#4CAF50"],
          bang: ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3"],
          sparkle: ["#FFD700", "#FF69B4", "#00CED1", "#32CD32", "#FF1493", "#00BFFF", "#FFB347"],
          ribbon: ["#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#00BCD4"],
          bomb: ["#FF5722", "#FF9800", "#FFC107", "#FFEB3B", "#CDDC39"],
          longPollen: ["#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#E91E63"]
        },
        cute: {
          flowerPetals: ["#FFB3D9", "#FFD1DC", "#FFEAA7", "#DDA0DD", "#FFE4E1", "#F0E68C", "#FFDAB9"],
          firework: ["#FF69B4", "#FFB6C1", "#FFC0CB", "#FFCCCB", "#FFE4E1", "#F0E68C", "#E6E6FA"],
          tear: ["#DDBEA9", "#CB997E", "#A5A58D", "#B7B7A4", "#D4A574"],
          bang: ["#FF91A4", "#FFB3BA", "#FFC3A0", "#FFDAC1", "#E2F0CB"],
          sparkle: ["#FFD700", "#FF69B4", "#DDA0DD", "#F0E68C", "#FFE4E1", "#FFDAB9"],
          ribbon: ["#FF69B4", "#FFB6C1", "#DDA0DD", "#E6E6FA", "#F0E68C"],
          bomb: ["#FFB3BA", "#FFC3A0", "#FFDAC1", "#E2F0CB", "#B5EAD7"],
          longPollen: ["#FFCCCB", "#FFDAB9", "#F0E68C", "#DDA0DD"]
        },
        random: {
          flowerPetals: ["#FFB3BA", "#FFC3A0", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA", "#F7D794", "#F8B5D1"],
          firework: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#FFB347", "#87CEEB"],
          tear: ["#8B4513", "#A0522D", "#CD853F", "#D2691E", "#B8860B", "#DAA520", "#BDB76B", "#F4A460"],
          bang: ["#FF0000", "#FF4500", "#FF6347", "#FF7F50", "#FF8C00", "#FFA500", "#FFD700", "#FFFF00"],
          sparkle: ["#FFD700", "#C0C0C0", "#FF69B4", "#00CED1", "#9370DB", "#32CD32", "#FF1493", "#00BFFF"],
          ribbon: ["#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#00BCD4"],
          bomb: ["#FF5722", "#FF9800", "#FFC107", "#FFEB3B", "#CDDC39"],
          longPollen: ["#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#E91E63"]
        }
      };

      // 파티클 생성
      const newParticles: Particle[] = [];
      const colors = themeColorPalettes[theme][selectedEffect as keyof typeof themeColorPalettes[typeof theme]];

      const particleCounts = {
        flowerPetals: 30,
        firework: 28,
        tear: 20,
        bang: 35,
        sparkle: 25,
        ribbon: 22,
        bomb: 40,
        longPollen: 18,
      };

      const particleCount =
        particleCounts[selectedEffect as keyof typeof particleCounts];

      for (let i = 0; i < particleCount; i++) {
        let angle, speed, size;

        switch (selectedEffect) {
          case "flowerPetals":
            angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
            speed = 25 + Math.random() * 45; // 축소
            size = 4 + Math.random() * 8; // 축소
            break;
          case "firework":
            angle = (Math.PI * 2 * i) / particleCount;
            speed = 70 + Math.random() * 100; // 축소
            size = 3 + Math.random() * 6; // 축소
            break;
          case "tear":
            angle = (Math.PI * 2 * i) / particleCount;
            speed = 60 + Math.random() * 90; // 축소
            size = 6 + Math.random() * 10; // 축소
            break;
          case "bang":
            angle = (Math.PI * 2 * i) / particleCount;
            speed = 80 + Math.random() * 120; // 축소
            size = 4 + Math.random() * 8; // 축소
            break;
          case "sparkle":
            angle = (Math.PI * 2 * i) / particleCount;
            speed = 50 + Math.random() * 80; // 축소
            size = 2 + Math.random() * 5; // 축소
            break;
          case "ribbon":
            angle = (Math.PI * 2 * i) / particleCount;
            speed = 55 + Math.random() * 85; // 축소
            size = 6 + Math.random() * 12; // 축소
            break;
          case "bomb":
            angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.8;
            speed = 90 + Math.random() * 130; // 축소
            size = 5 + Math.random() * 12; // 축소
            break;
          case "longPollen":
            angle = (Math.PI * 2 * i) / particleCount;
            speed = 40 + Math.random() * 70; // 축소
            size = 3 + Math.random() * 6; // 축소
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
  }, [isVisible, onComplete, theme]);

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