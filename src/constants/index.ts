export const LEVELS = ["8", "7", "6", "준5", "5", "준4"] as const;

export const HANJA_TYPES = ["대한검정회", "어문회"] as const;

export const MESSAGES = {
  CHAT: {
    WELCOME:
      "요청사항이나 궁금한 사항을 편하게 적어주세요.\n답변을 원하시는 경우 연락처나 이메일주소를 함께 적어주세요!",
    SUCCESS: "COOL한자에게 보냈어요",
    PLACEHOLDER: "요청사항, 궁금한사항...",
  },

  MODAL: {
    TITLE: "기능 요청 및 건의사항",
    PLACEHOLDER:
      "원하시는 기능이나 개선사항을 자유롭게 적어주세요.\n\n예:\n- 새로운 급수 추가\n- 학습 진도 저장 기능\n- 틀린 문제 다시보기\n- 기타 건의사항",
    CONTACT_LABEL: "연락처 정보 (선택사항)",
    PLACEHOLDERS: {
      PHONE: "전화번호 (예: 010-1234-5678)",
      EMAIL: "이메일 주소",
      KAKAO: "카카오톡 ID",
    },
  },

  ALERTS: {
    REQUEST_REQUIRED: "요청 내용을 입력해주세요.",
    REQUEST_SUCCESS: "요청이 성공적으로 전송되었습니다!",
    REQUEST_FAILED: "요청 전송에 실패했습니다.",
    CHAT_FAILED: "메시지 전송에 실패했습니다.",
  },

  LOADING: {
    SENDING: "전송 중...",
    CHAT_SENDING: "보내는 중...",
    SUBMIT: "전송하기",
    SEND: "보내기",
  },

  BUTTONS: {
    CANCEL: "취소",
    PREVIOUS: "이전 한자 카드",
    NEXT: "다음 한자 카드",
    SHUFFLE: "한자 카드 랜덤 섞기",
    CHAT: "고객 지원 채팅",
  },
} as const;

export const ANIMATION_DELAYS = {
  CARD_RESET: 100,
  CHAT_AUTO_CLOSE: 3000,
} as const;

export type Level = (typeof LEVELS)[number];
export type HanjaType = (typeof HANJA_TYPES)[number];
