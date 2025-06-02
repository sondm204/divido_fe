import * as React from "react";
import { cn } from "../../../lib/utils";
import { TextField } from "@mui/material";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "outlined" | "filled" | "standard";
  className?: string;
  label?: string;
  fixedLabel?: boolean;
  iSize?: "small" | "medium";
}

const Input: React.FC<InputProps> = ({
  className,
  type,
  variant = "outlined",
  label,
  fixedLabel=true,
  iSize="medium",
  ...props
}) => {
  return (
    <TextField
      label={label}
      variant={variant}
      type={type}
      className={cn(className)}
      fullWidth
      slotProps={{
        inputLabel: {
          shrink: fixedLabel,
        },
      }}
      size={iSize}
      placeholder={props.placeholder}
    />
  );
};
export { Input };
