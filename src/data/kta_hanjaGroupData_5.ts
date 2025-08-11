export interface HanjaData {
  character: string;
  meaning: string;
  meaningKey: string;
  example: string;
  idiom: string;
  level: string;
  m1?: string[];
  m2?: string[];
  e6?: string[];
  example_exp?: Array<{ kor: string; hanja: string; naverUrl: string }>;
  m1_exp?: Array<{ kor: string; hanja: string; naverUrl: string }>;
  m2_exp?: Array<{ kor: string; hanja: string; naverUrl: string }>;
}
export interface HanjaGroupDto {
  TypeA?: HanjaData[];
  TypeB?: HanjaData[];
}

export const hanjaGroupData: HanjaGroupDto = {
  TypeA: [
    // 5급
    {
      character: "歌",
      meaning: "노래",
      meaningKey: "가",
      example: "가요, 작사",
      idiom: "歌舞昇平 (가무승평 - 노래와 춤으로 평화롭다)",
      level: "5급",
      m1: [
        "가요",
        "작사",
        "가사",
        "가사해석",
        "가사분석",
        "가사학습",
        "가사암기",
      ],
      m2: [
        "가사해석",
        "가사분석",
        "가사학습",
        "가사암기",
        "가사창작",
        "가사감상",
        "가사교육",
        "가사문화",
      ],
      e6: [
        "가요",
        "가사",
        "노래",
        "가수",
        "가락",
        "가르치다",
        "가르침",
        "가르키다",
        "가르키다",
        "가르키다",
      ],
      example_exp: [
        {
          kor: "가요",
          hanja: "歌謠",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=歌謠",
        },
        {
          kor: "작사",
          hanja: "作詞",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사",
          hanja: "歌詞",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사해석",
          hanja: "歌詞解釋",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사분석",
          hanja: "歌詞分析",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사학습",
          hanja: "歌詞學習",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사암기",
          hanja: "歌詞暗記",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m1_exp: [
        {
          kor: "가요",
          hanja: "歌謠",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "작사",
          hanja: "作詞",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사",
          hanja: "歌詞",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사해석",
          hanja: "歌詞解釋",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사분석",
          hanja: "歌詞分析",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사학습",
          hanja: "歌詞學習",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사암기",
          hanja: "歌詞暗記",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m2_exp: [
        {
          kor: "가사해석",
          hanja: "歌詞解釋",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사분석",
          hanja: "歌詞分析",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사학습",
          hanja: "歌詞學習",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사암기",
          hanja: "歌詞暗記",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사창작",
          hanja: "歌詞創作",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사감상",
          hanja: "歌詞感想",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사교육",
          hanja: "歌詞教育",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가사문화",
          hanja: "歌詞文化",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
    },
    {
      character: "家",
      meaning: "집",
      meaningKey: "가",
      example: "가정, 가구",
      idiom: "家和萬事成 (가화만사성 - 집안이 화목하면 모든 일이 잘됨)",
      level: "5급",
      m1: ["가정", "가구", "가정교육", "가정생활"],
      m2: ["가정교육", "가정경제"],
      e6: ["가정", "가구", "가족"],
      example_exp: [
        {
          kor: "가정",
          hanja: "家庭",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가구",
          hanja: "家具",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "집",
          hanja: "家",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가족",
          hanja: "家族",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가족",
          hanja: "家族",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가족",
          hanja: "家族",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가족",
          hanja: "家族",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가족",
          hanja: "家族",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가족",
          hanja: "家族",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가족",
          hanja: "家族",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m1_exp: [
        {
          kor: "가정",
          hanja: "家庭",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가구",
          hanja: "家具",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가정교육",
          hanja: "家庭教育",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가정생활",
          hanja: "家庭生活",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가정환경",
          hanja: "家庭環境",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가정관리",
          hanja: "家庭管理",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가정경제",
          hanja: "家庭經濟",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m2_exp: [
        {
          kor: "가정교육",
          hanja: "家庭教育",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가정생활",
          hanja: "家庭生活",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가정환경",
          hanja: "家庭環境",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가정관리",
          hanja: "家庭管理",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가정경제",
          hanja: "家庭經濟",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가정문화",
          hanja: "家庭文化",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가정의례",
          hanja: "家庭儀式",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가정복지",
          hanja: "家庭福利",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
    },
    {
      character: "各",
      meaning: "각각",
      meaningKey: "각",
      example: "각자, 각기",
      idiom: "各自努力 (각자노력 - 각자 노력)",
      level: "5급",
      m1: ["각자", "각기"],
      m2: ["각자역할"],
      e6: [
        "각자",
        "각기",
        "각각",
        "각도",
        "각도",
        "각도",
        "각도",
        "각도",
        "각도",
        "각도",
      ],
      example_exp: [
        {
          kor: "각자",
          hanja: "各自",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각기",
          hanja: "各棄",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각각",
          hanja: "各個",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각도",
          hanja: "角度",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각도",
          hanja: "角度",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각도",
          hanja: "角度",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각도",
          hanja: "角度",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각도",
          hanja: "角度",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각도",
          hanja: "角度",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각도",
          hanja: "角度",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m1_exp: [
        {
          kor: "각자",
          hanja: "各自",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각기",
          hanja: "各棄",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각자학습",
          hanja: "各自學習",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각자준비",
          hanja: "各自準備",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각자발표",
          hanja: "各自發表",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각자탐구",
          hanja: "各自探究",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각자평가",
          hanja: "各自評估",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m2_exp: [
        {
          kor: "각자학습",
          hanja: "各自學習",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각자준비",
          hanja: "各自準備",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각자발표",
          hanja: "各自發表",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각자탐구",
          hanja: "各自探究",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각자평가",
          hanja: "各自評估",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각자책임",
          hanja: "各自責任",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각자역할",
          hanja: "各自角色",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "각자발전",
          hanja: "各自發展",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
    },
    {
      character: "間",
      meaning: "사이",
      meaningKey: "간",
      example: "시간, 공간",
      idiom: "間接經驗 (간접경험 - 간접 경험)",
      level: "5급",
      m1: ["시간", "공간", "시간관리"],
      m2: ["시간관리", "시간계획"],
      e6: ["시간", "공간", "사이", "간격"],
      example_exp: [
        {
          kor: "시간",
          hanja: "時間",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "공간",
          hanja: "空間",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "사이",
          hanja: "催",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "간격",
          hanja: "間隔",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "간격",
          hanja: "間隔",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "간격",
          hanja: "間隔",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "간격",
          hanja: "間隔",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "간격",
          hanja: "間隔",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "간격",
          hanja: "間隔",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "간격",
          hanja: "間隔",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m1_exp: [
        {
          kor: "시간",
          hanja: "時間",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "공간",
          hanja: "空間",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "시간관리",
          hanja: "時間管理",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "시간계획",
          hanja: "時間計劃",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "시간분배",
          hanja: "時間分配",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "시간효율",
          hanja: "時間效率",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "시간절약",
          hanja: "時間節約",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m2_exp: [
        {
          kor: "시간관리",
          hanja: "時間管理",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "시간계획",
          hanja: "時間計劃",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "시간분배",
          hanja: "時間分配",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "시간효율",
          hanja: "時間效率",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "시간절약",
          hanja: "時間節約",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "시간분석",
          hanja: "時間分析",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "시간계산",
          hanja: "時間計算",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "시간측정",
          hanja: "時間測定",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
    },
    {
      character: "强",
      meaning: "강할",
      meaningKey: "강",
      example: "강력, 강자",
      idiom: "強者恆強 (강자항강 - 강한 자는 계속 강하다)",
      level: "5급",
      m1: ["강력", "강자", "강력범죄"],
      m2: ["강력범죄", "강력수사"],
      e6: ["강력", "강자", "강하다"],
      example_exp: [
        {
          kor: "강력",
          hanja: "強力",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강자",
          hanja: "強者",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강하다",
          hanja: "強",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강아지",
          hanja: "犬",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강아지",
          hanja: "犬",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강아지",
          hanja: "犬",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강아지",
          hanja: "犬",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강아지",
          hanja: "犬",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강아지",
          hanja: "犬",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강아지",
          hanja: "犬",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m1_exp: [
        {
          kor: "강력",
          hanja: "強力",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강자",
          hanja: "強者",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강력범죄",
          hanja: "強力犯罪",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강력수사",
          hanja: "強力調查",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강력반",
          hanja: "強力班",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강력부",
          hanja: "強力部",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강력팀",
          hanja: "強力團",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m2_exp: [
        {
          kor: "강력범죄",
          hanja: "強力犯罪",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강력수사",
          hanja: "強力調查",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강력반",
          hanja: "強力班",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강력부",
          hanja: "強力部",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강력팀",
          hanja: "強力團",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강력정책",
          hanja: "強力政策",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강력대응",
          hanja: "強力對應",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "강력처벌",
          hanja: "強力處罰",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
    },
    {
      character: "開",
      meaning: "열",
      meaningKey: "개",
      example: "개방, 개문",
      idiom: "開門見山 (개문견산 - 직설적으로 말함)",
      level: "5급",
      m1: ["개방", "개문", "개방경제"],
      m2: ["개방성", "개방정책", "개방무역"],
      e6: ["개방", "개문"],
      example_exp: [
        {
          kor: "개방",
          hanja: "開放",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개문",
          hanja: "開門",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "열다",
          hanja: "開",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개다",
          hanja: "開",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개다",
          hanja: "開",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개다",
          hanja: "開",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개다",
          hanja: "開",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개다",
          hanja: "開",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개다",
          hanja: "開",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개다",
          hanja: "開",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m1_exp: [
        {
          kor: "개방",
          hanja: "開放",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개문",
          hanja: "開門",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개방성",
          hanja: "開放性",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개방정책",
          hanja: "開放政策",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개방경제",
          hanja: "開放經濟",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개방사회",
          hanja: "開放社會",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개방문화",
          hanja: "開放文化",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m2_exp: [
        {
          kor: "개방성",
          hanja: "開放性",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개방정책",
          hanja: "開放政策",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개방경제",
          hanja: "開放經濟",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개방사회",
          hanja: "開放社會",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개방문화",
          hanja: "開放文化",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개방무역",
          hanja: "開放貿易",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개방시장",
          hanja: "開放市場",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "개방협력",
          hanja: "開放協力",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
    },
    {
      character: "去",
      meaning: "갈",
      meaningKey: "거",
      example: "과거, 제거",
      idiom: "去者如斯 (거자여사 - 지나간 일은 이와 같다)",
      level: "5급",
      m1: ["과거", "제거"],
      m2: ["과거형"],
      e6: ["과거", "제거"],
      example_exp: [
        {
          kor: "과거",
          hanja: "過去",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "제거",
          hanja: "除去",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가다",
          hanja: "去",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가다",
          hanja: "去",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가다",
          hanja: "去",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가다",
          hanja: "去",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가다",
          hanja: "去",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가다",
          hanja: "去",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가다",
          hanja: "去",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "가다",
          hanja: "去",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m1_exp: [
        {
          kor: "과거",
          hanja: "過去",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "제거",
          hanja: "除去",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "과거시제",
          hanja: "過去時制",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "과거분사",
          hanja: "過去分詞",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "과거완료",
          hanja: "過去完了",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "과거진행",
          hanja: "過去進行",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "과거형",
          hanja: "過去形",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m2_exp: [
        {
          kor: "과거시제",
          hanja: "過去時制",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "과거분사",
          hanja: "過去分詞",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "과거완료",
          hanja: "過去完了",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "과거진행",
          hanja: "過去進行",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "과거형",
          hanja: "過去形",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "과거시점",
          hanja: "過去時點",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "과거사용",
          hanja: "過去使用",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "과거학습",
          hanja: "過去學習",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
    },
    {
      character: "見",
      meaning: "볼",
      meaningKey: "견",
      example: "견학, 시각",
      idiom: "見微知著 (견미지저 - 작은 점에서 전체를 앎)",
      level: "5급",
      m1: ["견학"],
      m2: ["견학학습"],
      e6: ["견학"],
      example_exp: [
        {
          kor: "견학",
          hanja: "見學",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "시각",
          hanja: "視覺",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "보다",
          hanja: "見",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "보기",
          hanja: "見",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "보기",
          hanja: "見",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "보기",
          hanja: "見",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "보기",
          hanja: "見",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "보기",
          hanja: "見",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "보기",
          hanja: "見",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "보기",
          hanja: "見",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m1_exp: [
        {
          kor: "견학",
          hanja: "見學",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "시각",
          hanja: "視覺",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "견학계획",
          hanja: "見學計劃",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "견학보고",
          hanja: "見學報告",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "견학일지",
          hanja: "見學日誌",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "견학학습",
          hanja: "見學學習",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "견학효과",
          hanja: "見學效果",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m2_exp: [
        {
          kor: "견학계획",
          hanja: "見學計劃",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "견학보고",
          hanja: "見學報告",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "견학일지",
          hanja: "見學日誌",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "견학학습",
          hanja: "見學學習",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "견학효과",
          hanja: "見學效果",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "견학장소",
          hanja: "見學場所",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "견학준비",
          hanja: "見學準備",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "견학평가",
          hanja: "見學評估",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
    },
    {
      character: "京",
      meaning: "서울",
      meaningKey: "경",
      example: "서울, 경성",
      idiom: "京城 (경성 - 수도)",
      level: "5급",
      m1: ["경성"],
      m2: [],
      e6: ["경성"],
      example_exp: [
        {
          kor: "서울",
          hanja: "首爾",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "경성",
          hanja: "京城",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울",
          hanja: "首爾",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울",
          hanja: "首爾",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울",
          hanja: "首爾",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울",
          hanja: "首爾",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울",
          hanja: "首爾",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울",
          hanja: "首爾",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울",
          hanja: "首爾",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울",
          hanja: "首爾",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m1_exp: [
        {
          kor: "서울",
          hanja: "首爾",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "경성",
          hanja: "京城",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울시",
          hanja: "首爾市",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울특별시",
          hanja: "首爾特別市",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울도시",
          hanja: "首爾都市",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울문화",
          hanja: "首爾文化",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울역사",
          hanja: "首爾歷史",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
      m2_exp: [
        {
          kor: "서울시",
          hanja: "首爾市",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울특별시",
          hanja: "首爾特別市",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울도시",
          hanja: "首爾都市",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울문화",
          hanja: "首爾文化",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울역사",
          hanja: "首爾歷史",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울발전",
          hanja: "首爾發展",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울계획",
          hanja: "首爾計劃",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "서울정책",
          hanja: "首爾政策",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
    },
    {
      character: "計",
      meaning: "셀",
      meaningKey: "계",
      example: "계획, 계산",
      idiom: "計畫周詳 (계획주상 - 치밀한 계획)",
      level: "5급",
      m1: ["계획", "계산", "계산기"],
      m2: ["계산기", "계산문제"],
      e6: ["계획", "계산"],
      example_exp: [
        {
          kor: "계획",
          hanja: "計劃",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "계산",
          hanja: "計算",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "세다",
          hanja: "計",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
        {
          kor: "세다",
          hanja: "計",
          naverUrl:
            "https://hanja.dict.naver.com/#/entry/ko/00000000000000000000000000000000",
        },
      ],
    },
    {
      character: "功",
      meaning: "공",
      meaningKey: "공",
      example: "성공, 공로",
      idiom: "功成名遂 (공성명수 - 공을 세워 이름을 남김)",
      level: "5급",
      m1: ["성공", "공로", "성공률"],
      m2: ["성공률", "성공요인"],
      e6: ["성공", "공로", "공"],
    },
    {
      character: "空",
      meaning: "빌",
      meaningKey: "공",
      example: "공기, 공간",
      idiom: "空中樓閣 (공중누각 - 실체 없는 일)",
      level: "5급",
      m1: ["공기", "공간"],
      m2: ["공기오염", "공기정화"],
      e6: ["공기", "공간"],
    },
    {
      character: "共",
      meaning: "함께",
      meaningKey: "공",
      example: "공동, 공통",
      idiom: "共和合作 (공화협력 - 함께 협력함)",
      level: "5급",
      m1: ["공동", "공통", "공동체"],
      m2: [],
      e6: ["공동", "공통"],
    },
    {
      character: "科",
      meaning: "과목",
      meaningKey: "과",
      example: "과학, 교과서",
      idiom: "科學技術 (과학기술 - 과학 기술)",
      level: "5급",
      m1: ["과학", "교과서"],
      m2: ["과학실험", "과학탐구"],
      e6: ["과학", "교과서", "과목"],
    },
    {
      character: "光",
      meaning: "빛",
      meaningKey: "광",
      example: "광선, 발광",
      idiom: "光明正大 (광명정대 - 밝고 당당함)",
      level: "5급",
      m1: ["광선", "발광", "광합성", "광전효과", "광학현미경"],
      m2: ["광합성", "광전효과", "광학", "광학현미경", "광학기기"],
      e6: ["광선", "발광"],
    },
    {
      character: "敎",
      meaning: "가르칠",
      meaningKey: "교",
      example: "교육, 교수",
      idiom: "敎學相長 (교학상장 - 가르치고 배우면서 성장함)",
      level: "5급",
      m1: ["교육", "교수", "교육과정"],
      m2: ["교육과정", "교육방법"],
      e6: ["교육", "교수"],
    },
    {
      character: "交",
      meaning: "사귈",
      meaningKey: "교",
      example: "교류, 교제",
      idiom: "交流合作 (교류협력 - 교류 협력)",
      level: "5급",
      m1: ["교류", "교제"],
      m2: ["교류활동", "교류프로그램"],
      e6: ["교류", "교제"],
    },
    {
      character: "校",
      meaning: "학교",
      meaningKey: "교",
      example: "학교, 교정",
      idiom: "校友會 (교우회 - 학교 동창회)",
      level: "5급",
      m1: ["학교", "교정"],
      m2: ["학교생활"],
      e6: ["학교", "교정"],
    },
    {
      character: "區",
      meaning: "나눌",
      meaningKey: "구",
      example: "구분, 구역",
      idiom: "區別明確 (구별명확 - 분명히 구별함)",
      level: "5급",
      m1: ["구분", "구역", "구분선"],
      m2: ["구분선"],
      e6: ["구분", "구역"],
    },
    {
      character: "國",
      meaning: "나라",
      meaningKey: "국",
      example: "국가, 국민",
      idiom: "國富民強 (국부민강 - 나라가 부유하고 국민이 강함)",
      level: "5급",
      m1: ["국가", "국민"],
      m2: ["국가", "국민"],
      e6: ["국가", "국민"],
    },
    {
      character: "軍",
      meaning: "군사",
      meaningKey: "군",
      example: "군대, 군인",
      idiom: "軍事演習 (군사연습 - 군사 연습)",
      level: "5급",
      m1: ["군대", "군인", "군사훈련"],
      m2: ["군대", "군인", "군사훈련", "군사"],
      e6: ["군대", "군인", "군사"],
    },
    {
      character: "近",
      meaning: "가까울",
      meaningKey: "근",
      example: "근처, 최근",
      idiom: "近朱者赤 (근주자적 - 붉은색 가까이 있으면 붉어짐)",
      level: "5급",
      m1: ["근처", "최근", "근시", "근시안경"],
      m2: ["근처", "최근", "근시", "근시안경"],
      e6: ["근처", "최근"],
    },
    {
      character: "急",
      meaning: "급할",
      meaningKey: "급",
      example: "긴급, 급행",
      idiom: "急轉直下 (급전직하 - 급하게 나빠짐)",
      level: "5급",
      m1: ["긴급", "급행"],
      m2: ["급행", "긴급"],
      e6: ["긴급", "급행"],
    },
    {
      character: "旗",
      meaning: "기",
      meaningKey: "기",
      example: "국기, 깃발",
      idiom: "旌旗指揮 (정기지휘 - 깃발로 명령함)",
      level: "5급",
      m1: ["국기"],
      m2: ["기치", "기수", "기장", "기념"],
      e6: ["국기", "깃발"],
    },
    {
      character: "記",
      meaning: "기록할",
      meaningKey: "기",
      example: "기록, 일기",
      idiom: "記憶力 (기억력 - 기억력)",
      level: "5급",
      m1: ["기록", "일기", "기록물"],
      m2: ["기사", "기자", "기자회견"],
      e6: ["기록", "일기"],
    },
    {
      character: "氣",
      meaning: "기운",
      meaningKey: "기",
      example: "기운, 공기",
      idiom: "氣勢壯大 (기세장대 - 기세가 힘차고 큼)",
      level: "5급",
      m1: ["기운", "공기", "기상"],
      m2: ["기후", "기온", "기압", "기류", "기단"],
      e6: ["기운", "공기"],
    },
    {
      character: "農",
      meaning: "농사",
      meaningKey: "농",
      example: "농업, 농부",
      idiom: "農家生活 (농가생활 - 농가 생활)",
      level: "5급",
      m1: ["농업", "농부"],
      m2: [
        "농업",
        "농부",
        "농촌",
        "농민",
        "농사",
        "농작물",
        "농기구",
        "농약",
        "농협",
      ],
      e6: ["농업", "농부", "농사"],
    },
    {
      character: "多",
      meaning: "많을",
      meaningKey: "다",
      example: "다수, 다량",
      idiom: "多種多様 (다종다양 - 다양한 종류)",
      level: "5급",
      m1: ["다수", "다량", "다양성", "다양화"],
      m2: ["다수", "다량", "다양", "다양성", "다문화가정"],
      e6: ["다수", "다량"],
    },
    {
      character: "短",
      meaning: "짧을",
      meaningKey: "단",
      example: "단점, 단거리",
      idiom: "短期決戰 (단기결전 - 짧은 기간에 싸움)",
      level: "5급",
      m1: ["단점", "단거리", "단기간", "단기목표"],
      m2: ["단점", "단거리", "단기간", "단기계획"],
      e6: ["단점", "단거리"],
    },
    {
      character: "答",
      meaning: "대답",
      meaningKey: "답",
      example: "대답, 정답",
      idiom: "答問如流 (답문여류 - 질문에 술술 대답함)",
      level: "5급",
      m1: ["대답", "정답", "답안"],
      m2: [],
      e6: ["대답", "정답"],
    },
    {
      character: "當",
      meaning: "마땅할",
      meaningKey: "당",
      example: "당연, 당연지사",
      idiom: "當機立斷 (당기입단 - 적절한 시기에 신속히 결정)",
      level: "5급",
      m1: ["당연", "당연지사"],
      m2: [],
      e6: ["당연"],
    },
    {
      character: "對",
      meaning: "대답할",
      meaningKey: "대",
      example: "대답, 상대",
      idiom: "對牛彈琴 (대우탄금 - 소 귀에 경 읽기)",
      level: "5급",
      m1: ["대답", "상대", "대화"],
      m2: [],
      e6: ["대답", "상대"],
    },
    {
      character: "代",
      meaning: "대신할",
      meaningKey: "대",
      example: "대리, 대표",
      idiom: "代人受過 (대인수과 - 남의 잘못을 대신 받음)",
      level: "5급",
      m1: ["대리", "대표"],
      m2: ["대리", "대표"],
      e6: ["대리", "대표", "대신"],
    },
    {
      character: "道",
      meaning: "길",
      meaningKey: "도",
      example: "도로, 도리",
      idiom: "道聽塗說 (도청도설 - 길거리에서 듣고 떠드는 말)",
      level: "5급",
      m1: ["도로", "도리", "도로교통"],
      m2: [],
      e6: ["도로", "도리"],
    },
    {
      character: "刀",
      meaning: "칼",
      meaningKey: "도",
      example: "단도, 칼날",
      idiom: "刀山火海 (도산화해 - 매우 위험한 곳)",
      level: "5급",
      m1: ["단도"],
      m2: [],
      e6: ["단도"],
    },
    {
      character: "讀",
      meaning: "읽을",
      meaningKey: "독",
      example: "독서, 독해",
      idiom: "讀書百遍 (독서백편 - 책을 백 번 읽음)",
      level: "5급",
      m1: ["독서", "독해"],
      m2: [],
      e6: ["독서", "독해"],
    },
    {
      character: "冬",
      meaning: "겨울",
      meaningKey: "동",
      example: "동지, 동계",
      idiom: "冬暖夏涼 (동난하량 - 겨울은 따뜻하고 여름은 시원함)",
      level: "5급",
      m1: ["동지", "동계", "동계올림픽"],
      m2: [],
      e6: ["동지", "동계"],
    },
    {
      character: "洞",
      meaning: "고을",
      meaningKey: "동",
      example: "동네, 동굴",
      idiom: "洞察秋毫 (통찰추호 - 아주 작은 것까지 꿰뚫어봄)",
      level: "5급",
      m1: ["동네", "동굴"],
      m2: [],
      e6: ["동네", "동굴"],
    },
    {
      character: "頭",
      meaning: "머리",
      meaningKey: "두",
      example: "두뇌, 머리숱",
      idiom: "頭角峥嵘 (두각쟁영 - 두드러진 재능과 기개)",
      level: "5급",
      m1: ["두뇌"],
      m2: [],
      e6: ["두뇌"],
    },
    {
      character: "等",
      meaning: "무리",
      meaningKey: "등",
      example: "등급, 평등",
      idiom: "同等對待 (동등대우 - 같은 수준으로 대함)",
      level: "5급",
      m1: ["등급", "평등"],
      m2: [],
      e6: ["등급", "평등"],
    },
    {
      character: "登",
      meaning: "오를",
      meaningKey: "등",
      example: "등반, 등교",
      idiom: "登高望遠 (등고망원 - 높은데 올라 멀리 봄)",
      level: "5급",
      m1: ["등반", "등교"],
      m2: ["등반", "등교"],
      e6: ["등반", "등교"],
    },
    {
      character: "樂",
      meaning: "즐거울",
      meaningKey: "락",
      example: "음악, 오락",
      idiom: "樂善好施 (낙선호시 - 착한 일을 즐겨 행함)",
      level: "5급",
      m1: ["음악", "오락"],
      m2: [],
      e6: ["음악", "오락"],
    },
    {
      character: "來",
      meaning: "올",
      meaningKey: "래",
      example: "미래, 내일",
      idiom: "未來可期 (미래가기 - 미래가 기대됨)",
      level: "5급",
      m1: ["미래", "내일"],
      m2: [],
      e6: ["미래", "내일"],
    },
    {
      character: "老",
      meaning: "늙을",
      meaningKey: "로",
      example: "노인, 노화",
      idiom: "老馬識途 (노마식도 - 경험 많은 사람이 길을 앎)",
      level: "5급",
      m1: ["노인", "노화"],
      m2: [],
      e6: ["노인", "노화"],
    },
    {
      character: "理",
      meaning: "다스릴",
      meaningKey: "리",
      example: "이론, 원리",
      idiom: "理直氣壯 (이직기장 - 이치가 바르고 기세가 당당함)",
      level: "5급",
      m1: ["이론", "원리"],
      m2: [],
      e6: ["이론", "원리"],
    },
    {
      character: "里",
      meaning: "마을",
      meaningKey: "리",
      example: "마을, 동네",
      idiom: "里仁爲美 (인위미 - 인의를 행하는 것이 아름다움)",
      level: "5급",
      m1: [],
      m2: [],
      e6: [],
    },
    {
      character: "利",
      meaning: "이로울",
      meaningKey: "리",
      example: "이익, 이용",
      idiom: "利害得失 (이해득실 - 이득과 손해)",
      level: "5급",
      m1: ["이익", "이용", "이용안내"],
      m2: [],
      e6: ["이익", "이용"],
    },
    {
      character: "萬",
      meaning: "일만",
      meaningKey: "만",
      example: "만세, 만약",
      idiom: "萬事如意 (만사여의 - 모든 일이 뜻대로 됨)",
      level: "5급",
      m1: ["만세", "만약", "만분율"],
      m2: ["만원"],
      e6: ["만세", "만약", "일만원"],
    },
    {
      character: "每",
      meaning: "매양",
      meaningKey: "매",
      example: "매일, 매시",
      idiom: "每況愈下 (매황유하 - 상태가 점점 나빠짐)",
      level: "5급",
      m1: ["매일", "매시", "매주", "매월", "매년", "매번", "매번마다"],
      m2: [],
      e6: ["매일", "매시"],
    },
    {
      character: "面",
      meaning: "낯",
      meaningKey: "면",
      example: "면접, 표면",
      idiom: "面面相覷 (면면상휼 - 서로 얼굴을 쳐다봄)",
      level: "5급",
      m1: ["면접", "표면", "면적"],
      m2: ["대면", "비대면"],
      e6: ["면접", "표면"],
    },
    {
      character: "命",
      meaning: "목숨",
      meaningKey: "명",
      example: "명령, 운명",
      idiom: "生死有命 (생사유명 - 죽고 사는 것은 하늘의 뜻)",
      level: "5급",
      m1: ["명령", "운명"],
      m2: [],
      e6: ["명령", "운명"],
    },
    {
      character: "明",
      meaning: "밝을",
      meaningKey: "명",
      example: "명확, 분명",
      idiom: "明察秋毫 (명찰추호 - 작은 일까지 밝게 살핌)",
      level: "5급",
      m1: ["명확", "분명", "명확성"],
      m2: [],
      e6: ["명확", "분명"],
    },
    {
      character: "毛",
      meaning: "털",
      meaningKey: "모",
      example: "털실, 모피",
      idiom: "禿頭露毛 (독두노모 - 머리가 벗겨지고 털이 드러남)",
      level: "5급",
      m1: ["모피"],
      m2: [],
      e6: ["모피"],
    },
    {
      character: "無",
      meaning: "없을",
      meaningKey: "무",
      example: "무한, 무기",
      idiom: "無限大 (무한대 - 한계가 없음)",
      level: "5급",
      m1: ["무한", "무기"],
      m2: [],
      e6: ["무한", "무기"],
    },
    {
      character: "聞",
      meaning: "들을",
      meaningKey: "문",
      example: "신문, 소문",
      idiom: "聞一知十 (문일지십 - 한 가지를 듣고 열 가지를 앎)",
      level: "5급",
      m1: ["신문", "소문"],
      m2: [],
      e6: ["신문", "소문"],
    },
    {
      character: "問",
      meaning: "물을",
      meaningKey: "문",
      example: "질문, 문제",
      idiom: "問答如流 (문답여류 - 대화가 술술 이어짐)",
      level: "5급",
      m1: ["질문", "문제"],
      m2: [],
      e6: ["질문", "문제"],
    },
    {
      character: "物",
      meaning: "물건",
      meaningKey: "물",
      example: "물체, 동물",
      idiom: "物極必反 (물극필반 - 극에 달하면 반대로 돌아감)",
      level: "5급",
      m1: ["물체", "동물", "물리학"],
      m2: ["물체", "동물", "물리학"],
      e6: ["물체", "동물", "물건"],
    },
    {
      character: "民",
      meaning: "백성",
      meaningKey: "민",
      example: "국민, 민족",
      idiom: "民主主義 (민주주의 - 국민이 주인이 되는 정치)",
      level: "5급",
      m1: ["국민", "민족", "민주주의"],
      m2: [],
      e6: ["국민", "민족"],
    },
    {
      character: "班",
      meaning: "나눌",
      meaningKey: "반",
      example: "반장, 분반",
      idiom: "班門弄斧 (반문농부 - 대가 앞에서 솜씨를 부림)",
      level: "5급",
      m1: ["반장", "분반", "반장선거"],
      m2: [],
      e6: ["반장", "분반"],
    },
    {
      character: "半",
      meaning: "절반",
      meaningKey: "반",
      example: "반쪽, 절반",
      idiom: "半信半疑 (반신반의 - 절반 믿고 절반 의심함)",
      level: "5급",
      m1: ["반쪽", "절반", "반원"],
      m2: [],
      e6: ["반쪽", "절반"],
    },
    {
      character: "放",
      meaning: "놓을",
      meaningKey: "방",
      example: "방출, 해방",
      idiom: "放心自在 (방심자재 - 마음을 놓고 자유로움)",
      level: "5급",
      m1: ["방출", "해방", "방송", "방송국"],
      m2: [],
      e6: ["방출", "해방"],
    },
    {
      character: "番",
      meaning: "차례",
      meaningKey: "번",
      example: "번갈아, 차례",
      idiom: "一番星 (일번성 - 가장 먼저 뜨는 별)",
      level: "5급",
      m1: ["번호"],
      m2: [],
      e6: ["번호"],
    },
    {
      character: "別",
      meaning: "다를",
      meaningKey: "별",
      example: "별거, 특별",
      idiom: "別離苦 (별리고 - 이별의 아픔)",
      level: "5급",
      m1: ["별거", "특별", "특별활동"],
      m2: [],
      e6: ["특별", "특별활동"],
    },
    {
      character: "步",
      meaning: "걸음",
      meaningKey: "보",
      example: "보행, 걸음",
      idiom: "步步高升 (보보고승 - 한 걸음 한 걸음 올라감)",
      level: "5급",
      m1: ["보행", "보행안전"],
      m2: [],
      e6: ["보행", "보행자"],
    },
    {
      character: "部",
      meaning: "거느릴",
      meaningKey: "부",
      example: "부서, 일부",
      idiom: "部下服從 (부하복종 - 상사의 명령에 따름)",
      level: "5급",
      m1: ["부서", "일부", "부서회의"],
      m2: [],
      e6: ["부서", "일부"],
    },
    {
      character: "分",
      meaning: "나눌",
      meaningKey: "분",
      example: "부분, 분할",
      idiom: "分別有智 (분별유지 - 분별하는 지혜가 있음)",
      level: "5급",
      m1: ["부분", "분할", "분수", "분수계산"],
      m2: [],
      e6: ["부분", "분수"],
    },
    {
      character: "社",
      meaning: "모일",
      meaningKey: "사",
      example: "회사, 사회",
      idiom: "社會主義 (사회주의 - 국민이 주인이 되는 정치)",
      level: "5급",
      m1: ["회사", "사회"],
      m2: [],
      e6: ["회사", "사회"],
    },
    {
      character: "事",
      meaning: "일",
      meaningKey: "사",
      example: "사업, 사건",
      idiom: "事情通 (사정통 - 일의 사정을 잘 아는 사람)",
      level: "5급",
      m1: ["사업", "사업계획"],
      m2: [],
      e6: ["사업", "사건"],
    },
    {
      character: "死",
      meaning: "죽을",
      meaningKey: "사",
      example: "사망, 죽음",
      idiom: "死生決斷 (사생결단 - 죽고 사는 것을 결정함)",
      level: "5급",
      m1: ["사망", "사망률"],
      m2: [],
      e6: ["사망"],
    },
    {
      character: "色",
      meaning: "빛",
      meaningKey: "색",
      example: "색깔, 색상",
      idiom: "色即是空 (색즉시공 - 모든 색은 본래 공(空)임)",
      level: "5급",
      m1: ["색깔", "색상"],
      m2: [],
      e6: ["색깔", "색상"],
    },
    {
      character: "書",
      meaning: "글",
      meaningKey: "서",
      example: "서신, 책",
      idiom: "書中自有顏如玉 (서중자유안여옥 - 책 속에 옥 같은 얼굴이 있다)",
      level: "5급",
      m1: ["서신", "서적"],
      m2: [],
      e6: ["서신", "서적"],
    },
    {
      character: "線",
      meaning: "줄",
      meaningKey: "선",
      example: "선로, 직선",
      idiom: "線上作業 (선상작업 - 줄을 따라 작업함)",
      level: "5급",
      m1: ["선로", "직선"],
      m2: [],
      e6: ["직선"],
    },
    {
      character: "性",
      meaning: "성품",
      meaningKey: "성",
      example: "성격, 본성",
      idiom: "性善說 (성선설 - 사람의 본성은 선함)",
      level: "5급",
      m1: ["성격", "본성", "성격검사"],
      m2: [],
      e6: ["성격"],
    },
    {
      character: "成",
      meaning: "이룰",
      meaningKey: "성",
      example: "성공, 완성",
      idiom: "成功不居 (성공불거 - 성공을 자랑하지 않음)",
      level: "5급",
      m1: ["성공", "완성", "성장"],
      m2: [],
      e6: ["성공", "성장"],
    },
    {
      character: "所",
      meaning: "바",
      meaningKey: "소",
      example: "장소, 소유",
      idiom: "所謂 (소위 - 이른바)",
      level: "5급",
      m1: ["장소", "소유", "소유권"],
      m2: [],
      e6: ["장소", "소유"],
    },
    {
      character: "首",
      meaning: "머리",
      meaningKey: "수",
      example: "수도, 수장",
      idiom: "首屈一指 (수굴일지 - 가장 뛰어남)",
      level: "5급",
      m1: ["수도", "수장", "수도권"],
      m2: [],
      e6: ["수도"],
    },
    {
      character: "詩",
      meaning: "글",
      meaningKey: "시",
      example: "시가, 시인",
      idiom: "詩情畫意 (시정화의 - 시 같은 정서와 그림 같은 뜻)",
      level: "5급",
      m1: ["시가", "시인", "시학습", "시해석", "시분석", "시감상", "시교육"],
      m2: ["시", "시가", "시인", "시집"],
      e6: ["시가", "시인"],
    },
    {
      character: "時",
      meaning: "때",
      meaningKey: "시",
      example: "시간, 시기",
      idiom: "時機到來 (시기 도래 - 적절한 때가 옴)",
      level: "5급",
      m1: ["시간", "시기"],
      m2: [],
      e6: ["시간", "시기"],
    },
    {
      character: "示",
      meaning: "보일",
      meaningKey: "시",
      example: "표시, 지시",
      idiom: "示威遊行 (시위유행 - 권리 주장을 위한 행진)",
      level: "5급",
      m1: ["표시", "지시", "표시등", "표시안내"],
      m2: [],
      e6: ["표시", "지시"],
    },
    {
      character: "市",
      meaning: "저자",
      meaningKey: "시",
      example: "시장, 도시",
      idiom: "市井之徒 (시정지도 - 평범한 사람들)",
      level: "5급",
      m1: ["시장", "도시"],
      m2: ["도시계획"],
      e6: ["시장", "도시"],
    },
    {
      character: "植",
      meaning: "심을",
      meaningKey: "식",
      example: "식물, 파종",
      idiom: "植樹節 (식수절 - 나무 심는 날)",
      level: "5급",
      m1: ["식물", "식물학"],
      m2: ["식물", "식물학"],
      e6: ["식물"],
    },
    {
      character: "神",
      meaning: "귀신",
      meaningKey: "신",
      example: "신앙, 정신",
      idiom: "神出鬼沒 (신출귀몰 - 갑자기 나타나고 사라짐)",
      level: "5급",
      m1: ["신앙", "정신"],
      m2: [],
      e6: ["정신"],
    },
    {
      character: "身",
      meaning: "몸",
      meaningKey: "신",
      example: "신체, 신장",
      idiom: "身體健康 (신체건강 - 몸이 건강함)",
      level: "5급",
      m1: ["신체", "신장"],
      m2: [],
      e6: ["신체"],
    },
    {
      character: "信",
      meaning: "믿을",
      meaningKey: "신",
      example: "신뢰, 믿음",
      idiom: "信賞必罰 (신상필벌 - 상을 주고 벌을 줌)",
      level: "5급",
      m1: ["신뢰"],
      m2: [],
      e6: ["신뢰"],
    },
    {
      character: "新",
      meaning: "새로울",
      meaningKey: "신",
      example: "신규, 신속",
      idiom: "新陳代謝 (신진대사 - 새로운 것이 옛것을 대체함)",
      level: "5급",
      m1: ["신규", "신속", "신기술", "신제품", "신개발", "신발전", "신혁신"],
      m2: [],
      e6: ["신규"],
    },
    {
      character: "室",
      meaning: "집",
      meaningKey: "실",
      example: "교실, 실내",
      idiom: "室內運動 (실내운동 - 실내에서 하는 운동)",
      level: "5급",
      m1: ["실내"],
      m2: ["교실"],
      e6: ["교실", "실내"],
    },
    {
      character: "安",
      meaning: "편안할",
      meaningKey: "안",
      example: "안전, 안심",
      idiom: "安居樂業 (안거락업 - 편안히 살며 즐겁게 일함)",
      level: "5급",
      m1: ["안전", "안심"],
      m2: [],
      e6: ["안전"],
    },
    {
      character: "夜",
      meaning: "밤",
      meaningKey: "야",
      example: "야간, 심야",
      idiom: "夜半歌聲 (야반가성 - 밤중에 들려오는 노래 소리)",
      level: "5급",
      m1: ["야간", "심야"],
      m2: [],
      e6: ["야간"],
    },
    {
      character: "弱",
      meaning: "약할",
      meaningKey: "약",
      example: "약점, 약골",
      idiom: "弱肉強食 (약육강식 - 약한 자가 강한 자에게 먹힘)",
      level: "5급",
      m1: ["약점", "약골"],
      m2: [],
      e6: ["약점"],
    },
    {
      character: "語",
      meaning: "말씀",
      meaningKey: "어",
      example: "언어, 국어",
      idiom: "語重心長 (어중심장 - 말이 무겁고 마음이 깊음)",
      level: "5급",
      m1: ["언어", "국어"],
      m2: [],
      e6: ["언어", "국어"],
    },
    {
      character: "言",
      meaning: "말씀",
      meaningKey: "언",
      example: "언어, 언행",
      idiom: "言行一致 (언행일치 - 말과 행동이 일치함)",
      level: "5급",
      m1: ["언어", "언행"],
      m2: [],
      e6: ["언어", "언행"],
    },
    {
      character: "永",
      meaning: "길",
      meaningKey: "영",
      example: "영원, 영구",
      idiom: "永遠不變 (영원불변 - 영원히 변하지 않음)",
      level: "5급",
      m1: ["영원", "영구"],
      m2: [],
      e6: ["영원"],
    },
    {
      character: "英",
      meaning: "꽃부리",
      meaningKey: "영",
      example: "영웅, 영국",
      idiom: "英姿颯爽 (영자삽상 - 씩씩하고 용감한 모습)",
      level: "5급",
      m1: ["영웅", "영국", "영어"],
      m2: [],
      e6: ["영어"],
    },
    {
      character: "午",
      meaning: "낮",
      meaningKey: "오",
      example: "오후, 오전",
      idiom: "午睡 (오수 - 낮잠)",
      level: "5급",
      m1: ["오후", "오전"],
      m2: [],
      e6: ["오후", "오전"],
    },
    {
      character: "用",
      meaning: "쓸",
      meaningKey: "용",
      example: "용도, 사용",
      idiom: "用意周到 (용의주도 - 준비가 철저함)",
      level: "5급",
      m1: ["용도", "사용", "사용법"],
      m2: [],
      e6: ["용도", "사용"],
    },
    {
      character: "友",
      meaning: "벗",
      meaningKey: "우",
      example: "친구, 우정",
      idiom: "友情永固 (우정영고 - 우정이 오래도록 굳음)",
      level: "5급",
      m1: ["우정"],
      m2: [],
      e6: ["우정"],
    },
    {
      character: "遠",
      meaning: "멀",
      meaningKey: "원",
      example: "원거리, 원시",
      idiom: "遠交近攻 (원교근공 - 먼 나라와 친하고 가까운 나라를 공격함)",
      level: "5급",
      m1: ["원거리", "원시"],
      m2: [],
      e6: ["원거리"],
    },
    {
      character: "原",
      meaning: "언덕,근본",
      meaningKey: "원",
      example: "원인, 원본",
      idiom: "原因結果 (원인결과 - 원인과 결과)",
      level: "5급",
      m1: ["원인", "원본"],
      m2: [],
      e6: ["원인"],
    },
    {
      character: "元",
      meaning: "으뜸",
      meaningKey: "원",
      example: "원기, 원년",
      idiom: "元氣充沛 (원기충패 - 원기가 넘침)",
      level: "5급",
      m1: [
        "원기",
        "원년",
        "원기회복",
        "원기충만",
        "원기발전",
        "원기육성",
        "원기관리",
      ],
      m2: [],
      e6: ["원기"],
    },
    {
      character: "有",
      meaning: "있을",
      meaningKey: "유",
      example: "유용, 유무",
      idiom: "有利無弊 (유리무폐 - 이롭고 해가 없음)",
      level: "5급",
      m1: ["유용", "유무"],
      m2: [],
      e6: ["유용"],
    },
    {
      character: "肉",
      meaning: "고기",
      meaningKey: "육",
      example: "육류, 육체",
      idiom: "肉中刺 (육중자 - 고기 속의 가시, 작은 문제)",
      level: "5급",
      m1: ["육류", "육체"],
      m2: [],
      e6: ["육류"],
    },
    {
      character: "育",
      meaning: "기를",
      meaningKey: "육",
      example: "교육, 육성",
      idiom: "教育育才 (교육육재 - 교육으로 인재를 기름)",
      level: "5급",
      m1: ["교육", "육성"],
      m2: [],
      e6: ["교육"],
    },
    {
      character: "銀",
      meaning: "은",
      meaningKey: "은",
      example: "은행, 은화",
      idiom: "銀河 (은하 - 밤하늘의 은빛 강)",
      level: "5급",
      m1: ["은하수"],
      m2: [],
      e6: ["은행"],
    },
    {
      character: "音",
      meaning: "소리",
      meaningKey: "음",
      example: "음악, 소리",
      idiom: "音信不通 (음신불통 - 소식이 끊김)",
      level: "5급",
      m1: ["음악"],
      m2: [],
      e6: ["음악"],
    },
    {
      character: "邑",
      meaning: "고을",
      meaningKey: "읍",
      example: "읍락, 군읍",
      idiom: "郡邑 (군읍 - 작은 행정 구역)",
      level: "5급",
      m1: ["읍락", "군읍", "읍사무소"],
      m2: [],
      e6: ["읍락"],
    },
    {
      character: "意",
      meaning: "뜻",
      meaningKey: "의",
      example: "의사, 의미",
      idiom: "意氣用事 (의기용사 - 감정에 치우쳐 행동함)",
      level: "5급",
      m1: ["의사", "의미"],
      m2: [],
      e6: ["의사", "의미"],
    },
    {
      character: "作",
      meaning: "지을",
      meaningKey: "작",
      example: "작품, 동작",
      idiom: "作戰計劃 (작전계획 - 전투 계획)",
      level: "5급",
      m1: ["작품", "동작", "작문", "작가", "작사", "작곡"],
      m2: [],
      e6: ["작품", "작문"],
    },
    {
      character: "長",
      meaning: "긴",
      meaningKey: "장",
      example: "장기, 장점",
      idiom: "長命富貴 (장명부귀 - 오래 살고 부귀를 누림)",
      level: "5급",
      m1: [
        "장기",
        "장점",
        "장관",
        "장래",
        "장소",
        "장시간",
        "장거리",
        "장마",
        "장학금",
      ],
      m2: [],
      e6: ["장기", "장점"],
    },
    {
      character: "場",
      meaning: "마당",
      meaningKey: "장",
      example: "시장, 장소",
      idiom: "場外交易 (장외거래 - 공식 장 이외의 거래)",
      level: "5급",
      m1: ["시장", "장소", "운동장"],
      m2: [],
      e6: ["시장", "장소"],
    },
    {
      character: "才",
      meaning: "재주",
      meaningKey: "재",
      example: "재능, 천재",
      idiom: "才高八斗 (재고팔두 - 매우 뛰어난 재능)",
      level: "5급",
      m1: ["재능", "천재", "재주", "재질", "재료", "재산", "재생"],
      m2: [],
      e6: ["재능"],
    },
    {
      character: "田",
      meaning: "밭",
      meaningKey: "전",
      example: "전원, 논밭",
      idiom: "田園故鄕 (전원고향 - 전원의 고향)",
      level: "5급",
      m1: ["전원"],
      m2: [],
      e6: ["전원"],
    },
    {
      character: "電",
      meaning: "번개",
      meaningKey: "전",
      example: "전기, 전화",
      idiom: "電光石火 (전광석화 - 매우 빠른 움직임)",
      level: "5급",
      m1: [
        "전기",
        "전화",
        "전자",
        "전력",
        "전압",
        "전류",
        "전선",
        "전구",
        "전기요금",
      ],
      m2: [],
      e6: ["전기", "전화"],
    },
    {
      character: "前",
      meaning: "앞",
      meaningKey: "전",
      example: "전진, 전방",
      idiom: "前途有望 (전도유망 - 앞길이 밝음)",
      level: "5급",
      m1: [
        "전진",
        "전방",
        "전면",
        "전체",
        "전국",
        "전문",
        "전시",
        "전쟁",
        "전통",
      ],
      m2: [],
      e6: ["전진", "전체"],
    },
    {
      character: "全",
      meaning: "온전할",
      meaningKey: "전",
      example: "완전, 전체",
      idiom: "全力投球 (전력투구 - 전력을 다함)",
      level: "5급",
      m1: [
        "완전",
        "전체",
        "전국",
        "전문",
        "전시",
        "전쟁",
        "전통",
        "전력",
        "전면",
      ],
      m2: [],
      e6: ["완전", "전체"],
    },
    {
      character: "朝",
      meaning: "아침",
      meaningKey: "조",
      example: "조간, 아침",
      idiom: "朝令暮改 (조령모개 - 명령이 자주 바뀜)",
      level: "5급",
      m1: ["조간", "아침", "조기"],
      m2: [],
      e6: ["조간"],
    },
    {
      character: "祖",
      meaning: "할아비",
      meaningKey: "조",
      example: "조상, 선조",
      idiom: "祖宗之法 (조종지법 - 조상의 법)",
      level: "5급",
      m1: ["조상", "선조", "조부", "조부모", "조상님"],
      m2: [],
      e6: ["조상"],
    },
    {
      character: "晝",
      meaning: "낮",
      meaningKey: "주",
      example: "주간, 낮",
      idiom: "日間晝夜 (일간주야 - 낮과 밤)",
      level: "5급",
      m1: ["주간", "낮", "주말"],
      m2: [],
      e6: ["주간"],
    },
    {
      character: "住",
      meaning: "살",
      meaningKey: "주",
      example: "주민, 주소",
      idiom: "住處安穩 (주처안온 - 사는 곳이 편안함)",
      level: "5급",
      m1: [
        "주민",
        "주소",
        "주택",
        "주거",
        "주변",
        "주요",
        "주제",
        "주인",
        "주장",
      ],
      m2: [],
      e6: ["주민", "주소"],
    },
    {
      character: "竹",
      meaning: "대",
      meaningKey: "죽",
      example: "죽순, 대나무",
      idiom: "竹報平安 (죽보평안 - 대나무가 평안함을 알림)",
      level: "5급",
      m1: ["죽순", "죽림", "죽사", "죽마"],
      m2: [],
      e6: ["죽순"],
    },
    {
      character: "重",
      meaning: "무거울",
      meaningKey: "중",
      example: "중량, 중요",
      idiom: "重言復語 (중언부어 - 같은 말을 되풀이함)",
      level: "5급",
      m1: ["중량", "중요", "중심", "중요성"],
      m2: [],
      e6: ["중요"],
    },
    {
      character: "直",
      meaning: "곧을",
      meaningKey: "직",
      example: "직접, 직진",
      idiom: "直言不諱 (직언불회 - 솔직하게 말함)",
      level: "5급",
      m1: ["직접", "직진", "직선", "직업", "직원"],
      m2: [],
      e6: ["직접", "직업"],
    },
    {
      character: "草",
      meaning: "풀",
      meaningKey: "초",
      example: "초원, 잔디",
      idiom: "草木皆兵 (초목개병 - 모든 풀과 나무가 적으로 보임)",
      level: "5급",
      m1: [
        "초원",
        "초록",
        "초등학교",
        "초등학생",
        "초기",
        "초보",
        "초등",
        "초등교육",
      ],
      m2: [],
      e6: ["초원", "초등학교"],
    },
    {
      character: "村",
      meaning: "마을",
      meaningKey: "촌",
      example: "촌락, 농촌",
      idiom: "田園故鄕 (전원고향 - 전원의 고향)",
      level: "5급",
      m1: ["촌락", "농촌", "촌장"],
      m2: [],
      e6: ["촌락", "농촌"],
    },
    {
      character: "秋",
      meaning: "가을",
      meaningKey: "추",
      example: "추수, 가을",
      idiom: "秋高氣爽 (추고기상 - 가을 하늘이 맑고 상쾌함)",
      level: "5급",
      m1: ["추수", "추석", "추론", "추상"],
      m2: [],
      e6: ["추수", "추석"],
    },
    {
      character: "春",
      meaning: "봄",
      meaningKey: "춘",
      example: "춘곤증, 봄",
      idiom: "春暖花開 (춘난화개 - 봄날에 꽃이 핌)",
      level: "5급",
      m1: ["춘곤증", "춘분", "춘절", "춘기", "춘색"],
      m2: [],
      e6: ["춘곤증"],
    },
    {
      character: "親",
      meaning: "친할",
      meaningKey: "친",
      example: "부모, 친척",
      idiom: "親仁善鄰 (친인선린 - 어진 사람은 이웃과 잘 지냄)",
      level: "5급",
      m1: ["친척", "친구", "친밀", "친근", "친환경", "친자", "친목", "친교"],
      m2: [],
      e6: ["부모", "친척"],
    },
    {
      character: "太",
      meaning: "클",
      meaningKey: "태",
      example: "태양, 태평",
      idiom: "太平盛世 (태평성세 - 평화롭고 번성하는 시대)",
      level: "5급",
      m1: [
        "태양",
        "태평",
        "태도",
        "태생",
        "태아",
        "태풍",
        "태극기",
        "태극권",
        "태양광",
      ],
      m2: [],
      e6: ["태양"],
    },
    {
      character: "通",
      meaning: "통할",
      meaningKey: "통",
      example: "통행, 소통",
      idiom: "通情達理 (통정달리 - 마음이 통하고 이치를 이해함)",
      level: "5급",
      m1: [
        "통행",
        "소통",
        "통신",
        "통계",
        "통일",
        "통과",
        "통지",
        "통합",
        "통화",
      ],
      m2: [],
      e6: ["통행", "통계"],
    },
    {
      character: "貝",
      meaning: "조개",
      meaningKey: "패",
      example: "조개, 패각",
      idiom: "貝多不售 (패다불수 - 조개가 많으면 팔리지 않음)",
      level: "5급",
      m1: ["패각", "어패류", "패물"],
      m2: [],
      e6: ["어패류"],
    },
    {
      character: "便",
      meaning: "편할",
      meaningKey: "편",
      example: "편리, 편안",
      idiom: "便宜施行 (편의시행 - 편리하게 시행함)",
      level: "5급",
      m1: ["편리", "편안", "편지", "편의점", "편의시설", "편의성"],
      m2: [],
      e6: ["편리", "편지"],
    },
    {
      character: "平",
      meaning: "평평할",
      meaningKey: "평",
      example: "평화, 평등",
      idiom: "平和外交 (평화외교 - 평화로운 외교)",
      level: "5급",
      m1: [
        "평화",
        "평등",
        "평면",
        "평균",
        "평가",
        "평상시",
        "평소",
        "평일",
        "평가서",
      ],
      m2: [],
      e6: ["평화", "평균"],
    },
    {
      character: "夏",
      meaning: "여름",
      meaningKey: "하",
      example: "하계, 여름",
      idiom: "夏日炎炎 (하일염염 - 여름날이 매우 더움)",
      level: "5급",
      m1: ["하계", "하계올림픽"],
      m2: [],
      e6: ["하계"],
    },
    {
      character: "學",
      meaning: "배울",
      meaningKey: "학",
      example: "학교, 학습",
      idiom: "學而不厭 (학이불염 - 배우기를 싫어하지 않음)",
      level: "5급",
      m1: [
        "학교",
        "학습",
        "학생",
        "학년",
        "학기",
        "학과",
        "학원",
        "학력",
        "학업",
      ],
      m2: [],
      e6: ["학교", "학습"],
    },
    {
      character: "韓",
      meaning: "나라이름",
      meaningKey: "한",
      example: "한국, 한글",
      idiom: "韓國史 (한국사 - 한국의 역사)",
      level: "5급",
      m1: ["한국", "한글", "한국어", "한국사", "한국문화"],
      m2: [],
      e6: ["한국", "한글"],
    },
    {
      character: "漢",
      meaning: "한수",
      meaningKey: "한",
      example: "한문, 한자",
      idiom: "漢字文化 (한자문화 - 한자를 사용하는 문화)",
      level: "5급",
      m1: ["한문", "한자", "한자어", "한자학습"],
      m2: [],
      e6: ["한문", "한자"],
    },
    {
      character: "合",
      meaning: "합할",
      meaningKey: "합",
      example: "합의, 합계",
      idiom: "合理的 (합리적 - 이치에 맞음)",
      level: "5급",
      m1: [
        "합의",
        "합계",
        "합리",
        "합동",
        "합격",
        "합법",
        "합성",
        "합류",
        "합작",
      ],
      m2: [],
      e6: ["합의", "합계"],
    },
    {
      character: "海",
      meaning: "바다",
      meaningKey: "해",
      example: "해양, 해변",
      idiom: "海闊天空 (해활천공 - 바다처럼 넓고 하늘처럼 높음)",
      level: "5급",
      m1: ["해양", "해변", "해수욕장", "해양생물", "해양환경"],
      m2: [],
      e6: ["해양", "해변", "해수욕장", "해양생물", "해양환경"],
    },
    {
      character: "行",
      meaning: "다닐",
      meaningKey: "행",
      example: "행위, 실행",
      idiom: "行雲流水 (행운유수 - 구속받지 않는 자유로운 행동)",
      level: "5급",
      m1: ["행위", "실행", "행동", "행사", "행정", "행복", "행정부"],
      m2: [],
      e6: ["행동", "행사", "행복"],
    },
    {
      character: "血",
      meaning: "피",
      meaningKey: "혈",
      example: "혈액, 혈관",
      idiom: "血氣方剛 (혈기방강 - 혈기가 왕성함)",
      level: "5급",
      m1: ["혈액", "혈관", "혈압", "혈당", "혈액검사", "혈액형", "혈액순환"],
      m2: [],
      e6: ["혈액", "혈관", "혈액순환"],
    },
    {
      character: "形",
      meaning: "모양",
      meaningKey: "형",
      example: "형태, 형식",
      idiom: "形影不離 (형영불리 - 몸과 그림자가 떨어질 수 없음)",
      level: "5급",
      m1: ["형태", "형식", "형성", "형상", "형용사"],
      m2: [],
      e6: ["형태", "형식", "형성"],
    },
    {
      character: "花",
      meaning: "꽃",
      meaningKey: "화",
      example: "화초, 꽃밭",
      idiom: "花鳥風月 (화조풍월 - 자연의 아름다움)",
      level: "5급",
      m1: ["화초", "화병"],
      m2: [],
      e6: ["화초"],
    },
    {
      character: "話",
      meaning: "말씀",
      meaningKey: "화",
      example: "대화, 회화",
      idiom: "談笑風生 (담소풍생 - 즐겁게 이야기함)",
      level: "5급",
      m1: ["대화", "회화", "화제", "화법"],
      m2: [],
      e6: ["대화", "회화", "이야기", "화제"],
    },
    {
      character: "和",
      meaning: "화할,화목할",
      meaningKey: "화",
      example: "화합, 평화",
      idiom: "和而不同 (화이부동 - 조화롭지만 같지는 않음)",
      level: "5급",
      m1: ["화합", "평화", "화목", "화해", "화제", "화학"],
      m2: [],
      e6: ["화합", "평화", "화목", "화학"],
    },
    {
      character: "活",
      meaning: "살",
      meaningKey: "활",
      example: "생활, 활동",
      idiom: "活潑生動 (활발생동 - 생기 있고 활기참)",
      level: "5급",
      m1: [
        "생활",
        "활동",
        "활발",
        "활용",
        "활기",
        "활력",
        "활동량",
        "활동시간",
        "활동장소",
      ],
      m2: [],
      e6: ["생활", "활동", "활발", "활용"],
    },
    {
      character: "黃",
      meaning: "누를",
      meaningKey: "황",
      example: "황색, 황금",
      idiom: "黃金時代 (황금시대 - 가장 좋은 시기)",
      level: "5급",
      m1: [
        "황색",
        "황금",
        "황제",
        "황후",
        "황실",
        "황제국",
        "황금시대",
        "황금비율",
        "황금률",
      ],
      m2: [],
      e6: ["황색", "황금", "황금시대"],
    },
    {
      character: "會",
      meaning: "모일",
      meaningKey: "회",
      example: "회의, 회합",
      idiom: "會者定離 (회자정리 - 만나는 자는 반드시 헤어짐)",
      level: "5급",
      m1: ["회의", "회합", "회사", "회원", "회장", "회계", "회전", "회수"],
      m2: [],
      e6: ["회의", "회합", "회사", "회원", "회장"],
    },
  ],
};
