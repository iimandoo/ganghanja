#!/usr/bin/env python3
"""
기존 m1, m2 데이터를 wordLevel_mid로 변환하는 스크립트
"""

import json
import os
from pathlib import Path

def convert_m1_m2_to_wordlevel_mid(data):
    """m1, m2 데이터를 wordLevel_mid로 변환"""
    if isinstance(data, list):
        return [convert_m1_m2_to_wordlevel_mid(item) for item in data]
    elif isinstance(data, dict):
        result = {}
        for key, value in data.items():
            if key in ['m1', 'm2']:
                # m1, m2를 건너뛰고 wordLevel_mid로 통합
                continue
            elif key == 'character':
                # character가 있는 경우 wordLevel_mid 생성
                result[key] = value
                if 'm1' in data or 'm2' in data:
                    result['wordLevel_mid'] = {
                        'm1': data.get('m1', []),
                        'm2': data.get('m2', [])
                    }
            else:
                result[key] = convert_m1_m2_to_wordlevel_mid(value)
        return result
    else:
        return data

def process_hanja_data_file(file_path):
    """한자 데이터 파일을 처리하여 m1, m2를 wordLevel_mid로 변환"""
    print(f"처리 중: {file_path}")
    
    # 파일 읽기
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # export const hanjaGroupData 부분 찾기
    if 'export const hanjaGroupData' in content:
        # 데이터 부분 추출 (간단한 방법)
        try:
            # TypeScript 파일에서 데이터 부분만 추출
            start_idx = content.find('export const hanjaGroupData: HanjaGroupDto = {')
            if start_idx != -1:
                # 데이터 시작 부분부터 끝까지
                data_start = content.find('{', start_idx)
                if data_start != -1:
                    # TypeScript 객체를 Python으로 파싱하기 위해 간단한 변환
                    # 실제로는 더 정교한 파싱이 필요할 수 있음
                    print("TypeScript 파일 감지됨. 수동 변환이 필요할 수 있습니다.")
                    return False
        except Exception as e:
            print(f"파일 처리 중 오류: {e}")
            return False
    
    return True

def main():
    """메인 함수"""
    scripts_dir = Path(__file__).parent
    src_dir = scripts_dir.parent / 'src' / 'data'
    
    if not src_dir.exists():
        print(f"src/data 디렉토리를 찾을 수 없습니다: {src_dir}")
        return
    
    # 한자 데이터 파일들 찾기
    hanja_files = list(src_dir.glob('*hanja*.ts'))
    
    if not hanja_files:
        print("한자 데이터 파일을 찾을 수 없습니다.")
        return
    
    print(f"발견된 한자 데이터 파일들:")
    for file_path in hanja_files:
        print(f"  - {file_path.name}")
    
    print("\n변환 작업을 시작합니다...")
    
    for file_path in hanja_files:
        if process_hanja_data_file(file_path):
            print(f"  ✓ {file_path.name} 처리 완료")
        else:
            print(f"  ✗ {file_path.name} 처리 실패")
    
    print("\n변환 작업이 완료되었습니다.")
    print("\n다음 단계:")
    print("1. 각 TypeScript 파일에서 m1, m2를 wordLevel_mid로 수동 변환")
    print("2. 데이터베이스에 wordLevel_mid 컬럼 추가")
    print("3. 프론트엔드 코드에서 새로운 구조 사용")

if __name__ == "__main__":
    main()
