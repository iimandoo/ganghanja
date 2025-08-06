import React from "react";

interface SettingButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const SettingButton: React.FC<SettingButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.8rem",
        cursor: disabled ? "not-allowed" : "pointer",
        color: "rgb(70, 70, 70)",
        paddingBottom: "3px",
      }}
    >
      {children}
    </div>
  );
};
