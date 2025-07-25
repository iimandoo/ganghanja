import { useState } from 'react';
import { useEmailService } from './useEmailService';
import { ANIMATION_DELAYS } from '@/constants';

interface UseChatReturn {
  isChatOpen: boolean;
  chatMessage: string;
  rating: number;
  showSuccessMessage: boolean;
  setChatMessage: (message: string) => void;
  setRating: (rating: number) => void;
  handleChatOpen: () => void;
  handleChatClose: () => void;
  handleRatingClick: (starValue: number) => void;
  handleChatSubmit: () => Promise<void>;
}

export const useChat = (): UseChatReturn => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const { sendChatMessage } = useEmailService();

  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setChatMessage('');
    setShowSuccessMessage(false);
    setRating(0);
  };

  const handleRatingClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleChatSubmit = async () => {
    try {
      await sendChatMessage(chatMessage, rating);
      
      // 성공 메시지 표시
      setShowSuccessMessage(true);
      setChatMessage('');

      // 3초 후 자동으로 채팅창 닫기
      setTimeout(() => {
        handleChatClose();
      }, ANIMATION_DELAYS.CHAT_AUTO_CLOSE);
    } catch (error) {
      // 에러는 useEmailService에서 처리됨
    }
  };

  return {
    isChatOpen,
    chatMessage,
    rating,
    showSuccessMessage,
    setChatMessage,
    setRating,
    handleChatOpen,
    handleChatClose,
    handleRatingClick,
    handleChatSubmit,
  };
};