import React from "react";
import { IoClose } from "react-icons/io5";
import { MESSAGES } from "@/constants";
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
  Button,
} from "./ContactModal.styles";

interface ContactModalProps {
  isOpen: boolean;
  requestText: string;
  contactInfo: string;
  onRequestTextChange: (text: string) => void;
  onContactInfoChange: (contactInfo: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  requestText,
  contactInfo,
  onRequestTextChange,
  onContactInfoChange,
  onClose,
  onSubmit,
}) => {
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
          <ContactLabel>연락처 (선택사항)</ContactLabel>
          <ContactInput
            type="text"
            value={contactInfo}
            onChange={(e) => onContactInfoChange(e.target.value)}
            placeholder="연락처를 입력해주세요 (전화번호, 이메일, 카카오톡 ID 등)"
          />
        </ContactSection>

        <ModalButtons>
          <Button $variant="secondary" onClick={onClose}>
            {MESSAGES.BUTTONS.CANCEL}
          </Button>
          <Button onClick={onSubmit}>{MESSAGES.LOADING.SUBMIT}</Button>
        </ModalButtons>
      </Modal>
    </ModalOverlay>
  );
};
