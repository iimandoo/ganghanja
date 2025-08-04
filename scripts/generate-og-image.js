const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
const path = require("path");

async function generateOGImage() {
  const width = 1200;
  const height = 630;

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // 배경 그라데이션
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#667eea");
  gradient.addColorStop(1, "#764ba2");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // 제목 텍스트
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 72px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("쿨한자", width / 2, height / 2 - 50);

  // 부제목
  ctx.font = "36px Arial, sans-serif";
  ctx.fillText("대한검정회 한자카드 학습 게임", width / 2, height / 2 + 20);

  // 설명
  ctx.font = "24px Arial, sans-serif";
  ctx.fillText(
    "8급부터 준4급까지 체계적인 한자 학습",
    width / 2,
    height / 2 + 80
  );

  // 파일 저장
  const buffer = canvas.toBuffer("image/png");
  const outputPath = path.join(__dirname, "../public/og-image.png");
  fs.writeFileSync(outputPath, buffer);

  console.log("OG 이미지가 생성되었습니다:", outputPath);
}

generateOGImage().catch(console.error);
