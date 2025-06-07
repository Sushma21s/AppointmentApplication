import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const EditAppointmentModal = ({ open, onClose, onSave, appointment }) => {
  const [formData, setFormData] = useState({ ...appointment });

  useEffect(() => {
    setFormData(appointment);
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleDateChange = (value) => {
    setFormData((f) => ({ ...f, dateTime: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!formData) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Appointment</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateTimePicker
              label="Date & Time"
              value={formData.dateTime || null}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={2}
              value={formData.description || ''}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAppointmentModal;
