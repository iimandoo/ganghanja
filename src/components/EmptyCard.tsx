"use client";

import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

interface EmptyCardProps {
  reason: "no-level-selected" | "no-visible-cards" | "all-hidden";
}

const EmptyCard: React.FC<EmptyCardProps> = ({ reason }) => {
  const getContent = () => {
    switch (reason) {
      case "no-level-selected":
        return {
          icon: "📚",
          title: "급수를 선택해주세요",
          description: "학습할 급수를 선택하면 한자 카드가 표시되요.",
        };
      case "no-visible-cards":
        return {
          icon: "🙈",
          title: "모든 카드가 숨겨졌어요",
          description: "숨김 해제 버튼을 클릭하여 카드를 다시 보실 수 있어요.",
        };
      case "all-hidden":
        return {
          icon: "✨",
          title: "모든 카드를 학습했어요",
          description: "다른 급수를 선택하거나 숨긴 카드를 해제해보세요.",
        };
      default:
        return {
          icon: "❓",
          title: "카드를 불러올 수 없어요",
          description: "잠시 후 다시 시도해주세요.",
        };
    }
  };

  const content = getContent();

  return (
    <CardContainer>
      <CardContent>
        <Icon>{content.icon}</Icon>
        <Title>{content.title}</Title>
        <Description>{content.description}</Description>
        {reason === "no-visible-cards" && (
          <Hint>위의 숨김 해제 버튼을 클릭해보세요!</Hint>
        )}
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 480px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const CardContent = styled.div`
  background: linear-gradient(135deg, #f8fdf8 0%, #f0fdf4 50%, #ecfdf5 100%);
  border: 2px solid ${theme.colors.gray.border};
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  box-sizing: border-box;
  text-align: center;

  @media (max-width: 768px) {
    padding: 24px;
    border-radius: 20px;
  }
`;

const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 3rem;
    margin-bottom: 16px;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: ${theme.fontWeight.semibold};
  color: ${theme.colors.secondary.main};
  margin-bottom: 16px;
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${theme.colors.gray.medium};
  margin-bottom: 20px;
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 16px;
  }
`;

const Hint = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid ${theme.colors.primary.light};
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 0.9rem;
  color: ${theme.colors.secondary.dark};
  font-weight: ${theme.fontWeight.medium};
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 10px 14px;
  }
`;

export default EmptyCard;
