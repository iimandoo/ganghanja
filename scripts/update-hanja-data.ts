import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { convertToExpFormat } from "../src/utils/hanjaConverter";

// 파일 경로
const inputFile = join(__dirname, "../src/data/kta_hanjaGroupData_5.ts");
const outputFile = join(
  __dirname,
  "../src/data/kta_hanjaGroupData_5_updated.ts"
);

// 파일 읽기
const fileContent = readFileSync(inputFile, "utf-8");

// hanjaGroupData 부분 추출 (export const hanjaGroupData: HanjaGroupDto = { ... } 부분)
const dataStartIndex = fileContent.indexOf(
  "export const hanjaGroupData: HanjaGroupDto = {"
);
if (dataStartIndex === -1) {
  console.error("hanjaGroupData를 찾을 수 없습니다.");
  process.exit(1);
}

// 데이터 부분만 추출하고 export const 부분 제거
let dataContent = fileContent.substring(dataStartIndex);
dataContent = dataContent.replace(
  "export const hanjaGroupData: HanjaGroupDto = ",
  ""
);

// 마지막 세미콜론 제거
if (dataContent.endsWith(";")) {
  dataContent = dataContent.slice(0, -1);
}

// 데이터 실행
let hanjaGroupData: unknown;
try {
  // eval 대신 Function 생성자를 사용하여 더 안전하게 실행
  const dataFunction = new Function("return " + dataContent);
  hanjaGroupData = dataFunction();
} catch (error) {
  console.error("데이터 파싱 오류:", error);
  console.error("데이터 내용:", dataContent.substring(0, 200) + "...");
  process.exit(1);
}

// 각 HanjaData 항목에 _exp 필드 추가
function updateHanjaData(data: unknown): unknown {
  if (Array.isArray(data)) {
    return data.map((item) => updateHanjaData(item));
  } else if (data && typeof data === "object" && data !== null) {
    const obj = data as Record<string, unknown>;
    if (obj.character && (obj.example || obj.m1 || obj.m2)) {
      // example_exp 추가
      if (obj.example) {
        obj.example_exp = convertToExpFormat(
          obj.example as string,
          obj.character as string
        );
      }

      // m1_exp 추가
      if (obj.m1) {
        obj.m1_exp = convertToExpFormat(
          obj.m1 as string[],
          obj.character as string
        );
      }

      // m2_exp 추가
      if (obj.m2) {
        obj.m2_exp = convertToExpFormat(
          obj.m2 as string[],
          obj.character as string
        );
      }
    }

    // 재귀적으로 모든 속성 처리
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
        obj[key] = updateHanjaData(obj[key]);
      }
    }
  }

  return data;
}

// 데이터 업데이트
console.log("hanjaGroupData 업데이트 중...");
const updatedData = updateHanjaData(hanjaGroupData);

// 결과를 파일로 저장
const updatedFileContent = `export interface HanjaData {
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

export const hanjaGroupData: HanjaGroupDto = ${JSON.stringify(
  updatedData,
  null,
  2
)};
`;

writeFileSync(outputFile, updatedFileContent, "utf-8");

console.log(`업데이트 완료! 결과가 ${outputFile}에 저장되었습니다.`);

// 통계 출력
let totalItems = 0;
let updatedItems = 0;

function countItems(data: unknown): void {
  if (Array.isArray(data)) {
    data.forEach((item) => countItems(item));
  } else if (data && typeof data === "object" && data !== null) {
    const obj = data as Record<string, unknown>;
    if (obj.character) {
      totalItems++;
      if (obj.example_exp || obj.m1_exp || obj.m2_exp) {
        updatedItems++;
      }
    }

    for (const key in obj) {
      if (obj.hasOwnProperty(key) && typeof obj[key] === "object") {
        countItems(obj[key]);
      }
    }
  }
}

countItems(updatedData);
console.log(
  `총 ${totalItems}개 항목 중 ${updatedItems}개 항목이 업데이트되었습니다.`
);
