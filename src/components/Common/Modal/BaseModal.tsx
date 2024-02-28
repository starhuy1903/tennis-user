import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
} from '@mui/material';

export interface BaseModalProps {
  id?: string;
  headerText: string;
  onModalClose: () => void;
  body?: React.ReactNode;
  primaryButtonText: string;
  onClickPrimaryButton: () => void;
  disabledPrimaryButton?: boolean;
  secondaryButtonText?: string;
  onClickSecondaryButton?: () => void;
  disabledSecondaryButton?: boolean;
  size?: DialogProps['maxWidth'];
}

function BaseModal({
  headerText,
  onModalClose,
  body = null,
  primaryButtonText,
  onClickPrimaryButton,
  disabledPrimaryButton = false,
  secondaryButtonText = 'Cancel',
  onClickSecondaryButton,
  disabledSecondaryButton = false,
  size = 'sm',
}: BaseModalProps) {
  return (
    <Dialog
      open
      aria-labelledby="customized-dialog-title"
      fullWidth
      maxWidth={size}
      disableEscapeKeyDown
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {headerText}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onModalClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>{body}</DialogContent>
      <DialogActions>
        <Button
          onClick={
            onClickSecondaryButton ? onClickSecondaryButton : onModalClose
          }
          disabled={disabledSecondaryButton}
        >
          {secondaryButtonText}
        </Button>
        <Button
          variant="contained"
          autoFocus
          onClick={onClickPrimaryButton}
          disabled={disabledPrimaryButton}
        >
          {primaryButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BaseModal;
