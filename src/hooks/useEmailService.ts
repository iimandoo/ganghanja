import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { EMAIL_CONFIG, MESSAGES } from '@/constants';

interface ContactInfo {
  phone: string;
  email: string;
  kakao: string;
}

interface UseEmailServiceReturn {
  isSubmitting: boolean;
  sendRequest: (requestText: string, contactInfo: ContactInfo) => Promise<void>;
  sendChatMessage: (message: string, rating: number) => Promise<void>;
}

export const useEmailService = (): UseEmailServiceReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
  }, []);

  const createContactInfoText = (contactInfo: ContactInfo): string => {
    const contactList = [];
    if (contactInfo.phone.trim()) contactList.push(`전화번호: ${contactInfo.phone}`);
    if (contactInfo.email.trim()) contactList.push(`이메일: ${contactInfo.email}`);
    if (contactInfo.kakao.trim()) contactList.push(`카카오톡 ID: ${contactInfo.kakao}`);
    
    return contactList.length > 0 
      ? '\n\n=== 연락처 정보 ===\n' + contactList.join('\n')
      : '';
  };

  const createRatingText = (rating: number): string => {
    return rating > 0
      ? `\n\n⭐ 별점: ${rating}/5점 (${'★'.repeat(rating)}${'☆'.repeat(5 - rating)})`
      : '';
  };

  const handleEmailError = (error: unknown): string => {
    let errorMessage = MESSAGES.ALERTS.REQUEST_FAILED;

    if (error && typeof error === 'object') {
      const emailError = error as {
        status?: number;
        text?: string;
        message?: string;
      };

      if (emailError.status === 400) {
        errorMessage += ' 설정을 확인해주세요.';
      } else if (emailError.status === 401) {
        errorMessage += ' 인증에 실패했습니다. Public Key를 확인해주세요.';
      } else if (emailError.status === 404) {
        errorMessage += ' 서비스 또는 템플릿을 찾을 수 없습니다.';
      } else if (emailError.text) {
        errorMessage += ` (${emailError.text})`;
      }
    }

    return errorMessage + ' 개발자 도구 콘솔을 확인해주세요.';
  };

  const sendRequest = async (requestText: string, contactInfo: ContactInfo): Promise<void> => {
    if (!requestText.trim()) {
      alert(MESSAGES.ALERTS.REQUEST_REQUIRED);
      return;
    }

    setIsSubmitting(true);

    try {
      const contactInfoText = createContactInfoText(contactInfo);
      const fullMessage = `${requestText}${contactInfoText}`;

      const templateParams = {
        to_name: '관리자',
        to_email: EMAIL_CONFIG.TEMPLATES.REQUEST.TO_EMAIL,
        from_name: EMAIL_CONFIG.TEMPLATES.REQUEST.FROM_NAME,
        from_email: EMAIL_CONFIG.TEMPLATES.REQUEST.FROM_EMAIL,
        subject: EMAIL_CONFIG.TEMPLATES.REQUEST.SUBJECT,
        message: fullMessage,
        reply_to: EMAIL_CONFIG.TEMPLATES.REQUEST.FROM_EMAIL,
      };

      const result = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAIL_CONFIG.PUBLIC_KEY
      );

      console.log('전송 성공:', result);
      alert(MESSAGES.ALERTS.REQUEST_SUCCESS);
    } catch (error: unknown) {
      console.error('이메일 전송 실패:', error);
      const errorMessage = handleEmailError(error);
      alert(errorMessage);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendChatMessage = async (message: string, rating: number): Promise<void> => {
    if (!message.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const ratingText = createRatingText(rating);
      const fullMessage = `${message}${ratingText}`;

      const templateParams = {
        to_name: '관리자',
        to_email: EMAIL_CONFIG.TEMPLATES.CHAT.TO_EMAIL,
        from_name: EMAIL_CONFIG.TEMPLATES.CHAT.FROM_NAME,
        from_email: EMAIL_CONFIG.TEMPLATES.CHAT.FROM_EMAIL,
        subject: EMAIL_CONFIG.TEMPLATES.CHAT.SUBJECT,
        message: fullMessage,
        reply_to: EMAIL_CONFIG.TEMPLATES.CHAT.FROM_EMAIL,
      };

      const result = await emailjs.send(
        EMAIL_CONFIG.SERVICE_ID,
        EMAIL_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAIL_CONFIG.PUBLIC_KEY
      );

      console.log('채팅 전송 성공:', result);
    } catch (error: unknown) {
      console.error('채팅 전송 실패:', error);
      const errorMessage = MESSAGES.ALERTS.CHAT_FAILED;
      alert(errorMessage);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    sendRequest,
    sendChatMessage,
  };
};