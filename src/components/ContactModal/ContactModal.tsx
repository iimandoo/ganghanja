import React from 'react';
import { IoClose } from 'react-icons/io5';
import { MESSAGES } from '@/constants';
import { useEmailService } from '@/hooks/useEmailService';
import {
  ModalOverlay,
  Modal,
  CloseButton,
  ModalTitle,
  TextArea,
  ContactSection,
  ContactLabel,
  ContactInput,
  ModalButtons,
  Button
} from './ContactModal.styles';

interface ContactModalProps {
  isOpen: boolean;
  requestText: string;
  contactPhone: string;
  contactEmail: string;
  contactKakao: string;
  onRequestTextChange: (text: string) => void;
  onContactPhoneChange: (phone: string) => void;
  onContactEmailChange: (email: string) => void;
  onContactKakaoChange: (kakao: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  requestText,
  contactPhone,
  contactEmail,
  contactKakao,
  onRequestTextChange,
  onContactPhoneChange,
  onContactEmailChange,
  onContactKakaoChange,
  onClose,
  onSubmit,
}) => {
  const { isSubmitting } = useEmailService();

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>
          <IoClose />
        </CloseButton>
        
        <ModalTitle>{MESSAGES.MODAL.TITLE}</ModalTitle>
        
        <TextArea
          value={requestText}
          onChange={(e) => onRequestTextChange(e.target.value)}
          placeholder={MESSAGES.MODAL.PLACEHOLDER}
        />

        <ContactSection>
          <ContactLabel>{MESSAGES.MODAL.CONTACT_LABEL}</ContactLabel>
          <ContactInput
            type="tel"
            value={contactPhone}
            onChange={(e) => onContactPhoneChange(e.target.value)}
            placeholder={MESSAGES.MODAL.PLACEHOLDERS.PHONE}
          />
          <ContactInput
            type="email"
            value={contactEmail}
            onChange={(e) => onContactEmailChange(e.target.value)}
            placeholder={MESSAGES.MODAL.PLACEHOLDERS.EMAIL}
          />
          <ContactInput
            type="text"
            value={contactKakao}
            onChange={(e) => onContactKakaoChange(e.target.value)}
            placeholder={MESSAGES.MODAL.PLACEHOLDERS.KAKAO}
          />
        </ContactSection>

        <ModalButtons>
          <Button $variant="secondary" onClick={onClose}>
            {MESSAGES.BUTTONS.CANCEL}
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? MESSAGES.LOADING.SENDING : MESSAGES.LOADING.SUBMIT}
          </Button>
        </ModalButtons>
      </Modal>
    </ModalOverlay>
  );
};