import { useState } from 'react';
import { useEmailService } from './useEmailService';

interface UseModalReturn {
  isModalOpen: boolean;
  requestText: string;
  contactPhone: string;
  contactEmail: string;
  contactKakao: string;
  setRequestText: (text: string) => void;
  setContactPhone: (phone: string) => void;
  setContactEmail: (email: string) => void;
  setContactKakao: (kakao: string) => void;
  handleModalOpen: () => void;
  handleModalClose: () => void;
  handleSubmitRequest: () => Promise<void>;
}

export const useModal = (): UseModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestText, setRequestText] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactKakao, setContactKakao] = useState('');
  
  const { sendRequest } = useEmailService();

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setRequestText('');
    setContactPhone('');
    setContactEmail('');
    setContactKakao('');
  };

  const handleSubmitRequest = async () => {
    try {
      await sendRequest(requestText, {
        phone: contactPhone,
        email: contactEmail,
        kakao: contactKakao,
      });
      handleModalClose();
    } catch (error) {
      // 에러는 useEmailService에서 처리됨
    }
  };

  return {
    isModalOpen,
    requestText,
    contactPhone,
    contactEmail,
    contactKakao,
    setRequestText,
    setContactPhone,
    setContactEmail,
    setContactKakao,
    handleModalOpen,
    handleModalClose,
    handleSubmitRequest,
  };
};