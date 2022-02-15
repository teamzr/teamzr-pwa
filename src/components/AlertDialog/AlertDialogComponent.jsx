import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import * as React from 'react';

function AlertDialogComponent({ open, title, text, actionButtons }) {
  return (
    <Dialog open={open} fullWidth={true} maxWidth={'xs'}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>{actionButtons}</DialogActions>
    </Dialog>
  );
}

export default AlertDialogComponent;
