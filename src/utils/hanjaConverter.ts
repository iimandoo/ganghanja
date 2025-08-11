// 한자 변환을 위한 유틸리티 함수들

// 한국어 단어를 한자로 변환하는 간단한 매핑
const koreanToHanjaMap: Record<string, string> = {
  // 가 (歌)
  가요: "歌謠",
  작사: "作詞",
  가사: "歌詞",

  // 가 (家)
  가정: "家庭",
  가구: "家具",
  가족: "家族",

  // 각 (各)
  각자: "各自",
  각기: "各其",

  // 간 (間)
  시간: "時間",
  공간: "空間",
  간격: "間隔",

  // 강 (强)
  강력: "强力",
  강자: "强者",

  // 구 (九)
  구월: "九月",
  구만리: "九萬里",

  // 기 (氣)
  기운: "氣運",
  기분: "氣分",

  // 나 (那)
  나라: "國家",

  // 남 (男)
  남자: "男子",
  남성: "男性",

  // 녀 (女)
  여자: "女子",
  여성: "女性",

  // 대 (大)
  대학: "大學",
  대한: "大韓",

  // 동 (東)
  동쪽: "東쪽",
  동양: "東洋",

  // 마 (馬)
  말: "馬",
  마차: "馬車",

  // 문 (門)
  문: "門",
  문학: "文學",

  // 물 (物)
  물건: "物件",
  물질: "物質",

  // 바 (波)
  파도: "波濤",
  전파: "電波",

  // 방 (方)
  방향: "方向",
  방법: "方法",

  // 백 (白)
  흰색: "白色",
  백색: "白色",

  // 분 (分)
  분할: "分割",
  분류: "分類",

  // 사 (四)
  사월: "四月",
  사방: "四方",

  // 산 (山)
  산: "山",
  산맥: "山脈",

  // 삼 (三)
  삼월: "三月",
  삼각형: "三角形",

  // 상 (上)
  위: "上",
  상단: "上端",

  // 서 (西)
  서쪽: "西쪽",
  서양: "西洋",

  // 선 (先)
  먼저: "先",
  선생: "先生",

  // 소 (小)
  작은: "小",
  소형: "小型",

  // 수 (水)
  물: "水",
  수분: "水分",

  // 시 (時)
  시간: "時間",
  시대: "時代",

  // 아 (兒)
  아이: "兒",
  아동: "兒童",

  // 안 (安)
  안전: "安全",
  안녕: "安寧",

  // 양 (羊)
  양: "羊",
  양고기: "羊肉",

  // 어 (魚)
  물고기: "魚",
  어류: "魚類",

  // 여 (女)
  여자: "女子",
  여성: "女性",

  // 오 (五)
  오월: "五月",
  오각형: "五角形",

  // 와 (瓦)
  기와: "瓦",
  와지: "瓦地",

  // 외 (外)
  밖: "外",
  외부: "外部",

  // 요 (要)
  중요: "重要",
  요점: "要點",

  // 용 (用)
  사용: "使用",
  용도: "用途",

  // 우 (右)
  오른쪽: "右쪽",
  우측: "右側",

  // 원 (元)
  원래: "元來",
  원인: "原因",

  // 월 (月)
  달: "月",
  월간: "月間",

  // 위 (位)
  자리: "位",
  위치: "位置",

  // 유 (有)
  있다: "有",
  유무: "有無",

  // 육 (六)
  육월: "六月",
  육각형: "六角形",

  // 이 (二)
  이월: "二月",
  이중: "二重",

  // 인 (人)
  사람: "人",
  인간: "人間",

  // 일 (一)
  하나: "一",
  일월: "一月",

  // 자 (字)
  글자: "字",
  문자: "文字",

  // 작 (作)
  만들다: "作",
  작품: "作品",

  // 장 (長)
  길다: "長",
  장관: "長官",

  // 재 (在)
  있다: "在",
  재학: "在學",

  // 전 (前)
  앞: "前",
  전면: "前面",

  // 정 (正)
  바르다: "正",
  정확: "正確",

  // 제 (第)
  첫째: "第一",
  제목: "題目",

  // 조 (早)
  일찍: "早",
  조기: "早期",

  // 중 (中)
  가운데: "中",
  중앙: "中央",

  // 지 (地)
  땅: "地",
  지역: "地域",

  // 차 (車)
  수레: "車",
  자동차: "自動車",

  // 책 (冊)
  책: "冊",
  도서: "圖書",

  // 초 (草)
  풀: "草",
  초목: "草木",

  // 최 (最)
  가장: "最",
  최고: "最高",

  // 추 (秋)
  가을: "秋",
  추수: "秋收",

  // 춤": "舞",
  무용: "舞踊",

  // 하 (下)
  아래: "下",
  하단: "下端",

  // 한 (漢)
  한자: "漢字",
  한국: "韓國",

  // 해 (海)
  바다: "海",
  해양: "海洋",

  // 현 (現)
  지금: "現",
  현재: "現在",

  // 호 (戶)
  집: "戶",
  가구: "家戶",

  // 화 (火)
  불: "火",
  화재: "火災",

  // 회 (會)
  모임: "會",
  회의: "會議",

  // 효 (孝)
  효도: "孝道",
  효자: "孝子",

  // 후 (後)
  뒤: "後",
  후면: "後面",

  // 흥 (興)
  흥미: "興味",
  흥행: "興行",
};

/**
 * 한국어 단어를 한자로 변환
 * @param koreanWord 한국어 단어
 * @returns 한자 단어 또는 null (찾을 수 없는 경우)
 */
export function convertKoreanToHanja(koreanWord: string): string | null {
  return koreanToHanjaMap[koreanWord] || null;
}

/**
 * 한자 단어에 특정 한자가 포함되어 있는지 확인
 * @param hanjaWord 한자 단어
 * @param targetCharacter 찾을 한자
 * @returns 포함 여부
 */
export function containsCharacter(
  hanjaWord: string,
  targetCharacter: string
): boolean {
  return hanjaWord.includes(targetCharacter);
}

/**
 * 네이버 한자사전 URL 생성
 * @param hanjaWord 한자 단어
 * @returns 네이버 한자사전 URL
 */
export function generateNaverUrl(hanjaWord: string): string {
  return `https://hanja.dic.naver.com/#/search?query=${encodeURIComponent(
    hanjaWord
  )}`;
}

/**
 * 한국어 어휘 문자열을 개별 단어로 분리
 * @param vocabularyString 쉼표로 구분된 어휘 문자열
 * @returns 개별 단어 배열
 */
export function splitVocabulary(vocabularyString: string): string[] {
  return vocabularyString
    .split(",")
    .map((word) => word.trim())
    .filter((word) => word.length > 0);
}

/**
 * 어휘 데이터를 _exp 형식으로 변환
 * @param vocabularyArray 어휘 배열 또는 쉼표로 구분된 문자열
 * @param character 한자 글자
 * @returns _exp 형식의 배열
 */
export function convertToExpFormat(
  vocabularyArray: string[] | string,
  character: string
): Array<{ kor: string; hanja: string; naverUrl: string }> {
  const words = Array.isArray(vocabularyArray)
    ? vocabularyArray
    : splitVocabulary(vocabularyArray);

  const result: Array<{ kor: string; hanja: string; naverUrl: string }> = [];

  for (const word of words) {
    const hanja = convertKoreanToHanja(word);

    // 한자 변환이 실패하거나 character가 포함되지 않은 경우 제외
    if (hanja && containsCharacter(hanja, character)) {
      result.push({
        kor: word,
        hanja: hanja,
        naverUrl: generateNaverUrl(hanja),
      });
    }
  }

  return result;
}
