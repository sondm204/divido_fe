import React from "react";
import { cn } from "../../../lib/utils";
import { DatePicker as MUIDP } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

interface DatePickerProps {
  label?: string;
  placeholder?: string;
  className?: string;
  value?: dayjs.Dayjs;
  
}

export const DatePicker: React.FC<DatePickerProps> = ({ label, placeholder, className, value }) => {
  return (
    <MUIDP
    
      label={label}
      slotProps={
        {
          textField: {
            placeholder: placeholder,
          },
        }
      }
      format="DD/MM/YYYY"
      className={cn("w-full", className)}
      value={value}
      />
  );
};
