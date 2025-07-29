import { theme } from "@/styles/theme";

// 카드 색상 키 타입
export type CardColorKey = keyof typeof theme.colors.cardColors;

// 사용 가능한 카드 색상 키 배열
const CARD_COLOR_KEYS: CardColorKey[] = [
  "green",
  "mint",
  "lime",
  "sage",
  "emerald",
  "spring",
];

// 랜덤 카드 색상 선택 함수
export const getRandomCardColor = (): CardColorKey => {
  const randomIndex = Math.floor(Math.random() * CARD_COLOR_KEYS.length);
  return CARD_COLOR_KEYS[randomIndex];
};

// 특정 문자열을 기반으로 일관된 색상 선택 (같은 한자는 항상 같은 색상)
export const getConsistentCardColor = (seed: string): CardColorKey => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 32bit 정수로 변환
  }

  const index = Math.abs(hash) % CARD_COLOR_KEYS.length;
  return CARD_COLOR_KEYS[index];
};

// 카드 색상 정보 가져오기
export const getCardColorInfo = (colorKey: CardColorKey) => {
  return theme.colors.cardColors[colorKey];
};
