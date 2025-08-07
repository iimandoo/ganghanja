"use client";

import React, { useState, useRef } from "react";
import { Popover as MUIPopover, Box } from "@mui/material";
import { theme } from "@/styles/theme";

interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  width?: string;
  height?: string;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  placement = "bottom",
  width,
  height,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // MUI Popover의 anchorOrigin과 transformOrigin 설정
  const getAnchorOrigin = (): {
    vertical: "top" | "bottom" | "center";
    horizontal: "left" | "right" | "center";
  } => {
    switch (placement) {
      case "top":
        return { vertical: "top", horizontal: "center" };
      case "bottom":
        return { vertical: "bottom", horizontal: "center" };
      case "left":
        return { vertical: "center", horizontal: "left" };
      case "right":
        return { vertical: "center", horizontal: "right" };
      default:
        return { vertical: "bottom", horizontal: "center" };
    }
  };

  const getTransformOrigin = (): {
    vertical: "top" | "bottom" | "center";
    horizontal: "left" | "right" | "center";
  } => {
    switch (placement) {
      case "top":
        return { vertical: "bottom", horizontal: "center" };
      case "bottom":
        return { vertical: "top", horizontal: "center" };
      case "left":
        return { vertical: "center", horizontal: "right" };
      case "right":
        return { vertical: "center", horizontal: "left" };
      default:
        return { vertical: "top", horizontal: "center" };
    }
  };

  return (
    <div ref={triggerRef}>
      <div onClick={handleClick}>{trigger}</div>
      <MUIPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={getAnchorOrigin()}
        transformOrigin={getTransformOrigin()}
        slotProps={{
          paper: {
            sx: {
              minWidth: width,
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              border: `1px solid ${theme.colors.gray.border}`,
              padding: "16px",
              height: height,
            },
          },
        }}
      >
        <Box>{children}</Box>
      </MUIPopover>
    </div>
  );
};
