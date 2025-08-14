export interface HanjaData {
  character: string;
  meaning: string;
  meaningKey: string;
  example: string;
  idiom: string;
  level: string;
  m1?: string[];
  m2?: string[];
  example_exp?: Array<{ kor: string; hanja: string; naverUrl: string }>;
  m1_exp?: Array<{ kor: string; hanja: string; naverUrl: string }>;
  m2_exp?: Array<{ kor: string; hanja: string; naverUrl: string }>;
}

export interface HanjaGroupDto {
  TypeA?: HanjaData[];
  TypeB?: HanjaGroupDto;
}

export const hanjaGroupData: HanjaGroupDto = {
  TypeA: [
    {
      character: "江",
      meaning: "강",
      meaningKey: "강",
      example: "강물, 강변",
      idiom: "江口煙月 (강구연월 - 강가의 아름다운 풍경)",
      level: "7급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: [
            "강물",
            "강변",
            "강남",
            "강북",
            "강화",
            "강제",
            "강하",
            "강수량",
            "강가",
          ],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "강화",
            "강화도",
            "강화조약",
            "강화회담",
            "강화정책",
            "강화협정",
            "강화과정",
            "강화역사",
          ],
        },
      },
      example_exp: [
        {
          kor: "강물",
          hanja: "江水",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江水",
        },
        {
          kor: "강변",
          hanja: "江邊",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江邊",
        },
      ],
      m1_exp: [
        {
          kor: "강물",
          hanja: "江水",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江水",
        },
        {
          kor: "강변",
          hanja: "江邊",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江邊",
        },
        {
          kor: "강남",
          hanja: "江南",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江南",
        },
        {
          kor: "강북",
          hanja: "江北",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江北",
        },
        {
          kor: "강화",
          hanja: "江華",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江華",
        },
        {
          kor: "강제",
          hanja: "江制",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江制",
        },
        {
          kor: "강하",
          hanja: "江下",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江下",
        },
        {
          kor: "강수량",
          hanja: "江水量",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江水量",
        },
        {
          kor: "강가",
          hanja: "江가",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江가",
        },
      ],
      m2_exp: [
        {
          kor: "강화",
          hanja: "江華",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江華",
        },
        {
          kor: "강화도",
          hanja: "江華島",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江華島",
        },
        {
          kor: "강화조약",
          hanja: "江華條約",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江華條約",
        },
        {
          kor: "강화회담",
          hanja: "江華會談",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江華會談",
        },
        {
          kor: "강화정책",
          hanja: "江華政策",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江華政策",
        },
        {
          kor: "강화협정",
          hanja: "江華協定",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江華協定",
        },
        {
          kor: "강화과정",
          hanja: "江華過程",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江華過程",
        },
        {
          kor: "강화역사",
          hanja: "江華歷史",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江華歷史",
        },
      ],
    },
    {
      character: "口",
      meaning: "입",
      meaningKey: "구",
      example: "인구, 입구",
      idiom: "異口同聲 (이구동성 - 여러 사람의 말이 같음)",
      level: "7급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: [
            "인구",
            "입구",
            "구강",
            "구두",
            "구두점",
            "구두법",
            "인구통계",
            "인구밀도",
            "구강위생",
          ],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "인구통계",
            "인구밀도",
            "인구조사",
            "인구변화",
            "인구증가",
            "인구감소",
            "인구정책",
            "인구문제",
          ],
        },
      },
      example_exp: [
        {
          kor: "인구",
          hanja: "人口",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=人口",
        },
        {
          kor: "입구",
          hanja: "入口",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=入口",
        },
      ],
      m1_exp: [
        {
          kor: "인구",
          hanja: "人口",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=人口",
        },
        {
          kor: "입구",
          hanja: "入口",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=入口",
        },
        {
          kor: "구강",
          hanja: "口腔",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=口腔",
        },
        {
          kor: "구두",
          hanja: "口頭",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=口頭",
        },
        {
          kor: "구두법",
          hanja: "口頭法",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=口頭法",
        },
        {
          kor: "구강위생",
          hanja: "口腔衛生",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=口腔衛生",
        },
      ],
      m2_exp: [
        {
          kor: "인구통계",
          hanja: "人口統計",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=人口統計",
        },
        {
          kor: "인구밀도",
          hanja: "人口密度",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=人口密度",
        },
        {
          kor: "인구조사",
          hanja: "人口調査",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=人口調査",
        },
      ],
    },
    {
      character: "內",
      meaning: "안",
      meaningKey: "내",
      example: "내부, 국내",
      idiom: "內憂外患 (내우외환 - 안팎의 어려움)",
      level: "7급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: [
            "내부",
            "국내",
            "내용",
            "내일",
            "내년",
            "내용물",
            "국내외",
            "내정",
            "내각",
            "내심",
          ],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "내각",
            "내각제",
            "내각총리",
            "내각회의",
            "내각개편",
            "내각해산",
            "내각정책",
            "내각역할",
          ],
        },
      },
      example_exp: [
        {
          kor: "내부",
          hanja: "內部",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內部",
        },
        {
          kor: "국내",
          hanja: "國內",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=國內",
        },
      ],
      m1_exp: [
        {
          kor: "내부",
          hanja: "內部",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內部",
        },
        {
          kor: "국내",
          hanja: "國內",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=國內",
        },
        {
          kor: "내용",
          hanja: "內容",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內容",
        },
        {
          kor: "내일",
          hanja: "內日",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內日",
        },
        {
          kor: "내년",
          hanja: "內年",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內年",
        },
        {
          kor: "내용물",
          hanja: "內容物",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內容物",
        },
        {
          kor: "국내외",
          hanja: "國內外",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=國內外",
        },
        {
          kor: "내정",
          hanja: "內政",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內政",
        },
        {
          kor: "내각",
          hanja: "內閣",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內閣",
        },
        {
          kor: "내심",
          hanja: "內心",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內心",
        },
      ],
      m2_exp: [
        {
          kor: "내각",
          hanja: "內閣",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內閣",
        },
        {
          kor: "내각제",
          hanja: "內閣制",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內閣制",
        },
        {
          kor: "내각총리",
          hanja: "內閣總理",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內閣總理",
        },
        {
          kor: "내각회의",
          hanja: "內閣會議",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內閣會議",
        },
        {
          kor: "내각개편",
          hanja: "內閣改編",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內閣改編",
        },
        {
          kor: "내각해산",
          hanja: "內閣解散",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內閣解散",
        },
        {
          kor: "내각정책",
          hanja: "內閣政策",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內閣政策",
        },
        {
          kor: "내각역할",
          hanja: "內閣役割",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=內閣役割",
        },
      ],
    },
  ],
};
