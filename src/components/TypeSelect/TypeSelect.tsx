import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  SelectWrapper,
  SelectButton,
  SelectIcon,
  DropdownList,
  DropdownItem,
  HiddenSelect,
} from "./TypeSelect.styles";
import { HanjaType, HANJA_TYPES } from "@/constants";

interface TypeSelectProps {
  selectedType: HanjaType;
  onTypeChange: (type: HanjaType) => void;
  isLoading?: boolean;
}

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7 10L12 15L17 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TypeSelect: React.FC<TypeSelectProps> = ({
  selectedType,
  onTypeChange,
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ESC 키로 드롭다운 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (!isLoading) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (type: HanjaType) => {
    if (!isLoading) {
      onTypeChange(type);
      setIsOpen(false);
    }
  };

  const handleHiddenSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onTypeChange(event.target.value as HanjaType);
  };

  return (
    <Container>
      <SelectWrapper ref={wrapperRef}>
        <SelectButton
          type="button"
          $isOpen={isOpen}
          onClick={handleToggle}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          disabled={isLoading}
          style={{
            opacity: isLoading ? 0.6 : 1,
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          <span>{selectedType}</span>
          <SelectIcon $isOpen={isOpen}>
            <ChevronDownIcon />
          </SelectIcon>
        </SelectButton>

        <DropdownList $isOpen={isOpen} role="listbox">
          {HANJA_TYPES.map((type) => (
            <DropdownItem
              key={type}
              $isSelected={type === selectedType}
              onClick={() => handleSelect(type)}
              role="option"
              aria-selected={type === selectedType}
              style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
            >
              {type}
            </DropdownItem>
          ))}
        </DropdownList>

        {/* 접근성을 위한 숨겨진 select */}
        <HiddenSelect
          id="hanja-type-select"
          value={selectedType}
          onChange={handleHiddenSelectChange}
          tabIndex={-1}
        >
          {HANJA_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </HiddenSelect>
      </SelectWrapper>
    </Container>
  );
};
