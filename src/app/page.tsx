"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HanjaCard from "@/components/HanjaCard";
import { hanjaData, HanjaData } from "@/data/hanjaData";
import emailjs from "@emailjs/browser";
import { IoShuffle, IoMail, IoChatbubbleEllipses, IoClose, IoSend, IoStar, IoStarOutline } from "react-icons/io5";

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
  font-size: 3.5rem;
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
    props.$variant === "secondary"
      ? "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)"
      : "linear-gradient(135deg, #2d3748 0%, #1a202c 100%)"};
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: none;
  font-family: "Noto Sans KR", sans-serif;

  &:hover {
    background: ${(props) =>
      props.$variant === "secondary"
        ? "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)"
        : "linear-gradient(135deg, #4a5568 0%, #2d3748 100%)"};
    transform: none;
  }

  &:active {
    background: ${(props) =>
      props.$variant === "secondary"
        ? "linear-gradient(135deg, #4b5563 0%, #374151 100%)"
        : "linear-gradient(135deg, #1a202c 0%, #171923 100%)"};
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 0.9rem;
    border-radius: 6px;
  }
`;

const ButtonBox = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

const ShuffleButton = styled(Button)`
  padding: 5px 10px;
  font-size: 1rem;
  background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
  border: none;
  color: white;
  border-radius: 8px;
  box-shadow: none;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
    transform: none;
  }

  &:active {
    background: linear-gradient(135deg, #1a202c 0%, #171923 100%);
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    top: 16px;
    right: 16px;
    padding: 10px 16px;
    font-size: 0.9rem;
    border-radius: 6px;
    gap: 6px;
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
  padding: 5px 10px;
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

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  position: relative;

  @media (max-width: 768px) {
    padding: 32px;
    margin: 20px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  color: #1e293b;
  margin-bottom: 24px;
  text-align: center;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px;
  font-size: 0.95rem;
  font-family: "Noto Sans KR", sans-serif;
  resize: vertical;
  margin-bottom: 20px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ContactSection = styled.div`
  margin-bottom: 20px;
`;

const ContactLabel = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 8px;
  font-family: "Noto Sans KR", sans-serif;
`;

const ContactInput = styled.input`
  width: 100%;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.9rem;
  font-family: "Noto Sans KR", sans-serif;
  margin-bottom: 12px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

// 플로팅 채팅 버튼
const FloatingChatButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 55px;
    height: 55px;
    bottom: 25px;
    right: 25px;
    font-size: 1.3rem;
  }
`;

// 채팅 레이어
const ChatOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 20px;
`;

const ChatContainer = styled.div`
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  @media (max-width: 768px) {
    max-width: 350px;
    height: 450px;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ChatCloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
    width: 28px;
    height: 28px;
  }
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 12px;
  }
`;

const ChatMessage = styled.div`
  background: #f1f5f9;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 0.95rem;
  line-height: 1.5;
  color: #475569;
  font-family: "Noto Sans KR", sans-serif;
`;

const ChatInputArea = styled.div`
  padding: 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ChatTextArea = styled.textarea`
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  font-size: 0.95rem;
  font-family: "Noto Sans KR", sans-serif;
  resize: none;
  height: 80px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }

  @media (max-width: 768px) {
    height: 70px;
    padding: 10px;
    font-size: 0.9rem;
  }
`;

const ChatSendButton = styled.button`
width:100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Noto Sans KR", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  align-self: flex-end;

  &:hover {
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 10px 18px;
    font-size: 0.9rem;
  }
`;

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 0.95rem;
  text-align: center;
  font-weight: 500;
  font-family: "Noto Sans KR", sans-serif;
`;

// 별점 관련 스타일
const RatingSection = styled.div`
  background: #ffffff;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    padding: 12px;
    margin-bottom: 12px;
  }
`;

const StarContainer = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
`;

const StarButton = styled.button<{ $filled: boolean }>`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => (props.$filled ? "#fbbf24" : "#d1d5db")};
  font-size: 1.5rem;
  transition: all 0.2s ease;
  padding: 2px;
  border-radius: 4px;

  &:hover {
    color: #fbbf24;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const RatingText = styled.span`
  margin-left: 8px;
  font-size: 0.9rem;
  color: #6b7280;
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // 초기에는 모든 급수의 카드를 랜덤으로 섞어서 표시
  const [filteredData, setFilteredData] = useState<HanjaData[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([
    "8급",
    "7급",
    "6급",
    "준5급",
    "5급",
  ]);
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set());
  const [resetCardFlip, setResetCardFlip] = useState(false);
  const [history, setHistory] = useState<number[]>([0]); // 한자 인덱스 히스토리
  const [historyPosition, setHistoryPosition] = useState(0); // 현재 히스토리 위치
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactKakao, setContactKakao] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 채팅 관련 상태
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [isChatSubmitting, setIsChatSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [rating, setRating] = useState(0);

  const levels = ["8급", "7급", "6급", "준5급", "5급"];

  // EmailJS 초기화
  useEffect(() => {
    // 실제 사용 시에는 환경 변수나 설정 파일에서 가져오세요
    emailjs.init(
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
    );
  }, []);

  // 초기 데이터 설정: 모든 급수 카드를 랜덤으로 섞어서 표시
  useEffect(() => {
    const shuffledData = [...hanjaData].sort(() => Math.random() - 0.5);
    setFilteredData(shuffledData);
    setCurrentIndex(0);
    setHistory([0]);
    setHistoryPosition(0);
  }, []);

  useEffect(() => {
    // selectedLevels 값이 변하면 모든 상태를 초기화
    if (selectedLevels.length > 0) {
      const filtered = hanjaData
        .filter((hanja) => selectedLevels.includes(hanja.level))
        .sort((a, b) =>
          a.meaningKey.localeCompare(b.meaningKey, "ko-KR", {
            caseFirst: "lower",
            sensitivity: "base",
          })
        );
      setFilteredData(filtered);
    } else {
      // 전체 보기 시에는 다시 랜덤으로 섞기
      const shuffledData = [...hanjaData].sort(() => Math.random() - 0.5);
      setFilteredData(shuffledData);
    }

    // 모든 관련 상태를 완전히 초기화
    setCurrentIndex(0);
    setUsedIndices(new Set());
    setHistory([0]); // 히스토리 초기화
    setHistoryPosition(0); // 히스토리 위치 초기화

    // 카드 플립 상태 리셋
    setResetCardFlip(true);
    setTimeout(() => setResetCardFlip(false), 100);
  }, [selectedLevels]);

  // 랜덤 인덱스 함수는 섞기 기능에서만 사용
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
    // 히스토리의 끝에 있거나 히스토리 중간에 있는 경우
    if (historyPosition >= history.length - 1) {
      // filteredData 순서대로 다음 인덱스 생성
      const nextIndex = (currentIndex + 1) % filteredData.length;
      setCurrentIndex(nextIndex);
      setUsedIndices((prev) => new Set(prev).add(nextIndex));

      // 히스토리 업데이트
      const newHistory = [...history.slice(0, historyPosition + 1), nextIndex];
      setHistory(newHistory);
      setHistoryPosition(newHistory.length - 1);
    } else {
      // 히스토리에서 다음 항목으로 이동
      const nextPosition = historyPosition + 1;
      setCurrentIndex(history[nextPosition]);
      setHistoryPosition(nextPosition);
    }

    // 다음 버튼 클릭 시 카드 리셋
    setResetCardFlip(true);
    setTimeout(() => setResetCardFlip(false), 100);
  };

  const handlePrevious = () => {
    // 히스토리에서 이전 항목이 있는 경우
    if (historyPosition > 0) {
      const prevPosition = historyPosition - 1;
      setCurrentIndex(history[prevPosition]);
      setHistoryPosition(prevPosition);

      // 이전 버튼 클릭 시 카드 리셋
      setResetCardFlip(true);
      setTimeout(() => setResetCardFlip(false), 100);
    }
    // 이전 항목이 없으면 아무것도 하지 않음
  };

  const handleShuffle = () => {
    if (selectedLevels.length > 0) {
      // 선택된 급수들이 있으면 해당 급수의 카드들만 랜덤 섞기
      const filtered = hanjaData.filter((hanja) =>
        selectedLevels.includes(hanja.level)
      );
      const shuffledData = [...filtered].sort(() => Math.random() - 0.5);
      setFilteredData(shuffledData);
    } else {
      // 전체 보기 상태면 모든 카드를 랜덤 섞기
      const shuffledData = [...hanjaData].sort(() => Math.random() - 0.5);
      setFilteredData(shuffledData);
    }

    setUsedIndices(new Set());
    const randomIndex = 0; // 섞은 후 첫 번째 카드로 시작
    setCurrentIndex(randomIndex);
    setUsedIndices(new Set([randomIndex]));

    // 히스토리 초기화하고 새로운 인덱스로 시작
    setHistory([randomIndex]);
    setHistoryPosition(0);

    // 섞기 버튼 클릭 시 카드 리셋
    setResetCardFlip(true);
    setTimeout(() => setResetCardFlip(false), 100);
  };

  const handleLevelFilter = (level: string) => {
    if (selectedLevels.includes(level)) {
      // 이미 선택된 급수면 제거
      setSelectedLevels(selectedLevels.filter((l) => l !== level));
    } else {
      // 선택되지 않은 급수면 추가
      setSelectedLevels([...selectedLevels, level]);
    }
  };

  const progress = (usedIndices.size / filteredData.length) * 100;

  const handleRequestClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setRequestText("");
    setContactPhone("");
    setContactEmail("");
    setContactKakao("");
  };

  const handleSubmitRequest = async () => {
    if (!requestText.trim()) {
      alert("요청 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    // 디버깅용 환경 변수 확인
    console.log("환경 변수 확인:", {
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
    });

    try {
      // 연락처 정보를 메시지에 포함
      const contactInfo = [];
      if (contactPhone.trim()) contactInfo.push(`전화번호: ${contactPhone}`);
      if (contactEmail.trim()) contactInfo.push(`이메일: ${contactEmail}`);
      if (contactKakao.trim()) contactInfo.push(`카카오톡 ID: ${contactKakao}`);

      const fullMessage = `${requestText}${
        contactInfo.length > 0
          ? "\n\n=== 연락처 정보 ===\n" + contactInfo.join("\n")
          : ""
      }`;

      const templateParams = {
        to_name: "관리자",
        to_email: "euneundh@gmail.com",
        from_name: "한자카드게임 사용자",
        from_email: "noreply@hanjacard.com",
        subject: "[한자카드게임] 사용자 요청사항",
        message: fullMessage,
        reply_to: "noreply@hanjacard.com",
      };

      console.log("전송 파라미터:", templateParams);

      // 직접 이메일 전송 시도
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );

      console.log("전송 성공:", result);
      alert("요청이 성공적으로 전송되었습니다!");
      handleModalClose();
    } catch (error: unknown) {
      console.error("이메일 전송 실패:", error);

      let errorMessage = "요청 전송에 실패했습니다.";

      if (error && typeof error === "object") {
        const emailError = error as {
          status?: number;
          text?: string;
          message?: string;
        };

        if (emailError.status === 400) {
          errorMessage += " 설정을 확인해주세요.";
        } else if (emailError.status === 401) {
          errorMessage += " 인증에 실패했습니다. Public Key를 확인해주세요.";
        } else if (emailError.status === 404) {
          errorMessage += " 서비스 또는 템플릿을 찾을 수 없습니다.";
        } else if (emailError.text) {
          errorMessage += ` (${emailError.text})`;
        }
      }

      alert(errorMessage + " 개발자 도구 콘솔을 확인해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 채팅 관련 함수들
  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setChatMessage("");
    setShowSuccessMessage(false);
    setRating(0);
  };

  const handleRatingClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleChatSubmit = async () => {
    if (!chatMessage.trim()) {
      return;
    }

    setIsChatSubmitting(true);

    try {
      // 별점을 메시지에 포함
      const ratingText = rating > 0 ? `\n\n⭐ 별점: ${rating}/5점 (${"★".repeat(rating)}${"☆".repeat(5-rating)})` : "";
      const fullMessage = `${chatMessage}${ratingText}`;
console.log('fullMessage',fullMessage)
      const templateParams = {
        to_name: "관리자",
        to_email: "euneundh@gmail.com",
        from_name: "한자카드게임 사용자 (채팅)",
        from_email: "noreply@hanjacard.com",
        subject: "[한자카드게임] 채팅 문의",
        message: fullMessage,
        reply_to: "noreply@hanjacard.com",
      };

      console.log("채팅 전송 파라미터:", templateParams);

      // EmailJS로 이메일 전송
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY"
      );

      console.log("채팅 전송 성공:", result);
      
      // 성공 메시지 표시
      setShowSuccessMessage(true);
      setChatMessage("");
      
      // 3초 후 자동으로 채팅창 닫기
      setTimeout(() => {
        handleChatClose();
      }, 3000);
      
    } catch (error: unknown) {
      console.error("채팅 전송 실패:", error);
      
      let errorMessage = "메시지 전송에 실패했습니다.";
      
      if (error && typeof error === "object") {
        const emailError = error as {
          status?: number;
          text?: string;
          message?: string;
        };

        if (emailError.status === 400) {
          errorMessage += " 설정을 확인해주세요.";
        } else if (emailError.status === 401) {
          errorMessage += " 인증에 실패했습니다.";
        } else if (emailError.status === 404) {
          errorMessage += " 서비스를 찾을 수 없습니다.";
        } else if (emailError.text) {
          errorMessage += ` (${emailError.text})`;
        }
      }

      alert(errorMessage);
    } finally {
      setIsChatSubmitting(false);
    }
  };

  if (filteredData.length === 0) {
    return (
      <Container>
        <Title>대한검정회 한자카드</Title>
        <Subtitle>데이터를 불러오는 중...</Subtitle>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title> 대한검정회 한자카드</Title>
      </Header>

      <LevelFilter>
        {levels.map((level) => (
          <LevelButton
            key={level}
            $active={selectedLevels.includes(level)}
            onClick={() => handleLevelFilter(level)}
          >
            {level}
          </LevelButton>
        ))}
        <ShuffleButton onClick={handleShuffle} $variant="secondary">
          <IoShuffle size={18} />
          랜덤 섞기
        </ShuffleButton>
      </LevelFilter>

      <GameArea>
        <CardSection>
          <SideButton
            className="previous"
            $variant="secondary"
            onClick={handlePrevious}
            disabled={historyPosition <= 0}
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

      <ModalOverlay $isOpen={isModalOpen} onClick={handleModalClose}>
        <Modal onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleModalClose}>×</CloseButton>
          <ModalTitle>기능 요청 및 건의사항</ModalTitle>
          <TextArea
            value={requestText}
            onChange={(e) => setRequestText(e.target.value)}
            placeholder="원하시는 기능이나 개선사항을 자유롭게 적어주세요.&#10;&#10;예:&#10;- 새로운 급수 추가&#10;- 학습 진도 저장 기능&#10;- 틀린 문제 다시보기&#10;- 기타 건의사항"
          />

          <ContactSection>
            <ContactLabel>연락처 정보 (선택사항)</ContactLabel>
            <ContactInput
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="전화번호 (예: 010-1234-5678)"
            />
            <ContactInput
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              placeholder="이메일 주소"
            />
            <ContactInput
              type="text"
              value={contactKakao}
              onChange={(e) => setContactKakao(e.target.value)}
              placeholder="카카오톡 ID"
            />
          </ContactSection>

          <ModalButtons>
            <Button $variant="secondary" onClick={handleModalClose}>
              취소
            </Button>
            <Button onClick={handleSubmitRequest} disabled={isSubmitting}>
              {isSubmitting ? "전송 중..." : "전송하기"}
            </Button>
          </ModalButtons>
        </Modal>
      </ModalOverlay>

      {/* 플로팅 채팅 버튼 */}
      <FloatingChatButton onClick={handleChatOpen}>
        <IoChatbubbleEllipses />
      </FloatingChatButton>

      {/* 채팅 레이어 */}
      <ChatOverlay $isOpen={isChatOpen} onClick={handleChatClose}>
        <ChatContainer onClick={(e) => e.stopPropagation()}>
          <ChatHeader>
            <ChatTitle>CS</ChatTitle>
            <ChatCloseButton onClick={handleChatClose}>
              <IoClose />
            </ChatCloseButton>
          </ChatHeader>
          
          <ChatBody>
            
            
            <ChatMessage>
              안녕하세요! 요청사항, 궁금한사항을 편하게 적어주세요. 연락처나 이메일주소를 함께 알려주시면 답변드릴께요!
            </ChatMessage>
            
            {showSuccessMessage &&(
              <SuccessMessage>
                보냈어요!
              </SuccessMessage>
            )}
          </ChatBody>
          
          <ChatInputArea>
           
            <ChatTextArea
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="요청사항, 궁금한사항을 편하게 적어주세요..."
              disabled={isChatSubmitting || showSuccessMessage}
            /> {!showSuccessMessage &&
            <StarContainer>
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <StarButton
                    key={starValue}
                    $filled={starValue <= rating}
                    onClick={() => handleRatingClick(starValue)}
                  >
                    {starValue <= rating ? <IoStar /> : <IoStarOutline />}
                  </StarButton>
                ))}
              </StarContainer>}
            <ChatSendButton
              onClick={handleChatSubmit}
              disabled={isChatSubmitting || showSuccessMessage || !chatMessage.trim()}
            >
              {isChatSubmitting ? (
                "보내는 중..."
              ) : (
                <>
                  <IoSend />
                  보내기
                </>
              )}
            </ChatSendButton>
          </ChatInputArea>
        </ChatContainer>
      </ChatOverlay>
    </Container>
  );
}
