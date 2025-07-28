import React from "react";
import {
  Container,
  SelectWrapper,
  Select,
  SelectIcon,
} from "./TypeSelect.styles";
import { HanjaType, HANJA_TYPES } from "@/constants";

interface TypeSelectProps {
  selectedType: HanjaType;
  onTypeChange: (type: HanjaType) => void;
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
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onTypeChange(event.target.value as HanjaType);
  };

  return (
    <Container>
      <SelectWrapper>
        <Select
          id="hanja-type-select"
          value={selectedType}
          onChange={handleChange}
        >
          {HANJA_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
        <SelectIcon>
          <ChevronDownIcon />
        </SelectIcon>
      </SelectWrapper>
    </Container>
  );
};
