import React from "react";
import {
  IoClose,
  IoSend,
  IoStar,
  IoStarOutline,
  IoChatbubbleEllipses,
} from "react-icons/io5";
import { MESSAGES } from "@/constants";
import {
  FloatingChatButton,
  ChatOverlay,
  ChatContainer,
  ChatHeader,
  ChatTitle,
  ChatCloseButton,
  ChatBody,
  ChatInputBox,
  SuccessMessage,
  ChatInputArea,
  ChatTextArea,
  ChatInput,
  StarContainer,
  StarButton,
  ChatSendButton,
} from "./ChatModal.styles";

interface ChatModalProps {
  isOpen: boolean;
  message: string;
  contactInfo: string;
  rating: number;
  showSuccessMessage: boolean;
  onMessageChange: (message: string) => void;
  onContactInfoChange: (contactInfo: string) => void;
  onRatingClick: (rating: number) => void;
  onOpen: () => void;
  onClose: () => void;
  onSubmit: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  message,
  contactInfo,
  rating,
  showSuccessMessage,
  onMessageChange,
  onContactInfoChange,
  onRatingClick,
  onOpen,
  onClose,
  onSubmit,
}) => {
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
              <ChatTitle>COOL한자 고객센터</ChatTitle>
              <ChatCloseButton onClick={onClose}>
                <IoClose />
              </ChatCloseButton>
            </ChatHeader>

            <ChatBody>{MESSAGES.CHAT.WELCOME}</ChatBody>

            <ChatInputArea>
              <ChatInputBox>
                <ChatInput
                  type="text"
                  value={contactInfo}
                  onChange={(e) => onContactInfoChange(e.target.value)}
                  placeholder="연락처 (선택사항)"
                  disabled={showSuccessMessage}
                  style={{ marginTop: "8px" }}
                />
                <ChatTextArea
                  value={message}
                  onChange={(e) => onMessageChange(e.target.value)}
                  placeholder={MESSAGES.CHAT.PLACEHOLDER}
                  disabled={showSuccessMessage}
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
              </ChatInputBox>

              <div>
                {showSuccessMessage ? (
                  <SuccessMessage>{MESSAGES.CHAT.SUCCESS}</SuccessMessage>
                ) : (
                  <ChatSendButton
                    onClick={onSubmit}
                    disabled={showSuccessMessage || !message.trim()}
                  >
                    <>
                      <IoSend />
                      {MESSAGES.LOADING.SEND}
                    </>
                  </ChatSendButton>
                )}
              </div>
            </ChatInputArea>
          </ChatContainer>
        </ChatOverlay>
      )}
    </>
  );
};
