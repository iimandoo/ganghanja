export function generateDynamicMetadata() {
  return {
    title: `COOL한자 | 대한검정회·어문회 한자 급수시험 대비 학습카드 (쿨한자)`,
    description: `한자 급수시험 합격 비법! COOL한자와 함께 단어, 사자성어를 통해 재미있고 효과적으로 한자 어휘력을 키우세요.`,
    openGraph: {
      title: `COOL한자 | 대한검정회·어문회 한자 급수시험 대비 학습카드 (쿨한자)`,
      description: `한자 급수시험 합격 비법! COOL한자와 함께 단어, 사자성어를 통해 재미있고 효과적으로 한자 어휘력을 키우세요.`,
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
