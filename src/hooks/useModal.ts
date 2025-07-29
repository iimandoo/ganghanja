import { useState } from "react";
import { submitCustomerInquiry } from "@/lib/api";

interface UseModalReturn {
  isModalOpen: boolean;
  requestText: string;
  contactInfo: string;
  setRequestText: (text: string) => void;
  setContactInfo: (contactInfo: string) => void;
  handleModalOpen: () => void;
  handleModalClose: () => void;
  handleSubmitRequest: () => Promise<void>;
}

export const useModal = (): UseModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestText, setRequestText] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setRequestText("");
    setContactInfo("");
  };

  const handleSubmitRequest = async () => {
    if (!requestText.trim()) {
      alert("요청 내용을 입력해주세요.");
      return;
    }

    try {
      await submitCustomerInquiry({
        message: requestText,
        contactInfo: contactInfo || undefined,
        inquiryType: "request",
      });

      alert("요청이 성공적으로 전송되었습니다!");
      handleModalClose();
    } catch (error) {
      console.error("Request submission failed:", error);
      alert("요청 전송에 실패했습니다.");
    }
  };

  return {
    isModalOpen,
    requestText,
    contactInfo,
    setRequestText,
    setContactInfo,
    handleModalOpen,
    handleModalClose,
    handleSubmitRequest,
  };
};
