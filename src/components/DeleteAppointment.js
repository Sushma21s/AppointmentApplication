import React from 'react';
import {
  Dialog, DialogTitle, DialogContent,
  DialogActions, Button, Typography,
} from '@mui/material';

const ConfirmDeleteDialog = ({ open, onClose, onConfirm, appointment }) => {
    
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Appointment</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the appointment for <strong>{appointment?.name}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={() => { onConfirm(appointment); onClose(); }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
