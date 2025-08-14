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
  m_exp?: Array<{ kor: string; hanja: string; naverUrl: string }>;
}
export interface HanjaGroupDto {
  TypeA?: HanjaData[];
  TypeB?: HanjaData[];
}

export const hanjaGroupData: HanjaGroupDto = {
  TypeA: [
    {
      character: "犬",
      meaning: "개",
      meaningKey: "견",
      example: "애견, 견공",
      idiom: "鷄犬不寧 (계견불녕 - 닭과 개가 편치 못함)",
      level: "6급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: ["애견", "견공", "견종", "견사", "견사료", "견사장", "견사법"],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "애견",
            "애견용품",
            "애견사료",
            "애견병원",
            "애견미용",
            "애견훈련",
            "애견보험",
            "애견문화",
          ],
        },
      },
      e6: ["애견", "견공"],
      example_exp: [
        {
          kor: "애견",
          hanja: "愛犬",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=愛犬",
        },
        {
          kor: "견공",
          hanja: "犬公",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=犬公",
        },
      ],
      m_exp: [
        {
          kor: "애견",
          hanja: "愛犬",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=愛犬",
        },
        {
          kor: "견공",
          hanja: "犬公",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=犬公",
        },
        {
          kor: "견종",
          hanja: "犬種",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=犬種",
        },
        {
          kor: "견사",
          hanja: "犬舍",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=犬舍",
        },
        {
          kor: "견사료",
          hanja: "犬飼料",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=犬飼料",
        },
        {
          kor: "견사장",
          hanja: "犬舍場",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=犬舍場",
        },
      ],
    },
    {
      character: "己",
      meaning: "몸",
      meaningKey: "기",
      example: "자기, 자신",
      idiom: "克己復禮 (극기복례 - 자신을 이기고 예로 돌아감)",
      level: "6급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: [
            "자기",
            "자신",
            "자기소개",
            "자기관리",
            "자기주도학습",
            "자기평가",
          ],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "자기",
            "자기소개",
            "자기관리",
            "자기주도학습",
            "자기평가",
            "자기계발",
            "자기성찰",
            "자기개선",
          ],
        },
      },
      e6: ["자기", "자신"],
      example_exp: [
        {
          kor: "자기",
          hanja: "自己",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=自己",
        },
        {
          kor: "자신",
          hanja: "自身",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=自身",
        },
      ],
      m_exp: [
        {
          kor: "자기",
          hanja: "自己",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=自己",
        },
        {
          kor: "자신",
          hanja: "自身",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=自身",
        },
        {
          kor: "자기소개",
          hanja: "自己紹介",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=自己紹介",
        },
        {
          kor: "자기관리",
          hanja: "自己管理",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=自己管理",
        },
      ],
    },
    {
      character: "林",
      meaning: "수풀",
      meaningKey: "림",
      example: "산림, 수림",
      idiom: "林中之虎 (임중지호 - 숲 속의 호랑이)",
      level: "6급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: [
            "산림",
            "수림",
            "삼림",
            "삼림욕",
            "삼림보호",
            "삼림자원",
            "삼림법",
          ],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "삼림",
            "삼림욕",
            "삼림보호",
            "삼림자원",
            "삼림법",
            "삼림생태",
            "삼림환경",
            "삼림관리",
          ],
        },
      },
      e6: ["산림", "삼림"],
      example_exp: [
        {
          kor: "산림",
          hanja: "山林",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=山林",
        },
        {
          kor: "수림",
          hanja: "樹林",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=樹林",
        },
      ],
      m_exp: [
        {
          kor: "산림",
          hanja: "山林",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=山林",
        },
        {
          kor: "수림",
          hanja: "樹林",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=樹林",
        },
        {
          kor: "삼림",
          hanja: "森林",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=森林",
        },
        {
          kor: "삼림욕",
          hanja: "森林浴",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=森林浴",
        },
        {
          kor: "삼림보호",
          hanja: "森林保護",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=森林保護",
        },
      ],
    },
    {
      character: "馬",
      meaning: "말",
      meaningKey: "마",
      example: "마차, 경마",
      idiom: "馬耳東風 (마이동풍 - 남의 말을 귀담아듣지 않음)",
      level: "6급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: [
            "마차",
            "경마",
            "마필",
            "마구간",
            "마사지",
            "마사지기",
            "마사지법",
          ],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "경마",
            "경마장",
            "경마경기",
            "경마문화",
            "경마역사",
            "경마산업",
            "경마관람",
            "경마도박",
          ],
        },
      },
      e6: ["마차", "경마"],
      example_exp: [
        {
          kor: "마차",
          hanja: "馬車",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=馬車",
        },
        {
          kor: "경마",
          hanja: "競馬",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=競馬",
        },
      ],
      m_exp: [
        {
          kor: "마차",
          hanja: "馬車",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=馬車",
        },
        {
          kor: "경마",
          hanja: "競馬",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=競馬",
        },
        {
          kor: "마필",
          hanja: "馬匹",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=馬匹",
        },
        {
          kor: "마구간",
          hanja: "馬廐間",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=馬廐間",
        },
        {
          kor: "마사지",
          hanja: "馬沙志",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=馬沙志",
        },
      ],
    },
    {
      character: "名",
      meaning: "이름",
      meaningKey: "명",
      example: "성명, 명성",
      idiom: "名實相符 (명실상부 - 이름과 실체가 서로 부합함)",
      level: "6급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: [
            "성명",
            "명성",
            "이름",
            "명단",
            "명부",
            "명예",
            "명예훼손",
            "명예회복",
          ],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "명예",
            "명예훼손",
            "명예회복",
            "명예보호",
            "명예권",
            "명예손해",
            "명예구제",
            "명예법",
          ],
        },
      },
      e6: ["성명", "명성"],
      example_exp: [
        {
          kor: "성명",
          hanja: "姓名",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=姓名",
        },
        {
          kor: "명성",
          hanja: "名聲",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=名聲",
        },
      ],
      m_exp: [
        {
          kor: "성명",
          hanja: "姓名",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=姓名",
        },
        {
          kor: "명성",
          hanja: "名聲",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=名聲",
        },
        {
          kor: "명단",
          hanja: "名單",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=名單",
        },
        {
          kor: "명예",
          hanja: "名譽",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=名譽",
        },
      ],
    },
    {
      character: "百",
      meaning: "일백",
      meaningKey: "백",
      example: "백화점, 백만",
      idiom:
        "百聞不如一見 (백문불여일견 - 백 번 듣는 것이 한 번 보는 것만 못하다)",
      level: "6급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: [
            "백화점",
            "백만",
            "백분율",
            "백분률",
            "백분비",
            "백분점",
            "백분위",
          ],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "백분율",
            "백분률",
            "백분비",
            "백분점",
            "백분위",
            "백분율계산",
            "백분율표시",
            "백분율변환",
          ],
        },
      },
      e6: ["백화점", "백만"],
      example_exp: [
        {
          kor: "백화점",
          hanja: "百貨店",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=百貨店",
        },
        {
          kor: "백만",
          hanja: "百萬",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=百萬",
        },
      ],
      m_exp: [
        {
          kor: "백화점",
          hanja: "百貨店",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=百貨店",
        },
        {
          kor: "백만",
          hanja: "百萬",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=百萬",
        },
        {
          kor: "백분율",
          hanja: "百分率",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=百分率",
        },
        {
          kor: "백분률",
          hanja: "百分率",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=百分率",
        },
        {
          kor: "백분비",
          hanja: "百分比",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=百分比",
        },
        {
          kor: "백분점",
          hanja: "百分點",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=百分點",
        },
        {
          kor: "백분위",
          hanja: "百分位",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=百分位",
        },
      ],
    },
    {
      character: "生",
      meaning: "날",
      meaningKey: "생",
      example: "생일, 발생",
      idiom: "生者必滅 (생자필멸 - 살아 있는 것은 반드시 죽음)",
      level: "6급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: [
            "생일",
            "발생",
            "생명",
            "생물",
            "생물학",
            "생태계",
            "생태학",
            "생태보전",
          ],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "생물",
            "생물학",
            "생태계",
            "생태학",
            "생태보전",
            "생물분류",
            "생물다양성",
            "생물진화",
          ],
        },
      },
      e6: ["생일", "생명", "생물"],
      example_exp: [
        {
          kor: "생일",
          hanja: "生日",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=生日",
        },
        {
          kor: "발생",
          hanja: "發生",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=發生",
        },
      ],
      m_exp: [
        {
          kor: "생일",
          hanja: "生日",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=生日",
        },
        {
          kor: "발생",
          hanja: "發生",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=發生",
        },
        {
          kor: "생명",
          hanja: "生命",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=生命",
        },
        {
          kor: "생물",
          hanja: "生物",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=生物",
        },
        {
          kor: "생태계",
          hanja: "生態系",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=生態系",
        },
      ],
    },
    {
      character: "石",
      meaning: "돌",
      meaningKey: "석",
      example: "암석, 석유",
      idiom: "石破天驚 (석파천경 - 돌이 깨지고 하늘이 놀람)",
      level: "6급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: [
            "암석",
            "석유",
            "화석",
            "화석연료",
            "화석발전",
            "화석에너지",
            "화석자원",
          ],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "화석",
            "화석연료",
            "화석발전",
            "화석에너지",
            "화석자원",
            "화석연구",
            "화석발굴",
            "화석박물관",
          ],
        },
      },
      e6: ["암석", "석유", "화석"],
      example_exp: [
        {
          kor: "암석",
          hanja: "岩石",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=岩石",
        },
        {
          kor: "석유",
          hanja: "石油",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=石油",
        },
      ],
      m_exp: [
        {
          kor: "암석",
          hanja: "岩石",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=岩石",
        },
        {
          kor: "석유",
          hanja: "石油",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=石油",
        },
        {
          kor: "화석",
          hanja: "化石",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=化石",
        },
        {
          kor: "화석연료",
          hanja: "化石燃料",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=化石燃料",
        },
      ],
    },
    {
      character: "先",
      meaning: "먼저",
      meaningKey: "선",
      example: "선생님, 선배",
      idiom: "先見之明 (선견지명 - 미리 내다보는 밝은 지혜)",
      level: "6급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: [
            "선생님",
            "선배",
            "선후배",
            "선후배관계",
            "선후배문화",
            "선후배예의",
          ],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "선생님",
            "선배",
            "선후배",
            "선후배관계",
            "선후배문화",
            "선후배예의",
            "선후배정신",
            "선후배교육",
          ],
        },
      },
      e6: ["선생님", "선배"],
      example_exp: [
        {
          kor: "선생님",
          hanja: "先生",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=先生",
        },
        {
          kor: "선배",
          hanja: "先輩",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=先輩",
        },
      ],
      m_exp: [
        {
          kor: "선생님",
          hanja: "先生",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=先生",
        },
        {
          kor: "선배",
          hanja: "先輩",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=先輩",
        },
        {
          kor: "선후배",
          hanja: "先後輩",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=先後輩",
        },
      ],
    },
    {
      character: "姓",
      meaning: "성씨",
      meaningKey: "성",
      example: "성명, 본성",
      idiom: "同姓同本 (동성동본 - 같은 성에 같은 본관)",
      level: "6급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: [
            "성명",
            "본성",
            "성씨",
            "성씨조사",
            "성씨분포",
            "성씨통계",
            "성씨유래",
          ],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "성씨",
            "성씨조사",
            "성씨분포",
            "성씨통계",
            "성씨유래",
            "성씨역사",
            "성씨문화",
            "성씨연구",
          ],
        },
      },
      e6: ["성명", "성씨"],
      example_exp: [
        {
          kor: "성명",
          hanja: "姓名",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=姓名",
        },
        {
          kor: "본성",
          hanja: "本性",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=本性",
        },
      ],
      m_exp: [
        {
          kor: "성명",
          hanja: "姓名",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=姓名",
        },
        {
          kor: "본성",
          hanja: "本性",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=本性",
        },
        {
          kor: "성씨",
          hanja: "姓氏",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=姓氏",
        },
        {
          kor: "성씨조사",
          hanja: "姓氏調査",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=姓氏調査",
        },
      ],
    },
    {
      character: "心",
      meaning: "마음",
      meaningKey: "심",
      example: "중심, 심장",
      idiom: "心如止水 (심여지수 - 마음이 고요한 물과 같음)",
      level: "6급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: [
            "중심",
            "심장",
            "심리",
            "심리학",
            "심리상담",
            "심리치료",
            "심리검사",
          ],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "심리",
            "심리학",
            "심리상담",
            "심리치료",
            "심리검사",
            "심리분석",
            "심리발달",
            "심리건강",
          ],
        },
      },
      e6: ["중심", "심장", "심리"],
      example_exp: [
        {
          kor: "중심",
          hanja: "中心",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=中心",
        },
        {
          kor: "심장",
          hanja: "心臟",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=心臟",
        },
      ],
      m_exp: [
        {
          kor: "중심",
          hanja: "中心",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=中心",
        },
        {
          kor: "심장",
          hanja: "心臟",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=心臟",
        },
        {
          kor: "심리",
          hanja: "心理",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=心理",
        },
        {
          kor: "심리학",
          hanja: "心理學",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=心理學",
        },
      ],
    },
    {
      character: "羊",
      meaning: "양",
      meaningKey: "양",
      example: "양고기, 양모",
      idiom: "羊頭狗肉 (양두구육 - 양 머리를 걸고 개고기를 팖)",
      level: "6급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: ["양고기", "양모", "양털", "양털가방", "양털코트", "양털담요"],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "양털",
            "양털가방",
            "양털코트",
            "양털담요",
            "양털공예",
            "양털산업",
            "양털가공",
            "양털품질",
          ],
        },
      },
      e6: ["양고기", "양모"],
      example_exp: [
        {
          kor: "양고기",
          hanja: "羊肉",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=羊肉",
        },
        {
          kor: "양모",
          hanja: "羊毛",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=羊毛",
        },
      ],
      m_exp: [
        {
          kor: "양고기",
          hanja: "羊肉",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=羊肉",
        },
        {
          kor: "양모",
          hanja: "羊毛",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=羊毛",
        },
        {
          kor: "양털",
          hanja: "羊毛",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=羊毛",
        },
        {
          kor: "양털가방",
          hanja: "羊毛가방",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=羊毛가방",
        },
      ],
    },
    {
      character: "魚",
      meaning: "물고기",
      meaningKey: "어",
      example: "어항, 금붕어",
      idiom: "魚頭蛇尾 (어두사미 - 시작은 거창하나 끝은 미미함)",
      level: "6급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: [
            "어항",
            "금붕어",
            "어류",
            "어류도감",
            "어류분류",
            "어류생태",
            "어류보호",
          ],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "어류",
            "어류도감",
            "어류분류",
            "어류생태",
            "어류보호",
            "어류연구",
            "어류관찰",
            "어류학습",
          ],
        },
      },
      e6: ["어항", "어류"],
      example_exp: [
        {
          kor: "어항",
          hanja: "魚缸",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=魚缸",
        },
        {
          kor: "금붕어",
          hanja: "金魚",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=金魚",
        },
      ],
      m_exp: [
        {
          kor: "어항",
          hanja: "魚缸",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=魚缸",
        },
        {
          kor: "금붕어",
          hanja: "金魚",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=金魚",
        },
        {
          kor: "어류",
          hanja: "魚類",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=魚類",
        },
        {
          kor: "어류도감",
          hanja: "魚類圖鑑",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=魚類圖鑑",
        },
        {
          kor: "어류분류",
          hanja: "魚類分類",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=魚類分類",
        },
      ],
    },
    {
      character: "牛",
      meaning: "소",
      meaningKey: "우",
      example: "우유, 황우",
      idiom: "汗牛充棟 (한우충동 - 소가 땀을 흘리고 책이 들보에 가득함)",
      level: "6급",
      wordlevel_mid: {
        wordlevel_mid: {
          m1: [
            "우유",
            "황우",
            "우유성분",
            "우유영양",
            "우유가공",
            "우유보관",
            "우유품질",
          ],

          m2: [],
        },

        wordlevel_mid: {
          m1: [],

          m2: [
            "우유",
            "우유성분",
            "우유영양",
            "우유가공",
            "우유보관",
            "우유품질",
            "우유산업",
            "우유문화",
          ],
        },
      },
      e6: ["우유"],
      example_exp: [
        {
          kor: "우유",
          hanja: "牛乳",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=牛乳",
        },
        {
          kor: "황우",
          hanja: "黃牛",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=黃牛",
        },
      ],
      m_exp: [
        {
          kor: "우유",
          hanja: "牛乳",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=牛乳",
        },
        {
          kor: "우유성분",
          hanja: "牛乳成分",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=牛乳成分",
        },
      ],
    },
    {
      character: "耳",
      meaning: "귀",
      meaningKey: "이",
      example: "이비인후과, 귓속",
      example_exp: [
        {
          kor: "이비인후과",
          hanja: "耳鼻咽喉科",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=耳鼻咽喉科",
        },
        {
          kor: "귓속",
          hanja: "耳속",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=耳속",
        },
      ],
      idiom: "耳食之徒 (이식지도 - 남의 말을 건성으로 듣고 아는 체하는 사람)",
      level: "6급",
      wordlevel_mid: {
        m1: [
          "이비인후과",
          "귓속",
          "이비인후",
          "이비인후과의사",
          "이비인후질환",
          "이비인후검사",
        ],

        m2: [],
      },
      m_exp: [
        {
          kor: "이비인후과",
          hanja: "耳鼻咽喉科",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=耳鼻咽喉科",
        },
      ],
      e6: ["이비인후과"],
    },
    {
      character: "地",
      meaning: "땅",
      meaningKey: "지",
      example: "지구, 지역",
      example_exp: [
        {
          kor: "지구",
          hanja: "地球",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=地球",
        },
        {
          kor: "지역",
          hanja: "地域",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=地域",
        },
      ],
      idiom: "天地開闢 (천지개벽 - 하늘과 땅이 처음 열림)",
      level: "6급",
      wordlevel_mid: {
        m1: [
          "지구",
          "지역",
          "지리",
          "지리학",
          "지리정보",
          "지리정보시스템",
          "지리적위치",
        ],

        m2: [],
      },
      m_exp: [
        {
          kor: "지구",
          hanja: "地球",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=地球",
        },
        {
          kor: "지역",
          hanja: "地域",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=地域",
        },
        {
          kor: "지리",
          hanja: "地理",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=地理",
        },
        {
          kor: "지리학",
          hanja: "地理學",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=地理學",
        },
        {
          kor: "지리정보",
          hanja: "地理情報",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=地理情報",
        },
      ],
      e6: ["지구", "지역", "지리"],
    },
    {
      character: "川",
      meaning: "내",
      meaningKey: "천",
      example: "강천, 하천",
      example_exp: [
        {
          kor: "강천",
          hanja: "江川",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江川",
        },
        {
          kor: "하천",
          hanja: "河川",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=河川",
        },
      ],
      idiom: "山川草木 (산천초목 - 산과 내와 풀과 나무)",
      level: "6급",
      wordlevel_mid: {
        m1: [
          "강천",
          "하천",
          "하천정비",
          "하천보호",
          "하천생태",
          "하천오염",
          "하천정화",
        ],

        m2: [],
      },
      m_exp: [
        {
          kor: "강천",
          hanja: "江川",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=江川",
        },
        {
          kor: "하천",
          hanja: "河川",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=河川",
        },
      ],
      e6: ["하천"],
    },
    {
      character: "千",
      meaning: "일천",
      meaningKey: "천",
      example: "천사, 천원",
      example_exp: [
        {
          kor: "천사",
          hanja: "千사",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=千사",
        },
        {
          kor: "천원",
          hanja: "千원",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=千원",
        },
      ],
      idiom: "千載一遇 (천재일우 - 천 년에 한 번 만날 기회)",
      level: "6급",
      wordlevel_mid: {
        m1: [
          "천사",
          "천원",
          "천단위",
          "천분의일",
          "천분율",
          "천분점",
          "천분위",
        ],

        m2: [],
      },
      m_exp: [
        {
          kor: "천사",
          hanja: "千사",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=千사",
        },
        {
          kor: "천원",
          hanja: "千원",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=千원",
        },
        {
          kor: "천단위",
          hanja: "千단위",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=千단위",
        },
      ],
      e6: ["천원"],
    },
    {
      character: "天",
      meaning: "하늘",
      meaningKey: "천",
      example: "천국, 천재",
      example_exp: [
        {
          kor: "천국",
          hanja: "天國",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=天國",
        },
        {
          kor: "천재",
          hanja: "天才",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=天才",
        },
      ],
      idiom: "天高馬肥 (천고마비 - 하늘은 높고 말은 살찌는)",
      level: "6급",
      wordlevel_mid: {
        m1: [
          "천국",
          "천재",
          "천문",
          "천문학",
          "천문대",
          "천문현상",
          "천문관측",
        ],

        m2: [],
      },
      m_exp: [
        {
          kor: "천국",
          hanja: "天國",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=天國",
        },
        {
          kor: "천재",
          hanja: "天才",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=天才",
        },
        {
          kor: "천문",
          hanja: "天文",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=天文",
        },
        {
          kor: "천문학",
          hanja: "天文學",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=天文學",
        },
        {
          kor: "천문대",
          hanja: "天文臺",
          naverUrl: "https://hanja.dic.naver.com/#/search?query=天文臺",
        },
      ],
      e6: ["천재", "천문"],
    },
  ],
};
