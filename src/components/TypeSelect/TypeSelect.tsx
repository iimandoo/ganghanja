import React from "react";
import { Container, Label, Select } from "./TypeSelect.styles";
import { HanjaType, HANJA_TYPES } from "@/constants";

interface TypeSelectProps {
  selectedType: HanjaType;
  onTypeChange: (type: HanjaType) => void;
}

export const TypeSelect: React.FC<TypeSelectProps> = ({
  selectedType,
  onTypeChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onTypeChange(event.target.value as HanjaType);
  };

  return (
    <Container>
      <Label htmlFor="hanja-type-select">시험</Label>
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
    </Container>
  );
};
