#!/usr/bin/env python3
"""
모든 한자 데이터 파일에서 m1, m2를 wordLevel_mid로 일괄 변환하는 스크립트
"""

import re
import os
from pathlib import Path

def convert_m1_m2_to_wordlevel_mid(content):
    """TypeScript 파일의 m1, m2를 wordLevel_mid로 변환"""
    
    # m1과 m2가 모두 있는 패턴 찾기
    pattern = r'(\s+)m1:\s*\[([^\]]+)\],\s*\n(\s+)m2:\s*\[([^\]]+)\],'
    
    def replace_func(match):
        indent1 = match.group(1)
        m1_content = match.group(2)
        indent2 = match.group(3)
        m2_content = match.group(4)
        
        # wordLevel_mid 구조로 변환
        return f'{indent1}wordLevel_mid: {{\n{indent1}  m1: [{m1_content}],\n{indent1}  m2: [{m2_content}],\n{indent1}}},'
    
    # 패턴 적용
    content = re.sub(pattern, replace_func, content, flags=re.MULTILINE)
    
    # m1만 있는 패턴 찾기
    pattern_m1_only = r'(\s+)m1:\s*\[([^\]]+)\],'
    
    def replace_m1_only(match):
        indent = match.group(1)
        m1_content = match.group(2)
        
        # wordLevel_mid 구조로 변환 (m2는 빈 배열)
        return f'{indent}wordLevel_mid: {{\n{indent}  m1: [{m1_content}],\n{indent}  m2: [],\n{indent}}},'
    
    # m1만 있는 패턴 적용
    content = re.sub(pattern_m1_only, replace_m1_only, content, flags=re.MULTILINE)
    
    # m2만 있는 패턴 찾기
    pattern_m2_only = r'(\s+)m2:\s*\[([^\]]+)\],'
    
    def replace_m2_only(match):
        indent = match.group(1)
        m2_content = match.group(2)
        
        # wordLevel_mid 구조로 변환 (m1은 빈 배열)
        return f'{indent}wordLevel_mid: {{\n{indent}  m1: [],\n{indent}  m2: [{m2_content}],\n{indent}}},'
    
    # m2만 있는 패턴 적용
    content = re.sub(pattern_m2_only, replace_m2_only, content, flags=re.MULTILINE)
    
    return content

def process_file(file_path):
    """파일을 처리하여 m1, m2를 wordLevel_mid로 변환"""
    print(f"처리 중: {file_path.name}")
    
    try:
        # 파일 읽기
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 변환 전 m1, m2 개수 확인
        m1_count = content.count('m1:')
        m2_count = content.count('m2:')
        
        if m1_count == 0 and m2_count == 0:
            print(f"  ✓ {file_path.name}: m1, m2가 없음 (건너뜀)")
            return True
        
        # 변환 실행
        converted_content = convert_m1_m2_to_wordlevel_mid(content)
        
        # 변환 후 wordLevel_mid 개수 확인
        wordlevel_count = converted_content.count('wordLevel_mid:')
        
        # 백업 파일 생성
        backup_path = file_path.with_suffix('.ts.backup')
        with open(backup_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        # 변환된 내용으로 파일 덮어쓰기
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(converted_content)
        
        print(f"  ✓ {file_path.name}: {m1_count + m2_count}개 → {wordlevel_count}개 wordLevel_mid")
        print(f"    백업: {backup_path.name}")
        
        return True
        
    except Exception as e:
        print(f"  ✗ {file_path.name}: 오류 발생 - {e}")
        return False

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
    
    print(f"\n총 {len(hanja_files)}개 파일을 변환합니다...")
    print("각 파일은 .backup 확장자로 백업됩니다.")
    
    success_count = 0
    for file_path in hanja_files:
        if process_file(file_path):
            success_count += 1
    
    print(f"\n변환 완료: {success_count}/{len(hanja_files)} 파일")
    
    if success_count > 0:
        print("\n다음 단계:")
        print("1. 변환된 파일들을 확인하여 올바르게 변환되었는지 검증")
        print("2. 백업 파일들을 삭제 (필요시)")
        print("3. 데이터베이스에 wordLevel_mid 컬럼 추가")
        print("4. 프론트엔드 코드에서 새로운 구조 사용")

if __name__ == "__main__":
    main()
