import { Level } from '@/constants';

export function generateDynamicMetadata(selectedLevels: Level[]) {
  const levelText =
    selectedLevels.length > 0
      ? selectedLevels.join(', ') + ' 한자 학습'
      : '전체 급수 한자 학습';

  return {
    title: `${levelText} | 대한검정회 한자카드`,
    description: `${levelText}을 위한 대한검정회 한자카드게임입니다. 스와이프와 클릭으로 쉽게 한자 뜻과 음을 익힐 수 있습니다.`,
    openGraph: {
      title: `${levelText} | 대한검정회 한자카드`,
      description: `${levelText}을 위한 대한검정회 한자카드게임입니다.`,
    },
  };
}

export function updateDocumentMetadata(selectedLevels: Level[]) {
  if (typeof document === 'undefined') return;

  const metadata = generateDynamicMetadata(selectedLevels);
  document.title = metadata.title;

  // description 메타태그 업데이트
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', metadata.description);
  }

  // Open Graph 메타태그 업데이트
  const ogTitleMeta = document.querySelector('meta[property="og:title"]');
  if (ogTitleMeta) {
    ogTitleMeta.setAttribute('content', metadata.openGraph.title);
  }

  const ogDescMeta = document.querySelector('meta[property="og:description"]');
  if (ogDescMeta) {
    ogDescMeta.setAttribute('content', metadata.openGraph.description);
  }
}