import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

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
  theme?: "dark" | "colorful" | "cute" | "random";
}

// 1. 부드러운 꽃잎 효과 (살랑살랑 떨어지는 꽃잎)
const gentleFloating = keyframes`
  0% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    opacity: 1;
  }
  25% {
    transform: translate(var(--vx), var(--vy)) scale(1.5) rotate(90deg);
    opacity: 0.9;
  }
  50% {
    transform: translate(calc(var(--vx) * 0.7), calc(var(--vy) * 1.2)) scale(2.2) rotate(180deg);
    opacity: 0.8;
  }
  75% {
    transform: translate(calc(var(--vx) * 0.5), calc(var(--vy) * 1.8)) scale(1.5) rotate(270deg);
    opacity: 0.5;
  }
  100% {
    transform: translate(calc(var(--vx) * 0.3), calc(var(--vy) * 2.2)) scale(1.6) rotate(360deg);
    opacity: 0;
  }
`;

// 2. 반짝이는 별 효과 (트윙클)
const twinkleStars = keyframes`
  0% {
    transform: translate(0, 0) scale(3) rotate(0deg);
    opacity: 1;
  }
  15% {
    transform: translate(var(--vx), var(--vy)) scale(3.5) rotate(45deg);
    opacity: 0.8;
  }
  30% {
    transform: translate(calc(var(--vx) * 1.2), calc(var(--vy) * 1.2)) scale(2.0) rotate(90deg);
    opacity: 1;
  }
  50% {
    transform: translate(calc(var(--vx) * 1.5), calc(var(--vy) * 1.5)) scale(3.7) rotate(180deg);
    opacity: 0.9;
  }
  70% {
    transform: translate(calc(var(--vx) * 1.8), calc(var(--vy) * 1.8)) scale(2.8) rotate(270deg);
    opacity: 0.6;
  }
  100% {
    transform: translate(calc(var(--vx) * 2.1), calc(var(--vy) * 2.1)) scale(1.5) rotate(360deg);
    opacity: 0;
  }
`;

// 3. 귀여운 하트 효과 (통통 튀는 하트)
const bouncyHearts = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }
  20% {
    transform: translate(var(--vx), var(--vy)) scale(1.4);
    opacity: 0.5;
  }
  40% {
    transform: translate(calc(var(--vx) * 1.3), calc(var(--vy) * 1.3)) scale(0.9);
    opacity: 0.4;
  }
  60% {
    transform: translate(calc(var(--vx) * 1.6), calc(var(--vy) * 1.6)) scale(1.2);
    opacity: 0.35;
  }
  80% {
    transform: translate(calc(var(--vx) * 1.9), calc(var(--vy) * 1.9)) scale(0.7);
    opacity: 0.2;
  }
  100% {
    transform: translate(calc(var(--vx) * 2.2), calc(var(--vy) * 2.2)) scale(0.1);
    opacity: 0;
  }
`;

// 4. 물방울 효과 (통통 튀는 물방울)
const waterDrops = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.6;
  }
  25% {
    transform: translate(calc(var(--vx) * 0.8), calc(var(--vy) * 0.8)) scale(1.3);
    opacity: 0.5;
  }
  50% {
    transform: translate(calc(var(--vx) * 1.2), calc(var(--vy) * 1.2)) scale(0.8);
    opacity: 0.4;
  }
  75% {
    transform: translate(calc(var(--vx) * 1.7), calc(var(--vy) * 1.7)) scale(1.1);
    opacity: 0.25;
  }
  100% {
    transform: translate(calc(var(--vx) * 2.0), calc(var(--vy) * 2.0)) scale(0.2);
    opacity: 0;
  }
`;

// 5. 캔디 조각 효과 (색깔별로 흩날리는 사탕)
const candyPieces = keyframes`
  0% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    opacity: 0.6;
  }
  30% {
    transform: translate(var(--vx), var(--vy)) scale(1.2) rotate(120deg);
    opacity: 0.5;
  }
  60% {
    transform: translate(calc(var(--vx) * 1.4), calc(var(--vy) * 1.4)) scale(0.9) rotate(240deg);
    opacity: 0.35;
  }
  100% {
    transform: translate(calc(var(--vx) * 2.0), calc(var(--vy) * 2.0)) scale(0.3) rotate(360deg);
    opacity: 0;
  }
`;

// 6. 솜사탕 구름 효과 (부드럽게 퍼지는 구름)
const cottonClouds = keyframes`
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.5;
  }
  40% {
    transform: translate(calc(var(--vx) * 0.6), calc(var(--vy) * 0.6)) scale(1.8);
    opacity: 0.35;
  }
  70% {
    transform: translate(calc(var(--vx) * 1.2), calc(var(--vy) * 1.2)) scale(1.3);
    opacity: 0.25;
  }
  100% {
    transform: translate(calc(var(--vx) * 1.8), calc(var(--vy) * 1.8)) scale(0.4);
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
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  --vx: ${(props) => props.vx}px;
  --vy: ${(props) => props.vy}px;
  pointer-events: none;

  ${(props) => {
    switch (props.type) {
      case "gentleFloating":
        return css`
          background: ${props.color};
          border-radius: 50% 10% 50% 10%;
          box-shadow: 0 0 8px ${props.color}60;
          animation: ${gentleFloating} 2s ease-out forwards;
        `;
      case "twinkleStars":
        return css`
          background: ${props.color};
          border-radius: 0;
          clip-path: polygon(
            50% 0%,
            61% 35%,
            98% 35%,
            68% 57%,
            79% 91%,
            50% 70%,
            21% 91%,
            32% 57%,
            2% 35%,
            39% 35%
          );
          box-shadow: 0 0 12px ${props.color}80;
          animation: ${twinkleStars} 1.8s ease-out forwards;
        `;
      case "bouncyHearts":
        return css`
          background: ${props.color};
          border-radius: 50%;
          position: relative;
          box-shadow: 0 0 10px ${props.color}70;
          animation: ${bouncyHearts} 1.6s ease-out forwards;

          &::before,
          &::after {
            content: "";
            width: ${props.size * 0.6}px;
            height: ${props.size * 0.8}px;
            background: ${props.color};
            border-radius: ${props.size * 0.6}px ${props.size * 0.6}px 0 0;
            position: absolute;
            left: ${props.size * 0.2}px;
            transform: rotate(-45deg);
            transform-origin: 0 100%;
          }

          &::after {
            left: 0;
            transform: rotate(45deg);
            transform-origin: 100% 100%;
          }
        `;
      case "waterDrops":
        return css`
          background: linear-gradient(
            135deg,
            ${props.color}90,
            ${props.color}60
          );
          border-radius: 50% 50% 50% 0;
          transform: rotate(45deg);
          box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.5),
            0 0 8px ${props.color}50;
          animation: ${waterDrops} 1.7s ease-out forwards;
        `;
      case "candyPieces":
        return css`
          background: linear-gradient(45deg, ${props.color}, ${props.color}80);
          border-radius: 20%;
          box-shadow: 0 0 6px ${props.color}60;
          animation: ${candyPieces} 1.9s ease-out forwards;
        `;
      case "cottonClouds":
        return css`
          background: radial-gradient(
            circle,
            ${props.color}70,
            ${props.color}40
          );
          border-radius: 50%;
          filter: blur(1px);
          box-shadow: 0 0 15px ${props.color}50;
          animation: ${cottonClouds} 2.2s ease-out forwards;
        `;
      default:
        return css`
          background: ${props.color};
          border-radius: 50%;
          box-shadow: 0 0 8px ${props.color}60;
          animation: ${gentleFloating} 2s ease-out forwards;
        `;
    }
  }}
`;

export const ParticleEffect: React.FC<ParticleEffectProps> = ({
  isVisible,
  onComplete,
  theme = "random",
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (isVisible) {
      // 화면 크기에 따른 카드 중앙 위치 계산
      const isMobile = window.innerWidth <= 480;
      const isTablet = window.innerWidth <= 768;

      let centerX = 240;
      let centerY = 300;

      if (isMobile) {
        centerX = 140;
        centerY = 185;
      } else if (isTablet) {
        centerX = 180;
        centerY = 235;
      }

      // 귀여운 테마별 효과 선택
      const effects = [
        "gentleFloating",
        "twinkleStars",
        "bouncyHearts",
        "waterDrops",
        "candyPieces",
        "cottonClouds",
      ];
      const selectedEffect =
        effects[Math.floor(Math.random() * effects.length)];

      // 깔끔하고 귀여운 색상 팔레트
      const cuteColorPalettes = {
        dark: {
          gentleFloating: [
            "#6B7280",
            "#4B5563",
            "#374151",
            "#9CA3AF",
            "#D1D5DB",
          ],
          twinkleStars: ["#E5E7EB", "#F3F4F6", "#D1D5DB", "#9CA3AF", "#6B7280"],
          bouncyHearts: ["#F87171", "#EF4444", "#DC2626", "#B91C1C", "#991B1B"],
          waterDrops: ["#60A5FA", "#3B82F6", "#2563EB", "#1D4ED8", "#1E40AF"],
          candyPieces: ["#A78BFA", "#8B5CF6", "#7C3AED", "#6D28D9", "#5B21B6"],
          cottonClouds: ["#E5E7EB", "#F3F4F6", "#F9FAFB", "#D1D5DB", "#9CA3AF"],
        },
        colorful: {
          gentleFloating: [
            "#FFD6E8",
            "#FFE4E1",
            "#FFEEF0",
            "#FFF0F5",
            "#FFE4E6",
          ],
          twinkleStars: ["#FFE066", "#FFD93D", "#FFC82C", "#FFB700", "#FF9500"],
          bouncyHearts: ["#FF69B4", "#FF1493", "#DC143C", "#B22222", "#8B0000"],
          waterDrops: ["#87CEEB", "#00BFFF", "#1E90FF", "#0080FF", "#0066CC"],
          candyPieces: ["#FF6B9D", "#FF8FA3", "#FFB3BA", "#FFC3A0", "#FFD1DC"],
          cottonClouds: ["#F0F8FF", "#E6F3FF", "#DDEEFF", "#D4E9FF", "#CCE4FF"],
        },
        cute: {
          gentleFloating: [
            "#FFE4E1",
            "#FFB6C1",
            "#FFC0CB",
            "#FFCCCB",
            "#FFD1DC",
          ],
          twinkleStars: ["#FFFACD", "#FFF8DC", "#FFFFE0", "#F0E68C", "#DDA0DD"],
          bouncyHearts: ["#FFB6C1", "#FF69B4", "#FF1493", "#DC143C", "#B22222"],
          waterDrops: ["#E0F6FF", "#B0E0E6", "#87CEEB", "#87CEFA", "#6495ED"],
          candyPieces: ["#FFE4E1", "#FFC0CB", "#FFCCCB", "#FFB6C1", "#FFA0C9"],
          cottonClouds: ["#F5F5DC", "#FFF8DC", "#FFFACD", "#F0F8FF", "#E6E6FA"],
        },
        random: {
          gentleFloating: [
            "#FFE4E1",
            "#E1F5FE",
            "#F3E5F5",
            "#E8F5E8",
            "#FFF3E0",
          ],
          twinkleStars: ["#FFFACD", "#E1F5FE", "#F3E5F5", "#E8F5E8", "#FFE4E1"],
          bouncyHearts: ["#FFB6C1", "#FF69B4", "#FF91A4", "#FFA0B4", "#FFAEC9"],
          waterDrops: ["#E1F5FE", "#B3E5FC", "#81D4FA", "#4FC3F7", "#29B6F6"],
          candyPieces: ["#F3E5F5", "#E1BEE7", "#CE93D8", "#BA68C8", "#AB47BC"],
          cottonClouds: ["#F5F5F5", "#EEEEEE", "#E0E0E0", "#BDBDBD", "#9E9E9E"],
        },
      };

      // 파티클 생성
      const newParticles: Particle[] = [];
      const colors =
        cuteColorPalettes[theme][
          selectedEffect as keyof (typeof cuteColorPalettes)[typeof theme]
        ];

      // 귀여운 파티클 개수 (적당히)
      const particleCounts = {
        gentleFloating: 15,
        twinkleStars: 12,
        bouncyHearts: 10,
        waterDrops: 14,
        candyPieces: 16,
        cottonClouds: 8,
      };

      const particleCount =
        particleCounts[selectedEffect as keyof typeof particleCounts];

      for (let i = 0; i < particleCount; i++) {
        let angle, speed, size;

        // 부드럽고 귀여운 움직임 설정 (크기 1.5배 증가)
        switch (selectedEffect) {
          case "gentleFloating":
            angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.8;
            speed = 20 + Math.random() * 35;
            size = (4 + Math.random() * 6) * 1.5;
            break;
          case "twinkleStars":
            angle = (Math.PI * 2 * i) / particleCount;
            speed = 25 + Math.random() * 40;
            size = (3 + Math.random() * 5) * 1.5;
            break;
          case "bouncyHearts":
            angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.6;
            speed = 18 + Math.random() * 30;
            size = (5 + Math.random() * 7) * 1.5;
            break;
          case "waterDrops":
            angle = (Math.PI * 2 * i) / particleCount;
            speed = 22 + Math.random() * 38;
            size = (4 + Math.random() * 6) * 1.5;
            break;
          case "candyPieces":
            angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
            speed = 24 + Math.random() * 36;
            size = (3 + Math.random() * 5) * 1.5;
            break;
          case "cottonClouds":
            angle = (Math.PI * 2 * i) / particleCount;
            speed = 15 + Math.random() * 25;
            size = (6 + Math.random() * 10) * 1.5;
            break;
          default:
            angle = (Math.PI * 2 * i) / particleCount;
            speed = 20 + Math.random() * 30;
            size = (4 + Math.random() * 6) * 1.5;
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

      // 더 길어진 애니메이션 시간에 맞춰 조정
      const timer = setTimeout(() => {
        onComplete();
      }, 2200);

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
