import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const AppointmentModal = ({
  open,
  onClose,
  onSubmit,
  appointment = null,
}) => {
  const isEdit = Boolean(appointment);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dateTime: null,
    description: '',
  });

  useEffect(() => {
    if (appointment) {
      setFormData({
        ...appointment,
        dateTime: appointment.dateTime ? dayjs(appointment.dateTime) : null,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        dateTime: null,
        description: '',
      });
    }
  }, [appointment, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (value) => {
    setFormData((prev) => ({ ...prev, dateTime: value }));
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      dateTime: formData.dateTime ? formData.dateTime.toISOString() : null,
      id: isEdit ? appointment.id : Date.now(), 
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Edit Appointment' : 'Book a New Appointment'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} direction="column" className="custom-grid">
          <Grid item>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <DateTimePicker
              label="Date & Time"
              value={formData.dateTime}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} fullWidth />
              )}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={2}
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {isEdit ? 'Save Changes' : 'Book Appointment'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentModal;
