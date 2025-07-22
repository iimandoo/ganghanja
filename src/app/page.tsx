"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HanjaCard from "@/components/HanjaCard";
import { hanjaData, HanjaData } from "@/data/hanjaData";

const Container = styled.main`
  min-height: 100vh;
  background: #f8fafc;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    margin-bottom: 32px;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 800;
  color: #1e293b;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: 768px) {
    font-size: 2.8rem;
    margin-bottom: 12px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #64748b;
  margin: 0;
  font-weight: 500;
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  max-width: 600px;

  @media (max-width: 768px) {
    gap: 32px;
  }
`;

const CardSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    gap: 20px;
  }
`;

const CardCounter = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 16px 32px;
  color: #374151;
  font-weight: 600;
  font-size: 1.3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 1.1rem;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  background: ${(props) =>
    props.$variant === "secondary" ? "#ffffff" : "#3b82f6"};
  color: ${(props) => (props.$variant === "secondary" ? "#374151" : "white")};
  border: ${(props) =>
    props.$variant === "secondary" ? "1px solid #e2e8f0" : "none"};
  padding: 16px 32px;
  border-radius: 24px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  font-family: "Noto Sans KR", sans-serif;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    background: ${(props) =>
      props.$variant === "secondary" ? "#f8fafc" : "#2563eb"};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 14px 24px;
    font-size: 1rem;
    border-radius: 20px;
  }
`;

const ShuffleButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 16px 24px;
  font-size: 1.1rem;
  background: #1e293b;
  border: none;
  color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(30, 41, 59, 0.15);
  font-weight: 600;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(30, 41, 59, 0.25);
    background: #334155;
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    top: 16px;
    right: 16px;
    padding: 12px 20px;
    font-size: 1rem;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 20px;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: #3b82f6;
  border-radius: 3px;
  transition: width 0.3s ease;
  width: ${(props) => props.$progress}%;
`;

const LevelFilter = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    gap: 8px;
    margin-bottom: 16px;
  }
`;

const LevelButton = styled.button<{ $active: boolean }>`
  background: ${(props) => (props.$active ? "#3b82f6" : "#ffffff")};
  color: ${(props) => (props.$active ? "white" : "#64748b")};
  border: 2px solid ${(props) => (props.$active ? "#3b82f6" : "#e2e8f0")};
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Noto Sans KR", sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    background: ${(props) => (props.$active ? "#2563eb" : "#f8fafc")};
    border-color: ${(props) => (props.$active ? "#2563eb" : "#cbd5e1")};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 20px;
  }
`;

const SideButton = styled(Button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  min-width: 70px;
  height: 70px;
  padding: 0;
  border-radius: 50%;
  font-size: 2rem;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  color: #64748b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;

  &.previous {
    left: -110px;
  }

  &.next {
    right: -110px;
  }

  &:hover {
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    background: #f8fafc;
    border-color: #cbd5e1;
    color: #475569;
  }

  &:active {
    transform: translateY(-50%) scale(0.95);
  }

  @media (max-width: 768px) {
    min-width: 60px;
    height: 60px;
    font-size: 1.6rem;

    &.previous {
      left: -80px;
    }

    &.next {
      right: -80px;
    }
  }

  @media (max-width: 480px) {
    &.previous {
      left: -70px;
    }

    &.next {
      right: -70px;
    }
  }
`;

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredData, setFilteredData] = useState<HanjaData[]>(hanjaData);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());
  const [resetCardFlip, setResetCardFlip] = useState(false);

  const levels = ["8급", "7급", "6급", "준5급", "5급"];

  useEffect(() => {
    if (selectedLevel) {
      const filtered = hanjaData.filter(
        (hanja) => hanja.level === selectedLevel
      );
      setFilteredData(filtered);
      setCurrentIndex(0);
      setUsedIndices(new Set());
      // 급수 변경 시에도 카드 리셋
      setResetCardFlip(true);
      setTimeout(() => setResetCardFlip(false), 100);
    } else {
      setFilteredData(hanjaData);
    }
  }, [selectedLevel]);

  const getRandomIndex = () => {
    if (usedIndices.size >= filteredData.length) {
      setUsedIndices(new Set());
      return Math.floor(Math.random() * filteredData.length);
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * filteredData.length);
    } while (usedIndices.has(randomIndex));

    return randomIndex;
  };

  const handleNext = () => {
    const nextIndex = getRandomIndex();
    setCurrentIndex(nextIndex);
    setUsedIndices((prev) => new Set(prev).add(nextIndex));
    // 다음 버튼 클릭 시 카드 리셋
    setResetCardFlip(true);
    setTimeout(() => setResetCardFlip(false), 100);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredData.length - 1);
    }
    // 이전 버튼 클릭 시 카드 리셋
    setResetCardFlip(true);
    setTimeout(() => setResetCardFlip(false), 100);
  };

  const handleShuffle = () => {
    setUsedIndices(new Set());
    const randomIndex = Math.floor(Math.random() * filteredData.length);
    setCurrentIndex(randomIndex);
    setUsedIndices(new Set([randomIndex]));
    // 섞기 버튼 클릭 시 카드 리셋
    setResetCardFlip(true);
    setTimeout(() => setResetCardFlip(false), 100);
  };

  const handleLevelFilter = (level: string) => {
    if (selectedLevel === level) {
      setSelectedLevel(null);
    } else {
      setSelectedLevel(level);
    }
  };

  const progress = (usedIndices.size / filteredData.length) * 100;

  if (filteredData.length === 0) {
    return (
      <Container>
        <Title>한자 카드 게임</Title>
        <Subtitle>데이터를 불러오는 중...</Subtitle>
      </Container>
    );
  }

  return (
    <Container>
      <ShuffleButton onClick={handleShuffle} $variant="secondary">
        🔀 섞기
      </ShuffleButton>

      <Header>
        <Title> 한자 카드 게임</Title>
      </Header>

      <LevelFilter>
        {levels.map((level) => (
          <LevelButton
            key={level}
            $active={selectedLevel === level}
            onClick={() => handleLevelFilter(level)}
          >
            {level}
          </LevelButton>
        ))}
      </LevelFilter>

      <GameArea>
        <CardSection>
          <SideButton
            className="previous"
            $variant="secondary"
            onClick={handlePrevious}
          >
            ←
          </SideButton>

          <HanjaCard
            hanja={filteredData[currentIndex]}
            resetFlip={resetCardFlip}
          />

          <SideButton className="next" onClick={handleNext}>
            →
          </SideButton>
        </CardSection>

        <ProgressBar>
          <ProgressFill $progress={progress} />
        </ProgressBar>
      </GameArea>
    </Container>
  );
}
