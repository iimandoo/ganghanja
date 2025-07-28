import React from "react";
import {
  IoClose,
  IoSend,
  IoStar,
  IoStarOutline,
  IoChatbubbleEllipses,
} from "react-icons/io5";
import { MESSAGES } from "@/constants";
import { useEmailService } from "@/hooks/useEmailService";
import {
  FloatingChatButton,
  ChatOverlay,
  ChatContainer,
  ChatHeader,
  ChatTitle,
  ChatCloseButton,
  ChatBody,
  ChatMessage,
  SuccessMessage,
  ChatInputArea,
  ChatTextArea,
  StarContainer,
  StarButton,
  ChatSendButton,
} from "./ChatModal.styles";

interface ChatModalProps {
  isOpen: boolean;
  message: string;
  rating: number;
  showSuccessMessage: boolean;
  onMessageChange: (message: string) => void;
  onRatingClick: (rating: number) => void;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  message,
  rating,
  showSuccessMessage,
  onMessageChange,
  onRatingClick,
  onOpen,
  onClose,
  onSubmit,
}) => {
  const { isSubmitting } = useEmailService();

  return (
    <>
      <FloatingChatButton
        onClick={onOpen}
        aria-label={MESSAGES.BUTTONS.CHAT}
        title={MESSAGES.BUTTONS.CHAT}
      >
        <IoChatbubbleEllipses aria-hidden="true" />
      </FloatingChatButton>

      {isOpen && (
        <ChatOverlay onClick={onClose}>
          <ChatContainer onClick={(e) => e.stopPropagation()}>
            <ChatHeader>
              <ChatTitle>고객센터</ChatTitle>
              <ChatCloseButton onClick={onClose}>
                <IoClose />
              </ChatCloseButton>
            </ChatHeader>

            <ChatBody>
              <ChatMessage>{MESSAGES.CHAT.WELCOME}</ChatMessage>

              {showSuccessMessage && (
                <SuccessMessage>{MESSAGES.CHAT.SUCCESS}</SuccessMessage>
              )}
            </ChatBody>

            <ChatInputArea>
              <ChatTextArea
                value={message}
                onChange={(e) => onMessageChange(e.target.value)}
                placeholder={MESSAGES.CHAT.PLACEHOLDER}
                disabled={isSubmitting || showSuccessMessage}
              />

              {!showSuccessMessage && (
                <StarContainer>
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <StarButton
                      key={starValue}
                      $filled={starValue <= rating}
                      onClick={() => onRatingClick(starValue)}
                    >
                      {starValue <= rating ? <IoStar /> : <IoStarOutline />}
                    </StarButton>
                  ))}
                </StarContainer>
              )}

              <ChatSendButton
                onClick={onSubmit}
                disabled={isSubmitting || showSuccessMessage || !message.trim()}
              >
                {isSubmitting ? (
                  MESSAGES.LOADING.CHAT_SENDING
                ) : (
                  <>
                    <IoSend />
                    {MESSAGES.LOADING.SEND}
                  </>
                )}
              </ChatSendButton>
            </ChatInputArea>
          </ChatContainer>
        </ChatOverlay>
      )}
    </>
  );
};
