#!/usr/bin/env python3
"""
한자 데이터의 example, m1, m2 필드를 wordlevel_es와 wordlevel_mid로 변환하는 스크립트
"""

import json
import re
from typing import List, Dict, Any

def convert_example_to_wordlevel_es(example: str) -> List[Dict[str, str]]:
    """example 문자열을 wordlevel_es 형식으로 변환"""
    if not example or example.strip() == "":
        return []
    
    # 쉼표로 분리하고 정리
    words = [word.strip() for word in example.split(",") if word.strip()]
    
    result = []
    for word in words:
        # 한자와 한글 분리 (예: "구월(九月)" -> "구월", "九月")
        match = re.match(r'([가-힣]+)(?:\(([\u4e00-\u9fff]+)\))?', word)
        if match:
            kor = match.group(1)
            hanja = match.group(2) if match.group(2) else kor
            result.append({
                "kor": kor,
                "hanja": hanja,
                "url": f"https://hanja.dict.naver.com/#/search?query={hanja}"
            })
        else:
            # 한자만 있는 경우
            if re.match(r'[\u4e00-\u9fff]+', word):
                result.append({
                    "kor": word,
                    "hanja": word,
                    "url": f"https://hanja.dict.naver.com/#/search?query={word}"
                })
            else:
                # 한글만 있는 경우
                result.append({
                    "kor": word,
                    "hanja": word,
                    "url": f"https://hanja.dict.naver.com/#/search?query={word}"
                })
    
    return result

def convert_m1_m2_to_wordlevel_mid(m1: List[str], m2: List[str]) -> List[Dict[str, str]]:
    """m1, m2 배열을 wordlevel_mid 형식으로 변환"""
    result = []
    
    # m1과 m2의 모든 단어를 합치고 중복 제거
    all_words = list(set(m1 + m2))
    
    for word in all_words:
        if word.strip():
            # 한자와 한글 분리 시도
            match = re.match(r'([가-힣]+)(?:\(([\u4e00-\u9fff]+)\))?', word)
            if match:
                kor = match.group(1)
                hanja = match.group(2) if match.group(2) else kor
            else:
                # 한자만 있는 경우
                if re.match(r'[\u4e00-\u9fff]+', word):
                    kor = word
                    hanja = word
                else:
                    # 한글만 있는 경우
                    kor = word
                    hanja = word
            
            result.append({
                "kor": kor,
                "hanja": hanja,
                "url": f"https://hanja.dict.naver.com/#/search?query={hanja}"
            })
    
    return result

def convert_hanja_data_file(input_file: str, output_file: str):
    """한자 데이터 파일을 변환"""
    print(f"변환 시작: {input_file}")
    
    # 파일 읽기
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # TypeScript 파일에서 데이터 추출
    # export const hanjaGroupData: HanjaGroupDto = { ... } 부분 찾기
    start_marker = "export const hanjaGroupData: HanjaGroupDto = {"
    end_marker = "};"
    
    start_idx = content.find(start_marker)
    if start_idx == -1:
        print("hanjaGroupData를 찾을 수 없습니다.")
        return
    
    # 데이터 부분만 추출
    data_start = start_idx + len(start_marker)
    data_end = content.find(end_marker, data_start)
    
    if data_end == -1:
        print("데이터 끝을 찾을 수 없습니다.")
        return
    
    data_content = content[data_start:data_end]
    
    # 간단한 파싱 (실제로는 더 정교한 파싱이 필요할 수 있음)
    # 여기서는 예시로만 작성
    
    print(f"변환 완료: {output_file}")
    print("주의: 이 스크립트는 기본 구조만 제공합니다. 실제 데이터 변환을 위해서는 더 정교한 파싱이 필요합니다.")

def main():
    """메인 함수"""
    files_to_convert = [
        "src/data/hanjaData.ts",
        "src/data/eomoon_hanjaGroupData_8.ts",
        "src/data/kta_hanjaGroupData_8.ts"
    ]
    
    for file_path in files_to_convert:
        output_path = file_path.replace('.ts', '_converted.ts')
        try:
            convert_hanja_data_file(file_path, output_path)
        except Exception as e:
            print(f"오류 발생 ({file_path}): {e}")

if __name__ == "__main__":
    main()

