import { Button } from "../button/Button";
import {
  Box,
  Breakpoint,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ActionButton {
  title: string;
  onClick?: () => void;
}

interface CustomDialogProps {
  className?: string;
  dialogTitle?: string;
  description?: string;
  children?: React.ReactNode;
  actionsButton?: ActionButton[];
  open?: boolean;
  setOpen?: any;
  maxWidth?: Breakpoint;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  className,
  dialogTitle,
  description,
  children,
  actionsButton = [],
  open = false,
  maxWidth="sm",
  setOpen,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog maxWidth={maxWidth} fullWidth open={open} onClose={handleClose}>
      <Box className={className}>
        {dialogTitle && <DialogTitle> {dialogTitle}</DialogTitle>}

        <DialogContent>
          {description && (
            <DialogContentText className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </DialogContentText>
          )}

          <div className="text-sm text-gray-700 dark:text-gray-300">
            {children}
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {actionsButton.map((btn, idx) => {
            return (
              <Button key={idx} onClick={btn.onClick}>
                {btn.title}
              </Button>
            );
          })}
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CustomDialog;
