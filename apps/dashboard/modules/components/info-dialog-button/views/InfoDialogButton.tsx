import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';

import { InfoIcon } from '@dashboard/modules/components/icons/views/Info';
import { Information } from '@dashboard/modules/components/info-dialog-button/information.type';

type InfoDialogButtonProps = Information;

function InfoDialogButton({
  tooltip,
  title,
  description,
}: InfoDialogButtonProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title={tooltip}>
        <IconButton onClick={handleClickOpen} aria-label="Show information">
          <InfoIcon className="text-white" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="info-dialog-title"
        aria-describedby="info-dialog-description"
      >
        <DialogTitle id="info-dialog-title">{title}</DialogTitle>
        <DialogContent className="max-w-[50vw]">
          {typeof description === 'string' && (
            <DialogContentText id="info-dialog-slide-description">
              {description}
            </DialogContentText>
          )}
          {typeof description === 'object' && (
            <div id="info-dialog-slide-description">{description}</div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus aria-label="Close dialog">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default InfoDialogButton;
