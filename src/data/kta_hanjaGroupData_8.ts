export interface HanjaData {
  character: string;
  meaning: string;
  meaningKey: string;
  idiom: string;
  level: string;
  wordlevel_es?: Array<{ kor: string; hanja: string; url: string }>;
  wordlevel_mid?: Array<{ kor: string; hanja: string; url: string }>;
  naverUrl?: string;
}
export interface HanjaGroupDto {
  TypeA?: HanjaData[];
  TypeB?: HanjaData[];
}

export const hanjaGroupData: HanjaGroupDto = {
  TypeA: [
    {
      character: "九",
      meaning: "아홉",
      meaningKey: "구",
      idiom:
        "九死一生 (구사일생 - 아홉 번 죽을 뻔하다가 한 번 살아남; 간신히 살아남)",
      level: "8급",
      wordlevel_es: [
        {
          kor: "구월",
          hanja: "九月",
          url: "https://hanja.dict.naver.com/#/search?query=九月",
        },
        {
          kor: "구만리",
          hanja: "九萬里",
          url: "https://hanja.dict.naver.com/#/search?query=九萬里",
        },
      ],
      wordlevel_mid: [
        {
          kor: "구미호",
          hanja: "구미호",
          url: "https://hanja.dict.naver.com/#/search?query=구미호",
        },
        {
          kor: "구단",
          hanja: "구단",
          url: "https://hanja.dict.naver.com/#/search?query=구단",
        },
        {
          kor: "구월",
          hanja: "九月",
          url: "https://hanja.dict.naver.com/#/search?query=九月",
        },
        {
          kor: "구만리",
          hanja: "九萬里",
          url: "https://hanja.dict.naver.com/#/search?query=九萬里",
        },
        {
          kor: "구구단",
          hanja: "九九段",
          url: "https://hanja.dict.naver.com/#/search?query=九九段",
        },
        {
          kor: "구구표",
          hanja: "구구표",
          url: "https://hanja.dict.naver.com/#/search?query=구구표",
        },
        {
          kor: "구구법",
          hanja: "구구법",
          url: "https://hanja.dict.naver.com/#/search?query=구구법",
        },
        {
          kor: "구구공식",
          hanja: "구구공식",
          url: "https://hanja.dict.naver.com/#/search?query=구구공식",
        },
        {
          kor: "구구계산",
          hanja: "구구계산",
          url: "https://hanja.dict.naver.com/#/search?query=구구계산",
        },
        {
          kor: "구구학습",
          hanja: "구구학습",
          url: "https://hanja.dict.naver.com/#/search?query=구구학습",
        },
        {
          kor: "구구암기",
          hanja: "구구암기",
          url: "https://hanja.dict.naver.com/#/search?query=구구암기",
        },
        {
          kor: "구구연습",
          hanja: "구구연습",
          url: "https://hanja.dict.naver.com/#/search?query=구구연습",
        },
      ],
      naverUrl: "https://hanja.dict.naver.com/#/search?query=九",
    },
    {
      character: "金",
      meaning: "쇠",
      meaningKey: "금",
      example: "금속, 금액",
      example_exp: [
        {
          kor: "금속",
          hanja: "金屬",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=金屬",
        },
        {
          kor: "금액",
          hanja: "金額",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=金額",
        },
      ],
      idiom: "金石之交 (금석지교 - 금과 돌처럼 굳은 우정)",
      level: "8급",
      wordlevel_mid: {
        wordlevel_mid: {
          wordlevel_mid: {
            m1: [
              "금속",
              "금액",
              "금고",
              "금융",
              "금연",
              "금지",
              "금방",
              "금세",
            ],

            m2: [],
          },

          wordlevel_mid: {
            m1: [],

            m2: [
              "금융",
              "금융기관",
              "금융시장",
              "금융정책",
              "금융위기",
              "금융감독",
              "금융서비스",
              "금융산업",
            ],
          },
        },
      },
      m_exp: [
        {
          kor: "금속",
          hanja: "金屬",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=金屬",
        },
        {
          kor: "금액",
          hanja: "金額",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=金額",
        },
        {
          kor: "금고",
          hanja: "金庫",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=金庫",
        },
        {
          kor: "금융",
          hanja: "金融",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=金融",
        },
      ],
      naverUrl: "https://hanja.dict.naver.com/#/search?query=金",
    },
    {
      character: "南",
      meaning: "남녘",
      meaningKey: "남",
      example: "남쪽, 남대문",
      example_exp: [
        {
          kor: "남쪽",
          hanja: "南쪽",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=南쪽",
        },
        {
          kor: "남대문",
          hanja: "南大門",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=南大門",
        },
      ],
      idiom: "南男北女 (남남북녀 - 남쪽은 남자가, 북쪽은 여자가 잘 생겼다)",
      level: "8급",
      wordlevel_mid: {
        wordlevel_mid: {
          wordlevel_mid: {
            m1: ["남쪽", "남대문", "남극", "남미", "남아공", "남한", "남부"],

            m2: [],
          },

          wordlevel_mid: {
            m1: [],

            m2: [
              "남극",
              "남극대륙",
              "남극탐험",
              "남극기지",
              "남극환경",
              "남극보호",
              "남극조약",
              "남극과학",
            ],
          },
        },
      },
      m_exp: [
        {
          kor: "남쪽",
          hanja: "南쪽",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=南쪽",
        },
        {
          kor: "남대문",
          hanja: "南大門",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=南大門",
        },
        {
          kor: "남극",
          hanja: "南極",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=南極",
        },
        {
          kor: "남미",
          hanja: "南美",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=南美",
        },
        {
          kor: "남한",
          hanja: "南韓",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=南韓",
        },
      ],
      naverUrl: "https://hanja.dict.naver.com/#/search?query=南",
    },
    {
      character: "男",
      meaning: "사내",
      meaningKey: "남",
      example: "남자, 남성",
      example_exp: [
        {
          kor: "남자",
          hanja: "男子",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=男子",
        },
        {
          kor: "남성",
          hanja: "男性",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=男性",
        },
      ],
      idiom: "男兒大丈夫 (남아대장부 - 대장부다운 남자)",
      level: "8급",
      wordlevel_mid: {
        wordlevel_mid: {
          wordlevel_mid: {
            m1: ["남자", "남성", "남학생", "남동생", "남편", "남녀"],

            m2: [],
          },

          wordlevel_mid: {
            m1: [],

            m2: [
              "남성",
              "남성복지",
              "남성교육",
              "남성문화",
              "남성발전",
              "남성협력",
              "남성의식",
              "남성평등",
            ],
          },
        },
      },
      m_exp: [
        {
          kor: "남자",
          hanja: "男子",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=男子",
        },
        {
          kor: "남성",
          hanja: "男性",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=男性",
        },
        {
          kor: "남학생",
          hanja: "男學生",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=男學生",
        },
        {
          kor: "남동생",
          hanja: "男同生",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=男同生",
        },
        {
          kor: "남편",
          hanja: "男便",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=男便",
        },
        {
          kor: "남녀",
          hanja: "男女",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=男女",
        },
      ],
      naverUrl: "https://hanja.dict.naver.com/#/search?query=男",
    },
    {
      character: "女",
      meaning: "여자",
      meaningKey: "녀",
      example: "여자, 여성",
      example_exp: [
        {
          kor: "여자",
          hanja: "女子",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=女子",
        },
        {
          kor: "여성",
          hanja: "女性",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=女性",
        },
      ],
      idiom: "男女老少 (남녀노소 - 남자와 여자, 늙은이와 아이)",
      level: "8급",
      wordlevel_mid: {
        m1: ["여자", "여성", "여학생", "여동생", "여자친구", "여성운동"],

        m2: [],
      },
      m_exp: [
        {
          kor: "여자",
          hanja: "女子",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=女子",
        },
        {
          kor: "여성",
          hanja: "女性",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=女性",
        },
        {
          kor: "여학생",
          hanja: "女學生",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=女學生",
        },
        {
          kor: "여동생",
          hanja: "女同生",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=女同生",
        },
        {
          kor: "여성운동",
          hanja: "女性運動",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=女性運動",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["여성", "여성복지", "여성교육"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=女",
    },
    {
      character: "東",
      meaning: "동녘",
      meaningKey: "동",
      example: "동쪽, 동대문",
      example_exp: [
        {
          kor: "동쪽",
          hanja: "東쪽",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=東쪽",
        },
        {
          kor: "동대문",
          hanja: "東大門",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=東大門",
        },
      ],
      idiom: "東問西答 (동문서답 - 동쪽 물음에 서쪽 대답; 엉뚱한 대답)",
      level: "8급",
      wordlevel_mid: {
        m1: ["동쪽", "동대문", "동극", "동아리", "동네", "동생", "동료"],

        m2: [],
      },
      m_exp: [
        {
          kor: "동쪽",
          hanja: "東쪽",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=東쪽",
        },
        {
          kor: "동대문",
          hanja: "東大門",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=東大門",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["동아리", "동아리활동", "동아리발표", "동아리축제"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=東",
    },
    {
      character: "六",
      meaning: "여섯",
      meaningKey: "륙",
      example: "육학년",
      example_exp: [
        {
          kor: "육학년",
          hanja: "六年",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=六年",
        },
      ],
      idiom: "六親和合 (육친화합 - 온 가족이 화목함)",
      level: "8급",
      wordlevel_mid: {
        m1: ["육학년", "육지", "육군", "육상", "육식", "육체"],

        m2: [],
      },
      m_exp: [
        {
          kor: "육학년",
          hanja: "六年",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=六年",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: [
          "육상",
          "육상경기",
          "육상선수",
          "육상부",
          "육상훈련",
          "육상기록",
          "육상대회",
          "육상시설",
        ],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=六",
    },
    {
      character: "母",
      meaning: "어머니",
      meaningKey: "모",
      example: "부모, 모국",
      example_exp: [
        {
          kor: "부모",
          hanja: "父母",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=父母",
        },
        {
          kor: "모국",
          hanja: "母國",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=母國",
        },
      ],
      idiom: "慈母之心 (자모지심 - 자애로운 어머니의 마음)",
      level: "8급",
      wordlevel_mid: {
        m1: ["부모", "모국", "모성", "모범", "모델", "모양", "모습"],

        m2: [],
      },
      m_exp: [
        {
          kor: "부모",
          hanja: "父母",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=父母",
        },
        {
          kor: "모국",
          hanja: "母國",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=母國",
        },
        {
          kor: "모성",
          hanja: "母性",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=母性",
        },
        {
          kor: "모성애",
          hanja: "母性愛",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=母性愛",
        },
        {
          kor: "모성보호",
          hanja: "母性保護",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=母性保護",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: [
          "모성",
          "모성애",
          "모성보호",
          "모성교육",
          "모성문화",
          "모성발전",
          "모성의식",
          "모성복지",
        ],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=母",
    },
    {
      character: "木",
      meaning: "나무",
      meaningKey: "목",
      example: "목재, 목요일",
      example_exp: [
        {
          kor: "목재",
          hanja: "木材",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=木材",
        },
        {
          kor: "목요일",
          hanja: "木曜日",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=木曜日",
        },
      ],
      idiom: "木人石心 (목인석심 - 나무 사람, 돌 마음; 매우 무정함)",
      level: "8급",
      wordlevel_mid: {
        m1: ["목재", "목요일", "목표", "목적", "목소리", "목구멍", "목록"],

        m2: [],
      },
      m_exp: [
        {
          kor: "목재",
          hanja: "木材",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=木材",
        },
        {
          kor: "목요일",
          hanja: "木曜日",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=木曜日",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: [
          "목표",
          "목표관리",
          "목표설정",
          "목표달성",
          "목표평가",
          "목표수립",
          "목표추진",
          "목표실현",
        ],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=木",
    },
    {
      character: "門",
      meaning: "문",
      meaningKey: "문",
      example: "교문, 전문",
      example_exp: [
        {
          kor: "교문",
          hanja: "校門",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=校門",
        },
        {
          kor: "전문",
          hanja: "專門",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=專門",
        },
      ],
      idiom: "門前成市 (문전성시 - 문 앞이 시장이 될 정도; 인기 많음)",
      level: "8급",
      wordlevel_mid: {
        m1: ["교문", "전문", "문학", "문법", "문장", "문서", "문의"],

        m2: [],
      },
      m_exp: [
        {
          kor: "교문",
          hanja: "校門",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=校門",
        },
        {
          kor: "전문",
          hanja: "專門",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=專門",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: [
          "문학",
          "문학작품",
          "문학사",
          "문학비평",
          "문학이론",
          "문학사상",
          "문학운동",
          "문학사조",
        ],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=門",
    },
    {
      character: "父",
      meaning: "아버지",
      meaningKey: "부",
      example: "부자, 부친",
      example_exp: [
        {
          kor: "부자",
          hanja: "父子",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=父子",
        },
        {
          kor: "부친",
          hanja: "父親",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=父親",
        },
      ],
      idiom: "父母恩重 (부모은중 - 부모의 은혜가 크다)",
      level: "8급",
      wordlevel_mid: {
        m1: ["부자", "부친", "부모", "부장", "부회장", "부담"],

        m2: [],
      },
      m_exp: [
        {
          kor: "부자",
          hanja: "父子",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=父子",
        },
        {
          kor: "부친",
          hanja: "父親",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=父親",
        },
        {
          kor: "부모",
          hanja: "父母",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=父母",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: [
          "부모",
          "부모교육",
          "부모역할",
          "부모참여",
          "부모상담",
          "부모지원",
          "부모협력",
          "부모의식",
        ],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=父",
    },
    {
      character: "北",
      meaning: "북녘",
      meaningKey: "북",
      example: "북극, 북한",
      example_exp: [
        {
          kor: "북극",
          hanja: "北極",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=北極",
        },
        {
          kor: "북한",
          hanja: "北韓",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=北韓",
        },
      ],
      idiom: "南征北伐 (남정북벌 - 남쪽 치고 북쪽 정벌; 여러 전쟁을 겪음)",
      level: "8급",
      wordlevel_mid: {
        m1: ["북극", "북한", "북쪽", "북부", "북미", "북아메리카"],

        m2: [],
      },
      m_exp: [
        {
          kor: "북극",
          hanja: "北極",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=北極",
        },
        {
          kor: "북한",
          hanja: "北韓",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=北韓",
        },
        {
          kor: "북부",
          hanja: "北部",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=北部",
        },
        {
          kor: "북극탐험",
          hanja: "北極探險",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=北極探險",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: [
          "북극",
          "북극권",
          "북극탐험",
          "북극기지",
          "북극환경",
          "북극보호",
          "북극조약",
          "북극과학",
        ],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=北",
    },
    {
      character: "四",
      meaning: "넉",
      meaningKey: "사",
      example: "사학년, 사계",
      example_exp: [
        {
          kor: "사학년",
          hanja: "四年",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=四年",
        },
        {
          kor: "사계",
          hanja: "四季",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=四季",
        },
      ],
      idiom: "四通八達 (사통팔달 - 사방으로 통해 있음; 교통이 매우 편리함)",
      level: "8급",
      wordlevel_mid: {
        m1: ["사학년", "사계", "사방", "사람", "사실", "사용", "사업"],

        m2: [],
      },
      m_exp: [
        {
          kor: "사학년",
          hanja: "四年",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=四年",
        },
        {
          kor: "사계",
          hanja: "四季",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=四季",
        },
        {
          kor: "사방",
          hanja: "四方",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=四方",
        },
        {
          kor: "사통팔달",
          hanja: "四通八達",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=四通八達",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: [
          "사통팔달",
          "사방",
          "사방향",
          "사방위",
          "사방지도",
          "사방관찰",
          "사방탐구",
          "사방학습",
        ],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=四",
    },
    {
      character: "三",
      meaning: "셋",
      meaningKey: "삼",
      example: "삼촌, 삼일",
      example_exp: [
        {
          kor: "삼촌",
          hanja: "三寸",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=三寸",
        },
        {
          kor: "삼일",
          hanja: "三日",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=三日",
        },
      ],
      idiom: "三三五五 (삼삼오오 - 여럿이 모여 있는 모양)",
      level: "8급",
      wordlevel_mid: {
        m1: ["삼촌", "삼일", "삼각형", "삼국", "삼성", "삼월"],

        m2: [],
      },
      m_exp: [
        {
          kor: "삼촌",
          hanja: "三寸",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=三寸",
        },
        {
          kor: "삼일",
          hanja: "三日",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=三日",
        },
        {
          kor: "삼각형",
          hanja: "三角形",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=三角形",
        },
        {
          kor: "삼국",
          hanja: "三國",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=三國",
        },
        {
          kor: "삼성",
          hanja: "三星",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=三星",
        },
        {
          kor: "삼월",
          hanja: "三月",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=三月",
        },
        {
          kor: "삼각형공식",
          hanja: "三角形公式",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=三角形公式",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["삼각형", "삼각형공식"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=三",
    },
    {
      character: "西",
      meaning: "서녘",
      meaningKey: "서",
      example: "서양, 서쪽",
      example_exp: [
        {
          kor: "서양",
          hanja: "西洋",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=西洋",
        },
        {
          kor: "서쪽",
          hanja: "西쪽",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=西쪽",
        },
      ],
      idiom: "東西古今 (동서고금 - 동서양과 고금 모두)",
      level: "8급",
      wordlevel_mid: {
        m1: ["서양", "서쪽", "서부", "서울", "서비스", "서명"],

        m2: [],
      },
      m_exp: [
        {
          kor: "서양",
          hanja: "西洋",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=西洋",
        },
        {
          kor: "서쪽",
          hanja: "西쪽",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=西쪽",
        },
        {
          kor: "서부",
          hanja: "西部",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=西部",
        },
        {
          kor: "서양사",
          hanja: "西洋史",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=西洋史",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["서양", "서양문화", "서양사", "서양철학"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=西",
    },
    {
      character: "水",
      meaning: "물",
      meaningKey: "수",
      example: "수질, 수량",
      example_exp: [
        {
          kor: "수질",
          hanja: "水質",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=水質",
        },
        {
          kor: "수량",
          hanja: "水量",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=水量",
        },
      ],
      idiom: "水魚之交 (수어지교 - 물과 물고기처럼 친밀한 사이)",
      level: "8급",
      wordlevel_mid: {
        m1: ["수질", "수량", "수면", "수로", "수원", "수분"],

        m2: [],
      },
      m_exp: [
        {
          kor: "수질",
          hanja: "水質",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=水質",
        },
        {
          kor: "수량",
          hanja: "水量",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=水量",
        },
        {
          kor: "수면",
          hanja: "水面",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=水面",
        },
        {
          kor: "수로",
          hanja: "水路",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=水路",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["수질관리", "수량조절", "수면관찰", "수로건설"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=水",
    },
    {
      character: "十",
      meaning: "열",
      meaningKey: "십",
      example: "십일, 십년",
      example_exp: [
        {
          kor: "십일",
          hanja: "十日",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=十日",
        },
        {
          kor: "십년",
          hanja: "十年",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=十年",
        },
      ],
      idiom: "十中八九 (십중팔구 - 열 중 여덟 아홉; 거의 대부분)",
      level: "8급",
      wordlevel_mid: {
        m1: ["십일", "십년", "십대", "십자", "십분", "십월"],

        m2: [],
      },
      m_exp: [
        {
          kor: "십일",
          hanja: "十日",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=十日",
        },
        {
          kor: "십년",
          hanja: "十年",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=十年",
        },
        {
          kor: "십대",
          hanja: "十代",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=十代",
        },
        {
          kor: "십자",
          hanja: "十字",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=十字",
        },
        {
          kor: "십중팔구",
          hanja: "十中八九",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=十中八九",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["십중팔구", "십자선", "십자교차", "십자학습"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=十",
    },
    {
      character: "五",
      meaning: "다섯",
      meaningKey: "오",
      example: "오후, 오대양",
      example_exp: [
        {
          kor: "오대양",
          hanja: "五大洋",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=五大洋",
        },
      ],
      idiom: "五花八門 (오화팔문 - 다양한 수단과 방법)",
      level: "8급",
      wordlevel_mid: {
        m1: ["오후", "오대양", "오월", "오전", "오늘", "오래"],

        m2: [],
      },
      m_exp: [
        {
          kor: "오대양",
          hanja: "五大洋",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=五大洋",
        },
        {
          kor: "오월",
          hanja: "五月",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=五月",
        },
        {
          kor: "오감",
          hanja: "五感",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=五感",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["오화팔문", "오관", "오감", "오감교육"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=五",
    },
    {
      character: "月",
      meaning: "달",
      meaningKey: "월",
      example: "월급, 월요일",
      example_exp: [
        {
          kor: "월급",
          hanja: "月給",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=月給",
        },
        {
          kor: "월요일",
          hanja: "月曜日",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=月曜日",
        },
      ],
      idiom: "月下氷人 (월하빙인 - 월하 노인; 중매쟁이)",
      level: "8급",
      wordlevel_mid: {
        m1: ["월급", "월요일", "월간"],

        m2: [],
      },
      m_exp: [
        {
          kor: "월급",
          hanja: "月給",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=月給",
        },
        {
          kor: "월요일",
          hanja: "月曜日",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=月曜日",
        },
        {
          kor: "월간",
          hanja: "月間",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=月間",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["월급", "월요일"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=月",
    },
    {
      character: "二",
      meaning: "두",
      meaningKey: "이",
      example: "이학년, 이월",
      example_exp: [
        {
          kor: "이학년",
          hanja: "二年",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=二年",
        },
        {
          kor: "이월",
          hanja: "二月",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=二月",
        },
      ],
      idiom: "二人三脚 (이인삼각 - 두 사람이 세 다리로 같이 달리는 경기)",
      level: "8급",
      wordlevel_mid: {
        m1: ["이학년", "이월", "이름"],

        m2: [],
      },
      m_exp: [
        {
          kor: "이학년",
          hanja: "二年",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=二年",
        },
        {
          kor: "이월",
          hanja: "二月",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=二月",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["이학년", "이월"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=二",
    },
    {
      character: "人",
      meaning: "사람",
      meaningKey: "인",
      example: "인간, 인기",
      example_exp: [
        {
          kor: "인간",
          hanja: "人間",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=人間",
        },
        {
          kor: "인기",
          hanja: "人氣",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=人氣",
        },
      ],
      idiom: "人山人海 (인산인해 - 사람이 산과 바다처럼 많다)",
      level: "8급",
      wordlevel_mid: {
        m1: ["인간", "인기", "인사", "인정", "인상", "인생", "인류"],

        m2: [],
      },
      m_exp: [
        {
          kor: "인간",
          hanja: "人間",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=人間",
        },
        {
          kor: "인기",
          hanja: "人氣",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=人氣",
        },
        {
          kor: "인사",
          hanja: "人事",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=人事",
        },
        {
          kor: "인정",
          hanja: "人情",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=人情",
        },
        {
          kor: "인생",
          hanja: "人生",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=人生",
        },
        {
          kor: "인류",
          hanja: "人類",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=人類",
        },
        {
          kor: "인권",
          hanja: "人權",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=人權",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["인권", "인권운동", "인권협력"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=人",
    },
    {
      character: "日",
      meaning: "날",
      meaningKey: "일",
      example: "일기, 일요일",
      example_exp: [
        {
          kor: "일기",
          hanja: "日記",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=日記",
        },
        {
          kor: "일요일",
          hanja: "日曜日",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=日曜日",
        },
      ],
      idiom: "日日是好日 (일일시호일 - 매일매일이 좋은 날)",
      level: "8급",
      wordlevel_mid: {
        m1: ["일기", "일요일", "일본", "일반", "일상", "일정", "일치"],

        m2: [],
      },
      m_exp: [
        {
          kor: "일기",
          hanja: "日記",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=日記",
        },
        {
          kor: "일요일",
          hanja: "日曜日",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=日曜日",
        },
        {
          kor: "일본",
          hanja: "日本",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=日本",
        },
        {
          kor: "일상",
          hanja: "日常",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=日常",
        },
        {
          kor: "일정",
          hanja: "日程",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=日程",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["일본", "일본문화"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=日",
    },
    {
      character: "一",
      meaning: "하나",
      meaningKey: "일",
      example: "일학년, 일생",
      example_exp: [
        {
          kor: "일학년",
          hanja: "一年",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=一年",
        },
        {
          kor: "일생",
          hanja: "一生",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=一生",
        },
      ],
      idiom: "一石二鳥 (일석이조 - 돌 하나로 새 두 마리 잡음; 일거양득)",
      level: "8급",
      wordlevel_mid: {
        m1: ["일학년", "일생", "일반", "일상", "일정", "일치", "일본"],

        m2: [],
      },
      m_exp: [
        {
          kor: "일학년",
          hanja: "一年",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=一年",
        },
        {
          kor: "일생",
          hanja: "一生",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=一生",
        },
        {
          kor: "일반",
          hanja: "一般",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=一般",
        },
        {
          kor: "일치",
          hanja: "一致",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=一致",
        },
        {
          kor: "일석이조",
          hanja: "一石二鳥",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=一石二鳥",
        },
        {
          kor: "일반적",
          hanja: "一般的",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=一般的",
        },
        {
          kor: "일반화",
          hanja: "一般化",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=一般化",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: [
          "일석이조",
          "일반",
          "일반적",
          "일반화",
          "일반성",
          "일반론",
          "일반학습",
          "일반교육",
        ],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=一",
    },
    {
      character: "子",
      meaning: "아들",
      meaningKey: "자",
      example: "자식, 자녀",
      example_exp: [
        {
          kor: "자식",
          hanja: "子息",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=子息",
        },
        {
          kor: "자녀",
          hanja: "子女",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=子女",
        },
      ],
      idiom: "孝子賢孫 (효자현손 - 효도하는 아들과 착한 손자)",
      level: "8급",
      wordlevel_mid: {
        m1: ["자식", "자녀", "자유", "자동", "자동차"],

        m2: [],
      },
      m_exp: [
        {
          kor: "자식",
          hanja: "子息",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=子息",
        },
        {
          kor: "자녀",
          hanja: "子女",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=子女",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["자유", "자유민주주의", "자유경제"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=子",
    },
    {
      character: "弟",
      meaning: "아우",
      meaningKey: "제",
      example: "형제, 제자",
      example_exp: [
        {
          kor: "형제",
          hanja: "兄弟",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=兄弟",
        },
        {
          kor: "제자",
          hanja: "弟子",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=弟子",
        },
      ],
      idiom: "兄弟之情 (형제지정 - 형제간의 정)",
      level: "8급",
      wordlevel_mid: {
        m1: ["형제", "제자", "제목", "제품", "제도", "제안"],

        m2: [],
      },
      m_exp: [
        {
          kor: "형제",
          hanja: "兄弟",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=兄弟",
        },
        {
          kor: "제자",
          hanja: "弟子",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=弟子",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["제자", "제자양성"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=弟",
    },
    {
      character: "七",
      meaning: "일곱",
      meaningKey: "칠",
      example: "칠월, 칠성",
      example_exp: [
        {
          kor: "칠월",
          hanja: "七月",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=七月",
        },
        {
          kor: "칠성",
          hanja: "七星",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=七星",
        },
      ],
      idiom: "七轉八起 (칠전팔기 - 일곱 번 넘어져도 여덟 번 일어남; 끈기)",
      level: "8급",
      wordlevel_mid: {
        m1: ["칠월", "칠성", "칠판", "칠교", "칠보"],

        m2: [],
      },
      m_exp: [
        {
          kor: "칠월",
          hanja: "七月",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=七月",
        },
        {
          kor: "칠성",
          hanja: "七星",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=七星",
        },
        {
          kor: "칠전팔기",
          hanja: "七轉八起",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=七轉八起",
        },
        {
          kor: "칠각형",
          hanja: "七角形",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=七角形",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["칠전팔기", "칠각형", "칠각형면적"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=七",
    },
    {
      character: "土",
      meaning: "흙",
      meaningKey: "토",
      example: "토양, 토요일",
      example_exp: [
        {
          kor: "토양",
          hanja: "土壤",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=土壤",
        },
        {
          kor: "토요일",
          hanja: "土曜日",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=土曜日",
        },
      ],
      idiom: "國土防衛 (국토방위 - 나라의 땅을 지킴)",
      level: "8급",
      wordlevel_mid: {
        m1: ["토양", "토요일", "국토"],

        m2: [],
      },
      m_exp: [
        {
          kor: "토양",
          hanja: "土壤",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=土壤",
        },
        {
          kor: "토요일",
          hanja: "土曜日",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=土曜日",
        },
        {
          kor: "국토",
          hanja: "國土",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=國土",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["토론"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=土",
    },
    {
      character: "八",
      meaning: "여덟",
      meaningKey: "팔",
      example: "팔각형, 팔도",
      example_exp: [
        {
          kor: "팔각형",
          hanja: "八角形",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=八角形",
        },
        {
          kor: "팔도",
          hanja: "八道",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=八道",
        },
      ],
      idiom: "八方美人 (팔방미인 - 여러 방면에서 능통한 사람)",
      level: "8급",
      wordlevel_mid: {
        m1: ["팔각형", "팔도", "팔방", "팔방미인", "팔분의일", "팔십"],

        m2: [],
      },
      m_exp: [
        {
          kor: "팔각형",
          hanja: "八角形",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=八角形",
        },
        {
          kor: "팔도",
          hanja: "八道",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=八道",
        },
        {
          kor: "팔방",
          hanja: "八方",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=八方",
        },
        {
          kor: "팔방미인",
          hanja: "八方美人",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=八方美人",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["팔각형", "팔각형면적", "팔방미인"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=八",
    },
    {
      character: "兄",
      meaning: "맏",
      meaningKey: "형",
      example: "형제, 형님",
      example_exp: [
        {
          kor: "형제",
          hanja: "兄弟",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=兄弟",
        },
      ],
      idiom: "兄弟同心 (형제동심 - 형제가 한 마음으로 협력함)",
      level: "8급",
      wordlevel_mid: {
        m1: ["형제", "형님", "형제자매", "형제간", "형제애", "형제관계"],

        m2: [],
      },
      m_exp: [
        {
          kor: "형제",
          hanja: "兄弟",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=兄弟",
        },
        {
          kor: "형님",
          hanja: "兄님",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=兄님",
        },
        {
          kor: "형제자매",
          hanja: "兄弟姉妹",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=兄弟姉妹",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["형제", "형제관계"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=兄",
    },
    {
      character: "火",
      meaning: "불",
      meaningKey: "화",
      example: "화재, 화요일",
      example_exp: [
        {
          kor: "화재",
          hanja: "火災",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=火災",
        },
        {
          kor: "화요일",
          hanja: "火曜日",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=火曜日",
        },
      ],
      idiom: "火上加油 (화상가유 - 불 위에 기름을 붓다; 상황을 악화시킴)",
      level: "8급",
      wordlevel_mid: {
        m1: ["화재", "화요일", "화학", "화산", "화기", "화력"],

        m2: [],
      },
      m_exp: [
        {
          kor: "화재",
          hanja: "火災",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=火災",
        },
        {
          kor: "화요일",
          hanja: "火曜日",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=火曜日",
        },
        {
          kor: "화산",
          hanja: "火山",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=火山",
        },
        {
          kor: "화기",
          hanja: "火器",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=火器",
        },
        {
          kor: "화력",
          hanja: "火力",
          naverUrl: "https://hanja.dict.naver.com/#/search?query=火力",
        },
      ],
      wordlevel_mid: {
        m1: [],

        m2: ["화학", "화학실험"],
      },
      naverUrl: "https://hanja.dict.naver.com/#/search?query=火",
    },
  ],
};
