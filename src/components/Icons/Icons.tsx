import React from "react";
import { MdTranslate, MdSchool } from "react-icons/md";

// 급수설정 아이콘 (등급/학교를 나타내는 아이콘)
export const LevelIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <MdSchool size={size} />
);

// 어휘범위 설정 아이콘 (번역/단어를 나타내는 아이콘)
export const VocabularyIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <MdTranslate size={size} />
);
