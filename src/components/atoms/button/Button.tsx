import React from "react";
import { cn } from "../../../lib/utils";
import { Button as MUIBtn } from "@mui/material";
interface ButtonProps {
  variant?: "text" | "contained" | "outlined";
  size?: "small" | "medium" | "large";
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  type?: "submit" | "reset" | "button";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "outlined",
  size = "medium",
  isLoading = false,
  children,
  className,
  disabled = false,
  onClick,
  color="primary",
  type,
}) => {
  return (
    <MUIBtn
      loading={isLoading}
      variant={variant}
      size={size}
      className={cn("!cursor-pointer", className)}
      disabled={disabled}
      onClick={onClick}
      color={color}
      type={type}
    >
      {children ? children : "Button"}
    </MUIBtn>
  );
};
