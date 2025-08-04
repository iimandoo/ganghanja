export function generateDynamicMetadata() {
  return {
    title: `COOL한자 | 대한검정회, 어문회 급수시험 한자카드`,
    description: `대한검정회, 어문회 급수시험용 한자카드입니다. 한자가 활용된 단어와 사자성어를 통해 어휘력을 높입니다.`,
    openGraph: {
      title: `COOL한자 | 대한검정회, 어문회 급수시험 한자카드`,
      description: `대한검정회, 어문회 급수시험용 한자카드입니다. 한자가 활용된 단어와 사자성어를 통해 어휘력을 높입니다.`,
    },
  };
}

export function updateDocumentMetadata() {
  if (typeof document === "undefined") return;

  const metadata = generateDynamicMetadata();
  document.title = metadata.title;

  // description 메타태그 업데이트
  const descriptionMeta = document.querySelector('meta[name="description"]');
  if (descriptionMeta) {
    descriptionMeta.setAttribute("content", metadata.description);
  }

  // Open Graph 메타태그 업데이트
  const ogTitleMeta = document.querySelector('meta[property="og:title"]');
  if (ogTitleMeta) {
    ogTitleMeta.setAttribute("content", metadata.openGraph.title);
  }

  const ogDescMeta = document.querySelector('meta[property="og:description"]');
  if (ogDescMeta) {
    ogDescMeta.setAttribute("content", metadata.openGraph.description);
  }
}
