import { useState } from "react";
import { submitCustomerInquiry } from "@/lib/api";
import { ANIMATION_DELAYS } from "@/constants";

interface UseChatReturn {
  isChatOpen: boolean;
  chatMessage: string;
  contactInfo: string;
  rating: number;
  showSuccessMessage: boolean;
  setChatMessage: (message: string) => void;
  setContactInfo: (contactInfo: string) => void;
  setRating: (rating: number) => void;
  handleChatOpen: () => void;
  handleChatClose: () => void;
  handleRatingClick: (starValue: number) => void;
  handleChatSubmit: () => Promise<void>;
}

export const useChat = (): UseChatReturn => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [rating, setRating] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setChatMessage("");
    setContactInfo("");
    setShowSuccessMessage(false);
    setRating(0);
  };

  const handleRatingClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleChatSubmit = async () => {
    if (!chatMessage.trim()) return;

    try {
      await submitCustomerInquiry({
        message: chatMessage,
        contactInfo: contactInfo || undefined,
        rating: rating > 0 ? rating : undefined,
        inquiryType: "chat",
      });

      // 성공 메시지 표시
      setShowSuccessMessage(true);
      setChatMessage("");
      setContactInfo("");

      // 3초 후 자동으로 채팅창 닫기
      setTimeout(() => {
        handleChatClose();
      }, ANIMATION_DELAYS.CHAT_AUTO_CLOSE);
    } catch (error) {
      console.error("Chat submission failed:", error);
      alert("메시지 전송에 실패했습니다.");
    }
  };

  return {
    isChatOpen,
    chatMessage,
    contactInfo,
    rating,
    showSuccessMessage,
    setChatMessage,
    setContactInfo,
    setRating,
    handleChatOpen,
    handleChatClose,
    handleRatingClick,
    handleChatSubmit,
  };
};
