import React from "react";
import { FormControl, MenuItem } from "@mui/material";
import MUISelect, { SelectChangeEvent } from "@mui/material/Select";

import { cn } from "../../../lib/utils"; // Optional: classNames utility

interface SelectProps {
  label?: string;
  className?: string;
  value?: string | number;
  setValue: any;
  options: {
    label: string;
    value: string | number;
  }[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  className,
  value,
  options,
  placeholder,
  setValue,
}) => {
  const handleChange = (event: any) => {
    setValue(event.target.value as string);
  };
  return (
    <FormControl fullWidth>
      <MUISelect
        value={value}
        label={label}
        displayEmpty={!!placeholder}
        className={cn("w-full", className)}
        onChange={handleChange}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};
